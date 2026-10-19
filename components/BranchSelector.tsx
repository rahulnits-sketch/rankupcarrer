"use client";

import { Cpu, Cog, Building2, Zap, CircuitBoard } from "lucide-react";
import type { GateBranchSlug } from "@/data/gate/branches";

interface BranchSelectorProps {
  selectedBranch: GateBranchSlug;
  onChangeBranch: (branch: GateBranchSlug) => void;
  className?: string;
}

export const branchList = [
  {
    slug: "cse-it" as GateBranchSlug,
    code: "CS",
    shortTitle: "CSE / IT",
    icon: Cpu,
    activeClass: "bg-blue-600 text-white shadow-lg shadow-blue-600/30 border-blue-500",
    badgeClass: "bg-blue-50 text-blue-700",
  },
  {
    slug: "mechanical" as GateBranchSlug,
    code: "ME",
    shortTitle: "Mechanical",
    icon: Cog,
    activeClass: "bg-blue-600 text-white shadow-lg shadow-blue-600/20 border-blue-600",
    badgeClass: "bg-blue-50 text-blue-700",
  },
  {
    slug: "civil" as GateBranchSlug,
    code: "CE",
    shortTitle: "Civil",
    icon: Building2,
    activeClass: "bg-blue-600 text-white shadow-lg shadow-blue-600/20 border-blue-600",
    badgeClass: "bg-blue-50 text-blue-700",
  },
  {
    slug: "electrical" as GateBranchSlug,
    code: "EE",
    shortTitle: "Electrical",
    icon: Zap,
    activeClass: "bg-blue-600 text-white shadow-lg shadow-blue-600/20 border-blue-600",
    badgeClass: "bg-blue-50 text-blue-700",
  },
  {
    slug: "ece" as GateBranchSlug,
    code: "EC",
    shortTitle: "Electronics (ECE)",
    icon: CircuitBoard,
    activeClass: "bg-blue-600 text-white shadow-lg shadow-blue-600/20 border-blue-600",
    badgeClass: "bg-blue-50 text-blue-700",
  },
];

export default function BranchSelector({
  selectedBranch,
  onChangeBranch,
  className = "",
}: BranchSelectorProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
        Select Engineering Branch:
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {branchList.map((b) => {
          const Icon = b.icon;
          const isSelected = selectedBranch === b.slug;

          return (
            <button
              key={b.slug}
              type="button"
              onClick={() => onChangeBranch(b.slug)}
              className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition duration-150 ${
                isSelected
                  ? b.activeClass
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{b.shortTitle}</span>
              <span
                className={`rounded px-1.5 py-0.5 text-[10px] font-extrabold uppercase ${
                  isSelected ? "bg-white/20 text-white" : b.badgeClass
                }`}
              >
                {b.code}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
