"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Landmark, Compass } from "lucide-react";

const INSTITUTIONS = [
  {
    id: "iit-bombay",
    name: "IIT Bombay",
    department: "Department of Computer Science & Engineering",
    location: "Powai, Mumbai",
    targetScore: "AIR ≤ 50 | Score: 850+",
    src: "/images/institutions/iit-bombay.jpg",
  },
  {
    id: "iit-madras",
    name: "IIT Madras",
    department: "DoCSE & Pravartak Research Park",
    location: "Chennai, Tamil Nadu",
    targetScore: "AIR ≤ 120 | Score: 800+",
    src: "/images/institutions/iit-madras.jpg",
  },
  {
    id: "iit-guwahati",
    name: "IIT Guwahati",
    department: "Center for Computer Science & AI",
    location: "Guwahati, Assam",
    targetScore: "AIR ≤ 350 | Score: 730+",
    src: "/images/institutions/iit-guwahati.jpg",
  },
  {
    id: "isro",
    name: "ISRO Research Centers",
    department: "URSC / VSSC / SAC (Scientist/Engineer 'SC')",
    location: "National Space Centers",
    targetScore: "Direct PSU Interview Call",
    src: "/images/institutions/isro.webp",
  },
];

export default function InstitutionalHeritage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % INSTITUTIONS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const current = INSTITUTIONS[currentIndex];

  return (
    <>
      {/* Background Institutional Image Crossfade Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {INSTITUTIONS.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-[0.07]" : "opacity-0"
            }`}
          >
            <Image
              src={item.src}
              alt={item.name}
              fill
              priority={index === 0}
              className="object-cover object-center scale-105"
            />
          </div>
        ))}
        {/* Academic Frosted Glass & Gradient Diffusion Mask */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc]/70 via-[#f8fafc]/95 to-[#f8fafc]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(37,99,235,0.06),transparent_70%)]" />
      </div>

      {/* Institutional Aspirational Badge */}
      <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-blue-200 bg-white/90 px-4 py-1.5 text-xs font-medium text-slate-700 shadow-sm shadow-blue-500/10 backdrop-blur-md">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-[10px]">
          <Landmark className="h-3 w-3" />
        </span>
        <span className="font-semibold text-blue-900">
          Target Institution:
        </span>
        <span className="font-bold text-blue-600 transition-all duration-300">
          {current.name}
        </span>
        <span className="hidden sm:inline text-slate-300">•</span>
        <span className="hidden sm:inline text-slate-600 font-mono text-[11px]">
          {current.targetScore}
        </span>

        {/* Institution Quick Switcher Dots */}
        <div className="ml-2 flex items-center gap-1.5 border-l border-slate-200 pl-2">
          {INSTITUTIONS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              title={`${item.name} (${item.location})`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-5 bg-blue-600"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Switch to ${item.name}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
