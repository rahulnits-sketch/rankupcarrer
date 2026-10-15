import HubPlaceholder from "@/components/HubPlaceholder";
import { placementNavPills } from "@/lib/hubNav";

export default function PlacementPreparationGuidePage() {
  return (
    <HubPlaceholder
      hubTitle="Placement Prep"
      categoryTitle="EXPLORE PLACEMENT"
      pills={placementNavPills}
      pageTitle="Campus Placement Complete Roadmap"
      description="A structured roadmap for engineering students to crack top service and product company campus placements."
      parentHref="/placement"
      parentLabel="Placement Hub"
      suggestedSections={[
        {
          title: "Timeline & Preparation Milestones",
          description: "Semester-by-semester planning: 5th sem (DSA + Aptitude), 6th sem (Core CS + Projects), 7th sem (Company Tests & Mocks).",
        },
        {
          title: "Aptitude & Speed Optimization",
          description: "Techniques for clearing Online Assessment (OA) sectional cutoffs in 60 minutes.",
        },
        {
          title: "Resume & Portfolio Preparation",
          description: "How to craft an ATS-compliant resume and showcase 2 impactful technical projects.",
        },
      ]}
    />
  );
}
