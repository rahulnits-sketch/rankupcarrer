import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Check,
  CircleHelp,
  Clock3,
  Compass,
  Lightbulb,
  ListChecks,
  NotebookPen,
  RotateCcw,
  Timer,
} from "lucide-react";
import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SubNavPills from "@/components/SubNavPills";
import { dsaNavPills } from "@/lib/hubNav";

export const metadata: Metadata = {
  title: "DSA Problem-Solving Roadmap",
  description:
    "Learn DSA patterns, solve problems independently, revise for long-term recall, and prepare to explain your approach in interviews.",
};

const roadmapSteps = [
  {
    title: "Understand the problem before coding",
    icon: Lightbulb,
    description:
      "Spend 5–10 minutes understanding what the problem asks before writing code. Careful problem framing helps you choose a sound approach instead of rushing into an implementation.",
    actions: [
      "Identify the input, output, and constraints.",
      "Work through a small example manually.",
      "Consider edge cases.",
      "Think of a brute-force approach first.",
      "Analyze its time and space complexity.",
      "Look for a more efficient approach.",
    ],
    note: "Do not jump straight to the solution or watch an explanation immediately.",
  },
  {
    title: "Follow the 30-minute problem-solving rule",
    icon: Timer,
    description:
      "Give a new problem an honest independent attempt. If you get stuck, use hints to move forward without giving up the reasoning process.",
    actions: [
      "Try solving it independently for 20–30 minutes.",
      "If stuck, ask for a hint rather than the complete solution.",
      "If necessary, study the explanation and understand why it works.",
      "Close the solution and implement it from memory.",
      "Revisit the problem later without looking at your notes.",
    ],
    note: "The objective is to learn how to derive the solution, not merely reproduce code.",
  },
  {
    title: "Maintain smart DSA notes",
    icon: NotebookPen,
    description:
      "You do not need lengthy notes for every question. Keep a concise record of important patterns and mistakes in a format you will consistently revisit.",
    actions: [
      "Problem name and link",
      "Pattern, such as Sliding Window, Two Pointers, or Binary Search",
      "Key observation: what makes the solution work?",
      "Approach: the main steps in plain language",
      "Time and space complexity",
      "Mistake made: what did you overlook?",
      "Recall trigger: what clue in a future problem should remind you of this pattern?",
    ],
    note: "Use Notion, Google Sheets, a notebook, or a simple Markdown file—whichever you can maintain.",
  },
];

const revisionSchedule = [
  { interval: "Day 0", action: "Solve the problem and understand the pattern." },
  { interval: "Day 1", action: "Recall the approach without opening the solution." },
  { interval: "Day 3", action: "Solve it again with minimal help." },
  { interval: "Day 7", action: "Implement it independently." },
  { interval: "Day 14", action: "Explain the approach and complexity aloud." },
  { interval: "Day 30", action: "Attempt it again under interview conditions." },
];

const trackerFields = [
  { field: "Problem", purpose: "Identify the question." },
  { field: "Topic", purpose: "Group related patterns." },
  { field: "Status", purpose: "Track New, Learning, or Mastered." },
  { field: "Difficulty", purpose: "Record Easy, Medium, or Hard." },
  { field: "Last revised", purpose: "Track when you last revisited it." },
  { field: "Next revision", purpose: "Plan your next attempt." },
  { field: "Mistake", purpose: "Remember what went wrong." },
  { field: "Independent solve", purpose: "Record Yes or No." },
];

const practiceOptions = [
  {
    title: "Blind 75",
    description: "Build a foundation in important interview patterns.",
    href: "/dsa/roadmaps/blind-75",
    linkLabel: "Explore Blind 75",
  },
  {
    title: "NeetCode 150",
    description: "Expand pattern coverage and practise common variations.",
    href: "/dsa/roadmaps/neetcode-150",
    linkLabel: "Explore NeetCode 150",
  },
  {
    title: "LeetCode",
    description: "Apply concepts to unfamiliar problems and variations.",
    href: "https://leetcode.com/problemset/",
    linkLabel: "Browse LeetCode problems",
    external: true,
  },
];

const readinessQuestions = [
  "Can I explain the approach without looking at the solution?",
  "Can I identify the pattern from the problem statement?",
  "Can I implement it from scratch?",
  "Can I explain why it works?",
  "Can I analyze its time and space complexity?",
  "Can I recognize when this approach would not work?",
];

export default function DSAPreparationGuidePage() {
  return (
    <main className="flex min-h-screen flex-col justify-between bg-[#f8fafc] text-slate-900 selection:bg-blue-600 selection:text-white">
      <Navbar />
      <SubNavPills categoryTitle="EXPLORE DSA" pills={dsaNavPills} />

      <section className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 md:py-12">
        <div className="mb-6 flex items-center gap-2 text-xs text-slate-600">
          <Link href="/" className="transition hover:text-slate-900">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/dsa" className="transition hover:text-slate-900">
            DSA Hub
          </Link>
          <span aria-hidden="true">/</span>
          <span className="font-medium text-blue-700">Preparation Guide</span>
        </div>

        <header className="mb-10 flex flex-col gap-5 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
              DSA problem-solving roadmap
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Move from practising familiar questions to solving new problems
              independently. Learn patterns, revisit what you have struggled
              with, and practise explaining your reasoning.
            </p>
          </div>
          <BackButton />
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <article className="min-w-0">
            <div className="mb-10 rounded-2xl border border-blue-200 bg-blue-50 p-5 sm:p-6">
              <p className="text-sm leading-relaxed text-slate-800">
                Solving hundreds of problems is not enough if you cannot recall
                an approach when a new problem appears. The goal is not just to
                finish Blind 75 or NeetCode 150—it is to understand patterns,
                remember approaches, and derive solutions independently.
              </p>
            </div>

            <section aria-labelledby="roadmap-heading">
              <h2
                id="roadmap-heading"
                className="text-2xl font-bold tracking-tight text-slate-900"
              >
                Learn, practise, revise, and retain
              </h2>

              <ol className="mt-8 space-y-0">
                {roadmapSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isLast = index === roadmapSteps.length - 1;

                  return (
                    <li
                      key={step.title}
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
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                          {step.description}
                        </p>
                        <ul
                          className={`mt-4 space-y-2 ${
                            index === 1 ? "list-decimal pl-5" : ""
                          }`}
                        >
                          {step.actions.map((action) => (
                            <li
                              key={action}
                              className={`text-sm leading-relaxed text-slate-700 ${
                                index === 1
                                  ? "pl-1 marker:font-semibold marker:text-blue-700"
                                  : "flex items-start gap-2.5"
                              }`}
                            >
                              {index !== 1 && (
                                <Check
                                  className="mt-0.5 h-4 w-4 shrink-0 text-blue-700"
                                  aria-hidden="true"
                                />
                              )}
                              <span>{action}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-relaxed text-slate-700">
                          <span className="font-semibold text-slate-900">
                            Keep in mind:{" "}
                          </span>
                          {step.note}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>

            <section
              aria-labelledby="revision-heading"
              className="mt-14 border-t border-slate-200 pt-10"
            >
              <div className="flex items-center gap-3">
                <RotateCcw
                  className="h-5 w-5 text-blue-700"
                  aria-hidden="true"
                />
                <h2
                  id="revision-heading"
                  className="text-2xl font-bold tracking-tight text-slate-900"
                >
                  Follow a revision cycle
                </h2>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                Revisiting problems helps move patterns into long-term recall.
                Treat these intervals as a starting point, not a strict rule: if
                recall is easy, increase the gap; if you struggle, review
                sooner.
              </p>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
                  <thead className="bg-slate-50 text-slate-800">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        When
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        What to do
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {revisionSchedule.map((item) => (
                      <tr key={item.interval}>
                        <th
                          scope="row"
                          className="whitespace-nowrap px-4 py-3 font-semibold text-slate-900"
                        >
                          {item.interval}
                        </th>
                        <td className="px-4 py-3 leading-relaxed">
                          {item.action}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section
              aria-labelledby="tracker-heading"
              className="mt-14 border-t border-slate-200 pt-10"
            >
              <div className="flex items-center gap-3">
                <ListChecks
                  className="h-5 w-5 text-blue-700"
                  aria-hidden="true"
                />
                <h2
                  id="tracker-heading"
                  className="text-2xl font-bold tracking-tight text-slate-900"
                >
                  Track the problems you struggle with
                </h2>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                A simple tracker makes it easier to decide what to revisit and
                see whether you can solve a problem without help.
              </p>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
                  <thead className="bg-slate-50 text-slate-800">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Field
                      </th>
                      <th scope="col" className="px-4 py-3 font-semibold">
                        Purpose
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {trackerFields.map((item) => (
                      <tr key={item.field}>
                        <th
                          scope="row"
                          className="whitespace-nowrap px-4 py-3 font-semibold text-slate-900"
                        >
                          {item.field}
                        </th>
                        <td className="px-4 py-3 leading-relaxed">
                          {item.purpose}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
                Do not mark a problem as mastered just because you understood
                its explanation. Mark it mastered when you can solve it
                independently and explain why the approach works.
              </p>
            </section>

            <section
              aria-labelledby="practice-heading"
              className="mt-14 border-t border-slate-200 pt-10"
            >
              <div className="flex items-center gap-3">
                <Compass
                  className="h-5 w-5 text-blue-700"
                  aria-hidden="true"
                />
                <h2
                  id="practice-heading"
                  className="text-2xl font-bold tracking-tight text-slate-900"
                >
                  Practise beyond DSA sheets
                </h2>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                Use structured sheets to build coverage, then gradually try
                unfamiliar problems and mixed-topic practice where the pattern
                is not given in advance.
              </p>
              <ul className="mt-5 divide-y divide-slate-200">
                {practiceOptions.map((option) => (
                  <li
                    key={option.title}
                    className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h3 className="font-bold text-slate-900">
                        {option.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {option.description}
                      </p>
                    </div>
                    <Link
                      href={option.href}
                      target={option.external ? "_blank" : undefined}
                      rel={option.external ? "noreferrer" : undefined}
                      className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-blue-700 underline decoration-blue-300 underline-offset-4 transition hover:text-blue-900"
                    >
                      {option.linkLabel}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
                <li className="py-4">
                  <h3 className="font-bold text-slate-900">
                    Timed and mixed-topic practice
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Build speed and decision-making under pressure, and practise
                    identifying the right pattern without knowing the topic in
                    advance.
                  </p>
                </li>
                <li className="py-4 last:pb-0">
                  <h3 className="font-bold text-slate-900">Mock interviews</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Practise explaining your reasoning while coding, as you
                    would in an interview.
                  </p>
                </li>
              </ul>
            </section>

            <section
              aria-labelledby="routine-heading"
              className="mt-14 border-t border-slate-200 pt-10"
            >
              <div className="flex items-center gap-3">
                <Clock3
                  className="h-5 w-5 text-blue-700"
                  aria-hidden="true"
                />
                <h2
                  id="routine-heading"
                  className="text-2xl font-bold tracking-tight text-slate-900"
                >
                  A practical 90-minute session
                </h2>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                Adjust the timing to the problem and the time you have
                available. The purpose is to make room for independent
                problem-solving, review, and reflection.
              </p>
              <ol className="mt-5 space-y-3">
                {[
                  ["10 minutes", "Revise previously attempted problems."],
                  ["35 minutes", "Solve one new problem independently."],
                  ["15 minutes", "Study hints or an explanation if necessary."],
                  [
                    "20 minutes",
                    "Reimplement the solution and understand its complexity.",
                  ],
                  [
                    "10 minutes",
                    "Update your notes and revision tracker.",
                  ],
                ].map(([duration, activity]) => (
                  <li
                    key={`${duration}-${activity}`}
                    className="flex flex-col gap-1 text-sm leading-relaxed sm:flex-row sm:gap-3"
                  >
                    <span className="w-28 shrink-0 font-semibold text-slate-900">
                      {duration}
                    </span>
                    <span className="text-slate-600">{activity}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section
              aria-labelledby="readiness-heading"
              className="mt-14 border-t border-slate-200 pt-10"
            >
              <div className="flex items-center gap-3">
                <CircleHelp
                  className="h-5 w-5 text-blue-700"
                  aria-hidden="true"
                />
                <h2
                  id="readiness-heading"
                  className="text-2xl font-bold tracking-tight text-slate-900"
                >
                  Test whether you actually remember
                </h2>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                Before considering a problem learned, check whether you can:
              </p>
              <ul className="mt-5 space-y-3">
                {readinessQuestions.map((question) => (
                  <li
                    key={question}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700"
                  >
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-blue-700"
                      aria-hidden="true"
                    />
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                If you cannot answer these questions, add the problem to your
                revision list.
              </p>
            </section>

            <section
              aria-labelledby="goal-heading"
              className="mt-14 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
            >
              <div className="flex items-center gap-3">
                <Brain
                  className="h-5 w-5 text-blue-700"
                  aria-hidden="true"
                />
                <h2
                  id="goal-heading"
                  className="text-2xl font-bold tracking-tight text-slate-900"
                >
                  The real goal
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Do not measure progress only by the number of questions solved.
                Measure it by how many problems you can solve independently,
                how well you recognize patterns, how effectively you debug
                mistakes, and how clearly you explain your reasoning.
              </p>
              <p className="mt-4 text-base font-semibold leading-relaxed text-slate-900">
                Move from “I have seen this problem before” to “I understand the
                pattern, and I can derive the solution myself.”
              </p>
            </section>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            <section className="rounded-2xl border border-slate-200 bg-white p-5">
              <h2 className="font-bold text-slate-900">Your weekly loop</h2>
              <ol className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
                <li>Learn a pattern and attempt a new problem.</li>
                <li>Record the key observation and any mistake.</li>
                <li>Schedule the next recall attempt.</li>
                <li>Mix in problems from earlier topics.</li>
                <li>Practise explaining your reasoning.</li>
              </ol>
            </section>

            <section className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <h2 className="font-bold text-slate-900">Ready to practise?</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Choose a roadmap sheet to build coverage, then apply the same
                patterns to unfamiliar questions.
              </p>
              <Link
                href="/dsa/roadmaps"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700 underline decoration-blue-300 underline-offset-4 transition hover:text-blue-900"
              >
                Browse DSA roadmaps
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
