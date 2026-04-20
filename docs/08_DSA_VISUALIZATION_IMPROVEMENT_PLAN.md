# DSA Visualization Improvement Plan

## Status Note (Updated: 2026-04-20)

- Platform now has DB-backed progress/subscription and premium entitlement foundations required for personalized visual learning paths.
- Visualization enhancements should align with current API-backed user state.
- Final mandatory last task before release signoff: run the premium entitlement regression audit across free-vs-premium problem cards/details, API enforcement, and upgrade CTA paths after all visualization changes are merged.

## Goal

Upgrade visualizers so users can understand algorithm behavior faster through interaction, animation controls, and complexity insights.

## Current Gaps to Solve

1. Limited step-by-step explanation during execution.
2. Not enough side-by-side comparison between algorithms.
3. Inconsistent controls across visualizers.
4. Weak connection between visualization and problem-solving outcomes.

## Planned Improvements

## Core Visualizer Controls (Standardized)

1. Play/pause
2. Step forward/backward
3. Reset
4. Speed control (0.25x to 2x)
5. Input randomizer and custom input mode

## Algorithm Understanding Features

1. Current line highlighting in pseudo-code.
2. State snapshot panel (variables, pointers, stack/queue state).
3. Complexity tracker panel:
   - Current operations count
   - Estimated Big-O relation
4. Event timeline (for example: compare, swap, push, pop, visit).

## Comparison Mode

1. Run two algorithms on same input.
2. Show runtime/operation differences.
3. Highlight trade-offs in plain language.

## Topic-Specific Visualization Expansion

1. Arrays:
   - Sliding window, prefix sum, two pointers.
2. Linked Lists:
   - Pointer movement and cycle detection.
3. Trees:
   - DFS/BFS traversal paths and recursion stack.
4. Graphs:
   - BFS, DFS, Dijkstra progression with visited frontier.
5. Dynamic Programming:
   - Table fill order and transition dependencies.
6. Heaps:
   - Heapify animations and priority queue operations.

## Learning Integration

1. "Learn, Watch, Practice" flow per topic:
   - Theory
   - Visualization
   - Problems
2. Add "Try with this problem" CTA directly from visualizer.
3. Show "What You Will Learn" outcomes tied to visualized concepts.

## Technical Plan

## Week 1

- Define a shared visualizer control component.
- Define data contract for animation steps.

## Week 2

- Add standardized controls to existing major visualizers.
- Add pseudo-code synchronization.

## Week 3

- Add comparison mode for at least 2 algorithm categories.
- Add operation counters and timeline panel.

## Week 4

- Add mobile optimization and performance profiling.
- Conduct user testing and refine UX.

## KPIs

- Time spent in visualizer per session
- Problem success rate after visualizer interaction
- Visualizer completion rate
- Repeat usage within 7 days

## Acceptance Criteria

1. Core controls are consistent across all target visualizers.
2. At least 6 topic categories have improved visual experiences.
3. Users can run comparison mode for at least 2 algorithm pairs.
4. Visualizer-to-problem transition increases problem attempt rate.
