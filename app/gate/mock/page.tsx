"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import SubNavPills from "@/components/SubNavPills";
import { gateNavPills } from "@/lib/hubNav";
import { getMockPresets, getSubjectsManifest } from "@/lib/gate";
import { gateBranches, type GateBranchSlug } from "@/data/gate/branches";
import BranchSelector from "@/components/BranchSelector";

type MockCategory = "all" | "full" | "subject" | "random";

function GateMockContent() {
  const searchParams = useSearchParams();
  const branchFromUrl = (searchParams.get("branch") as GateBranchSlug) || "cse-it";

  const [selectedBranch, setSelectedBranch] = useState<GateBranchSlug>(
    branchFromUrl in gateBranches ? branchFromUrl : "cse-it"
  );
  const [selectedCategory, setSelectedCategory] = useState<MockCategory>("all");

  const currentBranch = gateBranches[selectedBranch] || gateBranches["cse-it"];

  const currentMockPresets = useMemo(() => {
    return getMockPresets(selectedBranch);
  }, [selectedBranch]);

  const branchSubjects = useMemo(() => {
    return getSubjectsManifest(selectedBranch);
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
    setSelectedCategory("all");
    const url = newBranch === "cse-it" ? "/gate/mock" : `/gate/mock?branch=${newBranch}`;
    window.history.replaceState(null, "", url);
  };

  const fullMocks = useMemo(() => {
    return currentMockPresets.filter((m) => m.type === "Full Mock" || m.questionsCount >= 60);
  }, [currentMockPresets]);

  const subjectMocks = useMemo(() => {
    return currentMockPresets.filter((m) => m.type === "Subject Mock");
  }, [currentMockPresets]);

  const randomMocks = useMemo(() => {
    return currentMockPresets.filter((m) => m.type === "Random Mock" || m.type === "Speed Drill" || m.type === "Topic Drill");
  }, [currentMockPresets]);

  const displayedMocks = useMemo(() => {
    if (selectedCategory === "full") return fullMocks;
    if (selectedCategory === "subject") return subjectMocks;
    if (selectedCategory === "random") return randomMocks;
    return currentMockPresets;
  }, [selectedCategory, fullMocks, subjectMocks, randomMocks, currentMockPresets]);

  const firstSubj = branchSubjects[0];
  const sampleSubjectTestId = firstSubj
    ? selectedBranch === "cse-it"
      ? `gate-mock-subj-${firstSubj.id}`
      : `gate-mock-subj-${selectedBranch}-${firstSubj.id}`
    : "gate-mock-random-30";

  const fullMockTestId =
    selectedBranch === "cse-it"
      ? "gate-mock-random-65"
      : `gate-mock-${selectedBranch}-full-1`;

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
        <span className="text-blue-700 font-medium">Mock Tests</span>
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
            GATE {currentBranch.shortTitle} Mock Tests
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <BackButton />
          <Link
            href={selectedBranch === "cse-it" ? "/gate/pyq" : `/gate/pyq?branch=${selectedBranch}`}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            📅 Official PYQs
          </Link>
        </div>
      </div>

      {/* Engineering Branch Selector */}
      <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        <BranchSelector
          selectedBranch={selectedBranch}
          onChangeBranch={handleBranchChange}
        />
      </div>

      {/* Category Tabs */}
      <div className="mb-8 flex flex-wrap gap-2">
        {([
          { id: "all", label: `All Mock Tests (${currentMockPresets.length})` },
          { id: "full", label: `Full GATE Mocks (${fullMocks.length})` },
          { id: "subject", label: `Subject Mocks (${subjectMocks.length})` },
          ...(randomMocks.length > 0 ? [{ id: "random" as MockCategory, label: `Random / Drills (${randomMocks.length})` }] : []),
        ] satisfies { id: MockCategory; label: string }[]).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
              selectedCategory === tab.id
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mocks Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-14">
        {displayedMocks.map((mock) => {
          const isFull = mock.type === "Full Mock" || mock.questionsCount >= 60;
          const isRandom = mock.type === "Random Mock" || mock.type === "Speed Drill" || mock.type === "Topic Drill";

          return (
            <div
              key={mock.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-50"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider ${
                      isFull
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : isRandom
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    {mock.type}
                  </span>
                  <span className="text-xs font-mono text-slate-600">
                    ⏱ {mock.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition">
                  {mock.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {mock.description}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-200/70 pt-3 text-xs text-slate-700">
                  <div>
                    <span className="text-slate-500">Questions: </span>
                    <span className="font-semibold text-slate-900">{mock.questionsCount}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Total Marks: </span>
                    <span className="font-semibold text-emerald-700">{mock.totalMarks}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-4">
                <Link
                  href={`/test/${mock.id}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
                >
                  <span>Launch Mock Exam</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Launch Banner */}
      <div className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-50 via-white to-slate-50 p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              ⚡ Instant Simulation
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              GATE {currentBranch.shortTitle} Exam Simulator
            </h2>
            <p className="text-xs text-slate-700 mt-2 max-w-xl leading-relaxed">
              Experience the actual exam environment with official pattern questions, instant evaluation, negative marking, and complete solutions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {firstSubj && (
              <Link
                href={`/test/${sampleSubjectTestId}`}
                className="rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 text-xs font-semibold text-slate-900 hover:bg-slate-100 transition"
              >
                Subject Mock ({firstSubj.shortName})
              </Link>
            )}
            <Link
              href={`/test/${fullMockTestId}`}
              className="rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition"
            >
              Full Mock Exam →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GateMockPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      <Navbar />
      <SubNavPills categoryTitle="EXPLORE GATE" pills={gateNavPills} />
      <Suspense fallback={<div className="p-12 text-center text-slate-600">Loading GATE Mock Tests...</div>}>
        <GateMockContent />
      </Suspense>
      <Footer />
    </main>
  );
}
