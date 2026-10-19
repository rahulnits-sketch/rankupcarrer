
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  BarChart3,
} from "lucide-react";

const gateLinks = [
  { href: "/gate/cse-it", code: "CS", label: "GATE CSE / IT" },
  { href: "/gate/ece", code: "EC", label: "GATE ECE" },
  { href: "/gate/electrical", code: "EE", label: "GATE Electrical" },
  { href: "/gate/civil", code: "CE", label: "GATE Civil" },
  { href: "/gate/mechanical", code: "ME", label: "GATE Mechanical" },
];

const navigationLinks = [
  { href: "/dsa", label: "DSA Sheet" },
  { href: "/placement", label: "Placement" },
  { href: "/analytics", label: "Study Analytics", icon: BarChart3 },
  { href: "/syllabus", label: "Syllabus" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-base font-extrabold tracking-tight text-slate-900 md:text-xl"
          onClick={() => {
            setMenuOpen(false);
            setGateOpen(false);
          }}
        >
          <Image
            src="/Glossy Blue Gradient Checkmark.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg object-cover shadow-sm"
            priority
          />

          <span>
            RankUp <span className="text-blue-600">Career</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 text-sm font-semibold text-slate-600 xl:flex">
          {/* GATE Hub Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setGateOpen((open) => !open)}
              aria-expanded={gateOpen}
              aria-controls="desktop-gate-menu"
              className="flex items-center gap-1.5 rounded-md px-2 py-1.5 transition-colors hover:text-slate-900 hover:bg-slate-100/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <span>GATE Hub</span>
              <ChevronDown
                className={`h-4 w-4 text-slate-500 transition-transform ${
                  gateOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {gateOpen && (
              <div
                id="desktop-gate-menu"
                className="absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-xl shadow-slate-300/40 ring-1 ring-slate-900/5 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-3 pb-2 pt-1 border-b border-slate-100">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                    GATE Branches
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    1987–2026 PYQs & Mocks
                  </p>
                </div>
                <div className="mt-1 grid gap-0.5">
                  {gateLinks.map((link) => (
                    <Link
                      key={link.code}
                      href={link.href}
                      onClick={() => setGateOpen(false)}
                      className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-[11px] font-bold text-blue-700 transition-colors group-hover:border-blue-400 group-hover:bg-blue-600 group-hover:text-white">
                        {link.code}
                      </span>
                      <span className="flex-1">{link.label}</span>
                      <ArrowRight
                        className="h-3.5 w-3.5 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-blue-600"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Other Links */}
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 rounded-md px-2 py-1.5 transition-colors hover:text-slate-900 hover:bg-slate-100/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {link.icon && <link.icon className="h-4 w-4 text-slate-400" />}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Explore + Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/tests"
            className="inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:px-4 md:px-5"
          >
            <span className="hidden sm:inline">Start Practice Free</span>
            <span className="sm:hidden">Practice</span>
          </Link>

          <button
            type="button"
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setMenuOpen((open) => !open);
              setGateOpen(false);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 xl:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-5 py-3 shadow-lg xl:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="grid gap-1"
          >
            {/* Mobile GATE Dropdown */}
            <button
              type="button"
              onClick={() => setGateOpen((open) => !open)}
              aria-expanded={gateOpen}
              aria-controls="mobile-gate-menu"
              className="flex min-h-11 w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100"
            >
              <span>GATE Hub</span>
              <ChevronDown
                className={`h-4 w-4 text-slate-500 transition-transform ${
                  gateOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {gateOpen && (
              <div
                id="mobile-gate-menu"
                className="ml-2 mb-2 grid gap-1 border-l-2 border-blue-500 pl-3 py-1"
              >
                {gateLinks.map((link) => (
                  <Link
                    key={link.code}
                    href={link.href}
                    onClick={() => {
                      setMenuOpen(false);
                      setGateOpen(false);
                    }}
                    className="flex min-h-10 items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-blue-200 bg-blue-50 text-[10px] font-bold text-blue-700">
                      {link.code}
                    </span>
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Other Mobile Links */}
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setMenuOpen(false);
                  setGateOpen(false);
                }}
                className="flex min-h-11 items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                {link.icon && <link.icon className="h-4 w-4 text-slate-500" />}
                <span>{link.label}</span>
              </Link>
            ))}

            <div className="pt-2">
              <Link
                href="/tests"
                onClick={() => setMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-sm"
              >
                Start Practice Free
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
