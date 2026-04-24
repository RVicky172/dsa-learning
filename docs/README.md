# DSA Master Next-Month Planning Docs

## Current Delivery Snapshot (Updated: 2026-04-20)

- Implemented in codebase: auth + RBAC, admin CRUD for topics/problems, progress + attempt persistence, DB migration `002_user_problem_progress.sql`, backend-driven problems view with fallback, subscription page, mock checkout + webhook sync, and API/UI premium gating with upgrade CTAs.
- Remaining major tracks: visualization improvements and performance optimization.
- Deployment-focused tracks are currently deferred until product enhancement completion.

This folder contains the complete step-by-step plan for the next month.

## Project Readme and Graphify

- Repository overview and setup are documented in `../README.md`.
- Keep the knowledge graph current after major changes with:
   - `npm run graphify:update`
- Graph artifacts used by planning and architecture reviews:
   - `../graphify-out/GRAPH_REPORT.md`
   - `../graphify-out/graph.json`

## Documents

1. `plans/README.md`
   - Folder-level index for separated planning files.
2. `plans/DEVELOPMENT_PLAN.md`
   - Active development plan (product-first).
3. `plans/DEPLOYMENT_PLAN.md`
   - Deferred deployment and release tracks.
4. `plans/OTHER_TASKS_PLAN.md`
   - Other tasks (completed/deferred/stretch) and KPI tracking.
5. `01_PRODUCT_AND_LEARNING_IMPROVEMENT_PLAN.md`
   - Product UX improvements, "what users will learn" experience, and engagement upgrades.
6. `02_CONTENT_EXPANSION_PROBLEMS_PLAN.md`
   - Plan to add new problems to each topic, with quality standards and rollout model.
7. `03_AUTH_ADMIN_SUBSCRIPTION_PLAN.md`
   - User login, admin capabilities, RBAC, and subscription access model.
8. `04_DATABASE_INTEGRATION_PLAN.md`
   - Data model, migration strategy, APIs, and storage of results/problems/progress.
9. `05_DOCKER_CODE_EXECUTION_PLAN.md`
   - Secure code execution architecture using Docker containers.
10. `06_DEPLOYMENT_AND_OPERATIONS_PLAN.md`
   - Deferred plan for environment strategy, CI/CD, observability, and production operations.
11. `08_DSA_VISUALIZATION_IMPROVEMENT_PLAN.md`
   - Detailed roadmap to improve DSA visual learning and interaction quality.
12. `09_IMPLEMENTATION_ORDER_AND_ARCHITECTURE_MAP.md`
   - File-level implementation order and proposed backend architecture.
13. `10_DATABASE_ERD_DRAFT.md`
   - Draft ERD and relational schema for users, problems, subscriptions, and executions.
14. `12_CICD_SECRETS_AND_ENV_SETUP.md`
   - Deferred CI/CD environment setup requirements (not active in current product-first cycle).
15. `13_MONITORING_AND_ALERTS_SETUP.md`
   - Deferred monitoring/alerting setup and provider integration runbook.
16. `14_PRODUCTION_RELEASE_AND_72H_STABILIZATION_RUNBOOK.md`
   - Deferred TKT-022 production launch and stabilization protocol.

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

1. Review `plans/DEVELOPMENT_PLAN.md`.
2. Execute from `plans/DEVELOPMENT_PLAN.md`.
3. Build by file order in `09_IMPLEMENTATION_ORDER_AND_ARCHITECTURE_MAP.md`.
4. Implement schema from `10_DATABASE_ERD_DRAFT.md`.
5. Track deferred and stretch tasks from `plans/OTHER_TASKS_PLAN.md`.

