import HubPlaceholder from "@/components/HubPlaceholder";
import { placementNavPills } from "@/lib/hubNav";

export default function PlacementInterviewQAPage() {
  return (
    <HubPlaceholder
      hubTitle="Placement Prep"
      categoryTitle="EXPLORE PLACEMENT"
      pills={placementNavPills}
      pageTitle="Technical & HR Interview Question Bank"
      description="Most frequently asked technical concepts in DBMS, OS, Computer Networks, OOPs, system design basics, and HR behavioral questions."
      parentHref="/placement"
      parentLabel="Placement Hub"
      suggestedSections={[
        {
          title: "Core CS Fundamentals (Top 100 Q&A)",
          description: "Essential interview questions covering DBMS (ACID, Normalization), OS (Threads vs Processes), and OOPs 4 Pillars.",
        },
        {
          title: "HR & Behavioral Questions with STAR Method",
          description: "'Tell me about yourself', 'Why this company?', 'Describe a challenging project situation', and situational responses.",
        },
        {
          title: "Project Discussion & Resume Defending",
          description: "How to articulate your projects, explain architectural decisions, and answer deep technical follow-ups.",
        },
      ]}
    />
  );
}
