import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestCard from "@/components/TestCard";
import dsaData from "@/data/dsa.json";
import BackButton from "@/components/BackButton";

export default function DSATopicView({ topicId }: { topicId: string }) {
  const topicInfo = dsaData.topics.find((t) => t.id === topicId || t.slug === topicId);
  const topicDescription = topicInfo as
    | ((typeof dsaData.topics)[number] & { description?: string })
    | undefined;

  if (!topicInfo) {
    return (
      <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
        <Navbar />
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="text-2xl font-bold">Topic not found</h1>
          <Link href="/dsa" className="mt-4 inline-block text-blue-700">← Back to DSA</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16 w-full flex-1">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition">Home</Link>
          <span>/</span>
          <Link href="/dsa" className="hover:text-slate-900 transition">DSA</Link>
          <span>/</span>
          <span className="text-blue-700 font-medium">{topicInfo.title}</span>
        </div>

        {/* Header */}
        <div className="mb-10 rounded-2xl border border-blue-200 bg-blue-500/[0.03] p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
              {topicInfo.icon}
            </span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                DSA Practice Module
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                {topicInfo.title}
              </h1>
            </div>
          </div>

          {topicDescription?.description && (
            <p className="mt-4 text-xs leading-relaxed text-slate-600 max-w-2xl">
              {topicDescription.description}
            </p>
          )}
        </div>

        {/* Tests List */}
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">Available Practice Tests</h2>
            <div className="flex items-center gap-3">
              <BackButton />
              <Link href="/dsa" className="text-xs font-semibold text-blue-700 hover:text-blue-700">
                ← Back to All DSA Topics
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topicInfo.tests.map((test) => (
              <TestCard
                key={test.id}
                id={test.id}
                title={test.title}
                subject={topicInfo.title}
                categoryLabel="DSA Practice"
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
