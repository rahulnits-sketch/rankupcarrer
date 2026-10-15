import HubPlaceholder from "@/components/HubPlaceholder";
import { gateNavPills } from "@/lib/hubNav";

export default function GateEligibilityPage() {
  return (
    <HubPlaceholder
      hubTitle="GATE CSE"
      categoryTitle="EXPLORE GATE"
      pills={gateNavPills}
      pageTitle="GATE Eligibility Criteria"
      description="Official educational qualifications, degree eligibility, age limits, and attempt rules for the GATE examination."
      parentHref="/gate"
      parentLabel="GATE Hub"
      suggestedSections={[
        {
          title: "Eligible Degrees & Pre-Final Year Rules",
          description: "Details for B.E. / B.Tech / M.Sc / MCA students. 3rd-year and 4th-year students are eligible.",
        },
        {
          title: "Age Limit & Attempt Criteria",
          description: "No upper age restrictions and unlimited attempts for appearing in GATE.",
        },
        {
          title: "Document & Identification Requirements",
          description: "Accepted photo IDs and proof of candidate status required during application registration.",
        },
      ]}
    />
  );
}
