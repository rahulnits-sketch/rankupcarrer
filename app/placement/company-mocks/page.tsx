import HubPlaceholder from "@/components/HubPlaceholder";
import { placementNavPills } from "@/lib/hubNav";

export default function PlacementCompanyMocksPage() {
  return (
    <HubPlaceholder
      hubTitle="Placement Prep"
      categoryTitle="EXPLORE PLACEMENT"
      pills={placementNavPills}
      pageTitle="Company-Specific Placement Mock Tests"
      description="Full-length simulated recruitment tests modelled on actual patterns of TCS NQT, Infosys, Wipro, Accenture, Cognizant, and product giants."
      parentHref="/placement"
      parentLabel="Placement Hub"
      suggestedSections={[
        {
          title: "TCS NQT Pattern Test Series",
          description: "Numerical Ability, Reasoning, Verbal, and Hands-on Coding questions.",
        },
        {
          title: "Service Company Assessment Series",
          description: "Full pattern drills for Infosys, Accenture, Wipro, and Capgemini campus drives.",
        },
        {
          title: "Product-Based Company Online Assessments",
          description: "Timed aptitude and CS core assessments for Adobe, Amazon, and fintech firms.",
        },
      ]}
    />
  );
}
