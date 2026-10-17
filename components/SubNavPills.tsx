"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SubNavPill {
  label: string;
  href: string;
  badge?: string;
}

interface SubNavPillsProps {
  categoryTitle: string; // e.g., "EXPLORE GATE"
  pills: SubNavPill[];
}

export default function SubNavPills({ categoryTitle, pills }: SubNavPillsProps) {
  const pathname = usePathname();

  return (
    <div className="w-full border-y border-slate-200 bg-slate-50/90 py-3 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          {categoryTitle}
        </p>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {pills.map((pill) => {
            const isActive =
              pathname === pill.href ||
              (pill.href !== "/gate" && pill.href !== "/dsa" && pill.href !== "/placement" && pathname.startsWith(pill.href));

            return (
              <Link
                key={pill.href}
                href={pill.href}
                className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-semibold transition duration-150 sm:text-sm ${
                  isActive
                    ? "bg-blue-600 text-white shadow-xs shadow-blue-500/20"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span>{pill.label}</span>
                {pill.badge && (
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {pill.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
