import HubPlaceholder from "@/components/HubPlaceholder";
import { gateNavPills } from "@/lib/hubNav";

export default function GateImportantQuestionsPage() {
  return (
    <HubPlaceholder
      hubTitle="GATE CSE"
      categoryTitle="EXPLORE GATE"
      pills={gateNavPills}
      pageTitle="GATE CSE Most Important Questions & PYQ Concepts"
      description="Repeated concepts, frequently tested standard formulas, and high-yield problems across all GATE CSE subjects."
      parentHref="/gate"
      parentLabel="GATE Hub"
      suggestedSections={[
        {
          title: "High-Frequency Concepts per Subject",
          description: "Top 5 concepts asked every year in Operating Systems, DBMS, TOC, Algorithms, and CN.",
        },
        {
          title: "Tricky MSQ & NAT Practice Problems",
          description: "Curated collection of questions that have edge-case traps and multi-concept integrations.",
        },
        {
          title: "Engineering Mathematics & Aptitude Formulas",
          description: "Essential cheat sheets for Linear Algebra, Calculus, Graph Theory, and Permutations.",
        },
      ]}
    />
  );
}
