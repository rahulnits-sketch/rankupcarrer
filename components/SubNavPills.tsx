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
    <div className="w-full border-y border-white/10 bg-[#08090b]/90 py-3 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
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
                className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition duration-150 sm:text-sm ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "border border-white/10 bg-white/[0.04] text-gray-300 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                <span>{pill.label}</span>
                {pill.badge && (
                  <span
                    className={`rounded px-1.5 py-0.2 text-[10px] font-bold uppercase ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-blue-500/20 text-blue-300"
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
