"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import SubNavPills from "@/components/SubNavPills";
import { gateNavPills } from "@/lib/hubNav";
import { getPyqManifest } from "@/lib/gate";
import { gateBranches, type GateBranchSlug } from "@/data/gate/branches";
import BranchSelector from "@/components/BranchSelector";

function GatePyqContent() {
  const searchParams = useSearchParams();
  const branchFromUrl = (searchParams.get("branch") as GateBranchSlug) || "cse-it";

  const [selectedBranch, setSelectedBranch] = useState<GateBranchSlug>(
    branchFromUrl in gateBranches ? branchFromUrl : "cse-it"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const currentBranch = gateBranches[selectedBranch] || gateBranches["cse-it"];

  const currentManifest = useMemo(() => {
    return getPyqManifest(selectedBranch);
  }, [selectedBranch]);

  // Extract all distinct years in descending order
  const distinctYears = useMemo(() => {
    const set = new Set<number>();
    currentManifest.forEach((p) => set.add(p.year));
    return Array.from(set).sort((a, b) => b - a);
  }, [currentManifest]);

  const [selectedYear, setSelectedYear] = useState<number>(distinctYears[0] || 2024);
  const [selectedPaperKey, setSelectedPaperKey] = useState<string>("");

  // Sync state if branch changes or on initial load
  useEffect(() => {
    if (distinctYears.length > 0) {
      const topYear = distinctYears[0];
      setSelectedYear(topYear);
      const firstP = currentManifest.find((p) => p.year === topYear);
      if (firstP) setSelectedPaperKey(firstP.yearSetKey);
    }
  }, [selectedBranch, distinctYears, currentManifest]);

  // Sync if URL query param changes
  useEffect(() => {
    const b = searchParams.get("branch") as GateBranchSlug;
    if (b && b in gateBranches && b !== selectedBranch) {
      setSelectedBranch(b);
    }
  }, [searchParams, selectedBranch]);

  const handleBranchChange = (newBranch: GateBranchSlug) => {
    setSelectedBranch(newBranch);
    const newManifest = getPyqManifest(newBranch);
    const newYears = Array.from(new Set(newManifest.map((p) => p.year))).sort((a, b) => b - a);
    if (newYears.length > 0) {
      setSelectedYear(newYears[0]);
      const firstP = newManifest.find((p) => p.year === newYears[0]);
      if (firstP) setSelectedPaperKey(firstP.yearSetKey);
    }
    const url = newBranch === "cse-it" ? "/gate/pyq" : `/gate/pyq?branch=${newBranch}`;
    window.history.replaceState(null, "", url);
  };

  // Papers for the selected year
  const yearPapers = useMemo(() => {
    return currentManifest.filter((p) => p.year === selectedYear);
  }, [currentManifest, selectedYear]);

  // Currently selected paper
  const activePaper = useMemo(() => {
    const match = currentManifest.find((p) => p.yearSetKey === selectedPaperKey);
    if (match && match.year === selectedYear) return match;
    return yearPapers[0] || currentManifest[0];
  }, [currentManifest, selectedPaperKey, selectedYear, yearPapers]);

  // Search filter
  const filteredPapers = useMemo(() => {
    if (!searchQuery.trim()) return currentManifest;
    const q = searchQuery.toLowerCase().trim();
    return currentManifest.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        String(p.year).includes(q) ||
        p.yearSetKey.toLowerCase().includes(q)
    );
  }, [currentManifest, searchQuery]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:py-16 w-full flex-1">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900 transition">Home</Link>
        <span>/</span>
        <Link href={`/gate/${selectedBranch}`} className="hover:text-slate-900 transition">
          GATE {currentBranch.code}
        </Link>
        <span>/</span>
        <span className="text-blue-700 font-medium">PYQ Paper</span>
      </div>

      {/* Primary SEO Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          GATE {currentBranch.code} Previous Year Questions (1987 – 2026) with Step-by-Step Solutions
        </h1>
        <p className="mt-2 text-sm text-slate-600 sm:text-base max-w-4xl">
          Practice 38 years of authentic GATE {currentBranch.name} ({currentBranch.code}) solved question papers in authentic CBT online test format. Filter by year, examine derivations, and master the official IIT syllabus.
        </p>
      </div>

      {/* Engineering Branch Selector */}
      <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <BranchSelector
          selectedBranch={selectedBranch}
          onChangeBranch={handleBranchChange}
        />
      </div>

      {/* Interactive Year Selector & Active Paper Hero Card */}
      <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Main Paper Selection / Hero */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>

              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">
                {activePaper?.title || `GATE ${currentBranch.code} ${selectedYear}`}
              </h2>
            </div>

            {/* Set Selector if multiple sets available for the selected year */}
            {yearPapers.length > 1 && (
              <div className="flex flex-wrap items-center gap-2 bg-slate-50 border border-slate-200 p-1 rounded-xl">
                {yearPapers.map((p) => {
                  const label = p.title.includes("Set")
                    ? `Set ${p.set}`
                    : p.title.replace(new RegExp(`GATE\\s+(?:${currentBranch.code}|CSE)?\\s*\\d{4}\\s*—?\\s*`, "i"), "") || `Paper ${p.set}`;
                  return (
                    <button
                      key={p.yearSetKey}
                      onClick={() => setSelectedPaperKey(p.yearSetKey)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                        activePaper?.yearSetKey === p.yearSetKey
                          ? "bg-blue-600 text-white shadow"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Paper Metrics Grid */}
          <div className="my-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
              <span className="text-2xl font-bold text-blue-700">{activePaper?.totalQuestions ?? 0}</span>
              <p className="mt-1 text-xs text-slate-600">Total Questions</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
              <span className="text-2xl font-bold text-emerald-700">{activePaper?.totalMarks ?? 100}</span>
              <p className="mt-1 text-xs text-slate-600">Total Marks</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
              <span className="text-2xl font-bold text-amber-700">{activePaper?.durationMinutes ?? 180} min</span>
              <p className="mt-1 text-xs text-slate-600">Exam Duration</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
              <span className="text-2xl font-bold text-blue-700">
                {currentBranch.code} Section
              </span>
              <p className="mt-1 text-xs text-slate-600">Official Exam</p>
            </div>
          </div>


          {/* Start Button */}
          <div className="flex flex-wrap items-center gap-4">
            {activePaper && (
              <Link
                href={`/test/${activePaper.id}`}
                className="inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition hover:scale-105 hover:bg-blue-500"
              >
                <span>Start Full Exam</span>
                <span className="text-base">→</span>
              </Link>
            )}

            <span className="text-xs text-slate-600">
              Instant GATE Analysis &amp; Official Solutions upon submission.
            </span>
          </div>
        </div>

        {/* Quick Year Browser Sidebar */}
        <aside className="rounded-3xl border border-slate-200 bg-white p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
                Select Year ({distinctYears.length})
              </h3>
              <span className="text-xs text-blue-700 font-semibold">
                {distinctYears[distinctYears.length - 1]}–{distinctYears[0]}
              </span>
            </div>

            {/* Year Grid */}
            <div className="grid grid-cols-4 gap-2 max-h-[420px] overflow-y-auto pr-1">
              {distinctYears.map((yr) => (
                <button
                  key={yr}
                  onClick={() => {
                    setSelectedYear(yr);
                    const firstP = currentManifest.find((p) => p.year === yr);
                    if (firstP) setSelectedPaperKey(firstP.yearSetKey);
                  }}
                  className={`py-2 text-xs font-bold rounded-xl border transition ${
                    selectedYear === yr
                      ? "bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4 mt-6 text-center">
            <p className="text-xs text-slate-500">
              All {currentManifest.length} papers verified with official answer keys &amp; solutions.
            </p>
          </div>
        </aside>
      </div>

      {/* Complete Historical Papers Catalog Grid */}
      <div className="mt-14">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              All GATE {currentBranch.shortTitle} Papers Archive ({filteredPapers.length})
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Browse and launch any historical GATE {currentBranch.code} exam test directly.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder={`Search ${currentBranch.code} year or paper...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-900 placeholder-slate-500 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPapers.map((p) => (
            <div
              key={p.yearSetKey}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:border-blue-500/40 hover:bg-slate-50"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[11px] font-bold text-blue-700">
                    GATE {p.year} {p.set > 1 ? `• Set ${p.set}` : ""}
                  </span>
                  <span className="text-[11px] text-slate-600 font-mono">
                    ⏱ {p.durationMinutes} min
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition">
                  {p.title}
                </h3>

                <p className="text-xs text-slate-600 mt-1">
                  {p.totalQuestions} Questions • {p.totalMarks} Total Marks
                </p>
              </div>

              <div className="mt-5 border-t border-slate-200/70 pt-3">
                <Link
                  href={`/test/${p.id}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-50 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-blue-600 hover:text-white"
                >
                  <span>Start Test</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GatePyqPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      <Navbar />
      <SubNavPills categoryTitle="EXPLORE GATE" pills={gateNavPills} />
      <Suspense fallback={<div className="p-12 text-center text-slate-600">Loading GATE Papers...</div>}>
        <GatePyqContent />
      </Suspense>
      <Footer />
    </main>
  );
}
