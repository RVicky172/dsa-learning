# Deployment and Operations Plan

## Status Note (Updated: 2026-04-20)

- Core app foundations (auth, admin CRUD, persistence, subscription sync, premium gating) are implemented and validated locally.
- Deployment phase must include environment variable setup for payment webhook secret and migration workflow.
- Final mandatory last task before release signoff: run the premium entitlement regression audit across free-vs-premium problem cards/details, API enforcement, and upgrade CTA paths.

## Goal

Deploy frontend, backend, database, and execution workers to production with reliable CI/CD, monitoring, and rollback safety.

## Environment Strategy

1. local
2. staging
3. production

## Deployment Components

1. Frontend web app
2. Backend API
3. Database
4. Queue and worker service (code execution)
5. Object/log storage

## CI/CD Pipeline

1. Pull request checks:
   - Lint
   - Type checks
   - Unit tests
2. Staging deploy on merge to main branch.
3. Production deploy via release tag/manual approval.
4. Post-deploy smoke tests and health checks.

## Infrastructure Checklist

1. Domain and TLS certificates
2. Secret management (never hardcode credentials)
3. Managed database setup
4. Backup policy and restore drill
5. CDN and caching strategy
6. WAF/rate limiting at edge

## Observability

1. Centralized logs for frontend, backend, and workers.
2. Metrics dashboard:
   - API latency
   - Error rates
   - Job queue depth
   - Execution success rate
3. Alerts for high error rate and unavailable critical endpoints.

## Rollback Strategy

1. Blue/green or rolling with quick rollback option.
2. Keep previous stable image/version available.
3. Database migration policy:
   - Backward-compatible first, destructive changes delayed.

## Week-by-Week Deployment Plan

## Week 1

- Provision staging environment and baseline CI checks.

## Week 2

- Deploy backend and database to staging.
- Deploy frontend integration with staging APIs.

## Week 3

- Deploy execution worker stack to staging.
- Run end-to-end and security tests.

## Week 4

- Production readiness review.
- Execute production launch with controlled rollout.
- Monitor and resolve post-launch issues.

## Acceptance Criteria

1. Staging and production have repeatable deployments.
2. End-to-end flow works in production (login, solve, execute, save results).
3. Monitoring and alerts cover all critical components.
4. Rollback process validated in a non-production drill.
