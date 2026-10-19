import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

const exploreOptions = [
  {
    href: "/dsa",
    icon: "💻",
    title: "DSA Practice",
    description: "Strengthen data structures and algorithms with topic-wise practice.",
    accent: "cyan",
  },
  {
    href: "/placement",
    icon: "🎯",
    title: "Placement Prep",
    description: "Practice aptitude, reasoning, and verbal tests for placements.",
    accent: "amber",
  },
  {
    href: "/syllabus",
    icon: "📘",
    title: "GATE Syllabus",
    description: "Browse the complete GATE CSE syllabus by subject.",
    accent: "blue",
  },
] as const;

export default function GatePrepPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-8 md:py-12 w-full flex-1">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-slate-200 pb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
              GATE CSE Test Series
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            
            <Link
              href="/gate/pyq"
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
            >
              📅 1987-2026 PYQs
            </Link>
            <Link
              href="/gate/mock"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-600 px-6 py-3 text-xs font-bold text-slate-900 shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-blue-500 transition"
            >
              🏆 Full GATE Mock Tests
            </Link>
          </div>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid gap-4 sm:grid-cols-3 mb-10">
          <Link
            href="/gate/pyq"
            className="rounded-2xl border border-blue-200 bg-blue-50 p-5 hover:border-blue-500/40 transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">📅</span>
              <span className="text-xs text-blue-700 font-bold group-hover:translate-x-0.5 transition">→</span>
            </div>
            <h3 className="font-bold text-slate-900 text-base">Year-wise PYQs</h3>
            <p className="text-xs text-slate-600 mt-1">Official papers from 2026 down to 1987 with official keys.</p>
          </Link>

          <Link
            href="/gate/subjects"
            className="rounded-2xl border border-blue-200 bg-blue-50 p-5 hover:border-blue-500/40 transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">📚</span>
              <span className="text-xs text-blue-700 font-bold group-hover:translate-x-0.5 transition">→</span>
            </div>
            <h3 className="font-bold text-slate-900 text-base">Subject-wise PYQs</h3>
            <p className="text-xs text-slate-600 mt-1">Practice 3,600+ questions filtered by OS, DBMS, CN, DSA, etc.</p>
          </Link>

          <Link
            href="/gate/mock"
            className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 hover:border-emerald-500/40 transition group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">🎯</span>
              <span className="text-xs text-emerald-700 font-bold group-hover:translate-x-0.5 transition">→</span>
            </div>
            <h3 className="font-bold text-slate-900 text-base">GATE Mock Series</h3>
            <p className="text-xs text-slate-600 mt-1">Full 65-question mocks &amp; custom random drills.</p>
          </Link>
        </div>

        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
            Explore More
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {exploreOptions.map((option) => (
              <Link
                key={option.href}
                href={option.href}
                className={`group rounded-2xl border bg-white p-5 transition hover:bg-slate-50 ${
                  option.accent === "cyan"
                    ? "border-blue-200 hover:border-blue-500/40"
                    : option.accent === "amber"
                      ? "border-amber-200 hover:border-amber-500/40"
                      : "border-blue-200 hover:border-blue-500/40"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xl" aria-hidden="true">{option.icon}</span>
                  <span className="text-sm text-slate-500 transition group-hover:translate-x-0.5">→</span>
                </div>
                <h3 className="font-bold text-slate-900 transition group-hover:text-blue-700">
                  {option.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {option.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
