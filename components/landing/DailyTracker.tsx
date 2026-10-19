"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import {
  getTrackerStats,
  getDailyGoals,
  toggleDailyGoal,
  TrackerStats,
  DailyGoal,
} from "@/lib/tracker";

export default function DailyTracker() {
  const [greeting, setGreeting] = useState("Good evening, Rahul 👋");
  const [goals, setGoals] = useState<DailyGoal[]>([]);
  const [stats, setStats] = useState<TrackerStats>({
    testsDone: 12,
    problemsSolved: 48,
    streak: 4,
    lastActiveDate: "",
  });

  const loadData = () => {
    setGoals(getDailyGoals());
    setStats(getTrackerStats());
  };

  useEffect(() => {
    // Dynamic greeting based on current local hour
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning, Rahul 👋");
    else if (hour < 17) setGreeting("Good afternoon, Rahul 👋");
    else setGreeting("Good evening, Rahul 👋");

    loadData();

    // Listen for cross-tab or test completion events
    window.addEventListener("storage", loadData);
    return () => window.removeEventListener("storage", loadData);
  }, []);

  const handleToggle = (id: string) => {
    const updated = toggleDailyGoal(id);
    setGoals(updated);
  };

  const completedCount = goals.filter((g) => g.completed).length;
  const progressPercent = goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 68;

  return (
    <div className="relative w-full max-w-lg">
      {/* Background Glow */}
      <div className="absolute -top-6 -right-6 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-6 -left-6 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl pointer-events-none" />

      {/* Main Elevated Card */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xl shadow-slate-300/60 transition-all duration-300 hover:shadow-slate-400/40">
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Left Column: Profile & Goals */}
          <div className="flex-1 space-y-4">
            {/* User Greeting & Bell */}
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-700 to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-500/20">
                  R
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-none">
                    {greeting}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Keep going! You&apos;re doing great.
                  </p>
                </div>
              </div>
              <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 text-xs">
                🔔
              </span>
            </div>

            {/* Overall Progress Bar */}
            <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                <span>Overall Daily Progress</span>
                <span className="text-emerald-700 font-bold">{progressPercent}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* 3 Metric Pills (Synced from Local Storage) */}
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-2.5 text-center">
                <span className="text-lg font-extrabold text-blue-600 leading-none block">
                  {stats.testsDone}
                </span>
                <span className="text-xs font-semibold text-slate-600 mt-1 block">
                  Tests Done
                </span>
              </div>

              <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-2.5 text-center">
                <span className="text-lg font-extrabold text-purple-600 leading-none block">
                  {stats.problemsSolved}
                </span>
                <span className="text-xs font-semibold text-slate-600 mt-1 block">
                  Problems Solved
                </span>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-2.5 text-center">
                <span className="text-lg font-extrabold text-amber-700 leading-none block">
                  🔥 {stats.streak}
                </span>
                <span className="text-xs font-semibold text-slate-600 mt-1 block">
                  Day Streak
                </span>
              </div>
            </div>

            {/* Today's Goal Checklist */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-slate-900 block">
                Today&apos;s Goal
              </span>
              <div className="space-y-1.5">
                {goals.map((g) => (
                  <div
                    key={g.id}
                    className={`flex items-center justify-between gap-1 rounded-xl border px-2 py-1 transition ${
                      g.completed
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200/60"
                        : "bg-slate-50 text-slate-700 border-slate-100"
                    }`}
                  >
                    <button
                      type="button"
                      aria-pressed={g.completed}
                      onClick={() => handleToggle(g.id)}
                      className="flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-lg px-1 text-left text-sm font-medium transition-colors hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          g.completed
                            ? "bg-emerald-700 text-white"
                            : "border border-slate-300 bg-white"
                        }`}
                      >
                        {g.completed && <Check aria-hidden="true" className="h-3 w-3" strokeWidth={3} />}
                      </span>
                      <span className={g.completed ? "line-through opacity-80" : ""}>
                        {g.text}
                      </span>
                    </button>
                    <Link
                      href={g.link}
                      aria-label={`Open goal: ${g.text}`}
                      className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg px-2 text-xs font-bold text-emerald-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Open
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Learning CTA */}
            <div className="pt-2">
              <Link
                href={stats.lastActiveTestId ? `/test/${stats.lastActiveTestId}` : "/gate/subjects"}
                className="flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-slate-900/10 transition hover:bg-slate-800"
              >
                <span>Continue Learning</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Motivational Mountain Card */}
          <div className="hidden sm:flex w-36 shrink-0 flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-b from-[#0F172A] to-[#020617] p-4 text-white shadow-inner">
            <div className="space-y-1">
              <span className="text-xs font-bold tracking-widest uppercase text-emerald-400">
                DAILY MOTIVATION
              </span>
              <p className="text-xs font-extrabold leading-snug text-slate-100 mt-2">
                &ldquo;Discipline today = freedom tomorrow.&rdquo;
              </p>
              <p className="text-xs text-emerald-400">😊</p>
            </div>

            {/* Mountain SVG Artwork */}
            <div className="relative mt-4 flex justify-center">
              <svg
                viewBox="0 0 100 80"
                className="w-full h-auto text-emerald-500"
                fill="none"
              >
                <polygon
                  points="50,15 85,75 15,75"
                  fill="#1E293B"
                  stroke="#334155"
                  strokeWidth="1.5"
                />
                <polygon
                  points="50,15 65,40 50,35 35,40"
                  fill="#F8FAFC"
                  opacity="0.9"
                />
                <polygon
                  points="25,45 50,75 0,75"
                  fill="#0F172A"
                  opacity="0.8"
                />
                {/* Flag on Peak */}
                <line x1="50" y1="15" x2="50" y2="8" stroke="#10B981" strokeWidth="2" />
                <polygon points="50,8 58,11 50,14" fill="#10B981" />
                {/* Stars */}
                <circle cx="20" cy="20" r="1" fill="#FEF08A" />
                <circle cx="80" cy="25" r="1.5" fill="#FEF08A" />
                <circle cx="75" cy="15" r="1" fill="#FEF08A" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Handwritten Doodle / Notes */}
      <div className="absolute -bottom-8 -left-4 hidden md:flex items-center gap-2 text-slate-700 font-handwriting rotate-[-4deg]">
        <span className="text-xs font-semibold italic text-slate-600">
          Better Than yesterday
        </span>
        <svg className="w-8 h-6 text-slate-700" viewBox="0 0 30 20" fill="none">
          <path
            d="M5,15 Q15,5 25,8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M20,5 L25,8 L22,13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="absolute -top-7 -right-2 hidden md:flex items-center gap-2 text-slate-700 font-handwriting rotate-[6deg]">
        <span className="text-xs font-semibold italic text-slate-600">
          Small steps Big dreams
        </span>
        <svg className="w-6 h-6 text-slate-700" viewBox="0 0 24 24" fill="none">
          <path
            d="M4,18 Q12,8 18,12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
