import Link from "next/link";

export type ChapterCardProps = {
  subjectId: string;
  chapterId: string;
  name: string;
  description: string;
  tests: Array<{
    id: string;
    title: string;
    duration: string;
    questionsCount: number;
    difficulty: string;
  }>;
};

export default function ChapterCard({
  subjectId,
  chapterId,
  name,
  description,
  tests,
}: ChapterCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:border-blue-200 hover:bg-slate-50">
      <div>
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 uppercase tracking-wider">
            Chapter
          </span>
          <span className="text-xs text-slate-500 font-mono">
            {tests.length} {tests.length === 1 ? "Test" : "Tests"} Available
          </span>
        </div>

        <h3 className="mt-3 text-lg font-bold text-slate-900 tracking-tight">
          {name}
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-slate-600">
          {description}
        </p>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-4">
        <Link
          href={`/tests/${subjectId}/${chapterId}`}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
        >
          Explore Tests ({tests.length}) →
        </Link>
      </div>
    </div>
  );
}
