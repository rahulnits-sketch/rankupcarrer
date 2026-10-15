import HubPlaceholder from "@/components/HubPlaceholder";
import { gateNavPills } from "@/lib/hubNav";

export default function GateCutoffsPage() {
  return (
    <HubPlaceholder
      hubTitle="GATE CSE"
      categoryTitle="EXPLORE GATE"
      pills={gateNavPills}
      pageTitle="GATE CSE Previous Year Cutoffs"
      description="Historical qualifying marks across General, OBC-NCL, EWS, SC, ST categories, and target score percentiles for top IITs and PSUs."
      parentHref="/gate"
      parentLabel="GATE Hub"
      suggestedSections={[
        {
          title: "Qualifying Marks Trends (2020–2026)",
          description: "Category-wise minimum marks required to qualify GATE Computer Science exam.",
        },
        {
          title: "IIT & NIT Admission Score Benchmarks",
          description: "Approximate GATE scores and rank ranges needed for M.Tech admissions in IISc Bangalore, top IITs, and NITs.",
        },
        {
          title: "PSU Recruitment Cutoffs",
          description: "Expected All-India rank requirements for PSU hiring through GATE CSE.",
        },
      ]}
    />
  );
}
