# Implementation Order and Architecture Map

## Status Snapshot (Updated: 2026-04-20)

- Implemented: Auth/RBAC, admin content CRUD API+UI, progress+attempt persistence, backend-driven problem listing with fallback, subscription page, mock checkout + webhook sync, API/UI premium gating, execution worker queue, and execution persistence/query APIs.
- Implemented: frontend run-code panel integration in problem detail flows.
- Remaining: visualization upgrades, production payment provider wiring, launch hardening.

## Purpose

Translate the roadmap into concrete implementation order mapped to the existing frontend codebase and a proposed backend service structure.

## Frontend Integration Map (Current Codebase)

## Phase 1: App Shell and Navigation Foundation

1. `src/App.tsx`
   - Add authenticated app state bootstrap.
   - Add route/section guards for premium/admin sections.
   - Add lazy loading for auth/admin/subscription pages.
2. `src/components/Navbar.tsx`
   - Add login/signup CTA and user menu.
   - Add role-aware links (Admin only for admin routes).
3. `src/pages/Home.tsx`
   - Add personalized dashboard section (continue learning, streak, progress summary).

## Phase 2: Auth and User Profile UX

1. New: `src/pages/Login.tsx`
2. New: `src/pages/Register.tsx`
3. New: `src/pages/ForgotPassword.tsx`
4. New: `src/pages/Profile.tsx`
5. `src/contexts/ThemeContext.tsx`
   - Keep separate, no auth coupling.
6. New: `src/contexts/AuthContext.tsx`
   - User session state and role flags.
7. New: `src/hooks/useAuth.ts`
   - Accessors for auth and role checks.

## Phase 3: Problem Access Control and Progress Persistence

1. `src/components/ProblemsPage.tsx`
   - Enforce free vs premium visibility.
   - Add premium lock states and upgrade prompts.
   - Move completion state from local-only model to API-backed state.
2. `src/components/TopicDetail.tsx`
   - Add problem entitlements and gated solution visibility if needed.
   - Add "What You Will Learn" outcomes block for each topic.
3. `src/hooks/useProgress.ts`
   - Replace local persistence with API synchronization + optimistic updates.
4. `src/data/problems/*`
   - Shift from static-only source toward API-driven source with fallback.

## Phase 4: Visualization Upgrades

1. `src/components/DataStructureVisualizer.tsx`
   - Add standard controls (play/pause/step/reset/speed).
2. `src/components/BigO.tsx`
   - Add operation counters and live complexity overlays.
3. `src/components/BigODetail.tsx`
   - Add comparison mode and side-by-side analysis.
4. `src/components/Roadmap.tsx`
   - Link roadmap steps to visualization + practice actions.

## Phase 5: Code Execution UI Integration

1. `src/components/TopicDetail.tsx`
   - Add "Run Code" sandbox panel inside problem view.
2. New: `src/components/CodeExecutionPanel.tsx`
   - Language selector, editor area, stdin input, result output.
3. New: `src/hooks/useCodeExecution.ts`
   - Submit execution jobs, poll status, retrieve output.

## Phase 6: Admin and Subscription UX

1. New: `src/pages/AdminDashboard.tsx`
2. New: `src/pages/AdminProblems.tsx`
3. New: `src/pages/AdminTopics.tsx`
4. New: `src/pages/Subscription.tsx`
5. New: `src/components/PremiumGate.tsx`

## Frontend Service Layer (Recommended Additions)

1. New: `src/services/apiClient.ts`
2. New: `src/services/authService.ts`
3. New: `src/services/problemService.ts`
4. New: `src/services/progressService.ts`
5. New: `src/services/subscriptionService.ts`
6. New: `src/services/executionService.ts`
7. New: `src/types/api.ts`

## Proposed Backend Architecture

## Suggested Folder Structure

1. `backend/src/main.ts`
2. `backend/src/config/`
3. `backend/src/modules/auth/`
4. `backend/src/modules/users/`
5. `backend/src/modules/topics/`
6. `backend/src/modules/problems/`
7. `backend/src/modules/progress/`
8. `backend/src/modules/subscriptions/`
9. `backend/src/modules/admin/`
10. `backend/src/modules/execution/`
11. `backend/src/modules/payments/`
12. `backend/src/modules/health/`
13. `backend/src/common/middleware/`
14. `backend/src/common/guards/`
15. `backend/src/common/logging/`
16. `backend/src/db/migrations/`
17. `backend/src/db/seeds/`
18. `backend/src/queue/`

## Deployment Units

1. `web` (frontend)
2. `api` (backend)
3. `worker-exec` (docker execution workers)
4. `db` (managed)
5. `queue` (managed/self-hosted)

## Implementation Order (Strict)

1. Auth + roles + session handling
2. Database schema + migrations + seed existing topics/problems
3. Problems/progress APIs + frontend integration
4. Subscription entitlements + billing test mode
5. Admin content management APIs + UI
6. Code execution worker + API + frontend panel
7. Observability + QA + production rollout
8. Final mandatory last task before release signoff: run the premium entitlement regression audit across free-vs-premium problem cards/details, API enforcement, and upgrade CTA paths.

## Definition of Done Per Phase

1. API contract published and versioned.
2. UI integrated and role/entitlement checks pass.
3. Automated tests for new critical flows.
4. Tracking events included for analytics.
5. Staging validation completed before moving to next phase.
