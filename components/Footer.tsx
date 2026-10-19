import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle, Phone } from "lucide-react";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/gate", label: "GATE Hub" },
  { href: "/dsa", label: "DSA Sheet" },
  { href: "/placement", label: "Placement" },
  { href: "/analytics", label: "Study Analytics" },
  { href: "/syllabus", label: "Syllabus" },
  { href: "/tests", label: "Practice Tests" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/80 backdrop-blur-md text-slate-600">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-base font-extrabold tracking-tight text-slate-900"
          >
            <Image
              src="/Glossy Blue Gradient Checkmark.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 rounded-lg object-cover"
            />
            <span>
              RankUp <span className="text-blue-600">Career</span>
            </span>
          </Link>
          <p className="text-xs text-slate-500">
            Unified Academic Preparation Portal & CBT Examination Engine
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-600"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="tel:9708915535"
            aria-label="Call RankUp Career"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="https://wa.me/919708915535?text=Hi%2C%20I%20have%20a%20query%20regarding%20RankUp%20Career"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with RankUp Career on WhatsApp"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="mailto:rkumarraj733@gmail.com"
            aria-label="Email RankUp Career"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="border-t border-slate-100 py-3 text-center text-xs text-slate-600">
        © 2026 RankUp Career. Built for GATE CSE, PSU & Tier-1 Tech Placement Aspirants.
      </div>
    </footer>
  );
}
