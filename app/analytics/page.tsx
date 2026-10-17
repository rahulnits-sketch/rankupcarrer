"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Flame,
  Award,
  TrendingUp,
  Target,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  BookOpen,
  Calendar,
  Sparkles,
  BarChart3,
  Landmark,
  ShieldCheck,
  Check,
} from "lucide-react";

interface SubjectStats {
  id: string;
  name: string;
  category: string;
  attempted: number;
  accuracy: number;
  status: "Mastered" | "Proficient" | "Needs Practice";
  testHref: string;
}

const CSE_SUBJECTS: SubjectStats[] = [
  {
    id: "algo",
    name: "Algorithms & Asymptotic Analysis",
    category: "Core Computer Science",
    attempted: 142,
    accuracy: 84,
    status: "Mastered",
    testHref: "/gate/cse-it",
  },
  {
    id: "ds",
    name: "Data Structures & Trees/Graphs",
    category: "Core Computer Science",
    attempted: 186,
    accuracy: 88,
    status: "Mastered",
    testHref: "/dsa",
  },
  {
    id: "toc",
    name: "Theory of Computation & Automata",
    category: "Theoretical Computer Science",
    attempted: 110,
    accuracy: 76,
    status: "Proficient",
    testHref: "/gate/cse-it",
  },
  {
    id: "os",
    name: "Operating Systems (CPU Scheduling & Sync)",
    category: "Systems & Architecture",
    attempted: 124,
    accuracy: 82,
    status: "Mastered",
    testHref: "/gate/cse-it",
  },
  {
    id: "dbms",
    name: "Database Systems & Normalization",
    category: "Information Systems",
    attempted: 98,
    accuracy: 79,
    status: "Proficient",
    testHref: "/gate/cse-it",
  },
  {
    id: "cn",
    name: "Computer Networks (TCP/IP & Subnetting)",
    category: "Systems & Architecture",
    attempted: 92,
    accuracy: 69,
    status: "Needs Practice",
    testHref: "/gate/cse-it",
  },
  {
    id: "discrete",
    name: "Discrete Mathematics & Graph Theory",
    category: "Engineering Mathematics",
    attempted: 130,
    accuracy: 85,
    status: "Mastered",
    testHref: "/gate/cse-it",
  },
  {
    id: "coa",
    name: "Computer Organization & Architecture (Pipelining)",
    category: "Systems & Architecture",
    attempted: 84,
    accuracy: 66,
    status: "Needs Practice",
    testHref: "/gate/cse-it",
  },
  {
    id: "compiler",
    name: "Compiler Design (Parsing & LR Grammar)",
    category: "Theoretical Computer Science",
    attempted: 76,
    accuracy: 74,
    status: "Proficient",
    testHref: "/gate/cse-it",
  },
  {
    id: "digital",
    name: "Digital Logic Design & K-Maps",
    category: "Hardware Fundamentals",
    attempted: 95,
    accuracy: 89,
    status: "Mastered",
    testHref: "/gate/cse-it",
  },
];

// Predictive algorithm based on 10-year GATE CSE normalization curves
function calculateRankAndScore(marks: number) {
  const m = Math.min(100, Math.max(0, marks));
  let predictedAirMin = 1;
  let predictedAirMax = 1;
  let gateScore = 1000;
  let percentile = 99.99;

  if (m >= 85) {
    predictedAirMin = 1;
    predictedAirMax = Math.max(1, Math.round(15 - (m - 85)));
    gateScore = Math.round(920 + (m - 85) * 5.3);
    percentile = 99.98;
  } else if (m >= 75) {
    // 75 - 84
    predictedAirMin = Math.round(15 + (85 - m) * 7);
    predictedAirMax = Math.round(predictedAirMin * 1.5);
    gateScore = Math.round(830 + (m - 75) * 9);
    percentile = 99.88;
  } else if (m >= 65) {
    // 65 - 74
    predictedAirMin = Math.round(100 + (75 - m) * 25);
    predictedAirMax = Math.round(predictedAirMin * 1.35);
    gateScore = Math.round(720 + (m - 65) * 11);
    percentile = 99.45;
  } else if (m >= 55) {
    // 55 - 64
    predictedAirMin = Math.round(400 + (65 - m) * 90);
    predictedAirMax = Math.round(predictedAirMin * 1.25);
    gateScore = Math.round(600 + (m - 55) * 12);
    percentile = 98.2;
  } else if (m >= 45) {
    // 45 - 54
    predictedAirMin = Math.round(1500 + (55 - m) * 200);
    predictedAirMax = Math.round(predictedAirMin * 1.2);
    gateScore = Math.round(480 + (m - 45) * 12);
    percentile = 95.5;
  } else if (m >= 35) {
    // 35 - 44
    predictedAirMin = Math.round(4000 + (45 - m) * 500);
    predictedAirMax = Math.round(predictedAirMin * 1.2);
    gateScore = Math.round(370 + (m - 35) * 11);
    percentile = 89.0;
  } else if (m >= 28) {
    // Qualifying zone (28-34)
    predictedAirMin = Math.round(10000 + (35 - m) * 1500);
    predictedAirMax = Math.round(predictedAirMin * 1.25);
    gateScore = Math.round(300 + (m - 28) * 10);
    percentile = 82.0;
  } else {
    // Below Qualifying
    predictedAirMin = 22000;
    predictedAirMax = 35000;
    gateScore = Math.max(100, Math.round(m * 10));
    percentile = 65.0;
  }

  return {
    marks: m,
    predictedAirMin,
    predictedAirMax,
    gateScore: Math.min(1000, gateScore),
    percentile,
  };
}

export default function AnalyticsPage() {
  const [simulatedMarks, setSimulatedMarks] = useState<number>(76);
  const [targetCategory, setTargetCategory] = useState<"General" | "OBC" | "SC_ST">("General");

  const prediction = useMemo(() => {
    return calculateRankAndScore(simulatedMarks);
  }, [simulatedMarks]);

  // Target Institutions Admission Feasibility
  const institutions = [
    {
      name: "IISc Bangalore",
      program: "M.Tech in Computer Science & Automation (CSA) / CDS",
      minScore: 820,
      cutoffAir: 80,
      isPsu: false,
    },
    {
      name: "IIT Bombay",
      program: "M.Tech in Computer Science & Engineering (TA / RA)",
      minScore: 800,
      cutoffAir: 120,
      isPsu: false,
    },
    {
      name: "IIT Delhi & IIT Madras",
      program: "M.Tech CSE Direct Admission Round",
      minScore: 750,
      cutoffAir: 280,
      isPsu: false,
    },
    {
      name: "IIT Kanpur & IIT Kharagpur",
      program: "M.Tech CSE / Information Security",
      minScore: 710,
      cutoffAir: 500,
      isPsu: false,
    },
    {
      name: "IIT Roorkee & IIT Guwahati",
      program: "M.Tech Computer Science & Engineering",
      minScore: 680,
      cutoffAir: 750,
      isPsu: false,
    },
    {
      name: "ISRO Research Centers",
      program: "Scientist / Engineer 'SC' Direct Interview Shortlist",
      minScore: 780,
      cutoffAir: 100,
      isPsu: true,
    },
  ];

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12 w-full flex-1 space-y-10">
        {/* Page Title & Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>Module 4 • Study Analytics &amp; AIR Benchmark Engine</span>
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Performance Intelligence &amp; Rank Predictor
            </h1>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Calibrated against historic GATE normalization distributions and Tier-1 M.Tech cutoffs across IISc Bangalore, IIT Bombay, IIT Madras, and ISRO.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/test/gate-mock-full-2026-1"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 transition"
            >
              <span>Take Full 65-Q CBT Mock</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Section 1: Daily Habit Engine - FR-4.1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active 18-Day Streak Card */}
          <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50/70 via-white to-white p-6 md:p-8 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 text-white shadow-md shadow-amber-500/30">
                <Flame className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-amber-100 border border-amber-200 px-3 py-1 font-mono text-xs font-bold text-amber-900">
                AIR-100 Trajectory
              </span>
            </div>

            <div className="mt-5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Current Preparation Streak
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-mono text-4xl md:text-5xl font-black text-slate-900">
                  18
                </span>
                <span className="text-base font-bold text-amber-700">Days Active</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Personal Best: <strong>24 Days</strong>. Consistency is the single highest predictor of sub-100 AIR rank.
              </p>
            </div>

            {/* Daily Quota Completion Checklist */}
            <div className="mt-6 border-t border-amber-100 pt-4 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                Today&apos;s Target Quota (3/3 Completed)
              </span>
              <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>1 Full CBT Practice Test (OS Scheduling)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>2 SDE Coding Problems (Trapping Rain Water)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Textbook Revision: DBMS Serializability (Korth)</span>
              </div>
            </div>
          </div>

          {/* Activity Heatmap Grid */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    28-Day Practice Consistency Grid
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  Last 4 Weeks Activity
                </span>
              </div>

              {/* 4 weeks x 7 days interactive grid */}
              <div className="grid grid-cols-7 gap-2 pt-2">
                {Array.from({ length: 28 }).map((_, i) => {
                  const day = i + 1;
                  const isActive = day > 10; // 18-day continuous streak
                  const isIntense = day % 3 === 0;

                  return (
                    <div
                      key={day}
                      title={`Day ${day}: ${isActive ? (isIntense ? "2 Tests + 4 DSA Solved" : "1 Test Solved") : "Rest Day"}`}
                      className={`h-10 rounded-xl flex items-center justify-center font-mono text-[11px] font-bold transition hover:scale-105 cursor-pointer ${
                        isActive
                          ? isIntense
                            ? "bg-blue-600 text-white shadow-xs shadow-blue-500/20"
                            : "bg-blue-100 text-blue-800"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded bg-slate-100" /> Less
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded bg-blue-100" /> Active
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded bg-blue-600" /> High Intensity
                </span>
              </div>
              <span className="font-semibold text-slate-700">
                48 Total Hours Logged this Month
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: National Benchmark & Score-to-AIR Rank Predictor - FR-4.3 */}
        <div className="rounded-3xl border border-blue-200 bg-white p-6 md:p-10 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-0.5 text-xs font-bold text-blue-700">
                <Landmark className="h-3.5 w-3.5" />
                <span>Dynamic Cutoff Calibrator</span>
              </div>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-900">
                National Score-to-Rank Predictor
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Simulate raw marks to predict All-India Rank, normalized score, and Tier-1 college admission calls.
              </p>
            </div>

            {/* Category Toggle */}
            <div className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-50 p-1 text-xs font-bold">
              {(["General", "OBC", "SC_ST"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setTargetCategory(cat)}
                  className={`rounded-xl px-3 py-1.5 transition ${
                    targetCategory === cat
                      ? "bg-white text-blue-700 shadow-2xs font-extrabold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {cat === "General" ? "GEN / EWS" : cat === "OBC" ? "OBC-NCL" : "SC / ST / PwD"}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Slider & Result Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Slider Control */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">
                  Simulate Exam Score (Out of 100 Marks):
                </span>
                <span className="font-mono text-3xl font-black text-blue-600">
                  {simulatedMarks}.00
                </span>
              </div>

              <input
                type="range"
                min="10"
                max="95"
                step="1"
                value={simulatedMarks}
                onChange={(e) => setSimulatedMarks(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>10M (Below Cutoff)</span>
                <span>28M (Qualifying)</span>
                <span>55M (Good NITs)</span>
                <span>75M (Top IITs)</span>
                <span>90M+ (AIR 1-10)</span>
              </div>
            </div>

            {/* Output Metric Cards */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Predicted AIR Range
                </span>
                <p className="mt-1 font-mono text-2xl font-black text-blue-900">
                  AIR {prediction.predictedAirMin} – {prediction.predictedAirMax}
                </p>
                <span className="text-[10px] text-slate-500">Based on 1.35L aspirants</span>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Normalized Score
                </span>
                <p className="mt-1 font-mono text-2xl font-black text-emerald-900">
                  {prediction.gateScore} / 1000
                </p>
                <span className="text-[10px] text-slate-500">COAP Counseling Score</span>
              </div>

              <div className="col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center text-xs font-semibold text-slate-700">
                National Percentile: <strong className="text-slate-900 font-mono text-sm">{prediction.percentile}%</strong>
              </div>
            </div>
          </div>

          {/* Admission Probability Matrix */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4">
              Institute Admission Call Probability ({simulatedMarks} Marks Simulation)
            </h3>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {institutions.map((inst) => {
                const isLikely = prediction.gateScore >= inst.minScore;
                const isBorderline =
                  !isLikely && prediction.gateScore >= inst.minScore - 40;

                let badge = {
                  text: "Very High Call Chance",
                  class: "bg-emerald-50 text-emerald-800 border-emerald-200",
                };
                if (isBorderline) {
                  badge = {
                    text: "Borderline / Subsequent Rounds",
                    class: "bg-amber-50 text-amber-800 border-amber-200",
                  };
                } else if (!isLikely) {
                  badge = {
                    text: "Requires Higher Score",
                    class: "bg-slate-100 text-slate-600 border-slate-200",
                  };
                }

                return (
                  <div
                    key={inst.name}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/50 p-4 hover:bg-white hover:border-slate-300 transition"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-900 text-sm">
                          {inst.name}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold border ${badge.class}`}
                        >
                          {badge.text}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {inst.program}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-2 text-[11px] text-slate-500 font-mono">
                      <span>Cutoff Score: {inst.minScore}</span>
                      <span>Target AIR: ≤ {inst.cutoffAir}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 3: Subject-Wise Accuracy Radar across 10 Core Areas - FR-4.2 */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-0.5 text-xs font-bold text-blue-700">
                <BarChart3 className="h-3.5 w-3.5" />
                <span>10 Core CSE Areas Breakdown</span>
              </div>
              <h2 className="mt-2 text-xl font-extrabold text-slate-900">
                Subject-Wise Accuracy &amp; Weak-Area Detection
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              Identifies theoretical vulnerabilities and provides direct links to topic PYQ drills.
            </p>
          </div>

          <div className="space-y-4">
            {CSE_SUBJECTS.map((sub) => {
              const isGreen = sub.accuracy >= 80;
              const isBlue = sub.accuracy >= 70 && sub.accuracy < 80;

              return (
                <div
                  key={sub.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 transition hover:bg-white hover:border-slate-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <span className="font-bold text-slate-900 text-sm">
                        {sub.name}
                      </span>
                      <span className="ml-2 text-[11px] text-slate-500 font-medium">
                        ({sub.category})
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-slate-600">
                        {sub.attempted} Qs Attempted
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold font-mono ${
                          isGreen
                            ? "bg-emerald-100 text-emerald-800"
                            : isBlue
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-900"
                        }`}
                      >
                        {sub.accuracy}% Accuracy
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isGreen
                          ? "bg-emerald-600"
                          : isBlue
                          ? "bg-blue-600"
                          : "bg-amber-500"
                      }`}
                      style={{ width: `${sub.accuracy}%` }}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs pt-1">
                    <span className="text-[11px] text-slate-500">
                      Status: <strong>{sub.status}</strong>
                    </span>
                    <Link
                      href={sub.testHref}
                      className="font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 transition"
                    >
                      <span>Drill {sub.name.split(" ")[0]} PYQs</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
