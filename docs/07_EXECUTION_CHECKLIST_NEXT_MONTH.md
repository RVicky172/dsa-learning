# Next Month Execution Checklist (Step-by-Step)

## Progress Snapshot (Updated: 2026-04-20)

- Week 1 and core Week 2 baseline are implemented in code (auth, RBAC, admin CRUD, progress/attempt persistence, subscription + mock webhook sync).
- Premium lock states and upgrade CTA routing are implemented; final mandatory last task before release signoff is the premium entitlement regression audit across free-vs-premium problem cards/details, API enforcement, and upgrade CTA paths.

## How to Use

- Mark each item complete daily.
- Keep unresolved blockers in a separate daily issue log.
- End each week with demo + retrospective.

## Week 1 (Architecture and Foundations)

## Day 1

- Finalize scope and success metrics.
- Confirm ownership per workstream.

## Day 2

- Create backend service structure and modules.
- Define API contract draft.

## Day 3

- Design and review database schema v1.
- Create initial migration scripts.

## Day 4

- Implement auth endpoints (register/login/logout).
- Add role model (`user`, `admin`).

## Day 5

- Integrate frontend login/logout flows.
- Validate basic RBAC middleware.

## Week 2 (Core Product Features)

## Day 6

- Build admin content CRUD endpoints.
- Start admin UI shell.

## Day 7

- Complete admin problem management UI.
- Add free/premium flag controls.

## Day 8

- Add progress and attempt persistence APIs.
- Integrate frontend attempts submission.

## Day 9

- Implement subscription entities and entitlement middleware.
- Add premium lock states in UI.

## Day 10

- Add payment provider in test mode and webhook handling.
- Verify subscription state synchronization.
- Implemented in mock mode; production provider wiring remains pending.

## Week 3 (Execution Engine and Visualization)

## Day 11

- Build Docker image templates for each language.
- Add execution worker skeleton.

## Day 12

- Implement queue-based execution processing.
- Add timeout, memory, and process limits.

## Day 13

- Integrate run-code UI in problem pages.
- Render stdout/stderr and status cleanly.

## Day 14

- Improve DSA visualizer controls (step, speed, reset, complexity overlays).
- Validate responsiveness on mobile.

## Day 15

- Add "What You Will Learn" blocks for all topics.
- Publish first half of new problem batch.

## Week 4 (Quality, Deployment, Launch)

## Day 16

- Add automated test suite for critical flows.
- Fix high-priority issues from testing.

## Day 17

- Finish remaining new problem content and QA.
- Validate free/premium access behavior.

## Day 18

- Set up staging-to-production deployment pipeline.
- Configure monitoring dashboards and alerts.

## Day 19

- Production readiness review (security, performance, rollback).
- Finalize launch checklist.

## Day 20

- Deploy to production.
- Monitor launch metrics and hotfix if needed.

## Day 21-22 (Buffer)

- Bug fixes, support, and stabilization.
- Collect initial user feedback and prioritize next sprint.

## Day 22 (Final, Must Be Last)

- Run the premium entitlement regression audit across free-vs-premium problem cards/details, API enforcement, and upgrade CTA paths.
- Sign off release only after entitlement audit passes for guest, user, premium_user, and admin roles.

## Weekly Deliverables

1. End Week 1: auth + DB foundation ready
2. End Week 2: content, admin, and subscription baseline done
3. End Week 3: code execution + visualization improvements done
4. End Week 4: production launch completed
