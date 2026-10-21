import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  Check,
  ClipboardList,
  Clock3,
  Target,
} from "lucide-react";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SubNavPills from "@/components/SubNavPills";
import { gateNavPills } from "@/lib/hubNav";

export const metadata: Metadata = {
  title: "GATE CSE Preparation Roadmap",
  description:
    "A practical GATE CSE preparation roadmap covering syllabus planning, concepts, PYQs, revision, mock tests, and sustainable study habits.",
};

const preparationPhases = [
  {
    title: "Map the syllabus and your starting point",
    icon: ClipboardList,
    description:
      "Read the official syllabus and paper pattern, then take a short diagnostic test or attempt a few previous-year questions. Use the result to identify strong topics and gaps—not to judge your potential.",
    actions: [
      "Break the syllabus into topics you can track.",
      "Choose a realistic weekly study target around classes or work.",
      "Keep the official syllabus and one question source close at hand.",
    ],
  },
  {
    title: "Build concepts, then solve questions",
    icon: BookOpenCheck,
    description:
      "Study one topic at a time. Use a textbook, a course, or recorded lectures if they suit your learning style; coaching is optional. After each concept, solve examples and topic-wise PYQs instead of postponing all practice until the syllabus is finished.",
    actions: [
      "Try questions before checking the solution.",
      "Write down why an approach works, not just the final formula.",
      "Move on when you can solve a representative set and explain your reasoning.",
    ],
  },
  {
    title: "Revise deliberately and learn from mistakes",
    icon: CalendarDays,
    description:
      "Schedule short reviews of older topics while learning new ones. Keep a mistake log and label each miss—for example, a concept gap, calculation error, misread question, or rushed guess—so your next revision has a clear purpose.",
    actions: [
      "Revisit key ideas after a day, a week, and again later.",
      "Keep notes concise: definitions, useful derivations, traps, and your own corrections.",
      "Mix questions from completed topics to practise recall.",
    ],
  },
  {
    title: "Use mock tests to practise exam decisions",
    icon: Target,
    description:
      "Add timed sectional tests as topics are completed, then attempt full-length mocks when you have enough syllabus coverage. Spend serious time reviewing each mock: accuracy, time use, skipped questions, and the reason behind every avoidable error matter more than the score alone.",
    actions: [
      "Practise when to attempt, skip, and return to a question.",
      "Review incorrect, guessed, and time-consuming questions.",
      "Use the pattern of mistakes to plan the next week of study.",
    ],
  },
];

const studyHabits = [
  {
    title: "Start early, but start where you are",
    description:
      "Beginning in your second year can leave more room for fundamentals, practice, and revision. If you are starting later, make a syllabus-based plan for the time you have instead of trying to make up for lost time with an unsustainable schedule.",
  },
  {
    title: "Choose learning resources that fit you",
    description:
      "Recorded online lectures can offer flexibility, but they are only one option. A course, a textbook, class notes, or a combination can work—choose a small set of reliable resources and pair them with problem-solving.",
  },
  {
    title: "Make notes you will actually revisit",
    description:
      "Create concise digital or handwritten notes in your own words. Scanning handwritten pages into PDFs can make them easier to keep, search, and revise; avoid copying entire lectures without processing the ideas.",
  },
  {
    title: "Use college time without neglecting class",
    description:
      "Use permitted free periods or lighter study slots for GATE questions. Stay engaged with classes that support your learning, and avoid disrupting teaching or falling behind on coursework.",
  },
  {
    title: "Protect sleep and recovery",
    description:
      "Do not treat six hours of sleep as a target for everyone. Most adults need at least seven hours; choose a routine that lets you stay alert, learn effectively, and recover. Take breaks and adjust your plan when fatigue builds.",
  },
  {
    title: "Make weekends focused, not punishing",
    description:
      "Use weekends for longer problem-solving blocks, revision, or a mock review. Set a realistic target, take breaks, and leave room to recover; more hours do not automatically mean better learning.",
  },
  {
    title: "Keep grades and eligibility in perspective",
    description:
      "There is no universal GPA that is 'enough' for every student or opportunity. Maintain the academic standing required by your institution and check the current eligibility criteria for the specific PSU, campus placement, or postgraduate opportunity you want.",
  },
  {
    title: "Let your curriculum reinforce GATE",
    description:
      "When a semester subject overlaps with the GATE syllabus, use that coursework to strengthen the same concepts and solve relevant PYQs. The overlap can help, but course exams and GATE questions may require different kinds of practice.",
  },
  {
    title: "Plan attendance responsibly",
    description:
      "Do not skip classes as a default preparation strategy. Follow your institution's attendance rules and plan any leave around important academic or exam needs.",
  },
  {
    title: "Build a reliable study circle",
    description:
      "Good study partners can share legitimate notes, discuss difficult questions, and help each other stay accountable. Work honestly and make sure you understand a solution rather than relying on someone else to do the work for you.",
  },
  {
    title: "Be consistent, not perfect",
    description:
      "A repeatable routine beats an occasional marathon. On a difficult day, a shorter review session can keep the habit alive; resume your regular plan when you are ready rather than treating one missed day as failure.",
  },
  {
    title: "Protect your attention and balance",
    description:
      "Notice what regularly interrupts your study and set practical boundaries around it. Make room for relationships, rest, and other responsibilities in a way that supports your wellbeing and your preparation.",
  },
];

export default function GatePreparationGuidePage() {
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
          <span className="font-medium text-blue-700">Preparation Guide</span>
        </div>

        <header className="mb-10 flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              A practical roadmap to crack GATE CSE
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Build concepts, practise previous-year questions, revise with
              purpose, and use mocks to get exam-ready. Adapt the pace to your
              starting point and responsibilities.
            </p>
          </div>
          <BackButton />
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <article className="min-w-0">
            <section aria-labelledby="roadmap-heading">
              <h2
                id="roadmap-heading"
                className="text-2xl font-bold tracking-tight text-slate-900"
              >
                Four phases, repeated as you progress
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                You do not need a fixed month-by-month timetable. Move through
                these phases topic by topic, then revisit them as your
                preparation deepens.
              </p>

              <ol className="mt-8 space-y-0">
                {preparationPhases.map((phase, index) => {
                  const Icon = phase.icon;
                  const isLast = index === preparationPhases.length - 1;

                  return (
                    <li
                      key={phase.title}
                      className={`relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 pb-9 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-x-5 ${
                        isLast ? "pb-0" : ""
                      }`}
                    >
                      {!isLast && (
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-[1.35rem] top-11 w-px bg-slate-200 sm:left-[1.6rem]"
                        />
                      )}
                      <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-blue-700 sm:h-13 sm:w-13">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 pt-1">
                        <h3 className="text-lg font-bold text-slate-900">
                          {phase.title}
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                          {phase.description}
                        </p>
                        <ul className="mt-4 space-y-2">
                          {phase.actions.map((action) => (
                            <li
                              key={action}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700"
                            >
                              <Check
                                className="mt-0.5 h-4 w-4 shrink-0 text-blue-700"
                                aria-hidden="true"
                              />
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>

            <section
              aria-labelledby="habits-heading"
              className="mt-14 border-t border-slate-200 pt-10"
            >
              <h2
                id="habits-heading"
                className="text-2xl font-bold tracking-tight text-slate-900"
              >
                Habits that make preparation sustainable
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                These are experience-based suggestions, not rules or guarantees.
                Keep what works for your situation and adjust the rest.
              </p>
              <ul className="mt-6 divide-y divide-slate-200">
                {studyHabits.map((habit) => (
                  <li key={habit.title} className="py-5 first:pt-0 last:pb-0">
                    <h3 className="font-bold text-slate-900">{habit.title}</h3>
                    <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-600">
                      {habit.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <p className="mt-10 border-t border-slate-200 pt-5 text-xs leading-relaxed text-slate-500">
              The personal tips on this page are adapted from the material you
              shared, attributed there to Nitish Kumar (GATE 2023, AIR 118).
            </p>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2 text-blue-700">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
                <h2 className="font-bold text-slate-900">A useful weekly loop</h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
                <li>Learn a manageable set of concepts.</li>
                <li>Solve topic-wise questions and PYQs.</li>
                <li>Review older topics and your mistake log.</li>
                <li>Take a timed test, then analyse it.</li>
                <li>Plan the next week and make time to rest.</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <h2 className="font-bold text-slate-900">Put the plan to work</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Start with a subject, practise its questions, and build from
                there.
              </p>
              <Link
                href="/gate/subjects"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700 underline decoration-blue-300 underline-offset-4 transition hover:text-blue-900"
              >
                Explore subject practice
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
