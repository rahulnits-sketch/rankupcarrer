import HubPlaceholder from "@/components/HubPlaceholder";
import { gateNavPills } from "@/lib/hubNav";

export default function GatePreparationGuidePage() {
  return (
    <HubPlaceholder
      hubTitle="GATE CSE"
      categoryTitle="EXPLORE GATE"
      pills={gateNavPills}
      pageTitle="GATE CSE Preparation Guide"
      description="Step-by-step roadmap to prepare for GATE CSE alongside college or job: subject order, revision schedule, and mock strategy."
      parentHref="/gate"
      parentLabel="GATE Hub"
      suggestedSections={[
        {
          title: "Phase-wise Study Plan",
          description: "Concept building (Months 1–5), Topic PYQs (Months 6–7), Revision & Mocks (Months 8–10).",
        },
        {
          title: "Recommended Standard Books & Resources",
          description: "Curated reference books for OS (Galvin), DBMS (Navathe), TOC (Peter Linz), CN (Kurose & Ross).",
        },
        {
          title: "Mock Test Strategy & Mistake Notebook",
          description: "How to analyze full-length mock tests and eliminate negative marks in MSQs and calculation traps in NATs.",
        },
      ]}
    />
  );
}
