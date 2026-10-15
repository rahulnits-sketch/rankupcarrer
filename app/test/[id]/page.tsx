"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import questionData from "@/data/questions.json";
import { getGateQuestionsForTest } from "@/lib/gate";
import MathContent from "@/components/MathContent";

export type Question = {
  id: number | string;
  testId: string;
  type: "MCQ" | "MSQ" | "NAT" | "MTA" | string;
  question: string;
  rawQuestionHtml?: string;
  options: string[];
  structuredOptions?: { label: string; text: string; html?: string }[];
  answer: string[];
  tolerance?: { min?: number; max?: number; lower?: number; upper?: number; abs?: number } | null;
  subject: string;
  topic?: string;
  difficulty: string;
  marks: number;
  negativeMarks: number;
  explanation?: string;
  link?: string;
};

function normalizeQuestionIds(questions: Question[]): Question[] {
  const seen = new Set<string>();

  return questions.map((question, index) => {
    const originalId = String(question.id);
    let uniqueId = originalId;

    if (seen.has(uniqueId)) {
      uniqueId = `${originalId}__${index}`;
      while (seen.has(uniqueId)) {
        uniqueId = `${uniqueId}_`;
      }
    }

    seen.add(uniqueId);
    return uniqueId === originalId ? question : { ...question, id: uniqueId };
  });
}

function normalizeAnswerToken(value: string | number | null | undefined) {
  return String(value ?? "").trim().replace(/\s+/g, " ").toUpperCase();
}

function buildOptionMap(question: Question) {
  const entries = (question.structuredOptions && question.structuredOptions.length > 0
    ? question.structuredOptions
    : question.options.map((opt, index) => ({
        label: String.fromCharCode(65 + index),
        text: opt,
        html: opt,
      })))
    .map((opt) => [normalizeAnswerToken(opt.label), String(opt.text ?? "")]);

  return Object.fromEntries(entries);
}

function isSelectedAnswerCorrect(question: Question, selectedValue: string | string[] | null | undefined) {
  if (selectedValue == null) return false;

  const optionMap = buildOptionMap(question);
  const values = Array.isArray(selectedValue) ? selectedValue : [selectedValue];

  const normalizedSelected = values.map((value) => {
    const token = normalizeAnswerToken(value);
    return optionMap[token] ?? String(value ?? "");
  });

  return question.answer.some((candidate) => {
    const normalizedCandidate = normalizeAnswerToken(candidate);
    const resolvedCandidate = optionMap[normalizedCandidate] ?? String(candidate ?? "");
    return normalizedSelected.some((selected) => normalizeAnswerToken(selected) === normalizeAnswerToken(resolvedCandidate));
  });
}

export default function TestPage() {
  const router = useRouter();
  const params = useParams();
  const testId = (params?.id as string) || "all";

  // Dynamic state for loaded questions
  const [loadedQuestions, setLoadedQuestions] = useState<Question[] | null>(null);
  const [testTitle, setTestTitle] = useState<string>("");
  const [testSubject, setTestSubject] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dynamic test duration in seconds (default 30 mins, 180 mins for Full GATE Mocks/PYQ)
  const [totalDurationSeconds, setTotalDurationSeconds] = useState(30 * 60);
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    let isMounted = true;

    async function loadTest() {
      setLoading(true);
      setError(null);

      // 1. Live API (OpenTDB)
      if (testId === "opentdb") {
        try {
          let apiUrl = "/api/opentdb";
          if (typeof window !== "undefined") {
            const sp = new URLSearchParams(window.location.search);
            const cat = sp.get("category");
            const diff = sp.get("difficulty");
            const qp = new URLSearchParams();
            if (cat) qp.set("category", cat);
            if (diff) qp.set("difficulty", diff);
            const qs = qp.toString();
            if (qs) apiUrl += `?${qs}`;
          }

          const res = await fetch(apiUrl);
          const data = await res.json();
          if (isMounted) {
            if (data?.questions && data.questions.length > 0) {
              setLoadedQuestions(data.questions);
              setTestTitle("Live Tech Quiz");
              setTestSubject("General Computer Science");
              setTotalDurationSeconds(15 * 60);
              setTimeLeft(15 * 60);
            } else {
              setError("No questions received from Open Trivia DB.");
            }
            setLoading(false);
          }
        } catch (err) {
          if (isMounted) {
            setError(err instanceof Error ? err.message : "Error fetching from Open Trivia DB");
            setLoading(false);
          }
        }
        return;
      }

      // 2. GATE Dataset Test (PYQ, Subject-wise, or Mock)
      if (testId.startsWith("gate-")) {
        try {
          let gateData: {
            title: string;
            subject: string;
            durationMinutes: number;
            questions: any[];
          } | null = null;

          // Attempt fast server API load
          try {
            const apiRes = await fetch(`/api/gate/test/${encodeURIComponent(testId)}`);
            if (apiRes.ok) {
              gateData = await apiRes.json();
            }
          } catch (apiErr) {
            console.warn("API route failed, falling back to module loader:", apiErr);
          }

          // Fallback to client module loader if API failed
          if (!gateData || !gateData.questions || gateData.questions.length === 0) {
            gateData = await getGateQuestionsForTest(testId);
          }

          if (isMounted) {
            if (gateData && gateData.questions && gateData.questions.length > 0) {
              const mapped: Question[] = gateData.questions.map((q: any) => ({
                id: q.id,
                testId,
                type: q.type,
                question: q.question,
                rawQuestionHtml: q.rawQuestionHtml,
                options: q.options || [],
                structuredOptions: q.structuredOptions,
                answer: q.answer || [],
                tolerance: q.tolerance,
                subject: q.subject,
                topic: q.topic,
                difficulty: q.difficulty || "Medium",
                marks: q.marks || 1,
                negativeMarks: q.negativeMarks ?? (q.type === "MCQ" ? (q.marks === 2 ? 0.67 : 0.33) : 0),
                explanation: q.explanation,
                link: q.link
              }));

              setLoadedQuestions(mapped);
              setTestTitle(gateData.title);
              setTestSubject(gateData.subject);
              const durationSec = (gateData.durationMinutes || 180) * 60;
              setTotalDurationSeconds(durationSec);
              setTimeLeft(durationSec);
            } else {
              setError(`No questions found for GATE test "${testId}".`);
            }
            setLoading(false);
          }
        } catch (err) {
          if (isMounted) {
            setError(err instanceof Error ? err.message : "Failed to load GATE test dataset.");
            setLoading(false);
          }
        }
        return;
      }

      // 3. Fallback / Existing Static Tests from questions.json
      const list = questionData as Question[];
      if (testId === "all") {
        setLoadedQuestions(list);
        setTestTitle("Full GATE Practice Test");
        setTestSubject("All Core Subjects");
        setTotalDurationSeconds(60 * 60);
        setTimeLeft(60 * 60);
      } else {
        const filtered = list.filter((q) => q.testId === testId);
        const qList = filtered.length > 0 ? filtered : list;
        setLoadedQuestions(qList);
        setTestTitle(qList[0]?.subject ? `${qList[0].subject} Test` : "GATE Practice Test");
        setTestSubject(qList[0]?.subject || "GATE Core");
        const dur = Math.max(15, qList.length * 2) * 60;
        setTotalDurationSeconds(dur);
        setTimeLeft(dur);
      }
      setLoading(false);
    }

    loadTest();

    return () => {
      isMounted = false;
    };
  }, [testId]);

  const questions: Question[] = useMemo(() => {
    return normalizeQuestionIds(loadedQuestions || []);
  }, [loadedQuestions]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  // answers map: string for MCQ/NAT, string[] for MSQ
  const [answers, setAnswers] = useState<Record<string | number, string | string[]>>({});
  const [visited, setVisited] = useState<(string | number)[]>([]);
  const [marked, setMarked] = useState<(string | number)[]>([]);
  const [showSubmit, setShowSubmit] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  const [calcInput, setCalcInput] = useState("");

  const question = questions[currentQuestion] || questions[0];

  // Navigate between questions and mark visited
  const goToQuestion = (index: number) => {
    setCurrentQuestion(index);
    const targetQ = questions[index];
    if (targetQ) {
      setVisited((prev) => (prev.includes(targetQ.id) ? prev : [...prev, targetQ.id]));
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      goToQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      goToQuestion(currentQuestion - 1);
    }
  };

  // Submit Logic with full GATE Evaluation
  const handleSubmit = useCallback(() => {
    let score = 0;
    let totalMarks = 0;
    let correct = 0;
    let incorrect = 0;

    const evaluated = questions.map((q) => {
      totalMarks += q.marks;
      const userAns = answers[q.id];
      let isAnswered = false;
      let isCorrect = false;

      if (q.type === "MTA") {
        // Marks to All in GATE
        isAnswered = userAns !== undefined && userAns !== null && String(userAns).trim() !== "";
        isCorrect = true;
      } else if (q.type === "MCQ") {
        if (typeof userAns === "string" && userAns.trim() !== "") {
          isAnswered = true;
          isCorrect = isSelectedAnswerCorrect(q, userAns);
        }
      } else if (q.type === "MSQ") {
        const arr = Array.isArray(userAns) ? userAns : [];
        if (arr.length > 0) {
          isAnswered = true;
          isCorrect = isSelectedAnswerCorrect(q, arr);
        }
      } else if (q.type === "NAT") {
        if (typeof userAns === "string" && userAns.trim() !== "") {
          isAnswered = true;
          const userNum = parseFloat(userAns.trim());

          // Check tolerance range if provided
          if (q.tolerance && (q.tolerance.min !== undefined || q.tolerance.lower !== undefined)) {
            const rMin = Number(q.tolerance.min ?? q.tolerance.lower);
            const rMax = Number(q.tolerance.max ?? q.tolerance.upper);
            if (!isNaN(rMin) && !isNaN(rMax) && !isNaN(userNum)) {
              isCorrect = userNum >= Math.min(rMin, rMax) && userNum <= Math.max(rMin, rMax);
            }
          } else {
            const targetNum = parseFloat(q.answer[0]?.trim() || "");
            const absTol = q.tolerance?.abs ?? 0.05;
            if (!isNaN(userNum) && !isNaN(targetNum)) {
              isCorrect = Math.abs(userNum - targetNum) <= absTol;
            } else {
              isCorrect = userAns.trim().toLowerCase() === q.answer[0]?.trim().toLowerCase();
            }
          }
        }
      }

      let marksAwarded = 0;
      if (q.type === "MTA") {
        correct++;
        marksAwarded = q.marks;
        score += q.marks;
      } else if (isAnswered) {
        if (isCorrect) {
          correct++;
          marksAwarded = q.marks;
          score += q.marks;
        } else {
          incorrect++;
          // Negative marking ONLY applies to MCQ questions in GATE
          if (q.type === "MCQ") {
            marksAwarded = -q.negativeMarks;
            score -= q.negativeMarks;
          } else {
            marksAwarded = 0;
          }
        }
      }

      return {
        ...q,
        userAnswer: userAns ?? null,
        isAnswered,
        isCorrect,
        marksAwarded,
      };
    });

    const unattempted = questions.length - correct - incorrect;

    const resultPayload = {
      testId,
      testTitle: testTitle || "GATE Test",
      testSubject: testSubject || "GATE Core",
      score: Number(score.toFixed(2)),
      totalMarks,
      correct,
      incorrect,
      unattempted,
      totalQuestions: questions.length,
      timeSpentSeconds: Math.max(0, totalDurationSeconds - timeLeft),
      answers,
      evaluated,
      submittedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("latestTestResult", JSON.stringify(resultPayload));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }

    router.push(`/test/${testId}/result`);
  }, [answers, questions, router, testId, testSubject, testTitle, timeLeft, totalDurationSeconds]);

  // Keep ref up to date in useEffect
  const handleSubmitRef = useRef(handleSubmit);
  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  }, [handleSubmit]);

  // Timer interval with stable ref
  useEffect(() => {
    if (loading) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading]);

  // Format timer
  const formattedTime = useMemo(() => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");

    if (hours > 0) {
      return `${hours}:${minutes}:${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }, [timeLeft]);

  // MCQ Selection Handler
  const handleSelectMCQ = (optionValue: string) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: optionValue,
    }));
  };

  // MSQ Selection Handler (Multiple checkboxes)
  const handleToggleMSQ = (optionValue: string) => {
    setAnswers((prev) => {
      const current = Array.isArray(prev[question.id])
        ? (prev[question.id] as string[])
        : [];
      if (current.includes(optionValue)) {
        return {
          ...prev,
          [question.id]: current.filter((opt) => opt !== optionValue),
        };
      } else {
        return {
          ...prev,
          [question.id]: [...current, optionValue],
        };
      }
    });
  };

  // NAT Input Handler
  const handleNATInput = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: value,
    }));
  };

  // Clear Response for current question
  const clearResponse = () => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[question.id];
      return next;
    });
  };

  // Mark for review toggle
  const toggleMark = () => {
    if (marked.includes(question.id)) {
      setMarked(marked.filter((id) => id !== question.id));
    } else {
      setMarked([...marked, question.id]);
    }
  };

  // Simple calculator functions
  const handleCalcBtn = (val: string) => {
    if (val === "C") setCalcInput("");
    else if (val === "DEL") setCalcInput((prev) => prev.slice(0, -1));
    else if (val === "=") {
      try {
        const sanitized = calcInput.replace(/[^0-9+\-*/().Mathsincostanlogeprt]/g, "");
        const res = Function(`"use strict"; return (${sanitized})`)();
        setCalcInput(String(Number(res.toFixed(6))));
      } catch {
        setCalcInput("Error");
      }
    } else {
      setCalcInput((prev) => prev + val);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#08090b] text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-blue-500 border-t-transparent mb-4" />
        <p className="text-base font-semibold">Loading Test Series...</p>
        <p className="text-xs text-gray-500 mt-1">CheckMate GATE Preparation Platform</p>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#08090b] p-6 text-white">
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-8 text-center max-w-md w-full">
          <p className="text-rose-400 font-semibold mb-2">Test Not Found</p>
          <p className="text-xs text-gray-400 mb-6">{error || "No questions found for this test."}</p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/gate/pyq"
              className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white transition hover:bg-blue-500"
            >
              Explore PYQs
            </Link>
            <Link
              href="/tests"
              className="rounded-xl border border-white/10 px-5 py-2 text-xs font-semibold text-gray-300 transition hover:bg-white/5"
            >
              GATE Hub
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#08090b] text-white flex flex-col justify-between">
      {/* Test Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#08090b]/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-7xl flex-col justify-center gap-2 px-4 py-2 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-0 md:px-8">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link href="/" className="shrink-0 text-lg font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090b]">
              CheckMate <span className="text-blue-500">GATE</span>
            </Link>
            <span className="hidden text-xs text-gray-500 sm:inline">|</span>
            <span className="min-w-0 truncate text-[11px] font-medium text-gray-300 sm:text-xs sm:max-w-[280px]">
              {testTitle || question.subject}
            </span>
          </div>

          {/* Virtual Calculator button & Timer */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 md:gap-4">
            <button
              onClick={() => setShowCalc(!showCalc)}
              aria-expanded={showCalc}
              aria-controls="quiz-calculator"
              className="min-h-10 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-gray-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090b]"
              title="Virtual Calculator"
            >
              🧮 Calculator
            </button>

            <div
              role="timer"
              aria-label={`Time remaining ${formattedTime}`}
              className={`rounded-xl border px-3.5 py-1.5 font-mono text-sm md:text-base font-bold transition ${
                timeLeft <= 300
                  ? "border-red-500/40 bg-red-500/10 text-red-300 animate-pulse"
                  : "border-white/10 bg-white/5 text-blue-300"
              }`}
            >
              ⏱ {formattedTime}
            </div>

            <button
              onClick={() => setShowSubmit(true)}
              className="min-h-10 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090b]"
            >
              Submit Test
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-4 p-3 md:grid-cols-[minmax(0,1fr)_320px] md:gap-6 md:p-6">
        {/* Left Question Box */}
        <section className="order-last flex min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] md:order-none">
          <div>
            {/* Question Top Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.01] p-4 md:p-5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="rounded-md bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-xs font-bold text-blue-400">
                  Q{currentQuestion + 1} of {questions.length}
                </span>

                <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-semibold uppercase text-gray-300">
                  {question.type}
                </span>

                <span className="text-xs text-emerald-400 font-medium">
                  +{question.marks} / -{question.type === "MCQ" ? question.negativeMarks : 0} Marks
                </span>

                {question.topic && (
                  <span className="text-[11px] text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    {question.topic}
                  </span>
                )}
              </div>

              <button
                onClick={toggleMark}
                aria-pressed={marked.includes(question.id)}
                className={`rounded-lg border px-3 py-1 text-xs font-medium transition ${
                  marked.includes(question.id)
                    ? "min-h-10 border-amber-500/50 bg-amber-500/15 text-amber-200"
                    : "min-h-10 border-white/10 text-gray-300 hover:bg-white/5 hover:text-white"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101113]`}
              >
                {marked.includes(question.id) ? "★ Marked for Review" : "☆ Mark for Review"}
              </button>
            </div>

            {/* Question Body */}
            <div className="p-5 md:p-8">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-blue-400">
                {question.subject}
              </div>

              {/* Formatted Question Text / Math */}
              <div className="text-base leading-relaxed md:text-lg text-zinc-100 font-normal">
                <MathContent content={question.question} />
              </div>

              {/* RENDER BY TYPE: MCQ, MSQ, NAT */}
              <div className="mt-8">
                {/* 1. MCQ (Single Selection) */}
                {question.type === "MCQ" && (
                  <div className="space-y-3">
                    {(question.structuredOptions && question.structuredOptions.length > 0
                      ? question.structuredOptions
                      : question.options.map((opt, i) => ({
                          label: String.fromCharCode(65 + i),
                          text: opt,
                          html: opt,
                        }))
                    ).map((opt) => {
                      const isSelected =
                        answers[question.id] === opt.label ||
                        answers[question.id] === opt.text;
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => handleSelectMCQ(opt.label)}
                          aria-pressed={isSelected}
                          className={`flex min-h-14 w-full items-start gap-4 rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101113] ${
                            isSelected
                              ? "border-blue-400 bg-blue-500/20 text-white ring-1 ring-inset ring-blue-300/50"
                              : "border-white/10 bg-white/[0.02] text-gray-300 hover:border-white/20 hover:bg-white/[0.04]"
                          }`}
                        >
                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold mt-0.5 ${
                              isSelected
                                ? "border-blue-500 bg-blue-500 text-white"
                                : "border-white/20 text-gray-400"
                            }`}
                          >
                            {opt.label}
                          </span>
                          <div className="text-sm md:text-base flex-1">
                            <MathContent content={opt.html || opt.text} inline />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 2. MSQ (Multiple Choice / Multiple Select) */}
                {question.type === "MSQ" && (
                  <div>
                    <p className="mb-3 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-lg">
                      ℹ <strong>GATE MSQ Rule:</strong> One or more options can be correct. Full marks for exact combination. No negative marking.
                    </p>
                    <div className="space-y-3">
                      {(question.structuredOptions && question.structuredOptions.length > 0
                        ? question.structuredOptions
                        : question.options.map((opt, i) => ({
                            label: String.fromCharCode(65 + i),
                            text: opt,
                            html: opt,
                          }))
                      ).map((opt) => {
                        const currentArr = Array.isArray(answers[question.id])
                          ? (answers[question.id] as string[])
                          : [];
                        const isSelected =
                          currentArr.includes(opt.label) ||
                          currentArr.includes(opt.text);
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => handleToggleMSQ(opt.label)}
                              aria-pressed={isSelected}
                              className={`flex min-h-14 w-full items-start gap-4 rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101113] ${
                                isSelected
                                  ? "border-blue-400 bg-blue-500/20 text-white ring-1 ring-inset ring-blue-300/50"
                                  : "border-white/10 bg-white/[0.02] text-gray-300 hover:border-white/20 hover:bg-white/[0.04]"
                              }`}
                          >
                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border text-xs font-bold mt-0.5 ${
                                isSelected
                                  ? "border-blue-500 bg-blue-500 text-white"
                                  : "border-white/20 text-gray-400"
                              }`}
                            >
                              {isSelected ? "✓" : opt.label}
                            </span>
                            <div className="text-sm md:text-base flex-1">
                              <MathContent content={opt.html || opt.text} inline />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. NAT (Numerical Answer Type) */}
                {question.type === "NAT" && (
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 max-w-lg">
                    <p className="mb-2 text-xs text-blue-400 font-semibold">
                      Numerical Answer Type (NAT)
                    </p>
                    <p className="mb-4 text-xs text-gray-400">
                      Enter the numerical value. No negative marks for NAT in GATE.
                    </p>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        step="any"
                        placeholder="Enter numerical answer..."
                        value={(answers[question.id] as string) || ""}
                        onChange={(e) => handleNATInput(e.target.value)}
                        className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-base font-mono text-white outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                      />
                      <button
                        type="button"
                        onClick={clearResponse}
                        className="min-h-12 shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101113]"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}

                {/* 4. MTA (Marks To All) */}
                {question.type === "MTA" && (
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                    <p className="text-xs font-bold text-emerald-400 uppercase">
                      Official GATE Marks-To-All (MTA)
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
                      This question was awarded marks to all candidates in the official GATE answer key.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Question Bottom Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-white/[0.01] p-4 md:p-5">
            <div className="flex items-center gap-3">
              <button
                onClick={clearResponse}
                className="min-h-11 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101113]"
              >
                Clear Response
              </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
                className="min-h-11 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101113] disabled:cursor-not-allowed disabled:opacity-40 sm:px-5"
              >
                ← Previous
              </button>

              <button
                onClick={nextQuestion}
                disabled={currentQuestion === questions.length - 1}
                className="min-h-11 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101113] disabled:cursor-not-allowed disabled:opacity-40 sm:px-6"
              >
                Next →
              </button>
            </div>
          </div>
        </section>

        {/* Right Side: Question Navigation Palette */}
        <aside className="order-first flex min-w-0 flex-col gap-4 md:sticky md:top-20 md:order-none md:self-start">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">
              Question Palette ({questions.length})
            </h3>

            {/* Status Legend */}
            <div className="mb-4 grid grid-cols-2 gap-2 text-[11px] text-gray-400 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-amber-500" />
                <span>Marked</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-white/20" />
                <span>Not Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-500 ring-2 ring-white/50" />
                <span>Current</span>
              </div>
            </div>

            {/* Grid Palette */}
            <div className="grid max-h-48 grid-cols-6 gap-2 overflow-y-auto pr-1 sm:grid-cols-8 md:max-h-[380px] md:grid-cols-5">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentQuestion;
                const isAnswered =
                  answers[q.id] !== undefined &&
                  (Array.isArray(answers[q.id])
                    ? (answers[q.id] as string[]).length > 0
                    : String(answers[q.id]).trim() !== "");
                const isMarked = marked.includes(q.id);
                const isVisited = visited.includes(q.id) || isCurrent;

                let bgClass = "bg-white/5 text-gray-300 border-dashed border-white/20";
                if (isCurrent) {
                  bgClass = "bg-blue-600 text-white font-bold border-double border-white ring-2 ring-blue-400";
                } else if (isMarked) {
                  bgClass = "bg-amber-300 text-black font-bold border-amber-100 rounded-full";
                } else if (isAnswered) {
                  bgClass = "bg-emerald-700 text-white font-bold border-emerald-300";
                } else if (isVisited) {
                  bgClass = "bg-white/15 text-gray-200 border-white/20";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(idx)}
                    type="button"
                    aria-current={isCurrent ? "step" : undefined}
                    aria-label={`Question ${idx + 1}${isCurrent ? ", current" : isMarked ? ", marked for review" : isAnswered ? ", answered" : isVisited ? ", visited" : ", not visited"}`}
                    className={`flex h-10 w-full items-center justify-center rounded-lg border text-xs transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101113] ${bgClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Test Overview Summary Card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Section Statistics
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-400">Total Questions</span>
                <span className="font-semibold text-white">{questions.length}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-400">Attempted</span>
                <span className="font-semibold text-emerald-400">
                  {Object.keys(answers).filter((k) => {
                    const ans = answers[k];
                    return Array.isArray(ans) ? ans.length > 0 : String(ans).trim() !== "";
                  }).length}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-gray-400">Marked for Review</span>
                <span className="font-semibold text-amber-400">{marked.length}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-400">Time Left</span>
                <span className="font-semibold text-blue-400 font-mono">{formattedTime}</span>
              </div>
            </div>

            <button
              onClick={() => setShowSubmit(true)}
              className="mt-5 w-full rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
            >
              Submit Test Series
            </button>
          </div>
        </aside>
      </div>

      {/* Floating Scientific Calculator Modal */}
      {showCalc && (
        <div
          id="quiz-calculator"
          role="dialog"
          aria-modal="true"
          aria-label="Virtual Calculator"
          className="fixed inset-x-3 bottom-3 z-50 max-h-[min(75vh,32rem)] overflow-y-auto rounded-2xl border border-white/20 bg-[#12141a]/[0.98] p-4 shadow-2xl backdrop-blur-md sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-72"
        >
          <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Virtual Calculator
            </span>
            <button
              onClick={() => setShowCalc(false)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              ✕
            </button>
          </div>
          <div className="mb-3 rounded-lg border border-white/10 bg-black/50 p-2.5 text-right font-mono text-lg text-emerald-400">
            {calcInput || "0"}
          </div>
          <div className="grid grid-cols-4 gap-1.5 text-xs font-semibold">
            {["C", "DEL", "(", ")", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "=", "+"].map(
              (btn) => (
                <button
                  key={btn}
                  onClick={() => handleCalcBtn(btn)}
                  className={`min-h-11 rounded-lg p-2.5 transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-1 focus-visible:ring-offset-[#12141a] ${
                    btn === "="
                      ? "col-span-1 bg-blue-600 text-white hover:bg-blue-500"
                      : btn === "C" || btn === "DEL"
                      ? "bg-rose-500/20 text-rose-300 hover:bg-rose-500/30"
                      : "border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10"
                  }`}
                >
                  {btn}
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* Submit Confirmation Modal */}
      {showSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div role="dialog" aria-modal="true" aria-labelledby="submit-dialog-title" className="w-full max-w-md rounded-2xl border border-white/20 bg-[#0d0f14] p-6 shadow-2xl">
            <h3 id="submit-dialog-title" className="text-lg font-bold text-white">Submit GATE Test?</h3>
            <p className="mt-2 text-xs text-gray-400 leading-relaxed">
              Are you sure you want to end this test? You will receive instant GATE-standard analysis, marks breakdown, and solutions.
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center text-xs">
              <div>
                <p className="text-gray-500">Attempted</p>
                <p className="font-bold text-emerald-400">
                  {Object.keys(answers).filter((k) => {
                    const ans = answers[k];
                    return Array.isArray(ans) ? ans.length > 0 : String(ans).trim() !== "";
                  }).length}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Marked</p>
                <p className="font-bold text-amber-400">{marked.length}</p>
              </div>
              <div>
                <p className="text-gray-500">Unattempted</p>
                <p className="font-bold text-gray-300">
                  {questions.length -
                    Object.keys(answers).filter((k) => {
                      const ans = answers[k];
                      return Array.isArray(ans) ? ans.length > 0 : String(ans).trim() !== "";
                    }).length}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowSubmit(false)}
                className="min-h-11 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-300 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0f14]"
              >
                Continue Test
              </button>
              <button
                onClick={handleSubmit}
                className="min-h-11 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0f14]"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
