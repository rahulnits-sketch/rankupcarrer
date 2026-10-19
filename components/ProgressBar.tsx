export type ProgressBarProps = {
  current: number;
  total: number;
  label?: string;
};

export default function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percentage = Math.min(100, Math.round((current / (total || 1)) * 100));

  return (
    <div className="w-full">
      {(label || current !== undefined) && (
        <div className="mb-1.5 flex items-center justify-between text-xs text-slate-600">
          <span>{label || "Progress"}</span>
          <span className="font-mono font-medium text-slate-900">{percentage}%</span>
        </div>
      )}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
