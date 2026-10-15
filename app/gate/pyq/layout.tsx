import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GATE CSE PYQ - Previous Year Questions (1987-2026) with Solutions",
  description:
    "Solve all GATE CSE Previous Year Questions (PYQs) year-wise and subject-wise with detailed solutions. Real GATE CBT interface practice for Computer Science.",
  keywords: [
    "GATE CSE PYQ",
    "GATE CSE previous year questions",
    "GATE CSE 2024 PYQ",
    "GATE CSE 2025 PYQ",
    "GATE CSE 2026 questions with solutions",
    "GATE CS previous year papers",
    "GATE PYQ test series",
  ],
  openGraph: {
    title: "GATE CSE PYQ - Previous Year Questions (1987-2026) with Solutions",
    description:
      "Solve all GATE CSE Previous Year Questions (PYQs) year-wise with complete step-by-step solutions and real exam test format.",
  },
};

export default function GatePyqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
