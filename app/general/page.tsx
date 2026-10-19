"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import generalData from "@/data/general.json";
import BackButton from "@/components/BackButton";

export default function GeneralTestsPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("medium");
  const [selectedCategory, setSelectedCategory] = useState<string>("18");

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-10 md:py-10 w-full flex-1">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
            General  Quizzes
          </h1>
          <BackButton />
        </div>

        {/* Custom Quiz Launcher Card */}
        <div className="mb-14 rounded-3xl border border-blue-200 bg-gradient-to-b from-blue-50 to-transparent p-8 md:p-10">
          <div className="max-w-2xl">
            <h2 className=" text-3xl font-bold text-slate-900 md:text-3xl">
              Customize Quiz
            </h2>
            {/* Options */}
            <div className="mt-8 space-y-6">
              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Select Category
                </label>
                <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {[
                    { id: "18", label: "💻 Computer Science" },
                    { id: "17", label: "🔬 Science & Nature" },
                    { id: "9", label: "🌐 General Knowledge" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`rounded-xl border p-3 text-left text-xs font-medium transition ${
                        selectedCategory === cat.id
                          ? "border-blue-500 bg-blue-50 text-slate-900 shadow-md shadow-blue-500/20 font-bold"
                          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:text-slate-900"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Select Difficulty
                </label>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {["easy", "medium", "hard"].map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`rounded-full px-5 py-2 text-xs font-semibold capitalize transition ${
                        selectedDifficulty === diff
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 font-bold"
                          : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:text-slate-900"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/test/opentdb?category=${selectedCategory}&difficulty=${selectedDifficulty}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-700"
                >
                  <span>Start Quiz Now</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Preset Cards */}
        <div>
          <div className="grid gap-6 md:grid-cols-3">
            {generalData.categories.map((cat) => (
              <div
                key={cat.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:bg-slate-50"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                      {cat.icon}
                    </span>
                    <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-slate-900">
                    {cat.title}
                  </h3>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-4">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                      {cat.questionCount}
                    </span>
                    <span>⏱ {cat.duration}</span>
                  </div>

                  <Link
                    href={`/test/${cat.testId}?category=${cat.categoryParam}`}
                    className="block w-full rounded-xl bg-blue-600 py-2.5 text-center text-xs font-bold text-white transition hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                  >
                    Start  Test →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
