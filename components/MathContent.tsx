"use client";

import React, { useEffect, useRef } from "react";

interface MathContentProps {
  content: string;
  className?: string;
  inline?: boolean;
}

type MathJaxInstance = {
  typesetPromise?: (elements: HTMLElement[]) => Promise<void>;
  typesetClear?: (elements: HTMLElement[]) => void;
  startup?: {
    promise?: Promise<void>;
  };
};

type MathJaxWindow = Window & {
  MathJax?: MathJaxInstance;
};

// Global serialized promise queue to prevent concurrent MathJax v3 typesetPromise clashes
let typesetQueue: Promise<void> = Promise.resolve();

function enqueueMathJaxTypeset(container: HTMLElement) {
  const getMathJax = (): MathJaxInstance | undefined => {
    return typeof window !== "undefined"
      ? (window as unknown as MathJaxWindow).MathJax
      : undefined;
  };

  typesetQueue = typesetQueue
    .then(async () => {
      const mathJax = getMathJax();
      if (!mathJax || !mathJax.typesetPromise) return;

      // If initial MathJax startup is pending, wait for it
      if (mathJax.startup?.promise) {
        try {
          await mathJax.startup.promise;
        } catch {
          // ignore startup errors
        }
      }

      // Clear previous MathJax state on this container if any
      if (mathJax.typesetClear) {
        try {
          mathJax.typesetClear([container]);
        } catch {
          // ignore clear errors
        }
      }

      // Typeset container
      try {
        await mathJax.typesetPromise([container]);
      } catch (err) {
        console.warn("MathJax typeset notice:", err);
      }
    })
    .catch((err) => {
      console.warn("MathJax queue notice:", err);
    });
}

/**
 * Renders HTML question stems with LaTeX math formatting, image path resolution,
 * and robust serialized MathJax 3 typesetting.
 */
export default function MathContent({ content, className = "", inline = false }: MathContentProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Format content: fix image src paths, fill-in-the-blank underscores, and LaTeX math formatting
  const formattedHtml = React.useMemo(() => {
    if (!content) return "";
    let html = String(content);

    // Fix all relative/absolute image paths from GateQA or local assets
    html = html.replace(/src=["'](?:\/|\.\/)?(?:Gate_QA\/)?question-images\//gi, 'src="___Q_IMG___/');
    html = html.replace(/src=["'](?:\/|\.\/)?(?:Gate_QA\/)?images\//gi, 'src="/images/');
    html = html.replace(/src="___Q_IMG___\//g, 'src="/question-images/');

    // Replace fill-in-the-blank underscores (e.g. $\_\_\_\_\_\_$, $______$, \_\_\_\_, ______):
    // In GATE exam papers, blanks are represented by multiple underscores or escaped underscores.
    // If exposed to MathJax in math mode ($...$), multiple raw underscores cause "Missing open brace for subscript" error!
    const blankHtml = '<span class="inline-block border-b-2 border-slate-700 min-w-[3.5rem] h-3.5 mx-1.5 align-baseline">&nbsp;</span>';

    // 1. Math-mode blanks like $\_\_\_\_\_\_$, $______$, or $\_ \_ \_$
    html = html.replace(/\$(?:\s*\\_|\s*_)+\s*\$/g, blankHtml);

    // 2. Escaped or raw consecutive underscores in text (2 or more)
    html = html.replace(/(?:\\_){2,}/g, blankHtml);
    html = html.replace(/_{2,}/g, blankHtml);

    // 3. Clean up broken newline escapes inside paragraphs or math that break layout
    html = html.replace(/(?:<p>|\s)\n+(?=\s*<)/gi, " ");

    return html;
  }, [content]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isMounted = true;
    let attempts = 0;

    const scheduleTypeset = () => {
      if (!isMounted) return;
      const mathJax = (window as unknown as MathJaxWindow).MathJax;
      if (mathJax?.typesetPromise) {
        enqueueMathJaxTypeset(container);
      } else if (attempts < 30) {
        attempts++;
        setTimeout(scheduleTypeset, 100);
      }
    };

    scheduleTypeset();

    return () => {
      isMounted = false;
    };
  }, [formattedHtml]);

  if (inline) {
    return (
      <span
        ref={containerRef as React.RefObject<HTMLSpanElement>}
        className={`inline-math-content text-inherit ${className}`}
        dangerouslySetInnerHTML={{ __html: formattedHtml }}
      />
    );
  }

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={`math-content max-w-none text-slate-900 leading-relaxed font-normal ${className}`}
      dangerouslySetInnerHTML={{ __html: formattedHtml }}
    />
  );
}
