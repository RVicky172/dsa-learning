# DSA Master Next-Month Planning Docs

## Current Delivery Snapshot (Updated: 2026-04-20)

- Implemented in codebase: auth + RBAC, admin CRUD for topics/problems, progress + attempt persistence, DB migration `002_user_problem_progress.sql`, backend-driven problems view with fallback, subscription page, mock checkout + webhook sync, and API/UI premium gating with upgrade CTAs.
- Remaining major tracks: production payment provider wiring, execution worker stack, visualization upgrades, and launch hardening.
- Final mandatory last task before release signoff: run the premium entitlement regression audit across free-vs-premium problem cards/details, API enforcement, and upgrade CTA paths.

This folder contains the complete step-by-step plan for the next month.

## Project Readme and Graphify

- Repository overview and setup are documented in `../README.md`.
- Keep the knowledge graph current after major changes with:
   - `npm run graphify:update`
- Graph artifacts used by planning and architecture reviews:
   - `../graphify-out/GRAPH_REPORT.md`
   - `../graphify-out/graph.json`

## Documents

1. `NEXT_MONTH_MASTER_PLAN.md`
   - Month-level strategy, weekly milestones, and ownership.
2. `01_PRODUCT_AND_LEARNING_IMPROVEMENT_PLAN.md`
   - Product UX improvements, "what users will learn" experience, and engagement upgrades.
3. `02_CONTENT_EXPANSION_PROBLEMS_PLAN.md`
   - Plan to add new problems to each topic, with quality standards and rollout model.
4. `03_AUTH_ADMIN_SUBSCRIPTION_PLAN.md`
   - User login, admin capabilities, RBAC, and subscription access model.
5. `04_DATABASE_INTEGRATION_PLAN.md`
   - Data model, migration strategy, APIs, and storage of results/problems/progress.
6. `05_DOCKER_CODE_EXECUTION_PLAN.md`
   - Secure code execution architecture using Docker containers.
7. `06_DEPLOYMENT_AND_OPERATIONS_PLAN.md`
   - Environment strategy, CI/CD, observability, and production operations.
8. `07_EXECUTION_CHECKLIST_NEXT_MONTH.md`
   - Day-by-day delivery checklist with acceptance criteria.
9. `08_DSA_VISUALIZATION_IMPROVEMENT_PLAN.md`
   - Detailed roadmap to improve DSA visual learning and interaction quality.
10. `09_IMPLEMENTATION_ORDER_AND_ARCHITECTURE_MAP.md`
   - File-level implementation order and proposed backend architecture.
11. `10_DATABASE_ERD_DRAFT.md`
   - Draft ERD and relational schema for users, problems, subscriptions, and executions.
12. `11_SPRINT_BOARD_NEXT_MONTH.md`
   - Sprint-ready ticket board with priorities and acceptance criteria.

## Suggested Team Roles

- Product and Content Lead
- Frontend Engineer
- Backend Engineer
- DevOps Engineer
- QA Engineer

## Delivery Window

- 4 weeks (next month)
- Daily execution with weekly review, demo, and retrospective

## Recommended Execution Order

1. Review `NEXT_MONTH_MASTER_PLAN.md`.
2. Execute from `07_EXECUTION_CHECKLIST_NEXT_MONTH.md`.
3. Build by file order in `09_IMPLEMENTATION_ORDER_AND_ARCHITECTURE_MAP.md`.
4. Implement schema from `10_DATABASE_ERD_DRAFT.md`.
5. Track delivery from `11_SPRINT_BOARD_NEXT_MONTH.md`.

