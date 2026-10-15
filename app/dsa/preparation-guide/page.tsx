import HubPlaceholder from "@/components/HubPlaceholder";
import { dsaNavPills } from "@/lib/hubNav";

export default function DSAPreparationGuidePage() {
  return (
    <HubPlaceholder
      hubTitle="DSA Hub"
      categoryTitle="EXPLORE DSA"
      pills={dsaNavPills}
      pageTitle="DSA & Problem-Solving Preparation Guide"
      description="How to transition from basic syntax to cracking hard LeetCode problems through pattern-based learning."
      parentHref="/dsa"
      parentLabel="DSA Hub"
      suggestedSections={[
        {
          title: "The 14 Fundamental Coding Patterns",
          description: "Two Pointers, Sliding Window, Fast & Slow Pointers, Merge Intervals, Cyclic Sort, and Top 'K' Elements.",
        },
        {
          title: "3 to 6 Months DSA Study Plan",
          description: "Structured schedule balancing linear data structures first before moving to trees, graphs, and dynamic programming.",
        },
        {
          title: "Live Mock Interview & Contest Practice",
          description: "Tips for participating in weekly contests, overcoming time limits, and explaining time complexity aloud.",
        },
      ]}
    />
  );
}
