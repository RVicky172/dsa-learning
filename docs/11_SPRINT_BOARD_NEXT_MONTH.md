# Sprint Board - Next Month

## Status Snapshot (Updated: 2026-04-20)

- Done: TKT-001, TKT-002, TKT-003, TKT-004, TKT-005, TKT-006, TKT-007, TKT-008, TKT-009, TKT-010, TKT-011.
- In Progress: TKT-012 onward (execution engine, visualization, deployment hardening).
- Mandatory final ticket: premium entitlement regression audit (free-vs-premium cards/details, API enforcement, and upgrade CTA paths) must be the last closure item before release signoff.

## Usage

- Track each ticket in your project board with status: `Backlog`, `In Progress`, `Review`, `Done`.
- Priority labels: `P0`, `P1`, `P2`.
- Suggested sprint cadence: 4 weekly sprints.

## Sprint 1 (Foundation)

1. TKT-001 (P0) - Backend service bootstrap
   - Owner: Backend
   - Depends on: none
   - Acceptance:
   - API service starts in local and staging.
   - Health endpoint returns success.

2. TKT-002 (P0) - Database schema v1 and migration pipeline
   - Owner: Backend
   - Depends on: TKT-001
   - Acceptance:
   - Migration applies on clean DB.
   - Seed script loads base topics and problems.

3. TKT-003 (P0) - Auth APIs (register/login/logout/reset)
   - Owner: Backend
   - Depends on: TKT-002
   - Acceptance:
   - Auth flows pass integration tests.
   - Role claims present in session/token.

4. TKT-004 (P0) - Frontend auth screens and state integration
   - Owner: Frontend
   - Depends on: TKT-003
   - Acceptance:
   - User can register and login from UI.
   - Navbar reflects authenticated state.

5. TKT-005 (P1) - RBAC middleware and admin guard
   - Owner: Backend + Frontend
   - Depends on: TKT-003
   - Acceptance:
   - Admin routes blocked for non-admin users.

## Sprint 2 (Content, Progress, Subscription)

1. TKT-006 (P0) - Problem and topic CRUD APIs for admin
   - Owner: Backend
   - Depends on: TKT-005
   - Acceptance:
   - Admin can create/edit/archive topics and problems.

2. TKT-007 (P0) - Admin UI for content management
   - Owner: Frontend
   - Depends on: TKT-006
   - Acceptance:
   - Admin can manage problem free/premium flag.

3. TKT-008 (P0) - Progress and attempt persistence APIs
   - Owner: Backend
   - Depends on: TKT-002
   - Acceptance:
   - Attempt submissions stored and retrievable.

4. TKT-009 (P0) - Problem page API integration + persistence
   - Owner: Frontend
   - Depends on: TKT-008
   - Acceptance:
   - Problem completion and history reflect backend data.

5. TKT-010 (P0) - Subscription entities + entitlement checks
   - Owner: Backend
   - Depends on: TKT-002
   - Acceptance:
   - Free and premium access rules enforced by API.

6. TKT-011 (P1) - Subscription page and upgrade flow
   - Owner: Frontend
   - Depends on: TKT-010
   - Acceptance:
   - Locked problems show upgrade UI and plan details.

## Sprint 3 (Execution + Visualization + Content Expansion)

1. TKT-012 (P0) - Docker execution worker with queue
   - Owner: Backend/Platform
   - Depends on: TKT-001
   - Acceptance:
   - Code execution returns stdout/stderr/status.
   - Timeout and memory limits enforced.

2. TKT-013 (P0) - Execution API and result persistence
   - Owner: Backend
   - Depends on: TKT-012
   - Acceptance:
   - Execution records stored and queryable.

3. TKT-014 (P0) - Frontend run-code panel integration
   - Owner: Frontend
   - Depends on: TKT-013
   - Acceptance:
   - Users can run code from problem detail and view results.

4. TKT-015 (P1) - Visualization control standardization
   - Owner: Frontend
   - Depends on: none
   - Acceptance:
   - Play/pause/step/reset/speed available in target visualizers.

5. TKT-016 (P1) - Add 90 new problems across 15 topics
   - Owner: Content + Backend
   - Depends on: TKT-006
   - Acceptance:
   - 6 new problems per topic published with quality checks.

6. TKT-017 (P1) - Add "What You Will Learn" for all topics
   - Owner: Content + Frontend
   - Depends on: none
   - Acceptance:
   - Every topic has learning outcomes visible in UI.

## Sprint 4 (Deployment and Launch)

1. TKT-018 (P0) - CI/CD for staging and production
   - Owner: DevOps
   - Depends on: TKT-001
   - Acceptance:
   - Deploy pipeline executes automated checks and deployments.

2. TKT-019 (P0) - Monitoring and alerts
   - Owner: DevOps + Backend
   - Depends on: TKT-018
   - Acceptance:
   - Dashboards and critical alerts configured.

3. TKT-020 (P0) - Security review (auth, subscription, execution)
   - Owner: Platform + Backend
   - Depends on: TKT-014
   - Acceptance:
   - No unresolved critical security findings.

4. TKT-021 (P0) - End-to-end QA and UAT
   - Owner: QA + Product
   - Depends on: TKT-019
   - Acceptance:
   - Critical user journeys pass.

5. TKT-022 (P0) - Production release and stabilization
   - Owner: All
   - Depends on: TKT-021
   - Acceptance:
   - Launch completed and 72-hour stabilization monitoring active.

6. TKT-026 (P0) - Final mandatory last task before release signoff: premium entitlement regression audit
   - Owner: QA + Backend + Frontend
   - Depends on: TKT-021
   - Acceptance:
   - API blocks premium details/attempts for free users.
   - Problem cards/details show correct lock state.
   - Upgrade CTA routes work for unauthenticated and authenticated free users.
   - Premium/admin users can access locked paths after entitlement refresh.

## Stretch Tickets (If Capacity Allows)

1. TKT-023 (P2) - Personalized recommendation engine
2. TKT-024 (P2) - Team classroom mode
3. TKT-025 (P2) - Certificate generation and profile sharing
