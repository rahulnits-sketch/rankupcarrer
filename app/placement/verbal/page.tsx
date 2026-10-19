import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestCard from "@/components/TestCard";
import SubNavPills from "@/components/SubNavPills";
import { placementNavPills } from "@/lib/hubNav";
import placementData from "@/data/placement.json";

export default function VerbalPage() {
  const moduleInfo = placementData.modules.find((m) => m.id === "verbal")!;

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />
      <SubNavPills categoryTitle="EXPLORE PLACEMENT" pills={placementNavPills} />

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16 w-full flex-1">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition">Home</Link>
          <span>/</span>
          <Link href="/placement" className="hover:text-slate-900 transition">Placement Prep</Link>
          <span>/</span>
          <span className="text-blue-700 font-medium">Verbal Ability</span>
        </div>

        {/* Header */}
        <div className="mb-10 rounded-2xl border border-blue-200 bg-blue-500/[0.03] p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
              {moduleInfo.icon}
            </span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                Module Assessment
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                {moduleInfo.title}
              </h1>
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-slate-600 max-w-2xl">
            {moduleInfo.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {moduleInfo.topics.map((t) => (
              <span key={t} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Tests List */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Available Verbal Tests</h2>
            <Link href="/placement" className="text-xs font-semibold text-blue-700 hover:text-blue-700">
              ← Back to Placement Modules
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {moduleInfo.tests.map((test) => (
              <TestCard
                key={test.id}
                id={test.id}
                title={test.title}
                subject="Verbal Ability"
                categoryLabel="Placement Prep"
                description={test.description}
                duration={test.duration}
                difficulty={test.difficulty}
                questionCount={`${test.questionsCount} Questions`}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
