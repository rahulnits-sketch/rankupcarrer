"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import SubNavPills from "@/components/SubNavPills";
import { gateNavPills } from "@/lib/hubNav";
import { getSubjectsManifest } from "@/lib/gate";
import { gateBranches, type GateBranchSlug } from "@/data/gate/branches";
import BranchSelector from "@/components/BranchSelector";

function GateSubjectsContent() {
  const searchParams = useSearchParams();
  const branchFromUrl = (searchParams.get("branch") as GateBranchSlug) || "cse-it";

  const [selectedBranch, setSelectedBranch] = useState<GateBranchSlug>(
    branchFromUrl in gateBranches ? branchFromUrl : "cse-it"
  );

  const currentBranch = gateBranches[selectedBranch] || gateBranches["cse-it"];

  const currentManifest = useMemo(() => {
    return getSubjectsManifest(selectedBranch);
  }, [selectedBranch]);

  const totalSubjectQuestions = useMemo(() => {
    return currentManifest.reduce((acc, s) => acc + (s.totalQuestions || 0), 0);
  }, [currentManifest]);

  // Sync if URL query param changes
  useEffect(() => {
    const b = searchParams.get("branch") as GateBranchSlug;
    if (b && b in gateBranches && b !== selectedBranch) {
      setSelectedBranch(b);
    }
  }, [searchParams, selectedBranch]);

  const handleBranchChange = (newBranch: GateBranchSlug) => {
    setSelectedBranch(newBranch);
    const url = newBranch === "cse-it" ? "/gate/subjects" : `/gate/subjects?branch=${newBranch}`;
    window.history.replaceState(null, "", url);
  };

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
        <span className="text-blue-700 font-medium">Subject-wise Practice &amp; PYQs</span>
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-slate-200 pb-8">
        <div>
       
          <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
            GATE {currentBranch.shortTitle} Subject-wise PYQs
          </h1>

          <p className="mt-3 text-sm text-slate-600 max-w-3xl leading-relaxed">
            Target your weak areas topic-by-topic with {totalSubjectQuestions}+ Question
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={selectedBranch === "cse-it" ? "/gate/pyq" : `/gate/pyq?branch=${selectedBranch}`}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            📅 Year-wise Papers
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

      {/* Core Subjects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {currentManifest.map((subj) => {
          const detailHref =
            selectedBranch === "cse-it"
              ? `/gate/subjects/${subj.id}`
              : `/gate/subjects/${subj.id}?branch=${selectedBranch}`;

          const subjectMockHref =
            selectedBranch === "cse-it"
              ? `/test/gate-mock-subj-${subj.id}`
              : `/test/gate-mock-subj-${selectedBranch}-${subj.id}`;

          const allPracticeHref =
            selectedBranch === "cse-it"
              ? `/test/gate-subject-${subj.id}`
              : `/test/gate-subject-${selectedBranch}-${subj.id}`;

          return (
            <div
              key={subj.id}
              className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-50"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-2xl shadow-inner">
                    {subj.icon}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {subj.shortName}
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900 transition group-hover:text-blue-700">
                  {subj.name}
                </h2>

                <div className="mt-4 flex items-center gap-3 text-xs text-slate-600">
                  <span className="rounded bg-slate-50 px-2.5 py-1 border border-slate-200/70">
                    {subj.totalQuestions} Questions
                  </span>
                  <span className="rounded bg-slate-50 px-2.5 py-1 border border-slate-200/70">
                    {subj.topicsCount} Topics
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-2 border-t border-slate-200 pt-4">
                <Link
                  href={detailHref}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white transition hover:bg-blue-500 shadow-md shadow-blue-600/20"
                >
                  Explore Topics &amp; Practice →
                </Link>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={allPracticeHref}
                    className="flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-50 py-2 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    📖 All PYQs
                  </Link>
                  <Link
                    href={subjectMockHref}
                    className="flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-slate-50 py-2 text-center text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    ⚡ Mock Test
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function GateSubjectsPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      <Navbar />
      <SubNavPills categoryTitle="EXPLORE GATE" pills={gateNavPills} />
      <Suspense fallback={<div className="p-12 text-center text-slate-600">Loading GATE Subjects...</div>}>
        <GateSubjectsContent />
      </Suspense>
      <Footer />
    </main>
  );
}
