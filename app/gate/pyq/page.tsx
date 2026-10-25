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

  // Sync if URL query param changes
  useEffect(() => {
    const b = searchParams.get("branch") as GateBranchSlug;
    if (b && b in gateBranches && b !== selectedBranch) {
      setSelectedBranch(b);
    }
  }, [searchParams, selectedBranch]);

  const handleBranchChange = (newBranch: GateBranchSlug) => {
    setSelectedBranch(newBranch);
    const url = newBranch === "cse-it" ? "/gate/pyq" : `/gate/pyq?branch=${newBranch}`;
    window.history.replaceState(null, "", url);
  };

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
          Practice 38 years of authentic {currentBranch.title} ({currentBranch.code}) solved question papers in authentic CBT online test format. Filter by year, examine derivations, and master the official IIT syllabus.
        </p>
      </div>

      {/* Engineering Branch Selector */}
      <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <BranchSelector
          selectedBranch={selectedBranch}
          onChangeBranch={handleBranchChange}
        />
      </div>

      {/* Complete Historical Papers Catalog Grid */}
      <div className="mt-10">
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
