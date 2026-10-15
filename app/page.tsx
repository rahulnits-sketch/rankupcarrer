import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
} from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden bg-[#08090b] text-white selection:bg-blue-500 selection:text-white">
      <Navbar />
      <section className="relative isolate flex min-h-[min(760px,calc(100svh-4rem))] w-full items-center justify-center overflow-hidden border-b border-white/[0.06] px-6 py-24 text-center md:py-28">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_38%,rgba(37,99,235,0.18),transparent_48%)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[25rem] w-[25rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]" />
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 md:gap-10">
          <h1 className="text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block">Prepare Smarter</span>
            <span className="mt-3 block bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Test Faster
            </span>
          </h1>

          <p className="max-w-2xl text-base leading-7 text-gray-400 md:text-lg md:leading-8">
            Your all-in-one platform for <span className="text-white font-medium">CSE GATE</span> <span className="text-white font-medium">PYQ(1987-2026) , Full Mock Test</span> with solutions, <span className="text-white font-medium">DSA </span>, Placement and campus tech interview Prepration.
          </p>

          <Link
            href="/tests"
            className="group inline-flex min-h-14 items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-bold text-black shadow-[0_12px_40px_rgba(255,255,255,0.12)] transition duration-200 hover:-translate-y-0.5 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <span>Start Preparing</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <section id="tracks" className="mx-auto w-full max-w-7xl scroll-mt-24 px-6 py-20 md:py-28">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
          Let’s Build Your Future
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          <Link
            href="/gate"
            className="group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-br from-white/[0.045] to-white/[0.015] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-blue-300/30 hover:from-blue-400/[0.08] hover:to-white/[0.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
          >
            <div className="pointer-events-none absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-blue-500/[0.06] blur-3xl transition group-hover:bg-blue-500/10" />
            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
                <GraduationCap className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 flex items-center gap-3 text-2xl font-bold text-white">
                GATE CSE
                <ArrowRight className="h-5 w-5 text-blue-300 transition group-hover:translate-x-1" aria-hidden="true" />
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-400">
                Practise by subject, explore previous-year questions, and take mock tests.
              </p>
            </div>
            <span className="relative mt-6 w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              Explore GATE
            </span>
          </Link>

          <Link
            href="/dsa"
            className="group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-3xl border border-purple-400/20 bg-gradient-to-br from-purple-400/[0.07] via-white/[0.025] to-white/[0.015] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:border-purple-300/45 hover:from-purple-400/[0.12] hover:to-purple-400/[0.03] hover:shadow-[0_20px_60px_rgba(168,85,247,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300"
          >
            <div className="pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-purple-500/[0.12] blur-3xl transition duration-300 group-hover:bg-purple-400/20" />
            <div className="relative">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-300/30 bg-purple-400/15 text-purple-200 shadow-[0_8px_24px_rgba(168,85,247,0.12)] transition duration-300 group-hover:border-purple-200/50 group-hover:bg-purple-400/20">
                <Code2 className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 flex items-center gap-3 text-2xl font-bold text-white sm:text-[1.7rem]">
                DSA
                <ArrowRight className="h-5 w-5 text-purple-200 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-gray-300">
                Build problem-solving skills with topic-wise practice and structured roadmaps.
              </p>
            </div>
            <span className="relative mt-7 w-fit rounded-full border border-purple-300/30 bg-purple-400/15 px-3.5 py-1.5 text-xs font-semibold text-purple-200 transition group-hover:border-purple-200/50 group-hover:bg-purple-400/20">
              Explore DSA Sheet
            </span>
          </Link>

          <Link
            href="/placement"
            className="group relative flex min-h-64 flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-br from-white/[0.045] to-white/[0.015] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-blue-300/30 hover:from-blue-400/[0.08] hover:to-white/[0.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
          >
            <div className="pointer-events-none absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-blue-500/[0.06] blur-3xl transition group-hover:bg-blue-500/10" />
            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
                <BriefcaseBusiness className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 flex items-center gap-3 text-2xl font-bold text-white">
                Placement
                <ArrowRight className="h-5 w-5 text-blue-300 transition group-hover:translate-x-1" aria-hidden="true" />
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-400">
                Prepare for hiring tests with aptitude, reasoning, and verbal practice.
              </p>
            </div>
            <span className="relative mt-6 w-fit rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-semibold text-blue-300">
              Explore Placement
            </span>
          </Link>
        </div>

        <div className="relative mt-12 overflow-hidden rounded-3xl border border-blue-300/15 bg-gradient-to-br from-[#101b2b] via-[#101827] to-[#11111c] p-7 shadow-[0_24px_80px_rgba(37,99,235,0.08)] md:mt-16 md:px-10 md:py-9">
          <div className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold tracking-wide text-blue-300">
                CheckMate College
              </p>
              <h3 className="mt-2 text-xl font-extrabold leading-tight text-white md:text-2xl">
                One platform. Endless possibilities.
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                GATE, DSA, and Placement preparation, all in one place.
              </p>
            </div>
            <Link
              href="/tests"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
            >
              Start Preparing
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

      <section aria-labelledby="roadmaps-heading" className="mt-20 border-t border-white/10 pt-16 md:mt-28 md:pt-20">
      <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-2xl text-center">
       <h2 id="roadmaps-heading" className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
        Don&apos;t just study.
        <span className="block text-gray-400">
        Know what to study.
      </span>
      </h2>

    </div>

    <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3 md:gap-6">

    <Link
      href="/roadmaps/gate"
      className="group flex min-h-64 flex-col rounded-3xl border border-white/[0.09] bg-gradient-to-br from-white/[0.045] to-white/[0.015] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:from-blue-400/[0.08] hover:to-white/[0.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
    >
      <span className="text-sm font-semibold text-blue-400">
        GATE
      </span>

      <h3 className="mt-4 text-2xl font-bold">
        How to prepare for GATE
      </h3>

      <p className="mt-3 text-sm leading-6 text-gray-400">
        Understand subjects, PYQs, revision, mock tests and how to
        prepare alongside college.
      </p>

      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-300">
        View roadmap
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </span>
    </Link>

    <Link
      href="/roadmaps/dsa"
      className="group relative flex min-h-64 flex-col overflow-hidden rounded-3xl border border-purple-400/20 bg-gradient-to-br from-purple-400/[0.07] via-white/[0.025] to-white/[0.015] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:border-purple-300/40 hover:from-purple-400/[0.11] hover:to-purple-400/[0.025] hover:shadow-[0_20px_60px_rgba(168,85,247,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300"
    >
      <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-purple-500/[0.1] blur-3xl transition duration-300 group-hover:bg-purple-400/[0.18]" />
      <div className="relative flex flex-1 flex-col">
        <span className="text-sm font-semibold tracking-wide text-purple-300">
          DSA
        </span>

        <h3 className="mt-4 text-2xl font-bold text-white">
          How to learn DSA
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-300">
          Follow patterns, roadmaps and problem-solving strategies
          instead of randomly solving questions.
        </p>

        <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-purple-200">
          Start DSA
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>

      <Link
        href="/roadmaps/placement"
        className="group flex min-h-64 flex-col rounded-3xl border border-white/[0.09] bg-gradient-to-br from-white/[0.045] to-white/[0.015] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:from-emerald-400/[0.07] hover:to-white/[0.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
      >
        <span className="text-sm font-semibold text-emerald-400">
         PLACEMENT
        </span>

        <h3 className="mt-4 text-2xl font-bold">
          How to crack placements
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-400">
          Build DSA, aptitude, CS fundamentals, projects and interview
          skills step by step.
        </p>

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300">
          View placement plan
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </Link>

    </div>
      </div>
      </section>

        <div className="mt-20 border-t border-white/10 pt-12 md:mt-28 md:pt-16">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              How it works
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              Choose a preparation area, find a practice format, and start a test when you are ready.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            <article className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-7">
              <span className="font-mono text-sm font-semibold text-blue-400">01</span>
              <h3 className="mt-3 text-lg font-bold text-white">Choose your track</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Start with GATE CSE, DSA, or Placement based on what you are preparing for.
              </p>
              <Link
                href="#tracks"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-blue-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
              >
                View preparation tracks <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>

            <article className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-7">
              <span className="font-mono text-sm font-semibold text-blue-400">02</span>
              <h3 className="mt-3 text-lg font-bold text-white">Pick a practice format</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Browse GATE papers by year, practise by subject, or explore DSA roadmaps and placement topics.
              </p>
              <Link
                href="/gate/pyq"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-blue-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
              >
                Browse GATE papers <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>

            <article className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-7">
              <span className="font-mono text-sm font-semibold text-blue-400">03</span>
              <h3 className="mt-3 text-lg font-bold text-white">Start a practice session</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Open a mock test or practice set and work through questions at your own pace.
              </p>
              <Link
                href="/gate/mock"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-blue-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
              >
                View GATE mock tests <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
