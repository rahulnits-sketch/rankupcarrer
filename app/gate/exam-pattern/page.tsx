import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Clock3,
  FileQuestion,
  Info,
  Minus,
  Monitor,
} from "lucide-react";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SubNavPills from "@/components/SubNavPills";
import { gateNavPills } from "@/lib/hubNav";

export const metadata: Metadata = {
  title: "GATE Exam Pattern and Marking Scheme",
  description:
    "Understand the GATE exam format, question types, negative marking, and paper-specific marks distribution across all test papers.",
};

const examFacts = [
  { label: "Mode", value: "Computer-based test", icon: Monitor },
  { label: "Duration", value: "3 hours", icon: Clock3 },
  { label: "Maximum marks", value: "100", icon: Calculator },
  { label: "Question formats", value: "MCQ, MSQ, NAT", icon: FileQuestion },
];

const questionTypes = [
  {
    name: "MCQ",
    fullName: "Multiple Choice Question",
    detail: "Choose one correct option from the choices provided.",
    marking: "Wrong answers carry negative marks.",
  },
  {
    name: "MSQ",
    fullName: "Multiple Select Question",
    detail: "Select the correct option or combination of options.",
    marking: "No negative marking and no partial marks.",
  },
  {
    name: "NAT",
    fullName: "Numerical Answer Type",
    detail: "Enter a numerical answer using the on-screen interface.",
    marking: "No negative marking.",
  },
];

const paperStructures = [
  {
    papers: "AE, AG, BM, BT, CE, CH, CS, EC, EE, ES, IN, ME, MN, MT, NM, PE, PI, TF",
    sections:
      "General Aptitude (15) + paper subject (85, including 13 marks of paper-specific Engineering Mathematics)",
  },
  {
    papers: "CY, DA, EY, MA, PH, ST",
    sections: "General Aptitude (15) + paper subject (85)",
  },
  {
    papers: "AR — Architecture and Planning",
    sections:
      "General Aptitude (15) + common Part A (60) + choose Part B1 Architecture or Part B2 Planning (25) during the exam",
  },
  {
    papers: "GE — Geomatics Engineering",
    sections:
      "General Aptitude (15) + common Part A (55) + choose Part B1 Surveying and Mapping or Part B2 Image Processing and Analysis (30) during the exam",
  },
  {
    papers: "GG — Geology and Geophysics",
    sections:
      "General Aptitude (15) + common Part A (25) + choose Part B1 Geology or Part B2 Geophysics (60) during application",
  },
  {
    papers: "XE — Engineering Sciences",
    sections:
      "General Aptitude (15) + compulsory Section A Engineering Mathematics (15) + any two optional sections (35 marks each), selected during the exam",
  },
  {
    papers: "XH — Humanities and Social Sciences",
    sections:
      "General Aptitude (15) + compulsory Section B1 Reasoning and Comprehension (25) + one optional section (60), selected during application",
  },
  {
    papers: "XL — Life Sciences",
    sections:
      "General Aptitude (15) + compulsory Section P Chemistry (25) + any two optional sections (30 marks each), selected during the exam",
  },
];

const markingRows = [
  { question: "1-mark MCQ", rule: "1/3 mark deducted for a wrong answer" },
  { question: "2-mark MCQ", rule: "2/3 mark deducted for a wrong answer" },
  { question: "MSQ", rule: "No negative marking; no partial marks" },
  { question: "NAT", rule: "No negative marking" },
];

const officialPatternUrl =
  "https://gate2026.iitg.ac.in/question-paper-pattern.html";
const pwPatternUrl = "https://www.pw.live/gate/exams/gate-exam-pattern";

export default function GateExamPatternPage() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-[#f8fafc] text-slate-900 selection:bg-blue-600 selection:text-white">
      <Navbar />
      <SubNavPills categoryTitle="EXPLORE GATE" pills={gateNavPills} />

      <section className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 md:py-12">
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-600">
          <Link href="/" className="transition hover:text-slate-900">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/gate" className="transition hover:text-slate-900">
            GATE Hub
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-blue-700">Exam Pattern</span>
        </div>

        <header className="mb-10 flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              GATE exam pattern and marking scheme
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              A guide to the shared exam format and the paper-specific section
              choices and marks distribution across GATE disciplines.
            </p>
          </div>
          <BackButton />
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <article className="min-w-0">
            <section aria-labelledby="overview-heading">
              <h2
                id="overview-heading"
                className="text-2xl font-bold tracking-tight text-slate-900"
              >
                At a glance
              </h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {examFacts.map((fact) => {
                  const Icon = fact.icon;

                  return (
                    <li
                      key={fact.label}
                      className="flex items-center gap-4 border-b border-slate-200 pb-4"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm text-slate-600">
                          {fact.label}
                        </span>
                        <span className="mt-0.5 block font-bold text-slate-900">
                          {fact.value}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-600">
                The paper is in English. Questions test recall, comprehension,
                application, and analysis. Exact paper offerings and rules are
                announced for each exam cycle.
              </p>
            </section>

            <section
              aria-labelledby="question-types-heading"
              className="mt-14 border-t border-slate-200 pt-10"
            >
              <h2
                id="question-types-heading"
                className="text-2xl font-bold tracking-tight text-slate-900"
              >
                Question types
              </h2>
              <ul className="mt-5 divide-y divide-slate-200">
                {questionTypes.map((type) => (
                  <li key={type.name} className="py-5 first:pt-0 last:pb-0">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <h3 className="font-bold text-slate-900">{type.name}</h3>
                      <span className="text-sm text-slate-600">
                        {type.fullName}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                      {type.detail}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {type.marking}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="marks-heading"
              className="mt-14 border-t border-slate-200 pt-10"
            >
              <div className="flex items-center gap-3">
                <Minus
                  className="h-5 w-5 text-blue-700"
                  aria-hidden="true"
                />
                <h2
                  id="marks-heading"
                  className="text-2xl font-bold tracking-tight text-slate-900"
                >
                  Negative marking
                </h2>
              </div>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full min-w-[26rem] border-collapse text-left text-sm">
                  <thead className="bg-slate-50 text-slate-800">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Question
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Rule for an incorrect answer
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {markingRows.map((row) => (
                      <tr key={row.question}>
                        <th
                          scope="row"
                          className="whitespace-nowrap px-4 py-3 font-semibold text-slate-900"
                        >
                          {row.question}
                        </th>
                        <td className="px-4 py-3 leading-relaxed">
                          {row.rule}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section
              aria-labelledby="distribution-heading"
              className="mt-14 border-t border-slate-200 pt-10"
            >
              <h2
                id="distribution-heading"
                className="text-2xl font-bold tracking-tight text-slate-900"
              >
                Marks and sections vary by paper
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                Every paper totals 100 marks, including 15 marks for General
                Aptitude. Engineering Mathematics is not a separate 13-mark
                section in every paper; check your paper code below.
              </p>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
                  <thead className="bg-slate-50 text-slate-800">
                    <tr>
                      <th scope="col" className="w-1/3 px-4 py-3 font-semibold">
                        Paper code(s)
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Section structure (marks)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {paperStructures.map((item) => (
                      <tr key={item.papers}>
                        <th
                          scope="row"
                          className="px-4 py-3 align-top font-semibold leading-relaxed text-slate-900"
                        >
                          {item.papers}
                        </th>
                        <td className="px-4 py-3 align-top leading-relaxed">
                          {item.sections}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
                For papers where Engineering Mathematics is included within the
                subject marks, its syllabus and weight are paper-specific. For
                XE, Section A is a compulsory 15-mark Engineering Mathematics
                section.
              </p>
            </section>

            <section
              aria-labelledby="source-heading"
              className="mt-14 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <Info
                  className="h-5 w-5 text-blue-700"
                  aria-hidden="true"
                />
                <h2
                  id="source-heading"
                  className="text-xl font-bold text-slate-900"
                >
                  Check the current information brochure
                </h2>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Paper lists, section choices, and exam rules can change between
                cycles. Confirm the details for your paper on the official
                GATE website before applying.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={officialPatternUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 underline decoration-blue-300 underline-offset-4 transition hover:text-blue-900"
                >
                  Official GATE 2026 paper pattern
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={pwPatternUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 underline decoration-blue-300 underline-offset-4 transition hover:text-blue-900"
                >
                  PW GATE exam pattern overview
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </section>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <h2 className="font-bold text-slate-900">
                Find your paper&apos;s structure
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Match the two-letter code printed on the syllabus or
                application with the table. Special papers may include
                compulsory and optional sections.
              </p>
              <Link
                href="/syllabus"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700 underline decoration-blue-300 underline-offset-4 transition hover:text-blue-900"
              >
                Browse GATE syllabi
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
