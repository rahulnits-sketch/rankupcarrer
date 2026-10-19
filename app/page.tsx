import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InstitutionalHeritage from "@/components/landing/InstitutionalHeritage";
import DailyTracker from "@/components/landing/DailyTracker";
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
  Sparkles,
  BarChart3,
} from "lucide-react";

const stats = [
  { label: "Archive Span", value: "1987 – 2026", detail: "38 Years Continuous PYQ Data" },
  { label: "Question Bank", value: "8,200+", detail: "MCQ, MSQ & NAT Formats" },
  { label: "Curated Roadmaps", value: "100% Free", detail: "GATE, DSA & Placement Tracks" },
  { label: "Exam Standard", value: "65 Qs / 100M", detail: "Realistic IIT/IISc Mock Interface" },
];

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#f8fafc] text-[#0f172a] selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Hero Section with Institutional Heritage Background */}
      <section className="relative isolate overflow-hidden border-b border-slate-200 px-6 pt-12 pb-14 md:pt-18 md:pb-20">
        <InstitutionalHeritage />

        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          {/* Main Title - FR-1.1 Exact Verbatim Parity */}
          <h1 className="max-w-5xl text-4xl font-extrabold tracking-[-0.03em] text-slate-900 sm:text-6xl md:text-7xl lg:text-[4.75rem] leading-[1.08]">
            Your <span className="text-blue-600">COLLEGE</span> Journey, Made Simpler
          </h1>

          {/* Subtitle - FR-1.1 Exact Verbatim Parity */}
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-700 sm:text-lg md:text-xl md:leading-8 font-medium">
            From GATE prep and DSA to placements and interviews — everything you need to learn, practice, and grow, all in one place.
          </p>

          {/* Primary CTA Row - FR-1.1 Direct Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            <Link
              href="/tests"
              className="group inline-flex min-h-12 items-center gap-2.5 rounded-full bg-blue-600 px-7 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/25 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
            >
              <span>Start Practice Free</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/test/gate-mock-full-2026-1"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-slate-300 bg-white/95 px-6 py-3 text-sm font-semibold text-slate-700 shadow-xs transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
            >
              <Timer className="h-4 w-4 text-blue-600" />
              <span>Launch 2026 Full CBT Mock</span>
            </Link>

          </div>

          {/* Feature Checklist Tags */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-700 md:mt-10">
            <span className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 border border-slate-200/70 backdrop-blur-xs shadow-2xs">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> 100% Free & Open
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 border border-slate-200/70 backdrop-blur-xs shadow-2xs">
              <Timer className="h-4 w-4 text-blue-600" /> Real Exam Timed Mocks (TCS iON)
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 border border-slate-200/70 backdrop-blur-xs shadow-2xs">
              <Calculator className="h-4 w-4 text-blue-600" /> Virtual Calculator Ready
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 border border-slate-200/70 backdrop-blur-xs shadow-2xs">
              <FileCheck2 className="h-4 w-4 text-indigo-600" /> Standard Textbook Citations
            </span>
          </div>

          {/* Core Metrics Display - FR-1.2 */}
          <div className="mt-8 grid w-full grid-cols-2 gap-3 text-left sm:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="flex min-w-0 flex-col justify-center rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md p-5 shadow-xs transition hover:border-blue-400 hover:shadow-md hover:bg-white"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {item.label}
                </span>
                <span className="mt-1 font-mono text-xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-2xl">
                  {item.value}
                </span>
                <span className="mt-1 text-xs leading-relaxed text-slate-600">
                  {item.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* The 3 Core Tracks Section - FR-1.3 */}
      <section
        id="tracks"
        className="scroll-mt-24 bg-white/40 backdrop-blur-sm px-4 pt-12 pb-16 md:px-6 md:pt-16 md:pb-20 border-b border-slate-200/80"
      >
        <div className="mx-auto max-w-6xl">
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200/80 pb-4 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Goal Exploration Matrix
              </span>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                Choose Your Goal Track
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Specialized curricula built by IISc & IIT alumni for computer science excellence.
            </p>
          </div>

          {/* Track Cards */}
          <div className="mt-8 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* GATE HUB */}
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl hover:bg-white">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                    <GraduationCap className="h-6 w-6" />
                  </span>

                  <span className="rounded-full border border-blue-200 bg-blue-50/70 px-3 py-1 font-mono text-[11px] font-bold text-blue-700">
                    IIT / IISc Grade
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-900">
                  GATE Hub
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Solve previous year questions, practice subject-wise chapter tests,
                  and take timed full mocks with virtual calculator integration.
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5 text-xs font-medium text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                    <span>1987–2026 Year-wise PYQ Papers</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                    <span>TCS iON CBT Exam Interface (65 Qs / 100M)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                    <span>Subject-wise Topic Breakdown & Weightage</span>
                  </li>
                </ul>
              </div>

              <div className="relative mt-6 border-t border-slate-100 pt-4">
                <Link
                  href="/gate"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 shadow-sm"
                >
                  <span>Explore GATE Hub</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* DSA PROBLEM MATRIX */}
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-xl hover:bg-white">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-200 bg-cyan-50 text-cyan-700 transition group-hover:bg-cyan-600 group-hover:text-white">
                    <Code2 className="h-6 w-6" />
                  </span>

                  <span className="rounded-full border border-cyan-200 bg-cyan-50/70 px-3 py-1 font-mono text-[11px] font-bold text-cyan-700">
                    SDE SHEETS
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-900">
                  DSA Problem Matrix
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Build algorithmic intuition with curated topic-wise problems,
                  Blind 75 / Top 150 patterns, and structured coding roadmaps.
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5 text-xs font-medium text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                    <span>Pattern-Oriented Problem Grouping (Blind 75 &amp; Top 150)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                    <span>Time &amp; Space Complexity Insights</span>
                  </li>
                </ul>
              </div>

              <div className="relative mt-6 border-t border-slate-100 pt-4">
                <Link
                  href="/dsa"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 shadow-sm"
                >
                  <span>Explore DSA Sheet</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* PLACEMENT TRACK */}
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-xl hover:bg-white">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                    <BriefcaseBusiness className="h-6 w-6" />
                  </span>

                  <span className="rounded-full border border-emerald-200 bg-emerald-50/70 px-3 py-1 font-mono text-[11px] font-bold text-emerald-700">
                    TECH HIRING
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-900">
                  Placement &amp; Campus Tests
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Prepare for recruitment with aptitude drills, logical reasoning,
                  core CS fundamentals, and online assessment simulations.
                </p>

                <ul className="mt-5 space-y-2.5 border-t border-slate-100 pt-5 text-xs font-medium text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>Company-Specific OA Patterns (MAANG &amp; Tier-1)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>Quantitative, Verbal &amp; Logical Aptitude</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>Core CS Quick Revision Notes (OS, DBMS, CN)</span>
                  </li>
                </ul>
              </div>

              <div className="relative mt-6 border-t border-slate-100 pt-4">
                <Link
                  href="/placement"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-800 shadow-sm"
                >
                  <span>Explore Placement</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Roadmaps Section - FR-1.4 */}
      <section aria-labelledby="roadmaps-heading" className="border-b border-slate-200/80 bg-slate-50/40 backdrop-blur-sm px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Tested Frameworks
            </span>
            <h2 id="roadmaps-heading" className="mt-1 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-4xl">
              Engineering students often fail because they practice without strategy
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Follow field-tested milestones created by previous top rankers
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/gate/preparation-guide"
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md p-7 transition duration-200 hover:border-blue-400 hover:shadow-lg hover:bg-white"
            >
              <div>
                <span className="font-mono text-xs font-bold text-blue-600">
                  ROADMAP 01
                </span>
                <h3 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                  How to Crack GATE CSE
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  Balancing college semester exams with GATE prep, mastering high-weightage subjects first, and optimal PYQ revision cycles.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-blue-600">
                <span>View GATE Blueprint</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              href="/dsa/roadmaps"
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md p-7 transition duration-200 hover:border-cyan-400 hover:shadow-lg hover:bg-white"
            >
              <div>
                <span className="font-mono text-xs font-bold text-cyan-700">
                  ROADMAP 02
                </span>
                <h3 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-cyan-700 transition">
                  Structured DSA Learning
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  Stop random LeetCoding. Master patterns like Two Pointers, Sliding Window, DP on Trees, and Graph Traversal in order.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-cyan-700">
                <span>View DSA Strategy</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>

            <Link
              href="/placement/preparation-guide"
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md p-7 transition duration-200 hover:border-emerald-400 hover:shadow-lg hover:bg-white"
            >
              <div>
                <span className="font-mono text-xs font-bold text-emerald-700">
                  ROADMAP 03
                </span>
                <h3 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition">
                  Campus Placement Master Plan
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  Step-by-step roadmap covering CS fundamentals, live coding tests, resume review checkpoints, and behavioral interviews.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-bold text-emerald-700">
                <span>View Placement Plan</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Exam Simulation Workflow */}
      <section className="bg-white/40 backdrop-blur-sm px-6 py-16 md:py-24 border-b border-slate-200/80">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                CBT Examination Engine
              </span>
              <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                How RankUp Career Prepares You for D-Day
              </h2>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md p-7 shadow-xs hover:border-blue-300 hover:bg-white transition duration-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 font-mono text-sm font-bold">
                <Binary className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">1. Select Target &amp; Scope</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Choose a full 65-question mock paper, a single year (e.g. 2026 Set 1), or a targeted subject like Operating Systems to focus on your weakest links.
              </p>
              <div className="mt-5">
                <Link
                  href="/gate/pyq"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  Browse archive <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md p-7 shadow-xs hover:border-blue-300 hover:bg-white transition duration-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 font-mono text-sm font-bold">
                <Timer className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">2. Timed CBT Interface</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Experience real GATE conditions: 180-minute countdown, virtual numerical on-screen keypad, question palette, and negative marking enforcement.
              </p>
              <div className="mt-5">
                <Link
                  href="/test/gate-mock-full-2026-1"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  Launch mock test <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            <div className="relative rounded-2xl border border-slate-200/80 bg-white/90 backdrop-blur-md p-7 shadow-xs hover:border-blue-300 hover:bg-white transition duration-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 font-mono text-sm font-bold">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900">3. Granular Derivations &amp; Keys</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Instantly compare your answers against official IIT answer keys, NAT numerical tolerances, and comprehensive step-by-step mathematical explanations.
              </p>
              <div className="mt-5">
                <Link
                  href="/tests"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  Explore solutions <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Callout Banner */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-blue-200/80 bg-gradient-to-r from-blue-900/95 via-indigo-900/95 to-slate-900/95 p-8 md:p-12 text-white shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-blue-200 backdrop-blur-xs">
                <span>GATE 2026 / 2027 Aspirants</span>
              </div>
              <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl md:text-4xl">
                Ready to Test Your Conceptual Depth?
              </h2>
              <p className="mt-3 text-sm text-blue-100/90 leading-relaxed">
                Join thousands of aspirants practicing with authentic GATE papers, standard textbook derivations, and structured coding sheets.
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
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20"
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
