import HubPlaceholder from "@/components/HubPlaceholder";
import { dsaNavPills } from "@/lib/hubNav";

export default function DSACompanyQuestionsPage() {
  return (
    <HubPlaceholder
      hubTitle="DSA Hub"
      categoryTitle="EXPLORE DSA"
      pills={dsaNavPills}
      pageTitle="Company-Wise DSA Questions"
      description="Practice real interview problems asked by top tech companies like Google, Amazon, Microsoft, Uber, and top Indian product firms."
      parentHref="/dsa"
      parentLabel="DSA Hub"
      suggestedSections={[
        {
          title: "FAANG / Big Tech Problems",
          description: "Top frequently asked algorithmic questions for Google, Amazon, Meta, and Microsoft.",
        },
        {
          title: "High-Growth Startups & FinTech",
          description: "Problem sets from Uber, Swiggy, Zomato, Razorpay, and CRED technical rounds.",
        },
        {
          title: "Frequency & Tag Filters",
          description: "Sort problems by occurrence frequency in the last 6 months.",
        },
      ]}
    />
  );
}
