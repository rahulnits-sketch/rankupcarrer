import HubPlaceholder from "@/components/HubPlaceholder";
import { dsaNavPills } from "@/lib/hubNav";

export default function DSACheatsheetsPage() {
  return (
    <HubPlaceholder
      hubTitle="DSA Hub"
      categoryTitle="EXPLORE DSA"
      pills={dsaNavPills}
      pageTitle="DSA Formulas, Templates & Complexity Cheatsheets"
      description="Quick reference guides for Big-O complexities, data structure operations, graph algorithms, and standard templates."
      parentHref="/dsa"
      parentLabel="DSA Hub"
      suggestedSections={[
        {
          title: "Big-O Time & Space Complexity Reference",
          description: "Worst, average, and best-case lookup tables for arrays, hash tables, BSTs, heaps, and sorting algorithms.",
        },
        {
          title: "Standard Code Templates (C++, Java, Python)",
          description: "Ready-to-use boilerplate for Binary Search, BFS/DFS, Dijkstra, Trie, and Union-Find.",
        },
        {
          title: "Bit Manipulation & Math Tricks",
          description: "Essential bitwise operations, power of two checks, XOR properties, and prime sieve algorithms.",
        },
      ]}
    />
  );
}
