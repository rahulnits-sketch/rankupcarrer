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
    badgeClass: "bg-blue-400/20 text-blue-200",
  },
  {
    slug: "mechanical" as GateBranchSlug,
    code: "ME",
    shortTitle: "Mechanical",
    icon: Cog,
    activeClass: "bg-purple-600 text-white shadow-lg shadow-purple-600/30 border-purple-500",
    badgeClass: "bg-purple-400/20 text-purple-200",
  },
  {
    slug: "civil" as GateBranchSlug,
    code: "CE",
    shortTitle: "Civil",
    icon: Building2,
    activeClass: "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 border-emerald-500",
    badgeClass: "bg-emerald-400/20 text-emerald-200",
  },
  {
    slug: "electrical" as GateBranchSlug,
    code: "EE",
    shortTitle: "Electrical",
    icon: Zap,
    activeClass: "bg-amber-600 text-white shadow-lg shadow-amber-600/30 border-amber-500",
    badgeClass: "bg-amber-400/20 text-amber-200",
  },
  {
    slug: "ece" as GateBranchSlug,
    code: "EC",
    shortTitle: "Electronics (ECE)",
    icon: CircuitBoard,
    activeClass: "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 border-cyan-500",
    badgeClass: "bg-cyan-400/20 text-cyan-200",
  },
];

export default function BranchSelector({
  selectedBranch,
  onChangeBranch,
  className = "",
}: BranchSelectorProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
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
                  : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
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
