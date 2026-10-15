export type GateBranchSlug = "cse-it" | "ece" | "electrical" | "civil" | "mechanical";

export type GateBranch = {
  slug: GateBranchSlug;
  code: string;
  title: string;
  shortTitle: string;
  icon: "cpu" | "circuit" | "bolt" | "building" | "cog";
  accent: "blue" | "cyan" | "amber" | "emerald" | "purple";
  description: string;
  metaDescription: string;
};

export const gateBranches: Record<GateBranchSlug, GateBranch> = {
  "cse-it": {
    slug: "cse-it",
    code: "CS",
    title: "GATE Computer Science & Information Technology",
    shortTitle: "CSE / IT",
    icon: "cpu",
    accent: "blue",
    description:
      "Build a strong foundation in computer science with previous-year papers, subject-wise practice, and mock tests.",
    metaDescription:
      "Prepare for GATE CSE / IT with previous-year questions, subject practice, and mock tests.",
  },
  ece: {
    slug: "ece",
    code: "EC",
    title: "GATE Electronics & Communication Engineering",
    shortTitle: "Electronics & Communication",
    icon: "circuit",
    accent: "cyan",
    description:
      "Get ready for GATE ECE with a dedicated place for electronics and communication study resources.",
    metaDescription:
      "Explore the GATE Electronics and Communication Engineering preparation hub.",
  },
  electrical: {
    slug: "electrical",
    code: "EE",
    title: "GATE Electrical Engineering",
    shortTitle: "Electrical",
    icon: "bolt",
    accent: "amber",
    description:
      "Prepare for GATE Electrical Engineering with a focused home for your branch resources and practice.",
    metaDescription:
      "Explore the GATE Electrical Engineering preparation hub.",
  },
  civil: {
    slug: "civil",
    code: "CE",
    title: "GATE Civil Engineering",
    shortTitle: "Civil",
    icon: "building",
    accent: "emerald",
    description:
      "Find your Civil Engineering preparation resources in one dedicated GATE branch hub.",
    metaDescription:
      "Explore the GATE Civil Engineering preparation hub.",
  },
  mechanical: {
    slug: "mechanical",
    code: "ME",
    title: "GATE Mechanical Engineering",
    shortTitle: "Mechanical",
    icon: "cog",
    accent: "purple",
    description:
      "Get ready for GATE Mechanical Engineering with a dedicated home for branch-wise study and practice.",
    metaDescription:
      "Explore the GATE Mechanical Engineering preparation hub.",
  },
};
