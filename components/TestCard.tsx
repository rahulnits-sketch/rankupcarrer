import Link from "next/link";

export type TestCardProps = {
  id: string;
  title: string;
  subject?: string;
  category?: string;
  categoryLabel?: string;
  description: string;
  questionCount?: string | number;
  duration?: string;
  durationMinutes?: number;
  difficulty?: string;
  isLiveApi?: boolean;
};

export default function TestCard({
  id,
  title,
  subject,
  categoryLabel,
  description,
  questionCount,
  duration,
  durationMinutes,
  difficulty = "Medium",
  isLiveApi = false,
}: TestCardProps) {
  const displayDuration = duration || (durationMinutes ? `${durationMinutes} min` : "15 min");
  const displayCount = questionCount !== undefined ? questionCount : "10 Questions";

  return (
    <div
      className={`group flex flex-col justify-between rounded-2xl border p-6 transition duration-200 hover:-translate-y-1 ${
        isLiveApi
          ? "border-emerald-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50"
          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <p
            className={`text-xs font-semibold uppercase tracking-wider ${
              isLiveApi ? "text-emerald-700" : "text-blue-700"
            }`}
          >
            {categoryLabel || subject || "GATE CSE"}
          </p>

          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              isLiveApi
                ? "bg-emerald-50 text-emerald-700"
                : difficulty === "Hard" || difficulty === "GATE Level"
                ? "bg-rose-50 text-rose-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {difficulty}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-900 group-hover:text-blue-700 transition">
          {title}
        </h3>

        <p className="mt-2 text-xs leading-relaxed text-slate-600">
          {description}
        </p>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-4">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isLiveApi ? "bg-emerald-400 animate-pulse" : "bg-blue-500"
              }`}
            />
            {displayCount}
          </span>
          <span>⏱ {displayDuration}</span>
        </div>

        <Link
          href={`/test/${id}`}
          className={`mt-4 block w-full rounded-xl py-2.5 text-center text-xs font-semibold transition hover:shadow-lg ${
            isLiveApi
              ? "bg-emerald-600 text-white hover:bg-emerald-700 font-bold"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Start Test →
        </Link>
      </div>
    </div>
  );
}