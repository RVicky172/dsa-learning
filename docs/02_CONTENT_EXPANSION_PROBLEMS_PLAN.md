# Content Expansion and New Problems Plan

## Status Note (Updated: 2026-04-20)

- Content infrastructure now supports DB-backed free/premium flags with API + UI lock enforcement and upgrade CTAs.
- New content rollout should continue against admin-managed records.
- Final mandatory last task before release signoff: run the premium entitlement regression audit across free-vs-premium problem cards/details, API enforcement, and upgrade CTA paths, including newly published premium content.

## Goal

Add high-quality new problems to every topic and improve curriculum depth without reducing clarity.

## Topic Coverage (15 Topics)

1. arrays
2. design
3. dynamic-programming
4. graphs
5. greedy
6. hash-tables
7. heaps
8. linked-lists
9. math-bit-logic
10. recursion-backtracking
11. sorting-searching
12. stacks-queues
13. strings
14. trees
15. tries

## New Problem Target

- Add 6 new problems per topic in this month.
- Total new problems target: 90.

## Difficulty Mix Per Topic

- Easy: 2
- Medium: 3
- Hard: 1

## Free vs Premium Problem Split

- Free users:
  - Can access 2 new problems per topic.
- Premium users:
  - Can access all 6 new problems per topic.

## Problem Authoring Standard

Each problem must include:

1. Title, category, and difficulty
2. Problem statement with constraints
3. At least 2 examples (input/output/explanation)
4. Hints (minimum 2)
5. Brute-force explanation
6. Optimal approach explanation
7. Time and space complexity
8. Test cases (public + hidden)

## Content Pipeline

1. Drafting:
   - Content team drafts weekly batches.
2. Technical validation:
   - Verify correctness with reference solutions.
3. Difficulty calibration:
   - Validate expected difficulty from pilot users.
4. Editorial pass:
   - Improve clarity and consistency.
5. Publish:
   - Release in staged batches per week.

## Weekly Content Production Plan

## Week 1

- Finalize problem templates and style guide.
- Draft 20 problems.

## Week 2

- Draft and validate 25 problems.
- Publish first batch (about 20).

## Week 3

- Draft and validate 25 problems.
- Publish second batch (about 30).

## Week 4

- Draft and validate 20 problems.
- Publish final batch and perform quality audit.

## Quality Gates

1. No incorrect sample outputs.
2. Complexity annotations reviewed by technical owner.
3. Hidden tests catch common edge cases.
4. Problem statement readability score approved by editor.

## Metrics

- Attempt rate per newly published problem
- Solve rate by difficulty
- Hint usage frequency
- Drop-off rate before first accepted solution
