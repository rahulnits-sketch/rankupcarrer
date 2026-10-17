import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Calculator,
  Timer,
  CheckCircle2,
  FileCheck2,
  Binary,
  Layers,
} from "lucide-react";

const stats = [
  { label: "Archive Span", value: "1987 – 2026", detail: "38 Years Continuous PYQ Data" },
  { label: "Question Bank", value: "8,200+", detail: "MCQ, MSQ & NAT Formats" },
  { label: "Curated Roadmaps", value: "100% Free", detail: "GATE, DSA & Placement Tracks" },
  { label: "Exam Standard", value: "65 Qs / 100M", detail: "Realistic IIT/IISc Mock Interface" },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden bg-[#07090e] text-[#f8fafc] selection:bg-indigo-600 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden border-b border-white/[0.08] px-6 pt-16 pb-12 md:pt-24 md:pb-16">
        {/* Ambient Grid & Glow Backdrops */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.18),transparent_65%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        />

        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">

          {/* Main Title */}
          <h1 className="mt-8 max-w-5xl text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[4.75rem] leading-[1.06]">
            Your <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">COLLEGE</span> Journey, Made Simpler
          </h1>

          {/* Subtitle with rigorous clarity */}
         <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg md:text-xl md:leading-8">
            From GATE prep and DSA to placements and interviews — everything you need to learn, practice, and grow, all in one place.
          </p>

          {/* Primary CTA Row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <Link
              href="/tests"
              className="group inline-flex min-h-13 items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-200 hover:bg-slate-100 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span>Start Practice Free</span>

            </Link>
          </div>

          {/* Feature Checklist Tags */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-400 md:mt-10">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-indigo-300" /> 100% Free & Open
            </span>
            <span className="flex items-center gap-1.5">
              <Timer className="h-4 w-4 text-indigo-300" /> Real Exam Timed Mocks
            </span>
            <span className="flex items-center gap-1.5">
              <Calculator className="h-4 w-4 text-indigo-300" /> Virtual Calculator Ready
            </span>
            <span className="flex items-center gap-1.5">
              <FileCheck2 className="h-4 w-4 text-indigo-400" /> Detailed Step-by-Step Solutions
            </span>
          </div>

          <div className="mt-6 grid w-full grid-cols-2 gap-3 text-left sm:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="flex min-w-0 flex-col justify-center rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {item.label}
                </span>
                <span className="mt-1 font-mono text-base font-extrabold leading-tight tracking-tight text-white sm:text-xl">
                  {item.value}
                </span>
                <span className="mt-1 text-xs leading-relaxed text-slate-400">
                  {item.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    {/* The 3 Core Tracks Section */}
    <section
    id="tracks"
  className="scroll-mt-24 bg-[#080a10] px-4 pt-8 pb-12 md:px-6 md:pt-10 md:pb-16"
    >
  <div className="mx-auto max-w-6xl">
      {/* Section Heading */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
      <h2 className="text-xl font-extrabold tracking-tight text-white md:text-2xl">
        Choose Your Goal
      </h2>
      </div>

    {/* Track Cards */}
    <div className="mt-6 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">

      {/* GATE HUB */}
      <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d101a] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#101422]">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-indigo-500/[0.05] blur-3xl transition duration-300 group-hover:bg-indigo-500/[0.09]" />

        <div className="relative">
          <div className="flex items-center justify-between gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white transition group-hover:bg-white/[0.08]">
              <GraduationCap className="h-5 w-5" />
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] font-medium text-gray-300">
              IIT / IISc Grade
            </span>
          </div>

          <h3 className="mt-4 text-lg font-bold tracking-tight text-white">
            GATE Hub
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Solve previous year questions, practice subject-wise chapter tests,
            and take timed full mocks with virtual calculator integration.
          </p>

          <ul className="mt-4 space-y-2 border-t border-white/[0.07] pt-4 text-xs leading-5 text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/70" />
              <span>1987–2026 Year-wise PYQ Papers</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/70" />
              <span>GATE-Style Exam Interface</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/70" />
              <span>Subject-wise Topic Breakdown</span>
            </li>
          </ul>
        </div>

        <div className="relative mt-5 border-t border-white/[0.07] pt-4">
          <Link
            href="/gate"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#0d101a] transition hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span>Explore GATE Hub</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* DSA PROBLEM MATRIX */}
      <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d101a] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#101422]">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-indigo-500/[0.05] blur-3xl transition duration-300 group-hover:bg-indigo-500/[0.09]" />

        <div className="relative">
          <div className="flex items-center justify-between gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white transition group-hover:bg-white/[0.08]">
              <Code2 className="h-5 w-5" />
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] font-medium text-gray-300">
              SDE SHEETS
            </span>
          </div>

          <h3 className="mt-4 text-lg font-bold tracking-tight text-white">
            DSA Problem Matrix
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Build algorithmic intuition with curated topic-wise problems,
            Blind 75 / Top 150 patterns, and structured coding roadmaps.
          </p>

          <ul className="mt-4 space-y-2 border-t border-white/[0.07] pt-4 text-xs leading-5 text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/70" />
              <span>Pattern-Oriented Problem Grouping</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/70" />
              <span>Time &amp; Space Complexity Insights</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/70" />
              <span>Interactive Progress Checklist</span>
            </li>
          </ul>
        </div>

        <div className="relative mt-5 border-t border-white/[0.07] pt-4">
          <Link
            href="/dsa"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#0d101a] transition hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span>Explore DSA Sheet</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* PLACEMENT TRACK */}
      <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d101a] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#101422]">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-indigo-500/[0.05] blur-3xl transition duration-300 group-hover:bg-indigo-500/[0.09]" />

        <div className="relative">
          <div className="flex items-center justify-between gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white transition group-hover:bg-white/[0.08]">
              <BriefcaseBusiness className="h-5 w-5" />
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] font-medium text-gray-300">
              TECH HIRING
            </span>
          </div>

          <h3 className="mt-4 text-lg font-bold tracking-tight text-white">
            Placement &amp; Campus Tests
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Prepare for recruitment with aptitude drills, logical reasoning,
            core CS fundamentals, and online assessment simulations.
          </p>

          <ul className="mt-4 space-y-2 border-t border-white/[0.07] pt-4 text-xs leading-5 text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/70" />
              <span>Company-Specific OA Patterns</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/70" />
              <span>Quantitative, Verbal &amp; Logical Aptitude</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/70" />
              <span>Core CS Quick Revision Notes</span>
            </li>
          </ul>
        </div>

        <div className="relative mt-5 border-t border-white/[0.07] pt-4">
          <Link
            href="/placement"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#0d101a] transition hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span>Explore Placement</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* Strategic Roadmaps Section */}
      <section aria-labelledby="roadmaps-heading" className="border-t border-white/[0.08] bg-[#0a0d15] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <h2 id="roadmaps-heading" className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
            Engineering students often fail because they practice without strategy
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
            Follow field-tested milestones created by previous top rankers
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/gate/preparation-guide"
              className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0d101a] p-7 transition duration-200 hover:border-indigo-400/40 hover:bg-[#111624]"
            >
              <div>
                <span className="font-mono text-xs font-semibold text-indigo-400">
                  ROADMAP 01
                </span>
                <h3 className="mt-3 text-xl font-bold text-white group-hover:text-indigo-200 transition">
                  How to Crack GATE CSE
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  Balancing college semester exams with GATE prep, mastering high-weightage subjects first, and optimal PYQ revision cycles.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs font-semibold text-indigo-300">
                <span>View GATE Blueprint</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              href="/dsa/roadmaps"
              className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0d101a] p-7 transition duration-200 hover:border-cyan-400/40 hover:bg-[#111624]"
            >
              <div>
                <span className="font-mono text-xs font-semibold text-cyan-400">
                  ROADMAP 02
                </span>
                <h3 className="mt-3 text-xl font-bold text-white group-hover:text-cyan-200 transition">
                  Structured DSA Learning
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  Stop random LeetCoding. Master patterns like Two Pointers, Sliding Window, DP on Trees, and Graph Traversal in order.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs font-semibold text-cyan-300">
                <span>View DSA Strategy</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              href="/placement/preparation-guide"
              className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#0d101a] p-7 transition duration-200 hover:border-emerald-400/40 hover:bg-[#111624]"
            >
              <div>
                <span className="font-mono text-xs font-semibold text-emerald-400">
                  ROADMAP 03
                </span>
                <h3 className="mt-3 text-xl font-bold text-white group-hover:text-emerald-200 transition">
                  Campus Placement Master Plan
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-400">
                  Step-by-step roadmap covering CS fundamentals, live coding tests, resume review checkpoints, and behavioral interviews.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs font-semibold text-emerald-300">
                <span>View Placement Plan</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Exam Simulation Workflow (Replaces generic 01, 02, 03) */}
      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
            <div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                How CheckMate Prepares You for D-Day
              </h2>
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative rounded-2xl border border-white/[0.08] bg-[#0d101a] p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 font-mono text-sm font-bold">
                <Binary className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">1. Select Target & Scope</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Choose a full 65-question mock paper, a single year (e.g. 2024 Set 1), or a targeted subject like Operating Systems to focus on your weakest links.
              </p>
              <div className="mt-5">
                <Link
                  href="/gate/pyq"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-indigo-200"
                >
                  Browse archive <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl border border-white/[0.08] bg-[#0d101a] p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 font-mono text-sm font-bold">
                <Timer className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">2. Timed CBT Interface</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Experience real GATE conditions: 180-minute countdown, virtual numerical on-screen keypad, question palette, and negative marking enforcement.
              </p>
              <div className="mt-5">
                <Link
                  href="/gate/mock"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-indigo-200"
                >
                  Launch mock test <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl border border-white/[0.08] bg-[#0d101a] p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 font-mono text-sm font-bold">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">3. Granular Derivations & Keys</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Instantly compare your answers against official IIT answer keys, NAT numerical tolerances, and comprehensive step-by-step mathematical explanations.
              </p>
              <div className="mt-5">
                <Link
                  href="/tests"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-indigo-200"
                >
                  Explore solutions <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Callout Banner */}
      <section className="px-6 pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-r from-indigo-950/60 via-[#0d101a] to-blue-950/40 p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
                Ready to Test Your Conceptual Depth?
              </h2>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Join thousands of aspirants practicing with authentic GATE papers and structured coding sheets.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/tests"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-slate-100 hover:shadow-lg"
              >
                <span>Start Practice Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/syllabus"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <span>View Full Syllabus</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
