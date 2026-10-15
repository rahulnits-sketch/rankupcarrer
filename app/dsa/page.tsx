import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dsaData from "@/data/dsa.json";
import BackButton from "@/components/BackButton";
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
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DSA Placement Preparation - Data Structures & Algorithms Roadmaps",
  description:
    "Master Data Structures and Algorithms for campus placement preparation. Topic-wise practice, company-specific questions, Striver A2Z sheet, and coding interview guides.",
  keywords: [
    "DSA placement preparation",
    "DSA roadmap for placement",
    "Data structures and algorithms",
    "campus placement coding questions",
    "Striver A2Z sheet practice",
    "coding interview preparation",
  ],
};

const roadmaps = [
  { title: "Striver A2Z DSA Sheet", icon: Rocket, problems: "450+ curated problems", detail: "17 structured steps", href: "/dsa/roadmaps/striver-a2z", available: true },
  { title: "Coder Army Roadmap", icon: Code2, problems: "Curated problem set", detail: "Beginner to advanced", href: "/dsa/roadmaps/coder-army", available: false },
  { title: "Love Babbar 450", icon: Trophy, problems: "450 problems", detail: "Placement preparation", href: "/dsa/roadmaps/love-babbar", available: false },
  { title: "NeetCode 150", icon: Brain, problems: "150 problems", detail: "Pattern based", href: "/dsa/roadmaps/neetcode-150", available: false },
  { title: "Blind 75", icon: Target, problems: "75 problems", detail: "Interview preparation", href: "/dsa/roadmaps/blind-75", available: false },
];

export default function DSAPage() {

  return (
    <main className="min-h-screen bg-[#08090b] text-white flex flex-col justify-between">
      <Navbar />
      <SubNavPills categoryTitle="EXPLORE DSA" pills={dsaNavPills} />

      <section className="mx-auto max-w-7xl px-6 py-8 md:py-10 w-full flex-1">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
              Data Structures & Algorithms
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/dsa/roadmaps"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition flex items-center gap-2"
            >
              <Layers className="h-4 w-4 text-cyan-400" />
              All Roadmaps
            </Link>
          </div>
        </div>

        {/* Curated roadmap banners */}
        <div className="mb-12 space-y-5">
          {roadmaps.map((roadmap) => {
            const Icon = roadmap.icon;
            return (
              <article key={roadmap.title} className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-blue-950/20 to-slate-900/60 p-5 shadow-xl shadow-cyan-950/20 transition hover:border-cyan-400/60 md:p-7">
                <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-3xl">
                    <h3 className="text-2xl font-black tracking-tight text-white md:text-3xl">{roadmap.title}</h3>
                  </div>
                  <Link href={roadmap.href} className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold transition ${roadmap.available ? "bg-cyan-400 text-black shadow-lg shadow-cyan-500/20 hover:scale-[1.02] hover:bg-cyan-300" : "border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"}`}>
                    {roadmap.available ? "Start " : "coming...."}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        {/* ============================================================ */}
        {/* TOPIC-WISE PRACTICE SECTION (GATE & CODING) */}
        {/* ============================================================ */}
        <div className="mb-10">
          <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-2">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Topic-Wise Practice Tests
              </h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {dsaData.topics.map((t) => (
              <div
                key={t.id}
                className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition duration-200 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-white/[0.04]"
              >
                <div>
                  <h3 className="mt-4 text-xl font-bold text-white group-hover:text-cyan-400 transition">
                    {t.title}
                  </h3>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <Link
                    href={`/dsa/${t.slug}`}
                    className="block w-full rounded-xl bg-cyan-500/10 py-2.5 text-center text-xs font-bold text-cyan-300 transition hover:bg-cyan-500 hover:text-black"
                  >
                    Explore {t.title} Tests
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

