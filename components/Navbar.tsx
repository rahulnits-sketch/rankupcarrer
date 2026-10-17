
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

const gateLinks = [
  { href: "/gate/cse-it", code: "CS", label: "GATE CSE / IT" },
  { href: "/gate/ece", code: "EC", label: "GATE ECE" },
  { href: "/gate/electrical", code: "EE", label: "GATE Electrical" },
  { href: "/gate/civil", code: "CE", label: "GATE Civil" },
  { href: "/gate/mechanical", code: "ME", label: "GATE Mechanical" },
];

const navigationLinks = [
  { href: "/dsa", label: "DSA" },
  { href: "/placement", label: "Placement" },
  { href: "/general", label: "Quiz" },
  { href: "/syllabus", label: "Syllabus" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08090b]/90 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-base font-bold tracking-tight text-white md:text-xl"
          onClick={() => {
            setMenuOpen(false);
            setGateOpen(false);
          }}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/20">
            <Check
              className="h-5 w-5"
              strokeWidth={3}
              aria-hidden="true"
            />
          </span>

          <span>
            CheckMate <span className="text-blue-500">College</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 text-sm font-medium text-gray-300 md:flex lg:gap-7">

          {/* GATE Hub Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setGateOpen((open) => !open)}
              aria-expanded={gateOpen}
              aria-controls="desktop-gate-menu"
              className="flex items-center gap-1 rounded-sm transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
            >
              GATE Hub

              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  gateOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {gateOpen && (
              <div
                id="desktop-gate-menu"
                className="absolute left-1/2 top-full z-50 mt-4 w-72 -translate-x-1/2 rounded-2xl border border-white/10 bg-[#10141c] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.65)] ring-1 ring-blue-400/10"
              >
                <div className="px-3 pb-3 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-300">
                    GATE branches
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    Choose your exam stream
                  </p>
                </div>
                <div className="grid gap-1">
                  {gateLinks.map((link) => (
                    <Link
                      key={link.code}
                      href={link.href}
                      onClick={() => setGateOpen(false)}
                      className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-200 transition-colors hover:bg-blue-500/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-400/[0.08] text-[11px] font-bold tracking-wide text-blue-200 transition-colors group-hover:border-blue-300/30 group-hover:bg-blue-400/15">
                        {link.code}
                      </span>
                      <span className="flex-1">{link.label}</span>
                      <ArrowRight
                        className="h-4 w-4 text-gray-500 transition group-hover:translate-x-0.5 group-hover:text-blue-300"
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
              className="rounded-sm transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Explore + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="/tests"
            className="inline-flex min-h-11 items-center rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300 md:px-5"
          >
            Explore
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
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 text-gray-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 md:hidden"
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
          className="border-t border-white/10 bg-[#08090b] px-6 py-3 md:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="mx-auto grid max-w-7xl gap-1"
          >
            {/* Mobile GATE Dropdown */}
            <button
              type="button"
              onClick={() => setGateOpen((open) => !open)}
              aria-expanded={gateOpen}
              aria-controls="mobile-gate-menu"
              className="flex min-h-11 w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              GATE Hub

              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  gateOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>

            {gateOpen && (
              <div
                id="mobile-gate-menu"
                className="mx-2 mb-2 grid gap-1 rounded-xl border border-white/10 bg-[#10141c] p-2"
              >
                {gateLinks.map((link) => (
                  <Link
                    key={link.code}
                    href={link.href}
                    onClick={() => {
                      setMenuOpen(false);
                      setGateOpen(false);
                    }}
                    className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-300 transition-colors hover:bg-blue-500/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-blue-400/15 bg-blue-400/[0.08] text-[10px] font-bold text-blue-200">
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
                className="min-h-11 rounded-lg px-3 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
