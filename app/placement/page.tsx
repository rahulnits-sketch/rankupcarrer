import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import placementData from "@/data/placement.json";
import SubNavPills from "@/components/SubNavPills";
import { placementNavPills } from "@/lib/hubNav";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Campus Placement Preparation - Aptitude, Reasoning, DSA & Tech Tests",
  description:
    "Comprehensive college placement preparation hub. Practice quantitative aptitude, logical reasoning, verbal ability, and technical interview questions for top tech companies.",
  keywords: [
    "placement preparation",
    "DSA placement preparation",
    "campus placement aptitude",
    "technical interview preparation",
    "campus placement mock test",
    "software engineer placement",
  ],
};

export default function PlacementPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      <Navbar />
      <SubNavPills categoryTitle="EXPLORE PLACEMENT" pills={placementNavPills} />

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12 w-full flex-1">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>Campus Hiring &amp; Technical Interviews</span>
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Placement &amp; Campus Tests
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Quantitative, Verbal &amp; Logical Aptitude, Company-Specific Online Assessments (OA), and Core CS revision notes for Tier-1 product and consulting firms.
            </p>
          </div>
        </div>

        {/* Modules Grid - FR-1.3 Placement & Campus Tests */}
        <div className="mb-14 grid gap-6 md:grid-cols-3">
          {placementData.modules.map((m) => (
            <div
              key={m.id}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-xs transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl border border-emerald-100">
                    {m.icon}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700">
                    {m.tests.length} {m.tests.length === 1 ? "Test" : "Tests"}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition">
                  {m.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {m.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {topic}
                    </span>
                  ))}
                  {m.topics.length > 3 && (
                    <span className="text-xs text-slate-400 self-center font-medium">
                      +{m.topics.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <Link
                  href={`/placement/${m.slug}`}
                  className="block w-full rounded-xl bg-emerald-600 py-3 text-center text-xs font-bold text-white transition hover:bg-emerald-700 shadow-sm shadow-emerald-600/20"
                >
                  Explore {m.title} Drills →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Core CS Revision Notes Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Placement Technical Rounds
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                Core CS Fundamentals Quick Revision
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Most candidate rejections in technical rounds happen in OS, DBMS, and Computer Networks fundamentals. Practice verified concepts with textbook rigor.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/gate/cse-it"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-bold text-white hover:bg-slate-800 transition"
              >
                <span>Browse Core CS Tests</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
