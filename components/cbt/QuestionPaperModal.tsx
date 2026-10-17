"use client";

import { X } from "lucide-react";
import MathContent from "@/components/MathContent";
import { Question } from "@/app/test/[id]/page";

interface QuestionPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  testTitle: string;
}

export default function QuestionPaperModal({
  isOpen,
  onClose,
  questions,
  testTitle,
}: QuestionPaperModalProps) {
  if (!isOpen) return null;

  // Split into GA (Q1-Q10) and Core CSE (Q11-Q65) if 65 questions, or by subject
  const isGate65 = questions.length === 65;
  const section1 = isGate65 ? questions.slice(0, 10) : questions;
  const section2 = isGate65 ? questions.slice(10) : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Question Paper View"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 md:p-6"
    >
      <div className="flex h-full max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl border border-slate-300 bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-6 py-3.5">
          <div>
            <h2 className="text-sm md:text-base font-bold text-slate-900">
              Question Paper View — {testTitle || "GATE Examination"}
            </h2>
            <p className="text-xs text-slate-500">
              Total Questions: {questions.length} | Review all questions and marking scheme
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Questions Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Section 1 */}
          <div>
            <div className="mb-4 rounded-xl bg-blue-50 border border-blue-200 p-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800">
                {isGate65
                  ? "Section 1: General Aptitude (GA) — 10 Questions (15 Marks)"
                  : "Examination Questions"}
              </h3>
            </div>

            <div className="space-y-6">
              {section1.map((q, idx) => (
                <div
                  key={`qp-${q.id}-${idx}`}
                  className="rounded-xl border border-slate-200 bg-slate-50/50 p-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3 text-xs">
                    <span className="font-bold text-blue-700">Q{idx + 1}</span>
                    <span className="font-semibold text-slate-600 uppercase">
                      {q.type} | +{q.marks} / -{q.type === "MCQ" ? q.negativeMarks : 0} Marks
                    </span>
                  </div>

                  <div className="text-sm text-slate-800 mb-3">
                    <MathContent content={q.question} />
                  </div>

                  {q.options && q.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {(q.structuredOptions && q.structuredOptions.length > 0
                        ? q.structuredOptions
                        : q.options.map((opt, i) => ({
                            label: String.fromCharCode(65 + i),
                            text: opt,
                            html: opt,
                          }))
                      ).map((opt) => (
                        <div
                          key={opt.label}
                          className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-2 text-slate-700"
                        >
                          <span className="font-bold text-slate-900 shrink-0">
                            ({opt.label})
                          </span>
                          <div className="flex-1">
                            <MathContent content={opt.html || opt.text} inline />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 2 if 65 questions */}
          {section2.length > 0 && (
            <div>
              <div className="mb-4 rounded-xl bg-indigo-50 border border-indigo-200 p-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-800">
                  Section 2: Computer Science &amp; Information Technology (CS) — 55 Questions (85 Marks)
                </h3>
              </div>

              <div className="space-y-6">
                {section2.map((q, idx) => {
                  const globalIdx = idx + 10;
                  return (
                    <div
                      key={`qp-${q.id}-${globalIdx}`}
                      className="rounded-xl border border-slate-200 bg-slate-50/50 p-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-indigo-700">Q{globalIdx + 1}</span>
                          <span className="text-slate-500">• {q.subject}</span>
                        </div>
                        <span className="font-semibold text-slate-600 uppercase">
                          {q.type} | +{q.marks} / -{q.type === "MCQ" ? q.negativeMarks : 0} Marks
                        </span>
                      </div>

                      <div className="text-sm text-slate-800 mb-3">
                        <MathContent content={q.question} />
                      </div>

                      {q.options && q.options.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {(q.structuredOptions && q.structuredOptions.length > 0
                            ? q.structuredOptions
                            : q.options.map((opt, i) => ({
                                label: String.fromCharCode(65 + i),
                                text: opt,
                                html: opt,
                              }))
                          ).map((opt) => (
                            <div
                              key={opt.label}
                              className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-2 text-slate-700"
                            >
                              <span className="font-bold text-slate-900 shrink-0">
                                ({opt.label})
                              </span>
                              <div className="flex-1">
                                <MathContent content={opt.html || opt.text} inline />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3 text-right">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white transition hover:bg-slate-800"
          >
            Close Question Paper
          </button>
        </div>
      </div>
    </div>
  );
}
