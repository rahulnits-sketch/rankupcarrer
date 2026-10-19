import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import SubNavPills from "@/components/SubNavPills";
import { gateNavPills } from "@/lib/hubNav";
import { ExternalLink } from "lucide-react";

const syllabusData = [
  {
    subject: "CSE/IT",
    weightage:<a
              href="https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/EC_GATE2027_Syllabus.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8fafc]"
            >
              Official Syllabus
              <ExternalLink className="h-4 w-4" />
            </a>
  },
  {
    subject: "ECE",
    weightage: <a
              href="https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/EE_GATE2027_Syllabus.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8fafc]"
            >
              Official Syllabus
              <ExternalLink className="h-4 w-4" />
            </a>
  },
  {
    subject: "EE",
    weightage: <a
              href="https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/ME_GATE2027_Syllabus.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8fafc]"
            >
              Official Syllabus
              <ExternalLink className="h-4 w-4" />
            </a>
  },
  {
    subject: "ME",
    weightage: <a
              href="https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/CE_GATE2027_Syllabus.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8fafc]"
            >
              Official Syllabus
              <ExternalLink className="h-4 w-4" />
            </a>
  },
  {
    subject: "CIVIL",
    weightage: <a
              href="https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/CS_GATE2027_Syllabus.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8fafc]"
            >
              Official Syllabus
              <ExternalLink className="h-4 w-4" />
            </a>
  }
];

export default function SyllabusPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />
      <SubNavPills categoryTitle="EXPLORE GATE" pills={gateNavPills} />

      <section className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 md:py-12">
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-xs text-slate-600">
          <Link href="/" className="transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8fafc]">Home</Link>
          <span>/</span>
          <span className="text-blue-700 font-medium">GATE CSE Syllabus</span>
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between md:mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Complete GATE Syllabus
          </h1>
          <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
    
          </div>
        </div>

        {/* Syllabus Cards */}
        <div className="space-y-4">
          {syllabusData.map((item, idx) => (
            <div
              key={item.subject}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:border-slate-300 hover:bg-slate-50 focus-within:border-slate-300 sm:p-6"
            >
              <div className={`flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${
                item.subject === "General Aptitude" ? "border-b border-slate-200 pb-4" : ""
              }`}>
                <div className="min-w-0">
                    <h2 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                      {item.subject}
                    </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:shrink-0 sm:gap-3">
                    {item.weightage}
                  
                  <Link
                    href="/tests"
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-200 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8fafc]"
                  >
                    Practice Tests →
                  </Link>
                </div>
              </div>

              {item.subject === "General Aptitude" && (
                <div className="pt-4">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Key Topics Covered:
                  </h3>
                  <ul className="grid grid-cols-1 gap-3 text-sm text-slate-700 sm:grid-cols-2 xl:grid-cols-3">
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
