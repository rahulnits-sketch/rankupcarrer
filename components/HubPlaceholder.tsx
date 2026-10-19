import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import SubNavPills, { SubNavPill } from "@/components/SubNavPills";
import { Sparkles, Clock, FileText } from "lucide-react";

interface HubPlaceholderProps {
  hubTitle: string;
  categoryTitle: string;
  pills: SubNavPill[];
  pageTitle: string;
  description: string;
  parentHref: string;
  parentLabel: string;
  suggestedSections?: { title: string; description: string }[];
}

export default function HubPlaceholder({
  categoryTitle,
  pills,
  pageTitle,
  description,
  parentHref,
  parentLabel,
  suggestedSections = [],
}: HubPlaceholderProps) {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-[#f8fafc] text-slate-900 selection:bg-blue-600 selection:text-white">
      <Navbar />
      <SubNavPills categoryTitle={categoryTitle} pills={pills} />

      <section className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 md:py-12">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-600">
          <Link
            href="/"
            className="transition hover:text-slate-900"
          >
            Home
          </Link>
          <span>/</span>
          <Link
            href={parentHref}
            className="transition hover:text-slate-900"
          >
            {parentLabel}
          </Link>
          <span>/</span>
          <span className="font-medium text-blue-700">{pageTitle}</span>
        </div>

        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              {pageTitle}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              {description}
            </p>
          </div>
          <BackButton />
        </div>

        {/* Coming Soon Notice Card */}
        <div className="mb-10 rounded-3xl border border-blue-200 bg-blue-50 p-6 md:p-8">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 text-blue-700">
              <Clock className="h-7 w-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <Sparkles className="h-3.5 w-3.5" />
                Coming Soon
              </div>
              <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                Content is being curated
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                This section is configured and ready. You can manually edit and update the content of this page anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Section Structure Outline */}
        {suggestedSections.length > 0 && (
          <div>
            <h3 className="mb-4 text-lg font-bold text-slate-900">
              Planned Sections & Content Structure
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {suggestedSections.map((sec, idx) => (
                <div
                  key={idx}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  <div className="flex items-center gap-2.5 text-blue-700">
                    <FileText className="h-4 w-4" />
                    <span className="text-xs font-mono font-bold uppercase text-slate-500">
                      Section {idx + 1}
                    </span>
                  </div>
                  <h4 className="mt-2 font-bold text-slate-900">{sec.title}</h4>
                  <p className="mt-1 flex-1 text-xs text-slate-600 leading-relaxed">
                    {sec.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
