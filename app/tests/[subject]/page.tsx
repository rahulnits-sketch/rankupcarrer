import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChapterCard from "@/components/ChapterCard";
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
  params: Promise<{ subject: string }>;
};

export default async function SubjectChaptersPage({ params }: PageProps) {
  const { subject } = await params;
  const subjectInfo = subjectsData.find((s) => s.id === subject);

  if (!subjectInfo) {
    notFound();
  }

  const chapters = (chaptersData as Record<string, Chapter[]>)[subject] || [];

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16 w-full flex-1">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition">Home</Link>
          <span>/</span>
          <Link href="/tests" className="hover:text-slate-900 transition">Explore Hub</Link>
          <span>/</span>
          <span className="text-blue-700 font-medium">{subjectInfo.name}</span>
        </div>

        {/* Subject Header */}
        <div className="mb-12 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-2xl shadow-inner">
                {subjectInfo.icon}
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                  {subjectInfo.category}
                </span>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  {subjectInfo.name}
                </h1>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-4 md:border-t-0 md:pt-0">
            <BackButton />
            <Link
              href={`/test/${subject}-01`}
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
            >
              Start Subject Mock Test →
            </Link>
          </div>
        </div>

        {/* Chapters Grid */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Chapters & Units ({chapters.length})</h2>
          <span className="text-xs text-slate-600">Click a chapter to view its tests</span>
        </div>

        {chapters.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {chapters.map((ch) => (
              <ChapterCard
                key={ch.id}
                subjectId={subject}
                chapterId={ch.id}
                name={ch.name}
                description={ch.description}
                tests={ch.tests || []}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <p className="text-sm text-slate-600">
              Chapters for this subject are being updated. You can still practice the general subject test.
            </p>
            <Link
              href="/tests"
              className="mt-4 inline-block text-xs font-semibold text-blue-700 hover:text-blue-700"
            >
              ← Back to Explore Hub
            </Link>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
