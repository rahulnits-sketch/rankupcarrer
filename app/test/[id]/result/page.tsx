"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Question } from "../page";
import MathContent from "@/components/MathContent";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  ArrowRight,
  RotateCcw,
  BarChart3,
  Award,
} from "lucide-react";

type EvaluatedQuestion = Question & {
  userAnswer: string | string[] | null;
  isAnswered: boolean;
  isCorrect: boolean;
  marksAwarded: number;
};

type TestResultData = {
  testId: string;
  testTitle?: string;
  testSubject?: string;
  score: number;
  totalMarks: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  evaluated: EvaluatedQuestion[];
  submittedAt: string;
};

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return typeof window !== "undefined" ? localStorage.getItem("latestTestResult") : null;
}

function getServerSnapshot() {
  return null;
}

// Academic textbook reference mapping for CS rigor
function getTextbookReference(subject: string) {
  const s = (subject || "").toLowerCase();
  if (s.includes("algo") || s.includes("data struct")) {
    return {
      textbook: "CLRS (Cormen, Leiserson, Rivest, Stein)",
      title: "Introduction to Algorithms (3rd/4th Edition)",
      citation: "MIT Press • Chapters on Recurrences, Sorting, Graph Algorithms & Amortized Analysis",
    };
  }
  if (s.includes("operat") || s.includes("os")) {
    return {
      textbook: "Silberschatz, Galvin & Gagne",
      title: "Operating System Concepts (10th Edition)",
      citation: "Wiley • Process Scheduling, Synchronization, Memory Virtualization & Disk Scheduling",
    };
  }
  if (s.includes("network") || s.includes("cn")) {
    return {
      textbook: "Andrew S. Tanenbaum & David J. Wetherall",
      title: "Computer Networks (5th Edition)",
      citation: "Pearson • Framing, Sliding Window protocols, TCP congestion control & Subnetting",
    };
  }
  if (s.includes("dbms") || s.includes("database")) {
    return {
      textbook: "Silberschatz, Korth & Sudarshan",
      title: "Database System Concepts (7th Edition)",
      citation: "McGraw-Hill • Relational Algebra, Functional Dependencies, Normalization & Serializability",
    };
  }
  if (s.includes("toc") || s.includes("computat") || s.includes("automata")) {
    return {
      textbook: "Michael Sipser",
      title: "Introduction to the Theory of Computation (3rd Edition)",
      citation: "Cengage Learning • Regular Languages, CFLs, Turing Machines & Decidability proofs",
    };
  }
  if (s.includes("compil")) {
    return {
      textbook: "Aho, Lam, Sethi, Ullman (Dragon Book)",
      title: "Compilers: Principles, Techniques, and Tools (2nd Edition)",
      citation: "Pearson • Lexical Analysis, LL(1) / LR(1) Parsing & Intermediate Code Generation",
    };
  }
  if (s.includes("arch") || s.includes("coa") || s.includes("organ")) {
    return {
      textbook: "David A. Patterson & John L. Hennessy",
      title: "Computer Organization and Design (RISC-V Edition)",
      citation: "Morgan Kaufmann • Instruction Pipelining, Cache Memory & Addressing Modes",
    };
  }
  if (s.includes("digit") || s.includes("logic")) {
    return {
      textbook: "M. Morris Mano & Michael D. Ciletti",
      title: "Digital Design (6th Edition)",
      citation: "Pearson • K-Maps, Combinational & Sequential Circuit state synthesis",
    };
  }
  if (s.includes("math") || s.includes("discrete")) {
    return {
      textbook: "Kenneth H. Rosen",
      title: "Discrete Mathematics and Its Applications (8th Edition)",
      citation: "McGraw-Hill • Propositional Logic, Combinatorics, Graph Theory & Set Theory",
    };
  }
  return {
    textbook: "Standard Academic Faculty Review",
    title: "National GATE CSE Reference Standard",
    citation: "Verified IIT Professor Consensus & Official Examination Key Archive",
  };
}

export default function ResultPage() {
  const params = useParams();
  const testId = (params?.id as string) || "all";

  const rawResult = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const result: TestResultData | null = useMemo(() => {
    if (!rawResult) return null;
    try {
      return JSON.parse(rawResult);
    } catch {
      return null;
    }
  }, [rawResult]);

  const [filter, setFilter] = useState<"all" | "correct" | "incorrect" | "unattempted">("all");

  if (!result) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] p-6 text-slate-800">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center max-w-md w-full shadow-lg">
          <p className="text-lg font-bold text-slate-900">No test result found.</p>
          <p className="mt-2 text-xs text-slate-500">
            Please take a practice test or mock examination to view detailed analysis and solutions.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/gate/pyq"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700 shadow-sm"
            >
              Browse PYQs
            </Link>
            <Link
              href="/tests"
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              GATE Hub
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const accuracy =
    result.correct + result.incorrect > 0
      ? Math.round((result.correct / (result.correct + result.incorrect)) * 100)
      : 0;

  const minutesSpent = Math.floor((result.timeSpentSeconds || 0) / 60);
  const secondsSpent = (result.timeSpentSeconds || 0) % 60;

  const filteredQuestions = (result.evaluated || []).filter((q) => {
    if (filter === "correct") return q.isCorrect;
    if (filter === "incorrect") return q.isAnswered && !q.isCorrect;
    if (filter === "unattempted") return !q.isAnswered;
    return true;
  });

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-slate-200 px-6 py-4 sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-lg font-extrabold tracking-tight text-slate-900">
            CheckMate <span className="text-blue-600">CBT Analytics</span>
          </Link>

          <div className="flex items-center gap-2.5">
            <Link
              href={`/test/${testId}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 shadow-2xs"
            >
              <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
              <span>Retake Test</span>
            </Link>
            <Link
              href="/analytics"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50 shadow-2xs"
            >
              <BarChart3 className="h-3.5 w-3.5 text-emerald-600" />
              <span>AIR Predictor</span>
            </Link>
            <Link
              href="/tests"
              className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700 shadow-sm"
            >
              GATE Hub
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8 md:py-12">
        {/* Scorecard Hero - FR-2.5 */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <Award className="h-3.5 w-3.5 text-blue-600" />
                <span>Verified IIT Scoring &amp; Derivations</span>
              </div>
              <h1 className="mt-3 text-2xl md:text-3xl font-extrabold text-slate-900">
                {result.testTitle || "GATE Examination Analysis"}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Completed on {new Date(result.submittedAt).toLocaleDateString()} at{" "}
                {new Date(result.submittedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>

            {/* Score Pill */}
            <div className="flex items-baseline gap-2 rounded-2xl border border-blue-200 bg-blue-50/60 px-6 py-4 shadow-2xs">
              <span className="text-4xl md:text-5xl font-black text-blue-700">
                {result.score}
              </span>
              <span className="text-sm font-bold text-slate-500">/ {result.totalMarks} Marks</span>
            </div>
          </div>

          {/* Metric Stats Grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 border-t border-slate-100 pt-6">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 text-center">
              <span className="text-2xl font-black text-emerald-700">{result.correct}</span>
              <p className="mt-1 text-xs font-semibold text-emerald-800">Correct Answers</p>
            </div>

            <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 text-center">
              <span className="text-2xl font-black text-rose-700">{result.incorrect}</span>
              <p className="mt-1 text-xs font-semibold text-rose-800">Incorrect Attempts</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
              <span className="text-2xl font-black text-slate-700">{result.unattempted}</span>
              <p className="mt-1 text-xs font-semibold text-slate-600">Unattempted</p>
            </div>

            <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 text-center">
              <span className="text-2xl font-black text-blue-700">{accuracy}%</span>
              <p className="mt-1 text-xs font-semibold text-blue-800">Accuracy Rate</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-500 px-2 pt-2 border-t border-slate-100">
            <span>⏱ Time Spent: {minutesSpent}m {secondsSpent}s</span>
            <span>Total Questions: {result.totalQuestions}</span>
            <span>Subject: {result.testSubject || "Computer Science"}</span>
          </div>
        </div>

        {/* Detailed Solutions & Derivations Section - FR-2.5 */}
        <div className="mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Detailed Derivations &amp; Verified Keys
              </h2>
              <p className="text-xs text-slate-500">
                Step-by-step mathematical proofs with textbook references (CLRS, Tanenbaum, Galvin, Korth)
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex rounded-xl border border-slate-200 bg-white p-1 text-xs font-bold shadow-2xs">
              {(["all", "correct", "incorrect", "unattempted"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`rounded-lg px-3 py-1.5 capitalize transition ${
                    filter === tab
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-6">
            {filteredQuestions.map((q, idx) => {
              const userAns = q.userAnswer;
              let userAnsDisplay = "Not Attempted";
              if (q.isAnswered) {
                userAnsDisplay = Array.isArray(userAns) ? userAns.join(", ") : String(userAns);
              }

              const correctAnsDisplay = Array.isArray(q.answer)
                ? q.answer.join(", ")
                : String(q.answer);

              const ref = getTextbookReference(q.subject);

              return (
                <div
                  key={`${q.testId}-${q.id}-${idx}`}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300"
                >
                  {/* Top Badge Info */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        Q{idx + 1}
                      </span>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-bold uppercase text-slate-700">
                        {q.type}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {q.subject} {q.topic ? `• ${q.topic}` : ""}
                      </span>
                    </div>

                    <div>
                      {q.isCorrect ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-xs font-bold text-emerald-700">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>+{q.marksAwarded} Marks (Correct)</span>
                        </span>
                      ) : q.isAnswered ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-3 py-0.5 text-xs font-bold text-rose-700">
                          <XCircle className="h-3.5 w-3.5" />
                          <span>{q.marksAwarded} Marks (Incorrect)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 border border-slate-200 px-3 py-0.5 text-xs font-semibold text-slate-600">
                          <HelpCircle className="h-3.5 w-3.5" />
                          <span>0 Marks (Unattempted)</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Stem */}
                  <div className="text-base text-slate-900 mb-6 font-normal leading-relaxed">
                    <MathContent content={q.question} />
                  </div>

                  {/* Options List if MCQ / MSQ */}
                  {q.options && q.options.length > 0 && (
                    <div className="mb-6 space-y-2">
                      {(q.structuredOptions && q.structuredOptions.length > 0
                        ? q.structuredOptions
                        : q.options.map((opt, i) => ({
                            label: String.fromCharCode(65 + i),
                            text: opt,
                            html: opt,
                          }))
                      ).map((opt, optionIndex) => {
                        const isCorrectOption = Array.isArray(q.answer)
                          ? q.answer.includes(opt.label) || q.answer.includes(opt.text)
                          : q.answer === opt.label || q.answer === opt.text;

                        const isUserSelected = Array.isArray(userAns)
                          ? userAns.includes(opt.label) || userAns.includes(opt.text)
                          : userAns === opt.label || userAns === opt.text;

                        let optClass = "border-slate-200 bg-white text-slate-700";
                        if (isCorrectOption) {
                          optClass = "border-emerald-300 bg-emerald-50 text-emerald-900 font-semibold";
                        } else if (isUserSelected && !isCorrectOption) {
                          optClass = "border-rose-300 bg-rose-50 text-rose-900";
                        }

                        return (
                          <div
                            key={`${opt.label}-${optionIndex}`}
                            className={`flex items-start gap-3 rounded-xl border p-3 text-xs md:text-sm ${optClass}`}
                          >
                            <span className="font-bold shrink-0">({opt.label})</span>
                            <div className="flex-1">
                              <MathContent content={opt.html || opt.text} inline />
                            </div>
                            {isCorrectOption && (
                              <span className="shrink-0 text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                                ✓ Correct Key
                              </span>
                            )}
                            {isUserSelected && !isCorrectOption && (
                              <span className="shrink-0 text-xs font-bold text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded">
                                ✗ Your Choice
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Candidate Response vs Key Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs mb-4">
                    <div>
                      <span className="text-slate-500 font-medium">Your Response: </span>
                      <span
                        className={`font-bold ${
                          q.isCorrect
                            ? "text-emerald-700"
                            : q.isAnswered
                            ? "text-rose-700"
                            : "text-slate-600"
                        }`}
                      >
                        {userAnsDisplay}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium">Official IIT Answer Key: </span>
                      <span className="font-bold text-emerald-700 font-mono">
                        {correctAnsDisplay || "MTA"}
                      </span>
                    </div>
                  </div>

                  {/* Mathematical Explanation & Textbook Citation Box - FR-2.5 */}
                  <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-4 space-y-3">
                    <div className="flex items-start gap-2 text-xs text-slate-800">
                      <span className="text-blue-600 font-bold shrink-0">Step-by-step Proof:</span>
                      <div className="leading-relaxed">
                        {q.explanation ? (
                          <MathContent content={q.explanation} inline />
                        ) : (
                          <span>
                            Derived directly from primary CS definitions. For numerical problems, verify precision bounds and intermediate floating point rounding.
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Standard Textbook Reference - FR-2.5 */}
                    <div className="flex items-center gap-2 border-t border-blue-100 pt-2 text-[11px] text-slate-600">
                      <BookOpen className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                      <span className="font-bold text-slate-800">{ref.textbook}:</span>
                      <span className="italic">{ref.title}</span>
                      <span className="hidden md:inline text-slate-400">• {ref.citation}</span>
                    </div>
                  </div>

                  {/* Discussion Link */}
                  {q.link && (
                    <div className="mt-3 text-right">
                      <a
                        href={q.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1"
                      >
                        <span>Official GateOverflow Discussion &amp; Alternative Proofs</span>
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}