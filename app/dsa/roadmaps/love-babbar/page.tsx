import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { ArrowLeft, Trophy } from "lucide-react";

export default function RoadmapPage() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-[#f8fafc] text-slate-900">
      <Navbar />
      <section className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 md:px-6 md:py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <BackButton />
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-black/80 p-6 shadow-2xl md:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <Trophy className="h-7 w-7" />
              </div>
              <div>  
              <h1 className="mt-2 text-3xl font-black tracking-tight md:text-5xl">Coming soon...</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
