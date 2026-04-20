# Database Integration Plan

## Implementation Status (Updated: 2026-04-20)

- Implemented schema includes core entities plus user problem completion tracking (`user_problem_progress`) via migration `002_user_problem_progress.sql`.
- Problem attempts, user progress, subscriptions, payments, and webhook-driven subscription synchronization are integrated in backend modules.
- Final mandatory last task before release signoff: run the premium entitlement regression audit across free-vs-premium problem cards/details, API enforcement, and upgrade CTA paths.

## Goal

Move from static-only content handling to database-backed data for users, problems, subscriptions, and results.

## Recommended Data Store

- Primary relational database (for example: PostgreSQL)
- Optional cache layer (for example: Redis) for rate limits and short-lived execution metadata

## Core Entities

1. users
2. roles
3. user_roles
4. topics
5. problems
6. problem_examples
7. problem_hints
8. problem_solutions
9. user_progress
10. problem_attempts
11. code_executions
12. subscriptions
13. payments
14. admin_audit_logs
15. user_problem_progress

## Minimum Schema Notes

## users

- id, email (unique), password_hash, display_name, created_at, updated_at

## topics

- id, slug (unique), title, description, order_index, is_published

## problems

- id, topic_id, title, slug, difficulty, is_premium, statement, constraints, created_by

## problem_attempts

- id, user_id, problem_id, language, code, status, runtime_ms, memory_kb, submitted_at

## user_progress

- id, user_id, topic_id, solved_count, attempted_count, mastery_score, updated_at

## subscriptions

- id, user_id, provider, plan_id, status, current_period_end, cancel_at_period_end

## API Surface (MVP)

1. `POST /auth/register`
2. `POST /auth/login`
3. `GET /topics`
4. `GET /topics/:topicId/problems`
5. `GET /problems/:problemId`
6. `POST /problems/:problemId/attempts`
7. `GET /progress/me`
8. `POST /progress/me/problems/:problemId`
9. `GET /subscriptions/me`
10. `POST /subscriptions/checkout-session`
11. `POST /payments/webhook`
12. `POST /admin/problems`
13. `PATCH /admin/problems/:id`

## Migration Strategy

1. Create schema migration `v1_init`.
2. Seed existing static topic/problem data.
3. Run dual-read during transition:
   - Prefer database read.
   - Fallback to static data for missing records.
4. Remove fallback once parity checks pass.

## Data Integrity and Governance

1. Use foreign keys for topic/problem/attempt relations.
2. Add unique constraints on slugs and user-email.
3. Add created_at/updated_at on core tables.
4. Add soft-delete or archive flags for admin content safety.

## Observability and Backup

1. Daily full backup + point-in-time recovery if supported.
2. Query performance dashboard for hot endpoints.
3. Slow query logging and index review.

## Acceptance Criteria

1. Existing content available from database.
2. Attempts and progress persist correctly per user.
3. Subscription status is stored and queryable for entitlement checks.
4. Admin edits are reflected in user-facing content without redeploy.
5. Final mandatory last task before release signoff: run the premium entitlement regression audit across free-vs-premium problem cards/details, API enforcement, and upgrade CTA paths for free, premium_user, and admin users.
