import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Globe2,
  Info,
  UserRoundCheck,
} from "lucide-react";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SubNavPills from "@/components/SubNavPills";
import { gateNavPills } from "@/lib/hubNav";

export const metadata: Metadata = {
  title: "GATE Eligibility Criteria for All Papers",
  description:
    "Check qualifying degrees, eligible study years, age and attempt rules, and important distinctions for GATE applicants across all disciplines.",
};

const qualifications = [
  {
    degree: "B.E., B.Tech., or B.Pharm.",
    qualification:
      "Bachelor's degree in Engineering or Technology (4 years after 10+2, or 3 years after a relevant diploma or B.Sc.)",
    eligibleStage: "3rd year or higher, or completed",
  },
  {
    degree: "B.Arch.",
    qualification:
      "Architecture (5-year), Naval Architecture (4-year), or Planning (4-year) degree",
    eligibleStage: "3rd year or higher, or completed",
  },
  {
    degree: "B.Sc. (Research) or B.S.",
    qualification:
      "Bachelor's degree in Science (post-diploma or 4 years after 10+2)",
    eligibleStage: "3rd year or higher, or completed",
  },
  {
    degree: "Pharm.D. after 10+2",
    qualification:
      "Six-year professional pharmacy doctoral programme, including internship or residency",
    eligibleStage: "3rd year or higher, or completed",
  },
  {
    degree: "M.B.B.S., B.D.S., or B.V.Sc.",
    qualification: "Professional medical degree programme",
    eligibleStage: "5th semester or higher, or completed",
  },
  {
    degree: "M.Sc., M.A., MCA, or equivalent",
    qualification:
      "Master's degree in Arts, Science, Mathematics, Statistics, Computer Applications, or equivalent",
    eligibleStage: "1st year or higher, or completed",
  },
  {
    degree: "Integrated M.E./M.Tech. after B.Sc.",
    qualification:
      "Four-year post-B.Sc. integrated Master's programme in Engineering or Technology",
    eligibleStage: "Any year, or completed",
  },
  {
    degree: "Integrated M.E./M.Tech./M.Pharm. or dual degree",
    qualification:
      "Five-year integrated or dual-degree programme after a diploma or 10+2",
    eligibleStage: "3rd year or higher, or completed",
  },
  {
    degree: "B.Sc., B.A., or B.Com.",
    qualification:
      "Three-year Bachelor's degree in Science, Arts, or Commerce",
    eligibleStage: "3rd year or higher, or completed",
  },
  {
    degree: "Integrated M.Sc. or integrated B.S.–M.S.",
    qualification: "Integrated M.Sc. or five-year integrated B.S.–M.S. programme",
    eligibleStage: "3rd year or higher, or completed",
  },
  {
    degree: "Professional Society qualification",
    qualification:
      "An examination recognized as equivalent to B.E./B.Tech./B.Arch. by the relevant government body",
    eligibleStage: "Section A or equivalent completed",
  },
  {
    degree: "B.Sc. in Agriculture, Horticulture, or Forestry",
    qualification: "Four-year Bachelor's programme",
    eligibleStage: "3rd year or higher, or completed",
  },
];

const officialEligibilityUrl =
  "https://gate2026.iitg.ac.in/eligibility-criteria.html";
const pwEligibilityUrl =
  "https://www.pw.live/gate/exams/gate-eligibility-criteria";

export default function GateEligibilityPage() {
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
          <span className="font-medium text-blue-700">Eligibility</span>
        </div>

        <header className="mb-10 flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              GATE eligibility across disciplines
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Eligibility is based on your qualifying degree and current study
              stage—not only on whether you study CSE or another engineering
              branch. Check the rules for your degree and the current exam
              cycle.
            </p>
          </div>
          <BackButton />
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <article className="min-w-0">
            <section
              aria-labelledby="quick-check-heading"
              className="rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <BadgeCheck
                  className="h-5 w-5 text-blue-700"
                  aria-hidden="true"
                />
                <h2
                  id="quick-check-heading"
                  className="text-xl font-bold text-slate-900"
                >
                  Quick eligibility check
                </h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                <li>
                  GATE eligibility covers qualifying degrees in Engineering,
                  Technology, Architecture, Science, Commerce, Arts, and
                  Humanities, along with specified professional qualifications.
                </li>
                <li>
                  For many bachelor&apos;s programmes, candidates can apply
                  from the third year; some master&apos;s, medical, and integrated programmes
                  have different eligible stages.
                </li>
                <li>
                  The GATE 2027 criteria overview linked below states no age
                  limit, minimum percentage requirement, or cap on attempts.
                </li>
              </ul>
            </section>

            <section
              aria-labelledby="degree-heading"
              className="mt-12"
            >
              <h2
                id="degree-heading"
                className="text-2xl font-bold tracking-tight text-slate-900"
              >
                Qualifying degrees and eligible study stage
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                The table summarises degree categories and stages shown in the
                GATE 2026 official eligibility criteria. Equivalent or higher
                qualifications may also qualify; confirm the exact wording in
                the brochure for the paper and year you plan to take.
              </p>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full min-w-[46rem] border-collapse text-left text-sm">
                  <thead className="bg-slate-50 text-slate-800">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Degree or programme
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Qualification
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Eligible stage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {qualifications.map((item) => (
                      <tr key={item.degree}>
                        <th
                          scope="row"
                          className="min-w-44 px-4 py-3 align-top font-semibold leading-relaxed text-slate-900"
                        >
                          {item.degree}
                        </th>
                        <td className="min-w-72 px-4 py-3 align-top leading-relaxed">
                          {item.qualification}
                        </td>
                        <td className="min-w-48 px-4 py-3 align-top leading-relaxed">
                          {item.eligibleStage}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section
              aria-labelledby="abroad-heading"
              className="mt-14 border-t border-slate-200 pt-10"
            >
              <div className="flex items-center gap-3">
                <Globe2
                  className="h-5 w-5 text-blue-700"
                  aria-hidden="true"
                />
                <h2
                  id="abroad-heading"
                  className="text-2xl font-bold tracking-tight text-slate-900"
                >
                  If you are studying outside India
                </h2>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                The GATE 2026 criteria state that candidates pursuing or holding
                a qualifying degree from another country must be in the third
                year or higher, or have completed a Bachelor&apos;s degree of at
                least three years in Engineering, Technology, Architecture,
                Science, Commerce, Arts, or Humanities. Check the current
                brochure for updated rules.
              </p>
            </section>

            <section
              aria-labelledby="important-heading"
              className="mt-14 border-t border-slate-200 pt-10"
            >
              <div className="flex items-center gap-3">
                <Info
                  className="h-5 w-5 text-blue-700"
                  aria-hidden="true"
                />
                <h2
                  id="important-heading"
                  className="text-2xl font-bold tracking-tight text-slate-900"
                >
                  GATE eligibility is not an admission guarantee
                </h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                <li>
                  Meeting GATE&apos;s criteria lets you apply for the exam; it
                  does not automatically meet a university, programme, or PSU&apos;s
                  separate eligibility requirements.
                </li>
                <li>
                  Check the admission or recruitment notice for accepted GATE
                  paper codes, qualifying degrees, marks, and other conditions.
                </li>
                <li>
                  Candidates with qualifications higher than those listed may
                  also be eligible under the applicable brochure rules.
                </li>
                <li>
                  Professional Society examinations must have the required
                  recognition or equivalence specified in the official notice.
                </li>
              </ul>
            </section>

            <section
              aria-labelledby="sources-heading"
              className="mt-14 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <BookOpen
                  className="h-5 w-5 text-blue-700"
                  aria-hidden="true"
                />
                <h2
                  id="sources-heading"
                  className="text-xl font-bold text-slate-900"
                >
                  Verify the rules for your exam year
                </h2>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Eligibility details can be revised between exam cycles. Use the
                latest official GATE brochure as the final authority, especially
                before submitting your application.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <a
                  href={officialEligibilityUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 underline decoration-blue-300 underline-offset-4 transition hover:text-blue-900"
                >
                  Official GATE 2026 eligibility criteria
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={pwEligibilityUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 underline decoration-blue-300 underline-offset-4 transition hover:text-blue-900"
                >
                  PW GATE eligibility criteria overview
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </section>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-3">
                <UserRoundCheck
                  className="h-5 w-5 text-blue-700"
                  aria-hidden="true"
                />
                <h2 className="font-bold text-slate-900">Before you apply</h2>
              </div>
              <ol className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
                <li>1. Identify your exact degree and current study year.</li>
                <li>2. Check the eligibility table in the current brochure.</li>
                <li>3. Confirm paper-code and admission rules separately.</li>
                <li>4. Prepare the documents requested for your category.</li>
              </ol>
              <Link
                href="/gate/exam-pattern"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700 underline decoration-blue-300 underline-offset-4 transition hover:text-blue-900"
              >
                View all-paper exam pattern
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
