import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Check,
  ChevronRight,
  CircuitBoard,
  Clock3,
  Cog,
  Cpu,
  FileQuestion,
  Zap,
} from "lucide-react";
import type { GateBranch } from "@/data/gate/branches";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const branchIcons = {
  cpu: Cpu,
  circuit: CircuitBoard,
  bolt: Zap,
  building: Building2,
  cog: Cog,
} as const;

const accentStyles = {
  blue: {
    text: "text-blue-300",
    border: "border-blue-400/20",
    icon: "border-blue-400/20 bg-blue-400/10 text-blue-200",
    glow: "bg-blue-500/20",
    gradient: "from-blue-500/25 via-indigo-500/10 to-transparent",
    button: "bg-blue-600 hover:bg-blue-500 shadow-blue-950/40",
    badge: "border-blue-300/20 bg-blue-300/10 text-blue-200",
  },
  cyan: {
    text: "text-cyan-300",
    border: "border-cyan-400/20",
    icon: "border-cyan-400/20 bg-cyan-400/10 text-cyan-200",
    glow: "bg-cyan-500/20",
    gradient: "from-cyan-500/25 via-blue-500/10 to-transparent",
    button: "bg-cyan-600 hover:bg-cyan-500 shadow-cyan-950/40",
    badge: "border-cyan-300/20 bg-cyan-300/10 text-cyan-200",
  },
  amber: {
    text: "text-amber-300",
    border: "border-amber-400/20",
    icon: "border-amber-400/20 bg-amber-400/10 text-amber-200",
    glow: "bg-amber-500/20",
    gradient: "from-amber-500/25 via-orange-500/10 to-transparent",
    button: "bg-amber-600 hover:bg-amber-500 shadow-amber-950/40",
    badge: "border-amber-300/20 bg-amber-300/10 text-amber-200",
  },
  emerald: {
    text: "text-emerald-300",
    border: "border-emerald-400/20",
    icon: "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
    glow: "bg-emerald-500/20",
    gradient: "from-emerald-500/25 via-teal-500/10 to-transparent",
    button: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950/40",
    badge: "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
  },
  purple: {
    text: "text-purple-300",
    border: "border-purple-400/20",
    icon: "border-purple-400/20 bg-purple-400/10 text-purple-200",
    glow: "bg-purple-500/20",
    gradient: "from-purple-500/25 via-fuchsia-500/10 to-transparent",
    button: "bg-purple-600 hover:bg-purple-500 shadow-purple-950/40",
    badge: "border-purple-300/20 bg-purple-300/10 text-purple-200",
  },
} as const;

const branchResources = [
  {
    title: "Previous Year Questions",
    description: "Practise official papers and learn from questions asked in past exams.",
    icon: FileQuestion,
    href: "/gate/pyq",
  },
  {
    title: "Mock Tests",
    description: "Build confidence with timed tests and exam-style practice.",
    icon: Clock3,
    href: "/gate/mock",
  },
  {
    title: "Subject Practice",
    description: "Strengthen individual subjects with focused topic-wise practice.",
    icon: BookOpen,
    href: "/gate/subjects",
  },
] as const;

export function getGateBranchMetadata(branch: GateBranch) {
  return {
    title: `${branch.title} Preparation`,
    description: branch.metaDescription,
  };
}

function BranchArtwork({ branch }: { branch: GateBranch }) {
  const Icon = branchIcons[branch.icon];
  const styles = accentStyles[branch.accent];

  return (
    <div
      role="img"
      aria-label={`Illustration for GATE ${branch.shortTitle}`}
      className={`relative isolate mx-auto aspect-[1.2/1] w-full max-w-xl overflow-hidden rounded-[2rem] border ${styles.border} bg-[#0c111a]`}
    >
      <div
        className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${styles.gradient}`}
      />
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 -z-10 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full ${styles.glow} blur-[90px]`}
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 520 430"
        className="absolute inset-0 h-full w-full opacity-60"
        fill="none"
      >
        <defs>
          <pattern
            id={`grid-${branch.slug}`}
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 28 0 L 0 0 0 28" stroke="white" strokeOpacity=".07" />
          </pattern>
        </defs>
        <rect width="520" height="430" fill={`url(#grid-${branch.slug})`} />
        <circle cx="260" cy="210" r="138" stroke="white" strokeOpacity=".12" />
        <circle cx="260" cy="210" r="102" stroke="white" strokeOpacity=".12" />
        <circle cx="260" cy="210" r="66" stroke="white" strokeOpacity=".16" />
        <path
          d="M34 330h92l34-34h54m272-136h-77l-31 31h-47M96 78h76l27 27h39m186 247h-90l-28-28h-46"
          stroke="white"
          strokeOpacity=".2"
          strokeWidth="1.5"
        />
        <circle cx="160" cy="296" r="4" fill="white" fillOpacity=".65" />
        <circle cx="374" cy="191" r="4" fill="white" fillOpacity=".65" />
        <circle cx="198" cy="105" r="4" fill="white" fillOpacity=".65" />
        <circle cx="385" cy="352" r="4" fill="white" fillOpacity=".65" />
      </svg>

      <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[2rem] border border-white/15 bg-[#111926]/85 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:h-44 sm:w-44">
        <div
          className={`absolute inset-3 rounded-[1.4rem] border ${styles.border}`}
        />
        <Icon className={`h-16 w-16 sm:h-20 sm:w-20 ${styles.text}`} strokeWidth={1.3} />
      </div>

      <div className="absolute left-4 top-4 rounded-2xl border border-white/10 bg-[#111722]/90 px-4 py-3 shadow-xl backdrop-blur-md sm:left-7 sm:top-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
          GATE branch
        </p>
        <p className={`mt-1 text-sm font-bold ${styles.text}`}>{branch.code}</p>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111722]/90 px-4 py-3 shadow-xl backdrop-blur-md sm:bottom-7 sm:right-7">
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${styles.icon}`}>
          <Check className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs font-semibold text-white">Your next goal</p>
          <p className="mt-0.5 text-[11px] text-gray-400">Starts with one step</p>
        </div>
      </div>
    </div>
  );
}

export default function GateBranchPage({ branch }: { branch: GateBranch }) {
  const styles = accentStyles[branch.accent];
  const isCse = branch.slug === "cse-it";

  return (
    <main className="flex min-h-screen flex-col bg-[#08090b] text-white selection:bg-blue-500 selection:text-white">
      <Navbar />

      <div className="mx-auto w-full max-w-7xl flex-1 px-5 py-8 sm:px-6 md:py-12">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="transition hover:text-white">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <Link href="/gate" className="transition hover:text-white">GATE Hub</Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className={styles.text}>{branch.shortTitle}</span>
        </nav>

        <section className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-14">
          <div className="max-w-2xl">
            <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${styles.badge}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              GATE {branch.code} PREPARATION HUB
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {branch.title}
              <span className={`mt-2 block ${styles.text}`}>
                Start preparing with confidence.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
              {branch.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={isCse ? "/gate/pyq" : `/gate/pyq?branch=${branch.slug}`}
                className={`inline-flex min-h-12 items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-lg transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300 ${styles.button}`}
              >
                Explore {branch.shortTitle} PYQs
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/gate#branches"
                className="inline-flex min-h-12 items-center rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-gray-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                All GATE branches
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500">
              <span className="inline-flex items-center gap-2">
                <Check className={`h-4 w-4 ${styles.text}`} aria-hidden="true" />
                Branch-focused resources
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className={`h-4 w-4 ${styles.text}`} aria-hidden="true" />
                Study at your own pace
              </span>
            </div>
          </div>

          <BranchArtwork branch={branch} />
        </section>

        <section id="branch-resources" className="scroll-mt-24 pb-10 pt-16 md:pt-24">
          <div className="mb-7 flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={`text-xs font-bold uppercase tracking-[0.18em] ${styles.text}`}>
                Your preparation toolkit
              </p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                Start with the right resources
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-gray-400">
              Authentic official papers, chapter-wise questions with step-by-step solutions, and timed mock tests for GATE {branch.shortTitle}.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {branchResources.map((resource) => {
              const Icon = resource.icon;
              const targetHref = isCse ? resource.href : `${resource.href}?branch=${branch.slug}`;
              const cardClassName = "group flex min-h-56 flex-col rounded-2xl border p-5 transition sm:p-6 border-white/10 bg-white/[0.025] hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.045]";
              
              return (
                <Link
                  key={resource.title}
                  href={targetHref}
                  className={`${cardClassName} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl border ${styles.icon}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <ArrowRight className={`h-4 w-4 text-gray-500 transition group-hover:translate-x-1 ${styles.text}`} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">
                    {resource.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-gray-400">
                    {resource.description}
                  </p>
                  <span className={`mt-5 border-t border-white/[0.07] pt-4 text-xs font-semibold ${styles.text}`}>
                    Explore {branch.shortTitle} {resource.title} →
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
