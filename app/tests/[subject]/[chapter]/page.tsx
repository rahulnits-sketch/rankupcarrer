import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestCard from "@/components/TestCard";
import subjectsData from "@/data/subjects.json";
import chaptersData from "@/data/chapters.json";
import BackButton from "@/components/BackButton";

type PracticeTest = {
  id: string;
  title: string;
  duration: string;
  difficulty: string;
  questionsCount: number;
};

type Chapter = {
  id: string;
  name: string;
  description: string;
  tests: PracticeTest[];
};

type PageProps = {
  params: Promise<{ subject: string; chapter: string }>;
};

export default async function ChapterTestsPage({ params }: PageProps) {
  const { subject, chapter } = await params;
  const subjectInfo = subjectsData.find((s) => s.id === subject);
  const chapterList = (chaptersData as Record<string, Chapter[]>)[subject] || [];
  const chapterInfo = chapterList.find((c) => c.id === chapter);

  if (!subjectInfo || !chapterInfo) {
    notFound();
  }

  const tests = chapterInfo.tests || [];

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16 w-full flex-1">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition">Home</Link>
          <span>/</span>
          <Link href="/tests" className="hover:text-slate-900 transition">Explore Hub</Link>
          <span>/</span>
          <Link href={`/tests/${subject}`} className="hover:text-slate-900 transition">{subjectInfo.name}</Link>
          <span>/</span>
          <span className="text-blue-700 font-medium">{chapterInfo.name}</span>
        </div>

        {/* Header */}
        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-8">
          <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 uppercase tracking-wider">
            {subjectInfo.shortName} • Chapter Tests
          </span>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {chapterInfo.name}
          </h1>

          <p className="mt-2 text-xs leading-relaxed text-slate-600 max-w-2xl">
            {chapterInfo.description}
          </p>
        </div>

        {/* Tests List */}
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">Available Practice Tests ({tests.length})</h2>
            <div className="flex items-center gap-3">
              <BackButton />
              <Link
                href={`/tests/${subject}`}
                className="text-xs font-semibold text-blue-700 hover:text-blue-700"
              >
                ← Back to {subjectInfo.shortName} Chapters
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tests.map((t) => (
              <TestCard
                key={t.id}
                id={t.id}
                title={t.title}
                subject={subjectInfo.name}
                categoryLabel={`${subjectInfo.shortName} Chapter Test`}
                description={chapterInfo.description}
                duration={t.duration}
                difficulty={t.difficulty}
                questionCount={`${t.questionsCount} Questions`}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
