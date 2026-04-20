# `src/data/` — Data Layer Guide

This folder contains all static content for the DSA Learning app: topic definitions, problem sets, and the metadata that drives both the **Topic Detail** view and the **Problems Page**.

---

## Folder Structure

```
src/data/
├── topicsData.ts          # Topic metadata (id, title, icon, complexity) — used by Home page cards
├── topics/                # Full topic definitions (theory, examples, patterns, problems)
│   ├── arrays/            #   Arrays has sub-files for theory, examples, patterns, visualizations
│   │   ├── index.ts       #   Assembles and exports arraysTopic (Topic object)
│   │   ├── theory.ts
│   │   ├── examples.ts
│   │   ├── patterns.ts
│   │   └── visualizations.ts
│   ├── linkedLists.ts
│   ├── hashTables.ts
│   ├── stacksQueues.ts
│   ├── trees.ts
│   ├── graphs.ts
│   ├── strings.ts
│   ├── sorting.ts
│   ├── greedy.ts
│   ├── dynamicProgramming.ts
│   ├── recursionBacktracking.ts
│   ├── mathBitLogic.ts
│   ├── heaps.ts
│   ├── tries.ts
│   ├── design.ts
│   └── index.ts           # Re-exports all 15 topic objects
└── problems/              # Problem data, one file per topic
    ├── arrays.ts
    ├── linkedLists.ts
    ├── hashTables.ts
    ├── stacksQueues.ts
    ├── trees.ts
    ├── graphs.ts
    ├── strings.ts
    ├── sorting.ts          # Contains: sortingProblems, searchingProblems, advancedSortingProblems
    ├── greedy.ts
    ├── dynamicProgramming.ts
    ├── recursion.ts
    ├── math.ts
    ├── heaps.ts
    ├── tries.ts
    ├── design.ts           # Also exports: AdvancedProblem interface, advancedProblems[]
    ├── index.ts            # Re-exports all problem arrays (convenience barrel)
    └── registry.ts         # Aggregates allProblems for the ProblemsPage with categories/filters
```

---

## How to Add New Problems

### 1. Find the right file

Open the matching file in `src/data/problems/`:

| Topic | File |
|-------|------|
| Arrays | `problems/arrays.ts` |
| Linked Lists | `problems/linkedLists.ts` |
| Hash Tables | `problems/hashTables.ts` |
| Stacks & Queues | `problems/stacksQueues.ts` |
| Trees | `problems/trees.ts` |
| Graphs | `problems/graphs.ts` |
| Strings | `problems/strings.ts` |
| Sorting & Searching | `problems/sorting.ts` |
| Greedy | `problems/greedy.ts` |
| Dynamic Programming | `problems/dynamicProgramming.ts` |
| Recursion & Backtracking | `problems/recursion.ts` |
| Math & Bit Logic | `problems/math.ts` |
| Heaps | `problems/heaps.ts` |
| Tries | `problems/tries.ts` |
| System Design | `problems/design.ts` |

### 2. Add your problem object to the array

Each file exports a `Problem[]` array. Append a new entry following the `Problem` type:

```ts
// src/data/problems/arrays.ts
export const arrayProblems: Problem[] = [
  // ... existing problems ...
  {
    id: 'my-new-problem',          // unique slug
    title: 'My New Problem',
    difficulty: 'Medium',          // 'Easy' | 'Medium' | 'Hard'
    description: 'Problem description here.',
    examples: [
      { input: 'nums = [1,2,3]', output: '6', explanation: 'Sum of all elements' }
    ],
    solution: {
      approach: 'Brief description of the approach.',
      code: `function solve(nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      stepByStep: [
        'Iterate through all elements',
        'Accumulate the running sum',
        'Return the final sum'
      ]
    },
    hints: ['Think about the accumulator pattern']
  }
];
```

### 3. It appears automatically

- **Topic Detail view** — the topic file (e.g. `topics/arrays/index.ts`) already imports from `problems/arrays.ts`, so your problem shows in the Problems tab.
- **Problems Page** — `problems/registry.ts` imports from `problems/arrays.ts` (via the per-topic files), so your problem appears in the global list with filtering.

No other changes needed.

---

## How to Add a New Topic

1. **Add metadata** to `topicsData.ts` (id, title, description, icon, complexity, delay).

2. **Create** `topics/myTopic.ts` with the full `Topic` object (theory, concepts, examples, patterns, problems).

3. **Create** `problems/myTopic.ts` with a `myTopicProblems: Problem[]` export.

4. **Update** `topics/index.ts` to export your new topic.

5. **Update** `problems/index.ts` to export your new problems array.

6. **Update** `problems/registry.ts` — add a `withCategory(myTopicProblems, ['My Topic'], 'my-topic')` line to `allProblems` and add `'My Topic'` to `problemCategories`.

---

## Type Reference

Types are defined in `src/types/topic.ts`:

| Type | Description |
|------|-------------|
| `Topic` | Full topic object (theory + examples + patterns + problems) |
| `TopicMeta` | Lightweight card metadata (id, title, description, icon) |
| `Problem` | Standard problem with `.solution` field |
| `AdvancedProblem` | Extended problem with `.bruteForce` and `.optimal` fields (used in `design.ts`) |
| `ProblemListItem` | Normalized problem used by the ProblemsPage (from `registry.ts`) |

---

## Data Flow

```
topicsData.ts  →  Home.tsx (topic cards grid)

topics/*.ts    →  TopicDetail.tsx (full topic view with tabs)
   ↑ imports from
problems/*.ts

problems/registry.ts  →  ProblemsPage.tsx (filterable problem list)
   ↑ imports from
problems/*.ts
```
