import pyqManifest from "@/data/gate/pyq/manifest.json";
import subjectsManifest from "@/data/gate/subjects/manifest.json";
import mockPresets from "@/data/gate/mock/mocks.json";

import mePyqManifest from "@/data/gate/branches/mechanical/pyq/manifest.json";
import meSubjectsManifest from "@/data/gate/branches/mechanical/subjects/manifest.json";
import meMockPresets from "@/data/gate/branches/mechanical/mock/mocks.json";

import cePyqManifest from "@/data/gate/branches/civil/pyq/manifest.json";
import ceSubjectsManifest from "@/data/gate/branches/civil/subjects/manifest.json";
import ceMockPresets from "@/data/gate/branches/civil/mock/mocks.json";

import eePyqManifest from "@/data/gate/branches/electrical/pyq/manifest.json";
import eeSubjectsManifest from "@/data/gate/branches/electrical/subjects/manifest.json";
import eeMockPresets from "@/data/gate/branches/electrical/mock/mocks.json";

import ecePyqManifest from "@/data/gate/branches/ece/pyq/manifest.json";
import eceSubjectsManifest from "@/data/gate/branches/ece/subjects/manifest.json";
import eceMockPresets from "@/data/gate/branches/ece/mock/mocks.json";

export type GateQuestion = {
  id: string;
  testId: string;
  year: number;
  set?: number;
  yearSetKey: string;
  orderIndex: number;
  section: "GA" | "CS" | "ME" | "CE" | "EE" | "EC" | string;
  title: string;
  subject: string;
  subjectSlug: string;
  topic?: string;
  type: "MCQ" | "MSQ" | "NAT" | "MTA" | string;
  question: string;
  rawQuestionHtml?: string;
  options: string[];
  structuredOptions?: { label: string; text: string; html?: string }[];
  answer: string[];
  tolerance?: { min?: number; max?: number; lower?: number; upper?: number; abs?: number } | null;
  marks: number;
  negativeMarks: number;
  source?: string;
  link?: string;
  difficulty?: string;
  explanation?: string;
};

export type GatePaper = {
  id: string;
  yearSetKey: string;
  year: number;
  set: number;
  title: string;
  duration: string;
  durationMinutes: number;
  totalMarks: number;
  totalQuestions: number;
  gaQuestions: number;
  csQuestions: number;
  questions: GateQuestion[];
};

export type GateSubject = {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  color: string;
  borderColor: string;
  totalQuestions: number;
  topics: { name: string; questionCount: number }[];
  questions?: GateQuestion[];
};

export type GateMockPreset = {
  id: string;
  title: string;
  type: string;
  category: string;
  subjectSlug?: string;
  subjectName?: string;
  questionsCount: number;
  totalMarks: number;
  durationMinutes: number;
  duration: string;
  difficulty: string;
  description: string;
  sourcePaper?: string;
  isDynamic?: boolean;
  isSubjectMock?: boolean;
  branch?: string;
};

export function getPyqManifest(branchSlug = "cse-it") {
  if (branchSlug === "mechanical") return mePyqManifest;
  if (branchSlug === "civil") return cePyqManifest;
  if (branchSlug === "electrical") return eePyqManifest;
  if (branchSlug === "ece") return ecePyqManifest;
  return pyqManifest;
}

export function getSubjectsManifest(branchSlug = "cse-it") {
  if (branchSlug === "mechanical") return meSubjectsManifest;
  if (branchSlug === "civil") return ceSubjectsManifest;
  if (branchSlug === "electrical") return eeSubjectsManifest;
  if (branchSlug === "ece") return eceSubjectsManifest;
  return subjectsManifest;
}

export function getMockPresets(branchSlug = "cse-it"): GateMockPreset[] {
  if (branchSlug === "mechanical") return meMockPresets as GateMockPreset[];
  if (branchSlug === "civil") return ceMockPresets as GateMockPreset[];
  if (branchSlug === "electrical") return eeMockPresets as GateMockPreset[];
  if (branchSlug === "ece") return eceMockPresets as GateMockPreset[];
  return mockPresets as GateMockPreset[];
}

/**
 * Load questions for any given testId synchronously or dynamically across ALL branches
 */
export async function getGateQuestionsForTest(testId: string): Promise<{
  title: string;
  subject: string;
  durationMinutes: number;
  questions: GateQuestion[];
} | null> {
  // 1. Branch-specific PYQ Papers
  if (testId.startsWith("gate-me-")) {
    const paperKey = testId.slice("gate-me-".length);
    try {
      const mod = await import(`@/data/gate/branches/mechanical/pyq/${paperKey}.json`);
      const paper = mod.default;
      return {
        title: paper.title,
        subject: "GATE Mechanical Paper",
        durationMinutes: paper.durationMinutes || 180,
        questions: paper.questions || []
      };
    } catch (e) {
      console.error("Error loading mechanical paper:", e);
    }
  } else if (testId.startsWith("gate-ce-")) {
    const paperKey = testId.slice("gate-ce-".length);
    try {
      const mod = await import(`@/data/gate/branches/civil/pyq/${paperKey}.json`);
      const paper = mod.default;
      return {
        title: paper.title,
        subject: "GATE Civil Paper",
        durationMinutes: paper.durationMinutes || 180,
        questions: paper.questions || []
      };
    } catch (e) {
      console.error("Error loading civil paper:", e);
    }
  } else if (testId.startsWith("gate-ee-")) {
    const paperKey = testId.slice("gate-ee-".length);
    try {
      const mod = await import(`@/data/gate/branches/electrical/pyq/${paperKey}.json`);
      const paper = mod.default;
      return {
        title: paper.title,
        subject: "GATE Electrical Paper",
        durationMinutes: paper.durationMinutes || 180,
        questions: paper.questions || []
      };
    } catch (e) {
      console.error("Error loading electrical paper:", e);
    }
  } else if (testId.startsWith("gate-ec-")) {
    const paperKey = testId.slice("gate-ec-".length);
    try {
      const mod = await import(`@/data/gate/branches/ece/pyq/${paperKey}.json`);
      const paper = mod.default;
      return {
        title: paper.title,
        subject: "GATE ECE Paper",
        durationMinutes: paper.durationMinutes || 180,
        questions: paper.questions || []
      };
    } catch (e) {
      console.error("Error loading ece paper:", e);
    }
  }

  // 2. Default CSE PYQ Papers (e.g. gate-2026-s1, gate-2025-s1, etc.)
  if (testId.startsWith("gate-20") || testId.startsWith("gate-19")) {
    const pyqKey = testId.replace(/^gate-/, "");
    try {
      const paperModule = await import(`@/data/gate/pyq/${pyqKey}.json`);
      const paper: GatePaper = paperModule.default;
      return {
        title: paper.title,
        subject: "GATE CSE Official Paper",
        durationMinutes: paper.durationMinutes || 180,
        questions: paper.questions
      };
    } catch {
      // continue to other matchers
    }
  }

  // 3. Branch-specific Subject Practice tests
  // e.g. gate-subject-mechanical-thermodynamics, gate-subject-civil-structures
  const branchSubjectLoaders: Record<string, (id: string) => Promise<any>> = {
    mechanical: (id) => import(`@/data/gate/branches/mechanical/subjects/${id}.json`),
    civil: (id) => import(`@/data/gate/branches/civil/subjects/${id}.json`),
    electrical: (id) => import(`@/data/gate/branches/electrical/subjects/${id}.json`),
    ece: (id) => import(`@/data/gate/branches/ece/subjects/${id}.json`),
  };

  for (const [bSlug, loader] of Object.entries(branchSubjectLoaders)) {
    const prefix = `gate-subject-${bSlug}-`;
    const shortPrefix = `gate-subject-${bSlug.slice(0, 2)}-`;
    let subjId = "";
    if (testId.startsWith(prefix)) {
      subjId = testId.slice(prefix.length);
    } else if (testId.startsWith(shortPrefix)) {
      subjId = testId.slice(shortPrefix.length);
    }

    if (subjId) {
      try {
        const subjModule = await loader(subjId);
        const subjData = subjModule.default;
        const qList = subjData.questions || [];
        return {
          title: `${subjData.name} — Practice Set`,
          subject: subjData.name,
          durationMinutes: Math.min(180, Math.max(20, Math.ceil(qList.length * 2.5))),
          questions: qList.map((q: GateQuestion, i: number) => ({ ...q, orderIndex: i + 1 }))
        };
      } catch (e) {
        console.error(`Error loading ${bSlug} subject ${subjId}:`, e);
      }
    }
  }

  // 4. Branch-specific Subject Mocks
  // e.g. gate-mock-subj-mechanical-thermodynamics
  for (const [bSlug, loader] of Object.entries(branchSubjectLoaders)) {
    const prefix = `gate-mock-subj-${bSlug}-`;
    if (testId.startsWith(prefix)) {
      const subjId = testId.slice(prefix.length);
      try {
        const subjModule = await loader(subjId);
        const subjData = subjModule.default as GateSubject;
        const allQuestions: GateQuestion[] = subjData.questions || [];
        const sampled: GateQuestion[] = sampleQuestions<GateQuestion>(allQuestions, 25);
        return {
          title: `${subjData.name} — Subject Mock`,
          subject: subjData.name,
          durationMinutes: 45,
          questions: sampled.map((q, i) => ({ ...q, orderIndex: i + 1 }))
        };
      } catch (e) {
        console.error(`Error loading mock for ${bSlug} subject ${subjId}:`, e);
      }
    }
  }

  // 5. Branch-specific Full Mocks
  // e.g. gate-mock-mechanical-full-1
  for (const [bSlug, loader] of Object.entries(branchSubjectLoaders)) {
    const prefix = `gate-mock-${bSlug}-full-`;
    if (testId.startsWith(prefix)) {
      try {
        const manifest = getSubjectsManifest(bSlug);
        let allBranchQuestions: GateQuestion[] = [];
        for (const s of manifest) {
          try {
            const mod = await loader(s.id);
            if (mod.default?.questions) {
              allBranchQuestions.push(...mod.default.questions);
            }
          } catch {}
        }
        const sampled = sampleQuestions(allBranchQuestions, 65);
        return {
          title: `GATE ${bSlug.toUpperCase()} Full Mock Exam`,
          subject: `GATE ${bSlug.toUpperCase()} Mock`,
          durationMinutes: 180,
          questions: sampled.map((q, i) => ({ ...q, orderIndex: i + 1 }))
        };
      } catch (e) {
        console.error(`Error building full mock for ${bSlug}:`, e);
      }
    }
  }

  // 6. CSE Core Subjects: gate-subject-os, gate-subject-dbms, etc.
  const KNOWN_CSE_SUBJECT_SLUGS = [
    "os", "dbms", "cn", "dsa", "toc", "coa", "compiler", "digital",
    "discrete-math", "engg-math", "aptitude"
  ];
  const sortedCseSlugs = [...KNOWN_CSE_SUBJECT_SLUGS].sort((a, b) => b.length - a.length);

  // 7. Topic practice (e.g. gate-topic-[branch]-[subject]-[topicSlug] or gate-topic-[subject]-[topicSlug])
  if (testId.startsWith("gate-topic-")) {
    const afterPrefix = testId.slice("gate-topic-".length);

    // 7a. Check branch-specific topic tests: gate-topic-[mechanical|civil|electrical|ece]-[subject]-[topicSlug]
    for (const bSlug of ["mechanical", "civil", "electrical", "ece"]) {
      if (afterPrefix.startsWith(`${bSlug}-`)) {
        const branchRest = afterPrefix.slice(bSlug.length + 1);
        const manifest = getSubjectsManifest(bSlug);
        const sortedSubjSlugs = manifest.map(s => s.id).sort((a, b) => b.length - a.length);
        const matchedSubj = sortedSubjSlugs.find(s => branchRest.startsWith(`${s}-`));
        if (matchedSubj) {
          const rawTopicSlug = branchRest.slice(matchedSubj.length + 1);
          const targetTopicNorm = decodeURIComponent(rawTopicSlug).toLowerCase().replace(/[^a-z0-9]/g, "");

          try {
            const subjModule = await import(`@/data/gate/branches/${bSlug}/subjects/${matchedSubj}.json`);
            const subjData: GateSubject = subjModule.default;
            const allSubjQuestions = subjData.questions || [];

            const filtered = allSubjQuestions.filter(q => {
              const qTopicNorm = String(q.topic || "").toLowerCase().replace(/[^a-z0-9]/g, "");
              return qTopicNorm.includes(targetTopicNorm) || targetTopicNorm.includes(qTopicNorm);
            });

            const qList = filtered.length > 0 ? filtered : allSubjQuestions;
            const displayTopic = filtered.length > 0 && filtered[0]?.topic ? filtered[0].topic : "Topic Practice";

            return {
              title: `${subjData.name} — ${displayTopic}`,
              subject: subjData.name,
              durationMinutes: Math.min(120, Math.max(15, Math.ceil(qList.length * 2.5))),
              questions: qList.map((q, i) => ({ ...q, orderIndex: i + 1 }))
            };
          } catch (e) {
            console.error(`Error loading topic questions for ${bSlug}:`, e);
          }
        }
      }
    }

    // 7b. Default CSE topic practice
    const matchedSlug = sortedCseSlugs.find(slug => afterPrefix.startsWith(`${slug}-`));

    if (matchedSlug) {
      const rawTopicSlug = afterPrefix.slice(matchedSlug.length + 1);
      const targetTopicNorm = decodeURIComponent(rawTopicSlug).toLowerCase().replace(/[^a-z0-9]/g, "");

      try {
        const subjModule = await import(`@/data/gate/subjects/${matchedSlug}.json`);
        const subjData: GateSubject = subjModule.default;
        const allSubjQuestions = subjData.questions || [];

        const filtered = allSubjQuestions.filter(q => {
          const qTopicNorm = String(q.topic || "").toLowerCase().replace(/[^a-z0-9]/g, "");
          return qTopicNorm.includes(targetTopicNorm) || targetTopicNorm.includes(qTopicNorm);
        });

        const qList = filtered.length > 0 ? filtered : allSubjQuestions;
        const displayTopic = filtered.length > 0 && filtered[0]?.topic ? filtered[0].topic : "Topic Practice";

        return {
          title: `${subjData.name} — ${displayTopic}`,
          subject: subjData.name,
          durationMinutes: Math.min(120, Math.max(15, Math.ceil(qList.length * 2.5))),
          questions: qList.map((q, i) => ({ ...q, orderIndex: i + 1 }))
        };
      } catch (e) {
        console.error("Error loading topic questions:", e);
      }
    }
  }

  // 8. CSE Subject Mock or Practice Set
  const isMockSubj = testId.startsWith("gate-mock-subj-");
  const isSubjectAll = testId.startsWith("gate-subject-");
  if (isMockSubj || isSubjectAll) {
    const prefix = isMockSubj ? "gate-mock-subj-" : "gate-subject-";
    const subjSlug = testId.slice(prefix.length);
    if (KNOWN_CSE_SUBJECT_SLUGS.includes(subjSlug)) {
      try {
        const subjModule = await import(`@/data/gate/subjects/${subjSlug}.json`);
        const subjData: GateSubject = subjModule.default;
        const allSubjQuestions = subjData.questions || [];
        const questionsToTake = isMockSubj ? sampleQuestions(allSubjQuestions, 25) : allSubjQuestions;
        return {
          title: `${subjData.name} — ${isMockSubj ? "Mock Test" : "Practice Set"}`,
          subject: subjData.name,
          durationMinutes: isMockSubj ? 45 : Math.min(180, Math.max(20, Math.ceil(questionsToTake.length * 2))),
          questions: questionsToTake.map((q, i) => ({ ...q, orderIndex: i + 1 }))
        };
      } catch (e) {
        console.error("Error loading subject questions:", e);
      }
    }
  }

  // 9. CSE Dynamic Mock (e.g. gate-mock-random-65, gate-mock-random-30, gate-mock-full-...)
  if (testId.startsWith("gate-mock-")) {
    const mockPreset = (mockPresets as GateMockPreset[]).find(m => m.id === testId);
    if (mockPreset?.sourcePaper) {
      try {
        const paperModule = await import(`@/data/gate/pyq/${mockPreset.sourcePaper}.json`);
        const paper: GatePaper = paperModule.default;
        return {
          title: mockPreset.title,
          subject: "Full GATE CSE Mock",
          durationMinutes: mockPreset.durationMinutes || 180,
          questions: paper.questions
        };
      } catch {
        // continue
      }
    }

    try {
      const allQModule = await import("@/data/gate/all-questions.json");
      const allList = allQModule.default as unknown as GateQuestion[];
      const count = mockPreset?.questionsCount || 65;
      return {
        title: mockPreset?.title || "GATE CSE Dynamic Mock",
        subject: "Full GATE CSE Mock",
        durationMinutes: mockPreset?.durationMinutes || 180,
        questions: sampleFullGateMock(allList, count)
      };
    } catch {
      // continue
    }
  }

  return null;
}

function sampleQuestions<T>(items: T[], n: number): T[] {
  if (items.length <= n) return items;
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function sampleFullGateMock(questions: GateQuestion[], targetCount: number = 65): GateQuestion[] {
  const gaList = questions.filter(q => q.section === "GA" || q.subjectSlug === "aptitude");
  const csList = questions.filter(q => q.section !== "GA" && q.subjectSlug !== "aptitude");

  const gaCount = targetCount === 65 ? 10 : Math.round(targetCount * (10 / 65));
  const csCount = targetCount - gaCount;

  const selectedGa = sampleQuestions(gaList, gaCount);
  const selectedCs = sampleQuestions(csList, csCount);

  return [...selectedGa, ...selectedCs].map((q, i) => ({
    ...q,
    orderIndex: i + 1
  }));
}
