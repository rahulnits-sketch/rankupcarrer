"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from "lucide-react";

import { SiLeetcode } from "react-icons/si";
import { striverA2Z } from "@/data/dsa/roadmaps/striverA2Z";
import {
  getStriverProgressSnapshot,
  notifyStriverProgressChanged,
  STRIVER_PROGRESS_KEY,
  subscribeToStriverProgress,
} from "@/data/dsa/roadmaps/progress";

// Mapping steps to local practice tests if available
const localPracticeRoutes: Record<number, { path: string; label: string }> = {
  3: { path: "/dsa/arrays", label: "Take Arrays Practice Test" },
  6: { path: "/dsa/linked-list", label: "Take Linked List Practice Test" },
  9: { path: "/dsa/stack", label: "Take Stack Practice Test" },
  13: { path: "/dsa/tree", label: "Take Binary Trees Practice Test" },
  14: { path: "/dsa/tree", label: "Take BST Practice Test" },
  15: { path: "/dsa/graph", label: "Take Graph Practice Test" },
};

export default function StriverA2ZPage() {
  const [openStep, setOpenStep] = useState<number | null>(null);
  const savedProgress = useSyncExternalStore(
    subscribeToStriverProgress,
    getStriverProgressSnapshot,
    () => "[]",
  );
  const completedSteps = (() => {
    try {
      const completed: unknown = JSON.parse(savedProgress);
      return Array.isArray(completed) && completed.every(Number.isInteger)
        ? completed as number[]
        : [];
    } catch {
      return [];
    }
  })();

  const toggleCompleted = (stepId: number) => {
    const current = completedSteps;
      const updated = current.includes(stepId)
        ? current.filter((id) => id !== stepId)
        : [...current, stepId];

      localStorage.setItem(STRIVER_PROGRESS_KEY, JSON.stringify(updated));
      notifyStriverProgressChanged();
  };

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset your Striver A2Z progress?")) {
      localStorage.removeItem(STRIVER_PROGRESS_KEY);
      notifyStriverProgressChanged();
    }
  };

  const progress = Math.round(
    (completedSteps.length / striverA2Z.length) * 100
  );

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <section className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12 w-full flex-1">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-3">
            <Link
              href="/dsa"
              className="text-slate-600 transition hover:text-slate-900"
            >
              DSA
            </Link>
            <span className="text-gray-700">/</span>
            <Link
              href="/dsa/roadmaps"
              className="text-slate-600 transition hover:text-slate-900"
            >
              Roadmaps
            </Link>
            <span className="text-gray-700">/</span>
            <span className="text-blue-700 font-medium">StriverA2Z Sheet</span>
          </div>

          <BackButton />
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-950/35 via-slate-900/50 to-black/80 p-4 shadow-2xl shadow-blue-950/10 sm:p-6 md:p-7">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-50 blur-3xl" />

          <div className="relative z-10">
      

            {/* Progress Bar */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-3 text-xs sm:text-sm">
                <span className="font-medium text-slate-700">Overall Roadmap Progress</span>
                <span className="font-bold text-blue-700">{progress}% Completed</span>
              </div>

              <div
                className="h-2.5 overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-label="Overall roadmap progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                <span>{completedSteps.length} of {striverA2Z.length} steps completed</span>
                <span>{striverA2Z.reduce((acc, s) => acc + s.problemCount, 0)}+ total problems</span>
              </div>
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="mt-8 sm:mt-10">
          <div className="mb-5 flex items-end justify-between gap-3 sm:mb-6">
            <div>
              <h2 className="mt-1 text-xl font-bold sm:text-2xl">A2Z DSA Roadmap Steps</h2>
            </div>

            <span className="rounded-full bg-slate-50 px-3 py-1 text-xs text-slate-600 border border-slate-200">
              {striverA2Z.length} Steps
            </span>
          </div>

          <div className="space-y-4">
            {striverA2Z.map((step) => {
              const isOpen = openStep === step.id;
              const isCompleted = completedSteps.includes(step.id);
              const localRoute = localPracticeRoutes[step.id];

              return (
                <div
                  key={step.id}
                  className={`overflow-hidden rounded-2xl border transition duration-200 ${
                    isCompleted
                      ? "border-emerald-500/30 bg-emerald-950/15"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {/* Step Header */}
                  <button
                    type="button"
                    onClick={() => setOpenStep(isOpen ? null : step.id)}
                  className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-white sm:gap-4 sm:p-5 md:p-6"
                  >
                    {/* Number / Checkmark */}
                    <div
                      className={`flex h-11 min-w-11 shrink-0 items-center justify-center rounded-xl px-2 text-xs font-bold transition ${
                        isCompleted
                          ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 stroke-[2.5]" />
                      ) : (
                        String(step.id).padStart(2, "0")
                      )}
                    </div>

                    {/* Title & info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="font-bold md:text-lg text-slate-900">
                          {step.title}
                        </h3>

                        <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-0.5 text-xs text-slate-600">
                          {step.problemCount} problems
                        </span>

                        {isCompleted && (
                          <span className="rounded-full bg-emerald-50 border border-emerald-500/30 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>

                    {isOpen ? (
                      <ChevronUp className="h-5 w-5 shrink-0 text-slate-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 shrink-0 text-slate-600" />
                    )}
                  </button>

                  {/* Expanded Content */}
                  {isOpen && (
                    <div className="border-t border-slate-200 bg-slate-50 px-4 pb-5 pt-4 sm:px-5 md:px-6 md:pb-6">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
                        Topics Covered:
                      </p>

                      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {step.topics.map((topic) => (
                          <div
                            key={topic}
                            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs md:text-sm text-slate-700 flex items-center gap-2"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                      {/* Problems */}
                      <div className="mt-8">
                      <div className="mb-3 flex items-center justify-between">
                       <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                               Problems
                        </p>

                        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-500">
                            {step.problems.length} Available
                        </span>
                        </div>

                      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      {step.problems.length > 0 ? (
                      step.problems.map((problem) => (
                        <div
                      key={`${step.id}-${problem.id}`}
                      className="group flex items-center gap-3 border-b border-slate-200/70 px-4 py-4 transition last:border-b-0 hover:bg-slate-50"
                          >
          {/* Checkbox */}
            <button
            type="button"
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-slate-300 transition hover:border-blue-400 hover:bg-blue-50"
            title="Mark problem as completed"
          >
            <CheckCircle2 className="hidden h-4 w-4 text-blue-700" />
          </button>

          {/* Problem title */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-700 transition group-hover:text-slate-900">
              {problem.title}
            </p>
          </div>

          {/* Difficulty */}
          <span
            className={`hidden rounded-full border px-2.5 py-1 text-[10px] font-semibold sm:block ${
              problem.difficulty === "Basic"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : problem.difficulty === "Core"
                ? "border-amber-200 bg-amber-50 text-amber-700"
                : "border-rose-200 bg-rose-50 text-rose-700"
            }`}
          >
            {problem.difficulty}
          </span>

          {/* LeetCode */}
          {problem.leetcode && (
            <a
              href={problem.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              title={`Solve "${problem.title}" on LeetCode`}
              aria-label={`Solve ${problem.title} on LeetCode`}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-400"
            >
              <SiLeetcode className="h-5 w-5" />
            </a>
          )}
          </div>
          ))
           ) : (
          <div className="px-4 py-8 text-center text-sm text-slate-500">
              Problems for this step will be added soon.
          </div>
          )}
          </div>
          </div>

                      {/* Actions */}
                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => toggleCompleted(step.id)}
                          className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs md:text-sm font-bold transition ${
                            isCompleted
                              ? "bg-emerald-500 text-black hover:bg-emerald-400"
                              : "border border-slate-300 bg-slate-100 text-slate-900 hover:bg-slate-200"
                          }`}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          {isCompleted ? "Mark Incomplete" : "Mark as Completed"}
                        </button>

                        {localRoute && (
                          <Link
                            href={localRoute.path}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-50 border border-blue-200 px-4 py-2.5 text-xs md:text-sm font-semibold text-blue-700 hover:bg-blue-500 hover:text-black transition"
                          >
                            {localRoute.label}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
          <div className="flex flex-wrap gap-3">
       
            <Link
              href="/dsa"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
            >
              Back to DSA
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
