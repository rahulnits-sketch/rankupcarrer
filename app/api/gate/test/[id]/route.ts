import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type RouteContext = {
  params: Promise<{ id: string }>;
};

const ROOT_DIR = process.cwd();

function sampleItems<T>(items: T[], n: number): T[] {
  if (items.length <= n) return items;
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { id: testId } = await params;

  try {
    // 1. Branch PYQs (e.g. gate-me-2024-s1, gate-ce-2024-s1, gate-ee-2024-s1, gate-ec-2024-s1)
    const branchPrefixMap: Record<string, { slug: string; name: string }> = {
      "gate-me-": { slug: "mechanical", name: "GATE Mechanical Paper" },
      "gate-ce-": { slug: "civil", name: "GATE Civil Paper" },
      "gate-ee-": { slug: "electrical", name: "GATE Electrical Paper" },
      "gate-ec-": { slug: "ece", name: "GATE ECE Paper" },
    };

    for (const [prefix, info] of Object.entries(branchPrefixMap)) {
      if (testId.startsWith(prefix)) {
        const paperKey = testId.slice(prefix.length);
        const filePath = path.join(ROOT_DIR, "data/gate/branches", info.slug, "pyq", `${paperKey}.json`);
        if (fs.existsSync(filePath)) {
          const raw = fs.readFileSync(filePath, "utf-8");
          const paper = JSON.parse(raw);
          return NextResponse.json({
            title: paper.title,
            subject: info.name,
            durationMinutes: paper.durationMinutes || 180,
            questions: paper.questions || [],
          });
        }
      }
    }

    // 2. CSE PYQ Papers (e.g. gate-2026-s1, gate-2025-s1, gate-1999-s1, etc.)
    if (testId.startsWith("gate-20") || testId.startsWith("gate-19")) {
      const pyqKey = testId.replace(/^gate-/, "");
      const filePath = path.join(ROOT_DIR, "data/gate/pyq", `${pyqKey}.json`);
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        const paper = JSON.parse(raw);
        return NextResponse.json({
          title: paper.title,
          subject: "GATE CSE Official Paper",
          durationMinutes: paper.durationMinutes || 180,
          questions: paper.questions || [],
        });
      }
    }

    // 3. Branch-specific Subject Practice tests
    // e.g. gate-subject-mechanical-thermodynamics, gate-subject-civil-structures, etc.
    for (const bSlug of ["mechanical", "civil", "electrical", "ece"]) {
      const prefix = `gate-subject-${bSlug}-`;
      const shortPrefix = `gate-subject-${bSlug.slice(0, 2)}-`;
      let subjId = "";
      if (testId.startsWith(prefix)) {
        subjId = testId.slice(prefix.length);
      } else if (testId.startsWith(shortPrefix)) {
        subjId = testId.slice(shortPrefix.length);
      }

      if (subjId) {
        const filePath = path.join(ROOT_DIR, "data/gate/branches", bSlug, "subjects", `${subjId}.json`);
        if (fs.existsSync(filePath)) {
          const raw = fs.readFileSync(filePath, "utf-8");
          const subjData = JSON.parse(raw);
          const qList = subjData.questions || [];
          return NextResponse.json({
            title: `${subjData.name} — Practice Set`,
            subject: subjData.name,
            durationMinutes: Math.min(180, Math.max(20, Math.ceil(qList.length * 2.5))),
            questions: qList.map((q: any, i: number) => ({ ...q, orderIndex: i + 1 })),
          });
        }
      }
    }

    // 4. Branch-specific Subject Mocks
    // e.g. gate-mock-subj-mechanical-thermodynamics
    for (const bSlug of ["mechanical", "civil", "electrical", "ece"]) {
      const prefix = `gate-mock-subj-${bSlug}-`;
      if (testId.startsWith(prefix)) {
        const subjId = testId.slice(prefix.length);
        const filePath = path.join(ROOT_DIR, "data/gate/branches", bSlug, "subjects", `${subjId}.json`);
        if (fs.existsSync(filePath)) {
          const raw = fs.readFileSync(filePath, "utf-8");
          const subjData = JSON.parse(raw);
          const allQuestions = subjData.questions || [];
          const sampled = sampleItems(allQuestions, 25);
          return NextResponse.json({
            title: `${subjData.name} — Subject Mock`,
            subject: subjData.name,
            durationMinutes: 45,
            questions: sampled.map((q: any, i: number) => ({ ...q, orderIndex: i + 1 })),
          });
        }
      }
    }

    // 5. Branch-specific Full Mocks
    // e.g. gate-mock-mechanical-full-1, gate-mock-civil-full-2, etc.
    for (const bSlug of ["mechanical", "civil", "electrical", "ece"]) {
      const prefix = `gate-mock-${bSlug}-full-`;
      if (testId.startsWith(prefix)) {
        const pyqDir = path.join(ROOT_DIR, "data/gate/branches", bSlug, "pyq");
        if (fs.existsSync(pyqDir)) {
          const files = fs.readdirSync(pyqDir).filter((f) => f.endsWith(".json") && f !== "manifest.json");
          if (files.length > 0) {
            // Determine paper index from testId or pick the first/matching paper
            const mockNumMatch = testId.match(/-(\d+)$/);
            const mockIdx = mockNumMatch ? (parseInt(mockNumMatch[1], 10) - 1) % files.length : 0;
            const chosenFile = files[mockIdx] || files[0];
            const raw = fs.readFileSync(path.join(pyqDir, chosenFile), "utf-8");
            const paper = JSON.parse(raw);
            return NextResponse.json({
              title: `GATE ${bSlug.toUpperCase()} All-India Full Mock Exam`,
              subject: `GATE ${bSlug.toUpperCase()} Official Pattern`,
              durationMinutes: 180,
              questions: paper.questions || [],
            });
          }
        }
      }
    }

    // 6. Topic practice: gate-topic-[branch]-[subject]-[topicSlug] or gate-topic-[subject]-[topicSlug]
    if (testId.startsWith("gate-topic-")) {
      const afterPrefix = testId.slice("gate-topic-".length);

      // Branch topic test
      for (const bSlug of ["mechanical", "civil", "electrical", "ece"]) {
        if (afterPrefix.startsWith(`${bSlug}-`)) {
          const rest = afterPrefix.slice(bSlug.length + 1);
          const subjDir = path.join(ROOT_DIR, "data/gate/branches", bSlug, "subjects");
          if (fs.existsSync(subjDir)) {
            const files = fs.readdirSync(subjDir).filter((f) => f.endsWith(".json") && f !== "manifest.json");
            const sortedSlugs = files.map((f) => f.replace(".json", "")).sort((a, b) => b.length - a.length);
            const matchedSubj = sortedSlugs.find((s) => rest.startsWith(`${s}-`));
            if (matchedSubj) {
              const rawTopicSlug = rest.slice(matchedSubj.length + 1);
              const targetTopicNorm = decodeURIComponent(rawTopicSlug).toLowerCase().replace(/[^a-z0-9]/g, "");
              const raw = fs.readFileSync(path.join(subjDir, `${matchedSubj}.json`), "utf-8");
              const subjData = JSON.parse(raw);
              const allSubjQuestions = subjData.questions || [];
              const filtered = allSubjQuestions.filter((q: any) => {
                const qTopicNorm = String(q.topic || "").toLowerCase().replace(/[^a-z0-9]/g, "");
                return qTopicNorm.includes(targetTopicNorm) || targetTopicNorm.includes(qTopicNorm);
              });
              const qList = filtered.length > 0 ? filtered : allSubjQuestions;
              const displayTopic = filtered.length > 0 && filtered[0]?.topic ? filtered[0].topic : "Topic Practice";
              return NextResponse.json({
                title: `${subjData.name} — ${displayTopic}`,
                subject: subjData.name,
                durationMinutes: Math.min(120, Math.max(15, Math.ceil(qList.length * 2.5))),
                questions: qList.map((q: any, i: number) => ({ ...q, orderIndex: i + 1 })),
              });
            }
          }
        }
      }

      // CSE topic test
      const cseSubjDir = path.join(ROOT_DIR, "data/gate/subjects");
      if (fs.existsSync(cseSubjDir)) {
        const files = fs.readdirSync(cseSubjDir).filter((f) => f.endsWith(".json") && f !== "manifest.json");
        const sortedSlugs = files.map((f) => f.replace(".json", "")).sort((a, b) => b.length - a.length);
        const matchedSlug = sortedSlugs.find((slug) => afterPrefix.startsWith(`${slug}-`));
        if (matchedSlug) {
          const rawTopicSlug = afterPrefix.slice(matchedSlug.length + 1);
          const targetTopicNorm = decodeURIComponent(rawTopicSlug).toLowerCase().replace(/[^a-z0-9]/g, "");
          const raw = fs.readFileSync(path.join(cseSubjDir, `${matchedSlug}.json`), "utf-8");
          const subjData = JSON.parse(raw);
          const allSubjQuestions = subjData.questions || [];
          const filtered = allSubjQuestions.filter((q: any) => {
            const qTopicNorm = String(q.topic || "").toLowerCase().replace(/[^a-z0-9]/g, "");
            return qTopicNorm.includes(targetTopicNorm) || targetTopicNorm.includes(qTopicNorm);
          });
          const qList = filtered.length > 0 ? filtered : allSubjQuestions;
          const displayTopic = filtered.length > 0 && filtered[0]?.topic ? filtered[0].topic : "Topic Practice";
          return NextResponse.json({
            title: `${subjData.name} — ${displayTopic}`,
            subject: subjData.name,
            durationMinutes: Math.min(120, Math.max(15, Math.ceil(qList.length * 2.5))),
            questions: qList.map((q: any, i: number) => ({ ...q, orderIndex: i + 1 })),
          });
        }
      }
    }

    // 7. CSE Core Subjects: gate-subject-[id] or gate-mock-subj-[id]
    const isMockSubj = testId.startsWith("gate-mock-subj-");
    const isSubjectAll = testId.startsWith("gate-subject-");
    if (isMockSubj || isSubjectAll) {
      const prefix = isMockSubj ? "gate-mock-subj-" : "gate-subject-";
      const subjSlug = testId.slice(prefix.length);
      const filePath = path.join(ROOT_DIR, "data/gate/subjects", `${subjSlug}.json`);
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, "utf-8");
        const subjData = JSON.parse(raw);
        const allSubjQuestions = subjData.questions || [];
        const questionsToTake = isMockSubj ? sampleItems(allSubjQuestions, 25) : allSubjQuestions;
        return NextResponse.json({
          title: `${subjData.name} — ${isMockSubj ? "Mock Test" : "Practice Set"}`,
          subject: subjData.name,
          durationMinutes: isMockSubj ? 45 : Math.min(180, Math.max(20, Math.ceil(questionsToTake.length * 2))),
          questions: questionsToTake.map((q: any, i: number) => ({ ...q, orderIndex: i + 1 })),
        });
      }
    }

    // 8. CSE Mock Presets (e.g. gate-mock-full-2026-1, gate-mock-random-65)
    if (testId.startsWith("gate-mock-")) {
      const mocksPath = path.join(ROOT_DIR, "data/gate/mock/mocks.json");
      if (fs.existsSync(mocksPath)) {
        const mocks = JSON.parse(fs.readFileSync(mocksPath, "utf-8"));
        const mockPreset = mocks.find((m: any) => m.id === testId);
        if (mockPreset?.sourcePaper) {
          const paperPath = path.join(ROOT_DIR, "data/gate/pyq", `${mockPreset.sourcePaper}.json`);
          if (fs.existsSync(paperPath)) {
            const paper = JSON.parse(fs.readFileSync(paperPath, "utf-8"));
            return NextResponse.json({
              title: mockPreset.title,
              subject: "Full GATE CSE Mock",
              durationMinutes: mockPreset.durationMinutes || 180,
              questions: paper.questions || [],
            });
          }
        }
      }

      // Dynamic random mock
      const allQPath = path.join(ROOT_DIR, "data/gate/all-questions.json");
      if (fs.existsSync(allQPath)) {
        const allList = JSON.parse(fs.readFileSync(allQPath, "utf-8"));
        const count = testId.includes("30") ? 30 : 65;
        const sampled = sampleItems(allList, count);
        return NextResponse.json({
          title: "GATE CSE Dynamic Mock",
          subject: "Full GATE CSE Mock",
          durationMinutes: count === 30 ? 60 : 180,
          questions: sampled.map((q: any, i: number) => ({ ...q, orderIndex: i + 1 })),
        });
      }
    }

    return NextResponse.json({ error: `Test "${testId}" not found` }, { status: 404 });
  } catch (error: any) {
    console.error(`Error in /api/gate/test/${testId}:`, error);
    return NextResponse.json({ error: error.message || "Failed to load test" }, { status: 500 });
  }
}
