import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dsaData from "@/data/dsa.json";
import SubNavPills from "@/components/SubNavPills";
import { dsaNavPills } from "@/lib/hubNav";
import {
  Rocket,
  ArrowRight,
  Brain,
  Target,
  Trophy,
  Code2,
  Layers,
  Terminal,
  CheckCircle2,
  Sparkles,
  Building2,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DSA Placement Preparation - SDE Problem Matrix & Curricula",
  description:
    "Master Data Structures and Algorithms for campus placement preparation. Blind 75, Striver SDE sheet, NeetCode 150, embedded C++/Java/Python IDE sandbox.",
  keywords: [
    "DSA placement preparation",
    "Blind 75",
    "Striver SDE sheet",
    "NeetCode 150",
    "coding sandbox",
    "FAANG placement coding",
  ],
};

const roadmaps = [
  {
    title: "Striver A2Z DSA Sheet",
    icon: Rocket,
    problems: "455+ curated problems",
    detail: "Step-by-step from Basics to Advanced DP & Graphs",
    href: "/dsa/roadmaps/striver-a2z",
    badge: "Most Comprehensive",
    color: "blue",
  },
  {
    title: "Blind 75 Curated Sheet",
    icon: Target,
    problems: "75 essential interview patterns",
    detail: "High-frequency questions asked at Google, Amazon & Meta",
    href: "/dsa/sandbox",
    badge: "FAANG Sprint",
    color: "emerald",
  },
  {
    title: "NeetCode 150 Problem Matrix",
    icon: Brain,
    problems: "150 pattern-based questions",
    detail: "Two Pointers, Sliding Window, Monotonic Stack & DP",
    href: "/dsa/sandbox",
    badge: "Core Patterns",
    color: "cyan",
  },
  {
    title: "Love Babbar 450",
    icon: Trophy,
    problems: "450 problems for placement",
    detail: "Classic campus recruitment question bank",
    href: "/dsa/roadmaps",
    badge: "Campus OA",
    color: "purple",
  },
];

export default function DSAPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      <Navbar />
      <SubNavPills categoryTitle="EXPLORE DSA" pills={dsaNavPills} />

      <section className="mx-auto max-w-7xl px-6 py-8 md:py-12 w-full flex-1">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>SDE-1 Hiring &amp; Algorithmic Mastery</span>
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              DSA Problem Matrix
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Curated pattern-oriented curricula (Blind 75, Striver SDE, NeetCode 150) with an embedded compiler sandbox for C++20, Java 17, and Python 3.11.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dsa/sandbox"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition"
            >
              <Terminal className="h-4 w-4" />
              <span>Launch IDE Sandbox</span>
            </Link>
          </div>
        </div>

        {/* Featured Banner: Interactive IDE Sandbox - FR-3.3 */}
        <div className="mb-12 overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-7 md:p-9 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="rounded-full bg-blue-500/20 border border-blue-400/30 px-3 py-1 text-xs font-bold text-blue-200">
                Interactive Coding Sandbox
              </span>
              <h2 className="text-2xl font-extrabold sm:text-3xl text-white">
                Practice Blind 75 &amp; Top 150 in the Browser
              </h2>
              <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
                Compile C++20, Java 17, and Python 3.11 with instant test-case execution, memory profiling, and runtime percentile benchmarks compared against top submissions.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/dsa/sandbox"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-slate-100 shadow-md"
              >
                <span>Open Sandboxed IDE</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Curated Roadmap Curricula - FR-3.1 */}
        <div className="mb-12">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              Curated Problem Curricula
            </h2>
            <span className="text-xs text-slate-500">
              Structured patterns instead of random solving
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {roadmaps.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.title}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-blue-300 hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">
                        {r.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">
                      {r.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs font-semibold text-blue-600">
                      {r.problems}
                    </p>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {r.detail}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <Link
                      href={r.href}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-bold text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
                    >
                      <span>Explore Sheet</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Topic-Wise Practice Section */}
        <div className="mb-10">
          <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                Topic-Wise Practice Sets
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Foundational problem sets with conceptual questions and code tests
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dsaData.topics.map((t) => (
              <div
                key={t.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{t.icon}</span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                      {t.difficulty}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">
                    {t.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {t.tests?.[0]?.description || "Practice problem sets with standard algorithmic complexity."}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4">
                  <Link
                    href={`/dsa/${t.slug}`}
                    className="block w-full rounded-xl bg-slate-50 border border-slate-200 py-2.5 text-center text-xs font-bold text-slate-800 transition hover:bg-blue-600 hover:text-white hover:border-blue-600"
                  >
                    Practice {t.title} Drills
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
