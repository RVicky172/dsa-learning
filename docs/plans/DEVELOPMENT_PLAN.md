# Development Plan (Product-First)

## Status Snapshot (Updated: 2026-04-23)

- Implemented: auth + RBAC, admin CRUD for topics/problems, progress + attempt persistence, subscription + mock webhook sync, API/UI premium gating, execution worker queue, and execution persistence/query APIs.
- Active priority: product enhancements first (recommendations, classroom mode, certificates) plus visualization improvements.

## Goal

Strengthen product value first, with MVP enhancements that improve learner outcomes and engagement.

## Delivery Principles

1. Keep app usable at all times with incremental delivery.
2. Ship MVP first for each enhancement, then iterate.
3. Measure outcomes weekly (engagement, completion, conversion).

## 4-Week Roadmap

## Week 1: Foundation and Architecture

### Outcomes

- Product and technical architecture finalized
- Backend initialized
- Database schema v1 ready
- Auth and RBAC baseline in place

### Work Items

1. Freeze feature scope and acceptance criteria per module.
2. Finalize backend service skeleton (API/auth/admin/billing/results/content).
3. Set up database and apply initial migration.
4. Implement user registration/login/logout and role model (`user`, `admin`).
5. Define subscription tiers and free vs paid feature flags.
6. Maintain secure execution architecture baseline.

### Exit Criteria

- API endpoints documented.
- Migration runs locally.
- Login works end-to-end.

## Week 2: Core Features (Auth, Content, Subscription, Results)

### Outcomes

- Users can sign in and save progress.
- Admin can manage problems and topic content.
- Free vs premium gating is active.
- Result persistence APIs integrated.

### Work Items

1. Build user profile and progress APIs.
2. Build admin panel MVP (topics/problems CRUD).
3. Add subscription status handling and entitlement checks.
4. Integrate frontend with backend for problems/progress.
5. Add analytics events for learning and conversion funnel.

### Exit Criteria

- Admin can add/update problem data.
- Free users see limited problems, premium users see full access.
- Attempt results are saved and retrievable.

## Week 3: Execution and Visualization

### Outcomes

- Docker-based code runner operational.
- Execution outputs integrated in problem-solving UI.
- DSA visualizations improved and more interactive.

### Work Items

1. Implement execution service with language-specific Docker images.
2. Add queue + worker model with timeout/memory/network restrictions.
3. Integrate run-code UI in problem detail page.
4. Improve visualizers (step mode, speed control, complexity overlays).
5. Add learning outcomes section per topic.

### Exit Criteria

- Code execution completes safely and returns output/errors.
- Visualizer updates validated for desktop and mobile.
- Learning outcomes available for all topics.

## Week 4: Product Enhancements and QA

### Outcomes

- Product enhancement MVP features completed (recommendations, classroom, certificates).
- QA coverage expanded for enhancement flows.

### Work Items

1. Build personalized recommendation engine MVP and UI integration.
2. Build certificate generation + profile sharing MVP.
3. Add automated tests for enhancement flows.
4. Conduct UAT, bug fixes, and performance tuning.

### Exit Criteria

- Product enhancement acceptance criteria validated.
- No critical or high-severity unresolved issues in enhancement scope.

## Daily Execution Checklist

## Week 1

- Day 1: finalize scope/metrics and ownership.
- Day 2: finalize backend service modules and API contracts.
- Day 3: schema review and initial migrations.
- Day 4: auth endpoints and role model.
- Day 5: frontend auth integration and RBAC validation.

## Week 2

- Day 6: admin content CRUD endpoints + UI shell.
- Day 7: complete admin problem management + free/premium controls.
- Day 8: progress/attempt persistence API + frontend integration.
- Day 9: subscription entities + entitlements + lock states.
- Day 10: payment provider test mode + webhook sync checks.

## Week 3

- Day 11: Docker templates + execution worker skeleton.
- Day 12: queue processing + timeout/memory/process limits.
- Day 13: run-code UI + stdout/stderr/status rendering.
- Day 14: visualizer controls (step/speed/reset/complexity overlays).
- Day 15: learning outcomes for all topics + content batch publish.

## Week 4

- Day 16: automated tests for critical flows + bug fixes.
- Day 17: remaining content QA + free/premium behavior validation.
- Day 18: recommendation engine MVP + recommendation cards on dashboard.
- Day 19: certificate generation/profile sharing MVP + regression checks.
- Day 20: bug fixes/polish + user feedback collection.

## Active Ticket Scope

1. TKT-023 (P0) - Personalized recommendation engine MVP.
2. TKT-024 (P1) - Team classroom mode MVP.
3. TKT-02