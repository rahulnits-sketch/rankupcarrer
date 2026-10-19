import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CircuitBoard,
  Cog,
  Cpu,
  Zap,
  Sparkles,
  Timer,
  BookOpen,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubNavPills from "@/components/SubNavPills";
import { gateNavPills } from "@/lib/hubNav";
import subjectsManifest from "@/data/gate/subjects/manifest.json";
import pyqManifest from "@/data/gate/pyq/manifest.json";
import { gateBranches } from "@/data/gate/branches";

export const metadata: Metadata = {
  title: "CSE GATE Preparation - Free Test Series, PYQ & Subject-wise Practice",
  description:
    "Complete CSE GATE preparation hub. Practice year-wise GATE CSE previous year questions (PYQ) from 1987 to 2026, subject tests, syllabus, and mock exams.",
  keywords: [
    "CSE GATE",
    "GATE CSE",
    "GATE CSE test series",
    "GATE CSE previous year papers",
    "GATE CSE preparation",
    "GATE Computer Science",
  ],
};

const gateOptions = [
  {
    href: "/gate/pyq",
    number: "01",
    icon: "📅",
    title: "Year-wise PYQs",
    description:
      "Choose a GATE CSE paper by year (1987–2026) and attempt it in full TCS iON timed CBT interface.",
    detail: `${pyqManifest.length} papers · 1987–2026 Archives`,
    accent: "blue",
  },
  {
    href: "/gate/subjects",
    number: "02",
    icon: "📚",
    title: "Subject-wise Practice",
    description:
      "Pick any of the 10 core CS subjects to drill chapter-level conceptual questions and PYQs.",
    detail: `${subjectsManifest.length} subjects · Topic-wise drills`,
    accent: "purple",
  },
  {
    href: "/gate/mock",
    number: "03",
    icon: "🎯",
    title: "All-India Mock Tests",
    description:
      "Take a realistic 65-question / 100-mark mock with virtual scientific calculator and verified derivations.",
    detail: "Full mocks · 180 min · Exact marking",
    accent: "emerald",
  },
] as const;

const accentStyles = {
  blue: {
    border: "hover:border-blue-400",
    icon: "border-blue-200 bg-blue-50 text-blue-700",
    number: "text-blue-600",
    title: "group-hover:text-blue-700",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
  },
  purple: {
    border: "hover:border-blue-400",
    icon: "border-blue-200 bg-blue-50 text-blue-700",
    number: "text-blue-600",
    title: "group-hover:text-blue-700",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
  },
  emerald: {
    border: "hover:border-blue-400",
    icon: "border-blue-200 bg-blue-50 text-blue-700",
    number: "text-blue-600",
    title: "group-hover:text-blue-700",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
  },
} as const;

const branchIcons = {
  cpu: Cpu,
  circuit: CircuitBoard,
  bolt: Zap,
  building: Building2,
  cog: Cog,
} as const;

const branchAccents = {
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  cyan: "border-blue-200 bg-blue-50 text-blue-700",
  amber: "border-blue-200 bg-blue-50 text-blue-700",
  emerald: "border-blue-200 bg-blue-50 text-blue-700",
  purple: "border-blue-200 bg-blue-50 text-blue-700",
} as const;

export default function GateMasterPage() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-[#f8fafc] text-slate-900 selection:bg-blue-600 selection:text-white">
      <Navbar />
      <SubNavPills categoryTitle="EXPLORE GATE" pills={gateNavPills} />

      <section className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 md:px-6 md:py-14">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              What would you like to <span className="text-blue-600">practise today?</span>
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Select your practice modality: Full 180-min mocks, year-wise PYQ sets, or subject chapter drills.
            </p>
          </div>

          <Link
            href="/test/gate-mock-full-2026-1"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition"
          >
            <Timer className="h-4 w-4" />
            <span>2026 Full CBT Mock</span>
          </Link>
        </div>

        {/* 3 GATE Modalities */}
        <div className="grid gap-6 md:grid-cols-3">
          {gateOptions.map((option) => {
            const styles = accentStyles[option.accent];

            return (
              <Link
                key={option.href}
                href={option.href}
                className={`group flex min-h-72 flex-col rounded-3xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:p-7 ${styles.border}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-2xl ${styles.icon}`}
                    aria-hidden="true"
                  >
                    {option.icon}
                  </span>
                  <span className={`font-mono text-sm font-bold ${styles.number}`}>
                    {option.number}
                  </span>
                </div>

                <h2
                  className={`mt-6 text-xl font-bold text-slate-900 transition ${styles.title}`}
                >
                  {option.title}
                </h2>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-600">
                  {option.description}
                </p>
                <p className="mt-5 border-t border-slate-100 pt-3 text-[11px] font-medium text-slate-500">
                  {option.detail}
                </p>

                <span
                  className={`mt-4 flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-bold transition shadow-2xs ${styles.button}`}
                >
                  <span>Explore Mode</span>
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            );
          })}
        </div>

        {/* All GATE Branches */}
        <section id="branches" className="scroll-mt-24 pb-4 pt-16">
          <div className="mb-6 border-b border-slate-200 pb-4">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Find Your Engineering Stream
            </p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
              Explore All GATE Branches
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Access 1987–2026 PYQs and tests across all major engineering disciplines.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(gateBranches).map((branch) => {
              const Icon = branchIcons[branch.icon];

              return (
                <Link
                  key={branch.slug}
                  href={`/gate/${branch.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${branchAccents[branch.accent]}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      GATE {branch.code}
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-bold text-slate-800 transition group-hover:text-blue-600">
                      {branch.shortTitle}
                    </span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
}
