"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import SubNavPills from "@/components/SubNavPills";
import { dsaNavPills } from "@/lib/hubNav";
import {
  ArrowRight,
  Brain,
  Code2,
  Flame,
  Rocket,
  Target,
  Trophy,
} from "lucide-react";
import { striverA2Z } from "@/data/dsa/roadmaps/striverA2Z";
import {
  getStriverProgressSnapshot,
  subscribeToStriverProgress,
} from "@/data/dsa/roadmaps/progress";

interface RoadmapItem {
  id: string;
  title: string;
  icon: typeof Rocket;
  level: string;
  problems: string;
  progress: number;
  available: boolean;
}

const initialRoadmaps: RoadmapItem[] = [
  {
    id: "striver-a2z",
    title: "Striver A2Z",
    icon: Rocket,
    level: "Beginner → Advanced",
    problems: "450+",
    progress: 0,
    available: true,
  },
  {
    id: "neetcode-150",
    title: "NeetCode 150",
    icon: Brain,
    level: "Interview",
    problems: "150",
    progress: 0,
    available: false,
  },
  {
    id: "blind-75",
    title: "Blind 75",
    icon: Target,
    level: "Interview",
    problems: "75",
    progress: 0,
    available: false,
  },
  {
    id: "love-babbar",
    title: "Love Babbar 450",
    icon: Trophy,
    level: "Intermediate",
    problems: "450",
    progress: 0,
    available: false,
  },
  {
    id: "coder-army",
    title: "Coder Army",
    icon: Code2,
    level: "Beginner → Advanced",
    problems: "Curated",
    progress: 0,
    available: false,
  },
];

export default function RoadmapsPage() {
  const savedProgress = useSyncExternalStore(
    subscribeToStriverProgress,
    getStriverProgressSnapshot,
    () => "[]",
  );
  const striverProgress = (() => {
    try {
      const completed: unknown = JSON.parse(savedProgress);
      return Array.isArray(completed) && striverA2Z.length > 0
        ? Math.round((completed.length / striverA2Z.length) * 100)
        : 0;
    } catch {
      return 0;
    }
  })();

  return (
    <main className="min-h-screen bg-[#08090b] text-white flex flex-col justify-between">
      <Navbar />
      <SubNavPills categoryTitle="EXPLORE DSA" pills={dsaNavPills} />

      <section className="mx-auto max-w-7xl px-6 py-8 md:py-12 w-full flex-1">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/dsa"
              className="inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-white"
            >
              ← Back to DSA
            </Link>
            <BackButton />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
              <Flame className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                DSA Preparation & Sheets
              </p>

              <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
                DSA Roadmaps
              </h1>
            </div>
          </div>
        </div>

        {/* Roadmap Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {initialRoadmaps.map((roadmap) => {
            const Icon = roadmap.icon;
            const currentProgress = roadmap.id === "striver-a2z" ? striverProgress : roadmap.progress;

            return (
              <div
                key={roadmap.id}
                className={`group relative overflow-hidden rounded-3xl border p-6 transition duration-300 ${
                  roadmap.available
                    ? "border-cyan-500/30 bg-white/[0.04] hover:-translate-y-1 hover:border-cyan-400 hover:bg-white/[0.07]"
                    : "border-white/10 bg-white/[0.02] opacity-75"
                }`}
              >
                {/* Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

                <div className="relative">
                  {/* Icon */}
                  <div className="mb-6 flex items-center justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                        roadmap.available ? "bg-cyan-500/10 text-cyan-400" : "bg-white/10 text-gray-400"
                      }`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>

                    {!roadmap.available && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
                        Coming Soon
                      </span>
                    )}

                    {roadmap.available && (
                      <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
                        Available Now
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold">{roadmap.title}</h2>

                  {/* Stats */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <p className="text-xs text-gray-500">Level</p>
                      <p className="mt-1 text-sm font-semibold">{roadmap.level}</p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <p className="text-xs text-gray-500">Problems</p>
                      <p className="mt-1 text-sm font-semibold">{roadmap.problems}</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-gray-500">Your Progress</span>
                      <span className="font-semibold text-gray-300">
                        {currentProgress}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                        style={{ width: `${currentProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Button */}
                  <div className="mt-6">
                    {roadmap.available ? (
                      <Link
                        href={`/dsa/roadmaps/${roadmap.id}`}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-bold text-black transition hover:bg-cyan-300"
                      >
                        Start Roadmap
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-500"
                      >
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
