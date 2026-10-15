import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import SubNavPills from "@/components/SubNavPills";
import { gateNavPills } from "@/lib/hubNav";
import { ExternalLink } from "lucide-react";

const syllabusData = [
  {
    subject: "Engineering Mathematics & Discrete Math",
    weightage: "13 - 15 Marks",
  },
  {
    subject: "Digital Logic",
    weightage: "4 - 6 Marks",
  },
  {
    subject: "Computer Organization and Architecture (COA)",
    weightage: "8 - 11 Marks",
  },
  {
    subject: "Programming and Data Structures",
    weightage: "10 - 12 Marks",
  },
  {
    subject: "Algorithms",
    weightage: "8 - 10 Marks",
  },
  {
    subject: "Theory of Computation (TOC)",
    weightage: "7 - 9 Marks",
  },
  {
    subject: "Compiler Design",
    weightage: "4 - 6 Marks",
  },
  {
    subject: "Operating Systems",
    weightage: "8 - 10 Marks",
  },
  {
    subject: "Databases (DBMS)",
    weightage: "7 - 9 Marks",
  },
  {
    subject: "Computer Networks",
    weightage: "7 - 9 Marks",
  },
  {
    subject: "General Aptitude",
    weightage: "15 Marks (Compulsory)",
    topics: [
      "Verbal Ability: Grammar, Vocabulary, Reading Comprehension, Sentence Completion",
      "Quantitative Aptitude: Data Interpretation, Permutations, Probability, Percentages, Ratios, Speed & Time",
      "Analytical & Spatial Aptitude: Logic, Syllogisms, Sequences, Shape Matching, Visual Reasoning"
    ]
  }
];

export default function SyllabusPage() {
  return (
    <main className="min-h-screen bg-[#08090b] text-white flex flex-col justify-between">
      <Navbar />
      <SubNavPills categoryTitle="EXPLORE GATE" pills={gateNavPills} />

      <section className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 md:py-12">
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090b]">Home</Link>
          <span>/</span>
          <span className="text-blue-400 font-medium">GATE CSE Syllabus</span>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between md:mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            GATE CSE Complete Syllabus
          </h1>
          <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
            <a
              href="https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/CS_GATE2027_Syllabus.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-2.5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090b]"
            >
              Official Syllabus
              <ExternalLink className="h-4 w-4" />
            </a>
            <BackButton />
          </div>
        </div>

        {/* Syllabus Cards */}
        <div className="space-y-4">
          {syllabusData.map((item, idx) => (
            <div
              key={item.subject}
              className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition duration-200 hover:border-white/20 hover:bg-white/[0.04] focus-within:border-white/20 sm:p-6"
            >
              <div className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${
                item.subject === "General Aptitude" ? "border-b border-white/10 pb-4" : ""
              }`}>
                <div className="min-w-0">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-gray-400">
                      Section {idx + 1}
                    </span>
                    <h2 className="text-lg font-bold leading-snug text-white sm:text-xl">
                      {item.subject}
                    </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:shrink-0 sm:gap-3">
                  <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200">
                    {item.weightage}
                  </span>
                  <Link
                    href="/tests"
                    className="rounded-lg bg-white/[0.07] px-3 py-1.5 text-xs font-medium text-gray-200 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101113]"
                  >
                    Practice Tests →
                  </Link>
                </div>
              </div>

              {item.subject === "General Aptitude" && (
                <div className="pt-4">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-300">
                    Key Topics Covered:
                  </h3>
                  <ul className="grid grid-cols-1 gap-3 text-sm text-gray-300 sm:grid-cols-2 xl:grid-cols-3">
                    {(item.topics ?? []).map((t) => (
                      <li key={t} className="flex items-start gap-2 leading-relaxed">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
