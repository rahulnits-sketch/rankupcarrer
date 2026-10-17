"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Play,
  CheckCircle2,
  XCircle,
  Copy,
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRight,
  Terminal,
  Cpu,
  Clock,
  HardDrive,
  Building2,
  Code2,
  Check,
} from "lucide-react";

type Language = "cpp" | "java" | "python";

interface TestCase {
  id: number;
  input: string;
  expected: string;
}

interface Problem {
  id: string;
  title: string;
  pattern: string;
  difficulty: "Easy" | "Medium" | "Hard";
  companies: string[];
  targetTime: string;
  targetSpace: string;
  curricula: string[]; // ["Blind 75", "Striver SDE", "Top 150"]
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: Record<Language, string>;
  testCases: TestCase[];
}

const PROBLEMS: Problem[] = [
  {
    id: "two-sum",
    title: "1. Two Sum",
    pattern: "Two Pointers & Hash Map",
    difficulty: "Easy",
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    targetTime: "O(N)",
    targetSpace: "O(N)",
    curricula: ["Blind 75", "Striver SDE", "Top 150"],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "nums[1] + nums[2] == 2 + 4 == 6.",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    starterCode: {
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
      java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (map.containsKey(comp)) {
                return new int[] { map.get(comp), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
}`,
      python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, val in enumerate(nums):
            comp = target - val
            if comp in seen:
                return [seen[comp], i]
            seen[val] = i
        return []`,
    },
    testCases: [
      { id: 1, input: "nums = [2,7,11,15], target = 9", expected: "[0, 1]" },
      { id: 2, input: "nums = [3,2,4], target = 6", expected: "[1, 2]" },
      { id: 3, input: "nums = [3,3], target = 6", expected: "[0, 1]" },
    ],
  },
  {
    id: "trapping-rain-water",
    title: "42. Trapping Rain Water",
    pattern: "Two Pointers",
    difficulty: "Hard",
    companies: ["Google", "Amazon", "Meta", "Uber"],
    targetTime: "O(N)",
    targetSpace: "O(1)",
    curricula: ["Blind 75", "Striver SDE", "Top 150"],
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6",
        explanation: "The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.",
      },
      {
        input: "height = [4,2,0,3,2,5]",
        output: "9",
      },
    ],
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5",
    ],
    starterCode: {
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int leftMax = 0, rightMax = 0;
        int trapped = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else trapped += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else trapped += rightMax - height[right];
                right--;
            }
        }
        return trapped;
    }
};`,
      java: `class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int trapped = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else trapped += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else trapped += rightMax - height[right];
                right--;
            }
        }
        return trapped;
    }
}`,
      python: `class Solution:
    def trap(self, height: list[int]) -> int:
        left, right = 0, len(height) - 1
        left_max = right_max = 0
        trapped = 0

        while left < right:
            if height[left] < height[right]:
                if height[left] >= left_max:
                    left_max = height[left]
                else:
                    trapped += left_max - height[left]
                left += 1
            else:
                if height[right] >= right_max:
                    right_max = height[right]
                else:
                    trapped += right_max - height[right]
                right -= 1
        return trapped`,
    },
    testCases: [
      { id: 1, input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", expected: "6" },
      { id: 2, input: "height = [4,2,0,3,2,5]", expected: "9" },
      { id: 3, input: "height = [3,0,2,0,4]", expected: "7" },
    ],
  },
  {
    id: "longest-substring",
    title: "3. Longest Substring Without Repeating Characters",
    pattern: "Sliding Window",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Meta", "Google"],
    targetTime: "O(N)",
    targetSpace: "O(min(N, M))",
    curricula: ["Blind 75", "Striver SDE", "Top 150"],
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: 'The answer is "wke", with the length of 3.',
      },
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces.",
    ],
    starterCode: {
      cpp: `#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> lastIndex(256, -1);
        int maxLen = 0, start = 0;
        for (int i = 0; i < s.length(); ++i) {
            if (lastIndex[s[i]] >= start) {
                start = lastIndex[s[i]] + 1;
            }
            lastIndex[s[i]] = i;
            maxLen = max(maxLen, i - start + 1);
        }
        return maxLen;
    }
};`,
      java: `import java.util.Arrays;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        int[] lastIndex = new int[256];
        Arrays.fill(lastIndex, -1);
        int maxLen = 0, start = 0;

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (lastIndex[c] >= start) {
                start = lastIndex[c] + 1;
            }
            lastIndex[c] = i;
            maxLen = Math.max(maxLen, i - start + 1);
        }
        return maxLen;
    }
}`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        last_index = {}
        max_len = 0
        start = 0

        for i, char in enumerate(s):
            if char in last_index and last_index[char] >= start:
                start = last_index[char] + 1
            last_index[char] = i
            max_len = max(max_len, i - start + 1)

        return max_len`,
    },
    testCases: [
      { id: 1, input: 's = "abcabcbb"', expected: "3" },
      { id: 2, input: 's = "bbbbb"', expected: "1" },
      { id: 3, input: 's = "pwwkew"', expected: "3" },
    ],
  },
  {
    id: "course-schedule",
    title: "207. Course Schedule",
    pattern: "Graph DFS / Topological Sort",
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Uber", "Atlassian"],
    targetTime: "O(V + E)",
    targetSpace: "O(V + E)",
    curricula: ["Blind 75", "Striver SDE"],
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a_i, b_i]\` indicates that you must take course \`b_i\` first if you want to take course \`a_i\`.

Return \`true\` if you can finish all courses. Otherwise, return \`false\`.`,
    examples: [
      {
        input: "numCourses = 2, prerequisites = [[1,0]]",
        output: "true",
        explanation: "There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.",
      },
      {
        input: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
        output: "false",
        explanation: "There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.",
      },
    ],
    constraints: [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= 5000",
      "prerequisites[i].length == 2",
    ],
    starterCode: {
      cpp: `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> inDegree(numCourses, 0);

        for (auto& pre : prerequisites) {
            adj[pre[1]].push_back(pre[0]);
            inDegree[pre[0]]++;
        }

        queue<int> q;
        for (int i = 0; i < numCourses; ++i) {
            if (inDegree[i] == 0) q.push(i);
        }

        int processed = 0;
        while (!q.empty()) {
            int node = q.front(); q.pop();
            processed++;
            for (int neighbor : adj[node]) {
                if (--inDegree[neighbor] == 0) q.push(neighbor);
            }
        }
        return processed == numCourses;
    }
};`,
      java: `import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        int[] inDegree = new int[numCourses];
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());

        for (int[] pre : prerequisites) {
            adj.get(pre[1]).add(pre[0]);
            inDegree[pre[0]]++;
        }

        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.add(i);
        }

        int count = 0;
        while (!q.isEmpty()) {
            int curr = q.poll();
            count++;
            for (int next : adj.get(curr)) {
                if (--inDegree[next] == 0) q.add(next);
            }
        }
        return count == numCourses;
    }
}`,
      python: `from collections import deque

class Solution:
    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:
        adj = [[] for _ in range(numCourses)]
        in_degree = [0] * numCourses

        for dest, src in prerequisites:
            adj[src].append(dest)
            in_degree[dest] += 1

        queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
        processed = 0

        while queue:
            node = queue.popleft()
            processed += 1
            for neighbor in adj[node]:
                in_degree[neighbor] -= 1
                if in_degree[neighbor] == 0:
                    queue.append(neighbor)

        return processed == numCourses`,
    },
    testCases: [
      { id: 1, input: "numCourses = 2, prerequisites = [[1,0]]", expected: "true" },
      { id: 2, input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", expected: "false" },
    ],
  },
  {
    id: "coin-change",
    title: "322. Coin Change",
    pattern: "Dynamic Programming",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Meta", "Google"],
    targetTime: "O(Amount * Coins)",
    targetSpace: "O(Amount)",
    curricula: ["Blind 75", "Striver SDE", "Top 150"],
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.`,
    examples: [
      {
        input: "coins = [1,2,5], amount = 11",
        output: "3",
        explanation: "11 = 5 + 5 + 1",
      },
      {
        input: "coins = [2], amount = 3",
        output: "-1",
      },
      {
        input: "coins = [1], amount = 0",
        output: "0",
      },
    ],
    constraints: [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4",
    ],
    starterCode: {
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; ++i) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,
      java: `import java.util.Arrays;

class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
      python: `class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0

        for i in range(1, amount + 1):
            for coin in coins:
                if coin <= i:
                    dp[i] = min(dp[i], dp[i - coin] + 1)

        return dp[amount] if dp[amount] != float('inf') else -1`,
    },
    testCases: [
      { id: 1, input: "coins = [1,2,5], amount = 11", expected: "3" },
      { id: 2, input: "coins = [2], amount = 3", expected: "-1" },
      { id: 3, input: "coins = [1], amount = 0", expected: "0" },
    ],
  },
];

export default function DSASandboxPage() {
  const [selectedProblem, setSelectedProblem] = useState<Problem>(PROBLEMS[0]);
  const [language, setLanguage] = useState<Language>("cpp");
  const [code, setCode] = useState<string>(PROBLEMS[0].starterCode.cpp);
  const [activeTab, setActiveTab] = useState<"description" | "complexity" | "curricula">("description");
  const [testTab, setTestTab] = useState<number>(1);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [executionResult, setExecutionResult] = useState<{
    status: "Accepted" | "Runtime Error" | "Wrong Answer";
    runtimeMs: number;
    memoryMb: number;
    percentileRuntime: number;
    percentileMemory: number;
    stdout: string;
    casesPassed: number;
    totalCases: number;
  } | null>(null);

  const handleSelectProblem = (prob: Problem) => {
    setSelectedProblem(prob);
    setCode(prob.starterCode[language]);
    setExecutionResult(null);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCode(selectedProblem.starterCode[lang]);
    setExecutionResult(null);
  };

  const handleReset = () => {
    setCode(selectedProblem.starterCode[language]);
    setExecutionResult(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCode = (isSubmit: boolean) => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      // Simulate compiler execution against test cases
      setExecutionResult({
        status: "Accepted",
        runtimeMs: language === "cpp" ? 2 : language === "java" ? 4 : 28,
        memoryMb: language === "cpp" ? 14.2 : language === "java" ? 38.4 : 17.5,
        percentileRuntime: language === "cpp" ? 97.4 : language === "java" ? 94.1 : 91.8,
        percentileMemory: language === "cpp" ? 88.6 : language === "java" ? 85.2 : 82.4,
        stdout: `Executing ${language.toUpperCase()} binary...\nAllocating test suite harness.\nTest suite initialized.\nCompleted in 0.003s. Exit code: 0`,
        casesPassed: isSubmit ? selectedProblem.testCases.length : 1,
        totalCases: selectedProblem.testCases.length,
      });
    }, 600);
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      <Navbar />

      {/* Top Banner Bar */}
      <div className="border-b border-slate-200 bg-white px-4 py-3 md:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/dsa"
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
            >
              ← Back to DSA Sheet
            </Link>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                <Terminal className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm font-bold text-slate-900">
                DSA Placement Sandbox &amp; Compiler
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
              Select Problem:
            </span>
            <select
              value={selectedProblem.id}
              onChange={(e) => {
                const found = PROBLEMS.find((p) => p.id === e.target.value);
                if (found) handleSelectProblem(found);
              }}
              className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 shadow-2xs outline-none focus:border-blue-600"
            >
              {PROBLEMS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} ({p.difficulty})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Two-Pane Sandbox Layout */}
      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-4 p-3 md:grid-cols-[440px_minmax(0,1fr)] lg:grid-cols-[480px_minmax(0,1fr)] md:gap-5 md:p-6">
        {/* Left Problem Spec Panel */}
        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Header Tabs */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/70 px-5 py-3">
            <div className="flex gap-2 text-xs font-bold">
              <button
                onClick={() => setActiveTab("description")}
                className={`rounded-lg px-3 py-1.5 transition ${
                  activeTab === "description"
                    ? "bg-white text-blue-700 shadow-2xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("complexity")}
                className={`rounded-lg px-3 py-1.5 transition ${
                  activeTab === "complexity"
                    ? "bg-white text-blue-700 shadow-2xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Big-O &amp; Pattern
              </button>
              <button
                onClick={() => setActiveTab("curricula")}
                className={`rounded-lg px-3 py-1.5 transition ${
                  activeTab === "curricula"
                    ? "bg-white text-blue-700 shadow-2xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Curricula Tags
              </button>
            </div>

            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                selectedProblem.difficulty === "Easy"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : selectedProblem.difficulty === "Medium"
                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                  : "bg-rose-50 text-rose-700 border border-rose-200"
              }`}
            >
              {selectedProblem.difficulty}
            </span>
          </div>

          {/* Panel Body */}
          <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
            {activeTab === "description" && (
              <>
                <div>
                  <h1 className="text-xl font-extrabold text-slate-900">
                    {selectedProblem.title}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-lg bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 text-xs">
                      Pattern: {selectedProblem.pattern}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500 font-mono">
                      Target: {selectedProblem.targetTime}
                    </span>
                  </div>
                </div>

                {/* Company Frequency Tags - FR-3.2 */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                    <span>Company Frequency Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProblem.companies.map((c) => (
                      <span
                        key={c}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Problem Description */}
                <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                  {selectedProblem.description}
                </div>

                {/* Examples */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Examples
                  </h3>
                  {selectedProblem.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-800 space-y-1"
                    >
                      <p>
                        <strong className="font-sans text-slate-900">Input:</strong> {ex.input}
                      </p>
                      <p>
                        <strong className="font-sans text-slate-900">Output:</strong> {ex.output}
                      </p>
                      {ex.explanation && (
                        <p className="text-slate-600 font-sans text-[11px] pt-1 border-t border-slate-200 mt-1">
                          <strong>Explanation:</strong> {ex.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                    Constraints
                  </h3>
                  <ul className="list-disc pl-4 space-y-1 text-xs font-mono text-slate-600">
                    {selectedProblem.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {activeTab === "complexity" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Algorithmic Pattern &amp; Complexity Analysis
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Optimal complexity expected in Tier-1 technical interviews (Google, Meta, Amazon)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4">
                    <span className="text-xs font-bold text-blue-700">Time Complexity</span>
                    <p className="text-lg font-mono font-extrabold text-blue-900 mt-1">
                      {selectedProblem.targetTime}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Single-pass or optimal logarithmic factor.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
                    <span className="text-xs font-bold text-emerald-700">Space Complexity</span>
                    <p className="text-lg font-mono font-extrabold text-emerald-900 mt-1">
                      {selectedProblem.targetSpace}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Auxiliary storage / hash map overhead.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700 leading-relaxed">
                  <h4 className="font-bold text-slate-900 mb-1.5">
                    Pattern Intuition: {selectedProblem.pattern}
                  </h4>
                  <p>
                    Avoid naive nested brute-force loops. By maintaining state invariants (such as hash lookups, boundary pointers, or topological in-degree queues), you reduce redundant evaluations and achieve Tier-1 placement benchmark speed.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "curricula" && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Curriculum Alignment - FR-3.1
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    This problem is certified across major industry standards:
                  </p>
                </div>

                <div className="space-y-3">
                  {selectedProblem.curricula.map((cur) => (
                    <div
                      key={cur}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 text-xs font-bold text-slate-800 shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        <span>{cur} Sheet</span>
                      </div>
                      <span className="text-[11px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        Mandatory SDE-1
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Embedded IDE & Simulator Panel - FR-3.3 */}
        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Editor Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-3">
            {/* Language Selector: C++20, Java 17, Python 3.11 */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Language:</span>
              <div className="flex rounded-xl border border-slate-300 bg-white p-1 text-xs font-bold shadow-2xs">
                {(["cpp", "java", "python"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`rounded-lg px-3 py-1 transition ${
                      language === lang
                        ? "bg-blue-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {lang === "cpp" ? "C++20" : lang === "java" ? "Java 17" : "Python 3.11"}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions: Copy, Reset */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
                title="Copy Code"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-2xs"
                title="Reset Starter Code"
              >
                <RotateCcw className="h-3.5 w-3.5 text-slate-500" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Interactive Code Editor Area */}
          <div className="relative flex-1 bg-[#0f172a] text-slate-100 font-mono text-xs sm:text-sm p-4 overflow-hidden flex flex-col min-h-[340px]">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="flex-1 w-full bg-transparent resize-none outline-none font-mono leading-relaxed text-slate-100 selection:bg-blue-600 selection:text-white"
            />
          </div>

          {/* Console / Test Runner Bottom Section - FR-3.3 */}
          <div className="border-t border-slate-200 bg-slate-50">
            {/* Test Case Selection & Execution Status Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <span>Test Cases:</span>
                {selectedProblem.testCases.map((tc) => (
                  <button
                    key={tc.id}
                    onClick={() => setTestTab(tc.id)}
                    className={`rounded-lg px-2.5 py-1 transition ${
                      testTab === tc.id
                        ? "bg-slate-900 text-white"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Case {tc.id}
                  </button>
                ))}
              </div>

              {/* Run & Submit Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRunCode(false)}
                  disabled={isRunning}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-800 shadow-2xs transition hover:bg-slate-100 disabled:opacity-50"
                >
                  <Play className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{isRunning ? "Running..." : "Run Test Cases"}</span>
                </button>

                <button
                  onClick={() => handleRunCode(true)}
                  disabled={isRunning}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-sm shadow-blue-500/20 transition hover:bg-blue-700 disabled:opacity-50"
                >
                  <Cpu className="h-3.5 w-3.5" />
                  <span>{isRunning ? "Evaluating..." : "Submit to Compiler"}</span>
                </button>
              </div>
            </div>

            {/* Test Case Input / Expected Display */}
            <div className="p-4 space-y-3">
              {executionResult && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 animate-in fade-in duration-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200 pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      <span className="text-sm font-extrabold text-emerald-900">
                        {executionResult.status} ({executionResult.casesPassed}/{executionResult.totalCases} Cases Passed)
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono">
                      <span className="flex items-center gap-1 text-emerald-800">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{executionResult.runtimeMs} ms (Beats {executionResult.percentileRuntime}%)</span>
                      </span>
                      <span className="flex items-center gap-1 text-emerald-800">
                        <HardDrive className="h-3.5 w-3.5" />
                        <span>{executionResult.memoryMb} MB (Beats {executionResult.percentileMemory}%)</span>
                      </span>
                    </div>
                  </div>

                  <div className="font-mono text-xs text-slate-700 bg-white/70 p-2.5 rounded-xl border border-emerald-200 whitespace-pre-wrap">
                    {executionResult.stdout}
                  </div>
                </div>
              )}

              {/* Active Test Case Details */}
              {selectedProblem.testCases.find((tc) => tc.id === testTab) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <span className="font-sans font-bold text-slate-500 block mb-1">
                      Case {testTab} Input:
                    </span>
                    <span className="text-slate-800 font-bold">
                      {selectedProblem.testCases.find((tc) => tc.id === testTab)?.input}
                    </span>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <span className="font-sans font-bold text-slate-500 block mb-1">
                      Expected Output:
                    </span>
                    <span className="text-emerald-700 font-bold">
                      {selectedProblem.testCases.find((tc) => tc.id === testTab)?.expected}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
