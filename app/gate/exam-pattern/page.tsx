import HubPlaceholder from "@/components/HubPlaceholder";
import { gateNavPills } from "@/lib/hubNav";

export default function GateExamPatternPage() {
  return (
    <HubPlaceholder
      hubTitle="GATE CSE"
      categoryTitle="EXPLORE GATE"
      pills={gateNavPills}
      pageTitle="GATE Exam Pattern & Marking Scheme"
      description="Understand the official paper structure, distribution of 1-mark and 2-mark questions, MCQ, MSQ, and NAT types, along with negative marking rules."
      parentHref="/gate"
      parentLabel="GATE Hub"
      suggestedSections={[
        {
          title: "Exam Structure & Time Duration",
          description: "65 total questions, 100 maximum marks, and 180 minutes computer-based test structure.",
        },
        {
          title: "Question Types (MCQ, MSQ, NAT)",
          description: "Marking schemes: +1/+2 marks with negative penalties for MCQ and zero negative penalty for MSQ/NAT.",
        },
        {
          title: "Section-wise Distribution",
          description: "15 marks General Aptitude + 85 marks Core Computer Science and Engineering Mathematics.",
        },
      ]}
    />
  );
}
