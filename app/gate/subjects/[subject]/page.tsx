import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import SubNavPills from "@/components/SubNavPills";
import { gateNavPills } from "@/lib/hubNav";
import subjectsManifest from "@/data/gate/subjects/manifest.json";
import { getSubjectsManifest } from "@/lib/gate";
import { gateBranches, type GateBranchSlug } from "@/data/gate/branches";

type PageProps = {
  params: Promise<{ subject: string }>;
  searchParams: Promise<{ branch?: string }>;
};

type SubjectTopic = {
  name: string;
  questionCount: number;
};

type SubjectData = {
  name?: string;
  shortName?: string;
  topics: SubjectTopic[];
  totalQuestions: number;
};

export default async function SubjectDetailPage({ params, searchParams }: PageProps) {
  const { subject } = await params;
  const { branch: queryBranch } = (await searchParams) || {};

  let targetBranch = queryBranch as GateBranchSlug | undefined;
  let subjectMeta: any = null;

  if (targetBranch && targetBranch in gateBranches) {
    const manifest = getSubjectsManifest(targetBranch);
    subjectMeta = manifest.find((s) => s.id === subject);
  }

  if (!subjectMeta) {
    // Check CSE first
    const cseMeta = subjectsManifest.find((s) => s.id === subject);
    if (cseMeta) {
      subjectMeta = cseMeta;
      targetBranch = "cse-it";
    } else {
      // Check other branches
      for (const bSlug of ["mechanical", "civil", "electrical", "ece"] as GateBranchSlug[]) {
        const manifest = getSubjectsManifest(bSlug);
        const match = manifest.find((s) => s.id === subject);
        if (match) {
          subjectMeta = match;
          targetBranch = bSlug;
          break;
        }
      }
    }
  }

  if (!subjectMeta || !targetBranch) {
    notFound();
  }

  const currentBranch = gateBranches[targetBranch] || gateBranches["cse-it"];

  // Load subject file with topics and questions
  let subjectData: SubjectData;
  try {
    if (targetBranch === "cse-it") {
      const mod = await import(`@/data/gate/subjects/${subject}.json`);
      subjectData = mod.default as SubjectData;
    } else {
      const mod = await import(`@/data/gate/branches/${targetBranch}/subjects/${subject}.json`);
      subjectData = mod.default as SubjectData;
    }
  } catch {
    notFound();
  }

  const topics = subjectData.topics || [];
  const totalQuestions = subjectData.totalQuestions || 0;

  const practiceAllHref =
    targetBranch === "cse-it"
      ? `/test/gate-subject-${subject}`
      : `/test/gate-subject-${targetBranch}-${subject}`;

  const subjectMockHref =
    targetBranch === "cse-it"
      ? `/test/gate-mock-subj-${subject}`
      : `/test/gate-mock-subj-${targetBranch}-${subject}`;

  return (
    <main className="min-h-screen bg-[#08090b] text-white flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      <Navbar />
      <SubNavPills categoryTitle="EXPLORE GATE" pills={gateNavPills} />

      <section className="mx-auto max-w-7xl px-6 py-10 md:py-16 w-full flex-1">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <span>/</span>
          <Link href={`/gate/${targetBranch}`} className="hover:text-white transition">
            GATE {currentBranch.code}
          </Link>
          <span>/</span>
          <Link
            href={targetBranch === "cse-it" ? "/gate/subjects" : `/gate/subjects?branch=${targetBranch}`}
            className="hover:text-white transition"
          >
            Subjects
          </Link>
          <span>/</span>
          <span className="text-blue-400 font-medium">{subjectMeta.name}</span>
        </div>

        {/* Hero Header */}
        <div className="mb-12 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-3xl shadow-inner border border-white/10">
              {subjectMeta.icon}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  {subjectMeta.shortName} • GATE {currentBranch.code}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white mt-1">
                {subjectMeta.name}
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                {totalQuestions} Authentic GATE Questions across {topics.length} Syllabus Topics
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-4 md:border-t-0 md:pt-0">
            <BackButton />
            <Link
              href={practiceAllHref}
              className="rounded-xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500"
            >
              Practice All {subjectMeta.shortName} PYQs ({totalQuestions}) →
            </Link>
            <Link
              href={subjectMockHref}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-semibold text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              ⚡ Subject Mock Test
            </Link>
          </div>
        </div>

        {/* Topics & Chapters Breakdown Grid */}
        <div className="mb-12">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">Syllabus Topics &amp; Practice Sets</h2>
              <p className="text-xs text-gray-400 mt-1">
                Select any topic to practice targeted GATE questions with instant grading and explanations.
              </p>
            </div>
            <span className="text-xs text-blue-400 font-semibold bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 self-start sm:self-auto">
              {topics.length} Topic Areas
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((t, idx) => {
              const topicSlug = encodeURIComponent(t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
              const topicTestHref =
                targetBranch === "cse-it"
                  ? `/test/gate-topic-${subject}-${topicSlug}`
                  : `/test/gate-topic-${targetBranch}-${subject}-${topicSlug}`;

              return (
                <div
                  key={t.name || idx}
                  className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition duration-200 hover:border-blue-500/40 hover:bg-white/[0.04]"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                        Topic {idx + 1}
                      </span>
                      <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold text-gray-300 border border-white/5">
                        {t.questionCount} Questions
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition">
                      {t.name}
                    </h3>
                  </div>

                  <div className="mt-5 border-t border-white/5 pt-3">
                    <Link
                      href={topicTestHref}
                      className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-white/5 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-600 hover:text-white"
                    >
                      <span>Practice Topic PYQs</span>
                      <span>→</span>
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
