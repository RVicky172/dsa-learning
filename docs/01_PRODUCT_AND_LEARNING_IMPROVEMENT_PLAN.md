# Product and Learning Improvement Plan

## Status Note (Updated: 2026-04-20)

- Product baseline is now connected to auth, progress persistence, and premium gating foundations.
- Remaining product work focuses on learning outcomes, dashboard continuity, and visualization quality.
- Final mandatory last task before release signoff: run the premium entitlement regression audit across free-vs-premium problem cards/details, API enforcement, and upgrade CTA paths.

## Objectives

1. Make learning paths clearer for beginner to advanced users.
2. Improve discovery, motivation, and completion rates.
3. Add explicit "What You Will Learn" outcomes on each topic page.
4. Improve UX for mobile and desktop consistency.

## User Experience Improvements

## Navigation and Information Architecture

1. Add a persistent learning path sidebar:
   - Foundations
   - Intermediate
   - Advanced
2. Add topic-level progress indicators.
3. Add filters for difficulty, pattern, and interview frequency.
4. Add a "continue where you left off" section on home/dashboard.

## Learning Experience Enhancements

1. Add "What You Will Learn" section for every topic with 4-8 outcomes.
2. Add prerequisites and recommended sequence per topic.
3. Add estimated study time per topic and per problem.
4. Add adaptive recommendations based on previous attempts.

## Engagement and Retention

1. Add streak tracking (daily practice streak).
2. Add milestone badges (first 10 solved, first hard solved, etc.).
3. Add revision mode for previously failed questions.
4. Add weekly goal setting (for example: solve 15 problems/week).

## Accessibility and Performance

1. Ensure keyboard navigation for key workflows.
2. Improve color contrast and focus indicators.
3. Keep LCP under 2.5s, INP under 200ms where possible.
4. Lazy-load heavy visualizer and chart components.

## Deliverables

- Updated UX wireframes and navigation map
- "What You Will Learn" schema and UI component
- Dashboard improvements for continuity and progress
- Accessibility and performance checklist completion

## Acceptance Criteria

1. Every topic includes outcomes, prerequisites, and estimated effort.
2. Users can resume learning from dashboard in one click.
3. Topic search/filtering works with no major UX regressions.
4. Mobile usability passes manual QA for main learning flows.
