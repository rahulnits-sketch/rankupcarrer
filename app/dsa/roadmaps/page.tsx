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
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />
      <SubNavPills categoryTitle="EXPLORE DSA" pills={dsaNavPills} />

      <section className="mx-auto max-w-7xl px-6 py-8 md:py-12 w-full flex-1">
        {/* Header */}
        <div className="mb-10">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/dsa"
              className="inline-flex items-center gap-2 text-sm text-slate-600 transition hover:text-slate-900"
            >
              ← Back to DSA
            </Link>
            <BackButton />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <Flame className="h-6 w-6" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
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
                    ? "border-blue-200 bg-slate-50 hover:-translate-y-1 hover:border-blue-400 hover:bg-slate-100"
                    : "border-slate-200 bg-white opacity-75"
                }`}
              >
                {/* Glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-50 blur-3xl" />

                <div className="relative">
                  {/* Icon */}
                  <div className="mb-6 flex items-center justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                        roadmap.available ? "bg-blue-50 text-blue-700" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Icon className="h-7 w-7" />
                    </div>

                    {!roadmap.available && (
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
                        Coming Soon
                      </span>
                    )}

                    {roadmap.available && (
                      <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        Available Now
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold">{roadmap.title}</h2>

                  {/* Stats */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Level</p>
                      <p className="mt-1 text-sm font-semibold">{roadmap.level}</p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs text-slate-500">Problems</p>
                      <p className="mt-1 text-sm font-semibold">{roadmap.problems}</p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Your Progress</span>
                      <span className="font-semibold text-slate-700">
                        {currentProgress}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-400 transition-all duration-500"
                        style={{ width: `${currentProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Button */}
                  <div className="mt-6">
                    {roadmap.available ? (
                      <Link
                        href={`/dsa/roadmaps/${roadmap.id}`}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                      >
                        Start Roadmap
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-500"
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
