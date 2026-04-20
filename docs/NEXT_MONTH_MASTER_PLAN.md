# Next Month Master Plan (Step-by-Step)

## Implementation Status (Updated: 2026-04-20)

- Completed: backend bootstrap, DB schema + migrations, auth + RBAC, admin topic/problem CRUD, progress + attempt persistence, problem API integration with static fallback, subscription page, payment webhook sync (mock), API + UI premium gating with upgrade CTAs, execution worker queue, and execution result persistence/query APIs.
- Remaining major tracks: frontend run-code panel integration, production payment provider integration, visualization upgrades, deployment hardening, and launch QA.
- Final mandatory last task before release signoff: run the premium entitlement regression audit across free-vs-premium problem cards/details, API enforcement, and upgrade CTA paths.

## Goal

Transform the current DSA learning web app into a scalable learning platform with:

- Better product experience and learning guidance
- More problems across all topics
- Login and role-based access (User and Admin)
- Subscription-based content access
- Database-backed persistence for results, progress, and content
- Secure code execution using Docker containers
- Production-grade deployment and operations

## Current Baseline

- Frontend: React + TypeScript + Vite
- Data: Mostly static topic/problem data in the app
- No centralized backend for users/results/problems management

## Delivery Principles

- Keep app usable at all times (incremental delivery)
- Ship MVP first for each large feature, then improve
- Measure outcomes weekly (engagement, completion, subscription funnel)
- Favor secure defaults (auth, payments, code execution sandbox)

## 4-Week Roadmap

## Week 1: Foundation and Architecture

### Outcomes

- Product and technical architecture finalized
- Backend project initialized
- Database schema v1 designed
- Auth and RBAC baseline in place

### Work Items

1. Freeze feature scope and define acceptance criteria per module.
2. Create backend service skeleton (API, auth, admin, billing, results, content).
3. Set up database and apply initial migration.
4. Implement user registration/login/logout and role model (`user`, `admin`).
5. Define subscription tiers and feature flags for free vs paid access.
6. Draft secure Docker execution service design (queues, limits, sandbox).

### Exit Criteria

- API endpoints documented
- Database migration runs locally and in staging
- Login works end-to-end with token/session handling

## Week 2: Core Features (Auth, Content, Subscription, Results)

### Outcomes

- Users can sign in and save progress
- Admin can manage problems and topic content
- Free vs premium problem gating active
- Result persistence API integrated with frontend

### Work Items

1. Build user profile and progress APIs.
2. Build admin panel MVP (CRUD for topics/problems).
3. Add subscription status handling and entitlement checks.
4. Integrate frontend with backend for problems/progress.
5. Add analytics events for learning and conversion funnel.

### Exit Criteria

- New problem data can be added via admin flow
- Free users can see limited problems, premium users can see full set
- Attempt results are saved and retrievable

## Week 3: Code Execution and Advanced Visualization

### Outcomes

- Docker-based code runner operational in staging
- Execution outputs integrated in problem-solving UI
- DSA visualizations improved and more interactive

### Work Items

1. Implement execution service with language-specific Docker images.
2. Add queue + worker model with timeout/memory/network restrictions.
3. Integrate run-code UI in problem detail page.
4. Improve visualizers (step mode, speed control, complexity overlays).
5. Add "What You Will Learn" learning outcomes section per topic.

### Exit Criteria

- Code run request completes safely and returns output/errors
- Visualizer updates validated for desktop and mobile
- Learning outcome cards available for all topics

## Week 4: Hardening, Deployment, and Launch

### Outcomes

- CI/CD and production deployment completed
- Monitoring, alerting, backups, and rollback defined
- Documentation complete and launch-ready

### Work Items

1. Add automated tests (API, integration, smoke).
2. Complete payment/subscription production setup.
3. Configure production infra and secrets management.
4. Add observability dashboards and alerts.
5. Conduct UAT, bug fixes, and performance tuning.
6. Final launch checklist and post-launch support plan.
7. Final mandatory last task before release signoff: run the premium entitlement regression audit across free-vs-premium problem cards/details, API enforcement, and upgrade CTA paths.

### Exit Criteria

- Production deployment validated
- No critical or high-severity unresolved issues
- Monitoring and backup/restore tested

## Milestones

1. M1 (End Week 1): Architecture + Auth + DB ready
2. M2 (End Week 2): Content CRUD + Subscription gating + Stored results
3. M3 (End Week 3): Docker execution + enhanced visualization
4. M4 (End Week 4): Production deployment and go-live

## KPIs to Track

- Weekly active learners
- Problems attempted per user
- Problem completion rate
- Free-to-paid conversion rate
- Code execution success rate
- Average execution latency
- 7-day retention after first login

## Risk Register (Top)

1. Payment integration delays
   - Mitigation: start sandbox integration in Week 1 and keep fallback manual premium toggle.
2. Container security risks
   - Mitigation: strict sandbox limits, no network, seccomp/apparmor, rate limiting.
3. Scope overflow from content expansion
   - Mitigation: fixed quota per topic and phased publishing.
4. Performance regression from visualizations
   - Mitigation: profile early, lazy-load heavy visual components.
