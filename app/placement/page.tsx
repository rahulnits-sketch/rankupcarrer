import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestCard from "@/components/TestCard";
import placementData from "@/data/placement.json";
import testsData from "@/data/tests.json";
import BackButton from "@/components/BackButton";
import SubNavPills from "@/components/SubNavPills";
import { placementNavPills } from "@/lib/hubNav";

export const metadata: Metadata = {
  title: "Campus Placement Preparation - Aptitude, Reasoning, DSA & Tech Tests",
  description:
    "Comprehensive college placement preparation hub. Practice quantitative aptitude, logical reasoning, verbal ability, and technical interview questions for top tech companies.",
  keywords: [
    "placement preparation",
    "DSA placement preparation",
    "campus placement aptitude",
    "technical interview preparation",
    "campus placement mock test",
    "software engineer placement",
  ],
};


export default function PlacementPage() {
  const placementTests = testsData.filter((t) => t.category === "placement");

  return (
    <main className="min-h-screen bg-[#08090b] text-white flex flex-col justify-between">
      <Navbar />
      <SubNavPills categoryTitle="EXPLORE PLACEMENT" pills={placementNavPills} />
      <section className="mx-auto max-w-7xl px-6 py-4 md:py-16 w-full flex-1">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-5xl">
            Placement Prep
          </h1>
          <BackButton />
        </div>

        {/* Modules Grid */}
        <div className="mb-14 grid gap-6 md:grid-cols-3">
          {placementData.modules.map((m) => (
            <div
              key={m.id}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-7 transition duration-200 hover:-translate-y-1 hover:border-amber-500/40 hover:bg-white/[0.04]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-2xl">
                    {m.icon}
                  </span>
                  <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-gray-400">
                    {m.tests.length} {m.tests.length === 1 ? "Test" : "Tests"}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold text-white group-hover:text-amber-400 transition">
                  {m.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {m.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-0.5 text-[11px] text-gray-400"
                    >
                      {topic}
                    </span>
                  ))}
                  {m.topics.length > 3 && (
                    <span className="text-[11px] text-gray-500 self-center">
                      +{m.topics.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 border-t border-white/10 pt-4">
                <Link
                  href={`/placement/${m.slug}`}
                  className="block w-full rounded-xl bg-amber-500 py-2.5 text-center text-xs font-bold text-black transition hover:bg-amber-400 shadow-lg shadow-amber-500/20"
                >
                  Explore {m.title} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
