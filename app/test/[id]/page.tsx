"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import questionData from "@/data/questions.json";
import { getGateQuestionsForTest } from "@/lib/gate";
import MathContent from "@/components/MathContent";
import GateScientificCalculator from "@/components/cbt/GateScientificCalculator";
import QuestionPaperModal from "@/components/cbt/QuestionPaperModal";
import {
  Calculator,
  FileText,
  AlertTriangle,
  User,
  Target,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookmarkCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";

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

  // Dynamic test duration in seconds (default 180 mins for Full GATE Mocks)
  const [totalDurationSeconds, setTotalDurationSeconds] = useState(180 * 60);
  const [timeLeft, setTimeLeft] = useState(180 * 60);

  // Active section tab in examination: "all" | "ga" | "cs"
  const [activeSection, setActiveSection] = useState<"all" | "ga" | "cs">("all");

  useEffect(() => {
    let isMounted = true;

    async function loadTest() {
      setLoading(true);
      setError(null);

      // 1. GATE Dataset Test (PYQ, Subject-wise, or Mock)
      if (testId.startsWith("gate-")) {
        try {
          let gateData: {
            title: string;
            subject: string;
            durationMinutes: number;
            questions: any[];
          } | null = null;

          try {
            const apiRes = await fetch(`/api/gate/test/${encodeURIComponent(testId)}`);
            if (apiRes.ok) {
              gateData = await apiRes.json();
            }
          } catch (apiErr) {
            console.warn("API route failed, falling back to module loader:", apiErr);
          }

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
                negativeMarks: q.negativeMarks ?? (q.type === "MCQ" ? (q.marks === 2 ? 0.66 : 0.33) : 0),
                explanation: q.explanation,
                link: q.link,
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

      // 2. Fallback Static Tests from questions.json
      const list = questionData as Question[];
      if (testId === "all") {
        setLoadedQuestions(list);
        setTestTitle("Full GATE Practice Test");
        setTestSubject("Computer Science & IT");
        setTotalDurationSeconds(180 * 60);
        setTimeLeft(180 * 60);
      } else {
        const filtered = list.filter((q) => q.testId === testId);
        const qList = filtered.length > 0 ? filtered : list;
        setLoadedQuestions(qList);
        setTestTitle(qList[0]?.subject ? `${qList[0].subject} Examination` : "GATE Practice Test");
        setTestSubject(qList[0]?.subject || "Computer Science");
        const dur = Math.max(30, qList.length * 2.5) * 60;
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

  // Modals state
  const [showSubmit, setShowSubmit] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  const [showQuestionPaper, setShowQuestionPaper] = useState(false);

  const question = questions[currentQuestion] || questions[0];

  // Initialize visited on start
  useEffect(() => {
    if (questions[0] && visited.length === 0) {
      setVisited([questions[0].id]);
    }
  }, [questions, visited.length]);

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

  // TCS iON Action: "Save & Next"
  const handleSaveAndNext = () => {
    nextQuestion();
  };

  // TCS iON Action: "Mark for Review & Next"
  const handleMarkAndNext = () => {
    if (!marked.includes(question.id)) {
      setMarked((prev) => [...prev, question.id]);
    }
    nextQuestion();
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
          // Negative marking ONLY applies to MCQ questions in GATE (+1/-0.33 or +2/-0.66)
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
      testSubject: testSubject || "Computer Science",
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

  const handleSubmitRef = useRef(handleSubmit);
  useEffect(() => {
    handleSubmitRef.current = handleSubmit;
  }, [handleSubmit]);

  // Timer interval with warnings
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

  // MSQ Selection Handler
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

  // Palette filtering: General Aptitude (0-9) vs Core CSE (10+)
  const displayedQuestionIndices = useMemo(() => {
    return questions
      .map((_, idx) => idx)
      .filter((idx) => {
        if (activeSection === "ga") return idx < 10;
        if (activeSection === "cs") return idx >= 10;
        return true;
      });
  }, [questions, activeSection]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] text-slate-800">
        <div className="h-12 w-12 animate-spin rounded-full border-3 border-blue-600 border-t-transparent mb-4" />
        <p className="text-base font-bold text-slate-900">Loading GATE CBT Simulation...</p>
        <p className="text-xs text-slate-500 mt-1">Calibrating TCS iON question matrix &amp; verified keys</p>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] p-6 text-slate-800">
        <div className="rounded-3xl border border-rose-200 bg-white p-8 text-center max-w-md w-full shadow-lg">
          <p className="text-rose-600 font-bold mb-2">Examination Set Not Found</p>
          <p className="text-xs text-slate-500 mb-6">{error || "No questions found for this test."}</p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/gate/pyq"
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700 shadow-sm"
            >
              Explore PYQs
            </Link>
            <Link
              href="/tests"
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              GATE Hub
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Question palette counts
  const answeredCount = Object.keys(answers).filter((k) => {
    const a = answers[k];
    return Array.isArray(a) ? a.length > 0 : String(a).trim() !== "";
  }).length;

  const markedCount = marked.length;
  const answeredAndMarkedCount = marked.filter((id) => {
    const a = answers[id];
    return Array.isArray(a) ? a.length > 0 : a !== undefined && String(a).trim() !== "";
  }).length;

  const notAnsweredCount = visited.filter((id) => {
    const a = answers[id];
    const isAns = Array.isArray(a) ? a.length > 0 : a !== undefined && String(a).trim() !== "";
    return !isAns && !marked.includes(id);
  }).length;

  const notVisitedCount = questions.length - visited.length;

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Official TCS iON Examination Header - FR-2.1 */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-xs">
        {/* Top Info Bar */}
        <div className="mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 px-4 py-2.5 md:px-8 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="shrink-0 text-base font-extrabold tracking-tight text-slate-900"
            >
              RankUp Career <span className="text-blue-600">CBT</span>
            </Link>
            <span className="text-slate-300">|</span>
            <span className="truncate text-xs font-bold text-slate-800 max-w-[280px] sm:max-w-md">
              {testTitle || "GATE Computer Science & IT Examination"}
            </span>
          </div>

          {/* Candidate Profile Box with Goal Target - FR-2.1 */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-[11px]">
              <User className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <span className="font-bold text-slate-900 block">Candidate: Rahul Kumar</span>
              <span className="text-[11px] text-slate-500 font-mono">Roll: CS26S12948</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 border-l border-slate-200 pl-3 ml-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold text-[11px]">
              <Target className="h-3.5 w-3.5" />
              <span>Goal: AIR ≤ 100 (IIT-B / IISc)</span>
            </div>
          </div>
        </div>

        {/* Action Controls & Countdown Clock Bar */}
        <div className="mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-2 md:px-8 bg-slate-50/70">
          {/* Section Selector Badges */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-slate-500 hidden sm:inline">Sections:</span>
            <button
              onClick={() => setActiveSection("all")}
              className={`rounded-lg px-3 py-1.5 transition ${
                activeSection === "all"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              All ({questions.length})
            </button>
            <button
              onClick={() => setActiveSection("ga")}
              className={`rounded-lg px-3 py-1.5 transition ${
                activeSection === "ga"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              General Aptitude (Q1–Q10)
            </button>
            <button
              onClick={() => setActiveSection("cs")}
              className={`rounded-lg px-3 py-1.5 transition ${
                activeSection === "cs"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              Core CSE (Q11–Q65)
            </button>
          </div>

          {/* Integrated Tools & Countdown Timer - FR-2.1 & FR-2.5 */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowQuestionPaper(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition shadow-2xs"
            >
              <FileText className="h-3.5 w-3.5 text-blue-600" />
              <span>Question Paper</span>
            </button>

            <button
              onClick={() => setShowCalc(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition shadow-2xs"
            >
              <Calculator className="h-3.5 w-3.5 text-blue-600" />
              <span>Virtual Calculator</span>
            </button>

            {/* Countdown Clock with 15-min and 5-min Warnings */}
            <div
              role="timer"
              aria-label={`Time remaining ${formattedTime}`}
              className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-1.5 font-mono text-sm md:text-base font-bold shadow-2xs transition ${
                timeLeft <= 300
                  ? "border-rose-400 bg-rose-50 text-rose-700 animate-pulse"
                  : timeLeft <= 900
                  ? "border-amber-400 bg-amber-50 text-amber-800"
                  : "border-blue-200 bg-blue-50 text-blue-800"
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>{formattedTime}</span>
            </div>

            <button
              onClick={() => setShowSubmit(true)}
              className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm shadow-blue-500/20 transition hover:bg-blue-700"
            >
              Submit Exam
            </button>
          </div>
        </div>

        {/* Warning banner at 15 mins and 5 mins */}
        {timeLeft <= 900 && (
          <div
            className={`px-4 py-1.5 text-center text-xs font-bold flex items-center justify-center gap-2 ${
              timeLeft <= 300
                ? "bg-rose-600 text-white animate-pulse"
                : "bg-amber-100 text-amber-900 border-b border-amber-200"
            }`}
          >
            <AlertTriangle className="h-4 w-4" />
            <span>
              {timeLeft <= 300
                ? "URGENT WARNING: Less than 5 minutes remaining! Review your responses before auto-submission."
                : "Notice: 15 minutes remaining. Begin reviewing marked questions."}
            </span>
          </div>
        )}
      </header>

      {/* Main Examination Two-Pane Grid */}
      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-4 p-3 md:grid-cols-[minmax(0,1fr)_330px] md:gap-6 md:p-6">
        {/* Left Problem Solving Box */}
        <section className="flex min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div>
            {/* Question Top Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/70 p-4 md:p-5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-bold text-white shadow-2xs">
                  Question {currentQuestion + 1} of {questions.length}
                </span>

                <span className="rounded-md border border-slate-300 bg-white px-2 py-0.5 text-xs font-bold uppercase text-slate-700">
                  {question.type}
                </span>

                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  +{question.marks}.00 / -{question.type === "MCQ" ? question.negativeMarks.toFixed(2) : "0.00"} Marks
                </span>

                {question.subject && (
                  <span className="text-[11px] text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">
                    {question.subject}
                  </span>
                )}
              </div>

              <button
                onClick={toggleMark}
                aria-pressed={marked.includes(question.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                  marked.includes(question.id)
                    ? "border-purple-400 bg-purple-50 text-purple-700"
                    : "border-slate-300 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <BookmarkCheck className="h-3.5 w-3.5" />
                <span>{marked.includes(question.id) ? "Marked for Review" : "Mark for Review"}</span>
              </button>
            </div>

            {/* Question Body */}
            <div className="p-5 md:p-8">
              {/* Question Text with MathJax / KaTeX rendering */}
              <div className="text-base leading-relaxed text-slate-900 md:text-lg font-normal">
                <MathContent content={question.question} />
              </div>

              {/* RENDER BY TYPE: MCQ, MSQ, NAT - FR-2.2 */}
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
                          className={`flex min-h-14 w-full items-start gap-4 rounded-xl border p-4 text-left transition ${
                            isSelected
                              ? "border-blue-600 bg-blue-50/70 text-slate-900 ring-2 ring-blue-500/30"
                              : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold mt-0.5 ${
                              isSelected
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-slate-300 bg-slate-100 text-slate-600"
                            }`}
                          >
                            {opt.label}
                          </span>
                          <div className="text-sm md:text-base flex-1 pt-0.5">
                            <MathContent content={opt.html || opt.text} inline />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 2. MSQ (Multiple Select Question) */}
                {question.type === "MSQ" && (
                  <div>
                    <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">
                      <strong>GATE MSQ Rule:</strong> One or more choices can be correct. Full marks for the exact set of correct options. Zero negative marks and no partial marking.
                    </div>
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
                            className={`flex min-h-14 w-full items-start gap-4 rounded-xl border p-4 text-left transition ${
                              isSelected
                                ? "border-blue-600 bg-blue-50/70 text-slate-900 ring-2 ring-blue-500/30"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-xs font-bold mt-0.5 ${
                                isSelected
                                  ? "border-blue-600 bg-blue-600 text-white"
                                  : "border-slate-300 bg-slate-100 text-slate-600"
                              }`}
                            >
                              {isSelected ? "✓" : opt.label}
                            </span>
                            <div className="text-sm md:text-base flex-1 pt-0.5">
                              <MathContent content={opt.html || opt.text} inline />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. NAT (Numerical Answer Type) with Virtual On-Screen Keypad */}
                {question.type === "NAT" && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 max-w-lg">
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                      Numerical Answer Type (NAT)
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      Use the on-screen keypad or your keyboard. Precision tolerance is applied. Zero negative marks.
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <input
                        type="text"
                        placeholder="Enter numerical answer..."
                        value={(answers[question.id] as string) || ""}
                        onChange={(e) => handleNATInput(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-mono text-lg font-bold text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 shadow-xs"
                      />
                      <button
                        type="button"
                        onClick={clearResponse}
                        className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-100 transition shadow-xs"
                      >
                        Clear
                      </button>
                    </div>

                    {/* Virtual On-Screen Numeric Keypad for NAT */}
                    <div className="mt-4 border-t border-slate-200 pt-3">
                      <p className="text-[11px] font-bold text-slate-500 mb-2 uppercase">
                        Virtual On-Screen Numeric Keypad
                      </p>
                      <div className="grid grid-cols-4 gap-1.5 font-mono text-sm font-bold">
                        {["7", "8", "9", "⌫", "4", "5", "6", "-", "1", "2", "3", ".", "0", "00", "Clear"].map(
                          (key) => (
                            <button
                              key={key}
                              type="button"
                              onClick={() => {
                                const current = (answers[question.id] as string) || "";
                                if (key === "Clear") {
                                  clearResponse();
                                } else if (key === "⌫") {
                                  handleNATInput(current.slice(0, -1));
                                } else if (key === "-") {
                                  if (!current.startsWith("-")) handleNATInput("-" + current);
                                  else handleNATInput(current.slice(1));
                                } else {
                                  handleNATInput(current + key);
                                }
                              }}
                              className={`rounded-lg py-2.5 transition active:scale-95 shadow-2xs ${
                                key === "Clear"
                                  ? "col-span-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                                  : key === "⌫"
                                  ? "bg-slate-200 text-slate-800 hover:bg-slate-300"
                                  : "border border-slate-200 bg-white text-slate-800 hover:bg-slate-100"
                              }`}
                            >
                              {key}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. MTA (Marks to All) */}
                {question.type === "MTA" && (
                  <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-5 text-emerald-900">
                    <p className="text-xs font-bold uppercase tracking-wider">
                      Official GATE Marks-To-All (MTA)
                    </p>
                    <p className="text-xs mt-1">
                      This question was awarded full marks to all candidates in the official IIT answer key.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Question Bottom Action Bar - FR-2.4 Standard Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/80 p-4 md:p-5">
            <div className="flex items-center gap-2">
              <button
                onClick={clearResponse}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100 shadow-2xs"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Clear Response</span>
              </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleMarkAndNext}
                className="inline-flex items-center gap-1.5 rounded-xl border border-purple-300 bg-purple-50 px-4 py-2.5 text-xs font-bold text-purple-700 transition hover:bg-purple-100 shadow-2xs"
              >
                <BookmarkCheck className="h-3.5 w-3.5" />
                <span>Mark for Review &amp; Next</span>
              </button>

              <button
                onClick={handleSaveAndNext}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm shadow-blue-500/20 transition hover:bg-blue-700"
              >
                <span>Save &amp; Next</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* Right Side: TCS iON Question Navigation Palette - FR-2.3 */}
        <aside className="flex min-w-0 flex-col gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Question Palette ({questions.length})
              </h3>
              <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                Section: {activeSection.toUpperCase()}
              </span>
            </div>

            {/* Official TCS iON Question Palette Legend - FR-2.3 */}
            <div className="mb-4 grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-600 text-white font-bold text-[10px]">
                  {answeredCount}
                </span>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-rose-600 text-white font-bold text-[10px]">
                  {notAnsweredCount}
                </span>
                <span>Not Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded border border-slate-300 bg-slate-100 text-slate-700 font-bold text-[10px]">
                  {notVisitedCount}
                </span>
                <span>Not Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-purple-600 text-white font-bold text-[10px]">
                  {markedCount}
                </span>
                <span>Marked for Review</span>
              </div>
              <div className="col-span-2 flex items-center gap-2 pt-1 border-t border-slate-100">
                <div className="relative flex h-5 w-5 items-center justify-center rounded bg-purple-600 text-white font-bold text-[10px]">
                  {answeredAndMarkedCount}
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-white" />
                </div>
                <span>Answered &amp; Marked for Review</span>
              </div>
            </div>

            {/* Color-Coded Palette Grid */}
            <div className="grid max-h-[340px] grid-cols-5 gap-2 overflow-y-auto pr-1">
              {displayedQuestionIndices.map((idx) => {
                const q = questions[idx];
                const isCurrent = idx === currentQuestion;
                const isAnswered =
                  answers[q.id] !== undefined &&
                  (Array.isArray(answers[q.id])
                    ? (answers[q.id] as string[]).length > 0
                    : String(answers[q.id]).trim() !== "");
                const isMarked = marked.includes(q.id);
                const isVisited = visited.includes(q.id) || isCurrent;

                let stateClasses = "border border-slate-200 bg-slate-100 text-slate-600"; // Not Visited
                let indicator = null;

                if (isCurrent) {
                  stateClasses = "border-2 border-blue-600 bg-blue-100 text-blue-900 font-black ring-2 ring-blue-500/20";
                } else if (isAnswered && isMarked) {
                  // Answered & Marked for Review: Purple with Green dot
                  stateClasses = "bg-purple-600 text-white font-bold shadow-2xs";
                  indicator = (
                    <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-white" />
                  );
                } else if (isMarked) {
                  // Marked for Review: Purple
                  stateClasses = "bg-purple-600 text-white font-bold shadow-2xs";
                } else if (isAnswered) {
                  // Answered: Green
                  stateClasses = "bg-emerald-600 text-white font-bold shadow-2xs";
                } else if (isVisited) {
                  // Visited but Not Answered: Red/Coral
                  stateClasses = "bg-rose-600 text-white font-bold shadow-2xs";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(idx)}
                    type="button"
                    aria-label={`Question ${idx + 1}`}
                    className={`relative flex h-10 w-full items-center justify-center rounded-lg text-xs font-mono transition hover:scale-105 ${stateClasses}`}
                  >
                    {idx + 1}
                    {indicator}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Test Overview Summary Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
              Session Statistics
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Total Questions</span>
                <span className="font-bold text-slate-900">{questions.length}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Attempted</span>
                <span className="font-bold text-emerald-600">{answeredCount}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Marked for Review</span>
                <span className="font-bold text-purple-600">{markedCount}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Time Remaining</span>
                <span className="font-bold text-blue-600 font-mono">{formattedTime}</span>
              </div>
            </div>

            <button
              onClick={() => setShowSubmit(true)}
              className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-sm shadow-blue-500/20 transition hover:bg-blue-700"
            >
              Submit Test Series
            </button>
          </div>
        </aside>
      </div>

      {/* Official GATE Scientific Calculator Modal - FR-2.5 */}
      <GateScientificCalculator
        isOpen={showCalc}
        onClose={() => setShowCalc(false)}
      />

      {/* Question Paper Preview Modal - FR-2.5 */}
      <QuestionPaperModal
        isOpen={showQuestionPaper}
        onClose={() => setShowQuestionPaper(false)}
        questions={questions}
        testTitle={testTitle}
      />

      {/* Submit Confirmation Modal */}
      {showSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="submit-dialog-title"
            className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"
          >
            <h3 id="submit-dialog-title" className="text-lg font-bold text-slate-900">
              Submit GATE Examination?
            </h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Are you sure you want to end this examination? Your responses will be evaluated against official IIT keys and standard textbook derivations.
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center text-xs">
              <div>
                <p className="text-slate-500">Attempted</p>
                <p className="text-lg font-bold text-emerald-600">{answeredCount}</p>
              </div>
              <div>
                <p className="text-slate-500">Marked</p>
                <p className="text-lg font-bold text-purple-600">{markedCount}</p>
              </div>
              <div>
                <p className="text-slate-500">Unattempted</p>
                <p className="text-lg font-bold text-slate-700">
                  {questions.length - answeredCount}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowSubmit(false)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Continue Exam
              </button>
              <button
                onClick={handleSubmit}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition"
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
