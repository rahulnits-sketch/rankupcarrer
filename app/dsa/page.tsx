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
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DSA Placement Preparation - SDE Problem Matrix & Curricula",
  description:
    "Master Data Structures and Algorithms for campus placement preparation with Blind 75, Striver SDE sheet, NeetCode 150, and topic-wise practice sets.",
  keywords: [
    "DSA placement preparation",
    "Blind 75",
    "Striver SDE sheet",
    "NeetCode 150",
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
    href: "/dsa/roadmaps/blind-75",
    badge: "FAANG Sprint",
    color: "emerald",
  },
  {
    title: "NeetCode 150 Problem Matrix",
    icon: Brain,
    problems: "150 pattern-based questions",
    detail: "Two Pointers, Sliding Window, Monotonic Stack & DP",
    href: "/dsa/roadmaps/neetcode-150",
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
        <div className="mb-8 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              DSA Problem Matrix
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Curated pattern-oriented curricula including Blind 75, Striver SDE, and NeetCode 150.
            </p>
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
