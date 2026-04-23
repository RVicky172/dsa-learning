# Production Release and 72-Hour Stabilization Runbook (TKT-022)

## Status

This runbook is currently deferred while product enhancements are prioritized. Use it only when deployment and launch tickets are reactivated.

## Purpose

Define the exact release sequence, owner responsibilities, and post-launch stabilization protocol required to close TKT-022.

## Release Gate (Must Be Green Before Cutover)

1. CI/CD workflows pass for latest main commit.
2. Environment readiness workflow passes for staging and production.
3. Monitoring alerts workflow passes in both environments.
4. Backend integration suite passes in staging-like environment.
5. No unresolved P0/P1 defects tagged `release-blocker`.

## Roles and On-Call Matrix

1. Release Commander (single decision owner)
2. Backend On-Call
3. Frontend On-Call
4. DevOps On-Call
5. QA Verifier

## Pre-Release Checklist (T-24h to T-1h)

1. Confirm production environment protections and required reviewers.
2. Confirm production secrets are up to date and non-expired.
3. Confirm database backup snapshot is created and restore tested recently.
4. Confirm rollback artifact is available (previous stable backend/frontend versions).
5. Confirm release notes include API/schema changes and known limitations.
6. Confirm support escalation channel and incident bridge are ready.

## Cutover Checklist (T0)

1. Tag release version (`vX.Y.Z`) and trigger production deployment workflow.
2. Verify backend deployment completes without migration errors.
3. Verify frontend deployment completes and serves latest build.
4. Run smoke tests:
   - `GET /health`
   - `GET /health/ready`
   - Authentication login flow
   - Problem list/detail load
   - Code execution submission and result fetch
5. Validate subscription-critical flow:
   - Free user cannot access premium-only endpoints/content.
   - Premium user retains access after token/session refresh.

## 72-Hour Stabilization Plan

## Monitoring Windows

1. Hour 0-6: active watch, 15-minute checks.
2. Hour 6-24: active watch, 30-minute checks.
3. Hour 24-72: hourly checks and incident-triggered deep dives.

## Metrics to Watch

1. API uptime (`up`)
2. API readiness (`/health/ready`)
3. DB pool pressure (`dsa_backend_db_pool_waiting`)
4. Process memory trend (`dsa_backend_process_resident_memory_bytes`)
5. Error rate from backend logs and gateway metrics
6. Code execution success rate and timeout ratio

## Incident Severity and Response Targets

1. Sev-1 (full outage or auth-wide failure)
   - Ack within 5 minutes
   - Mitigate within 30 minutes (rollback allowed immediately)
2. Sev-2 (core flow degraded: execute/submit/subscription)
   - Ack within 10 minutes
   - Mitigate within 60 minutes
3. Sev-3 (non-critical defects)
   - Ack within 60 minutes
   - Schedule patch within 24 hours

## Rollback Criteria

Rollback immediately if any condition persists after one mitigation attempt:

1. `up == 0` for production backend for more than 5 minutes.
2. `/health/ready` failing for more than 10 minutes.
3. Login or token validation failing for more than 10% of requests.
4. Premium entitlement failures affecting paid users on critical paths.
5. DB pool waiting sustained above 0 with request timeouts for 10+ minutes.

## Stabilization Checkpoints

1. +6h: publish incident summary and metric trend snapshot.
2. +24h: confirm no unresolved Sev-1/Sev-2 incidents.
3. +48h: verify conversion-critical and execution-critical journeys remain healthy.
4. +72h: finalize stabilization signoff report.

## TKT-022 Done Criteria

TKT-022 can be marked Done only when:

1. Production release is completed.
2. 72-hour monitoring window completed with no unresolved Sev-1/Sev-2 incidents.
3. Rollback readiness remains validated.
4. Post-release report is shared with actions for next sprint.

Note: TKT-026 premium entitlement regression audit remains mandatory final closure before release signoff.
