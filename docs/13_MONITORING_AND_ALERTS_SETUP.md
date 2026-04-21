# Monitoring and Alerts Setup

This document covers TKT-019 setup for dashboards and critical alerts.

## Implemented in Repository

1. Backend health endpoints:
   - `/health` (liveness)
   - `/health/ready` (readiness with database check)
   - `/health/metrics` (runtime and db pool metrics)
2. Scheduled monitoring workflow:
   - `.github/workflows/monitoring-alerts.yml`
   - Runs every 10 minutes and on manual trigger.
   - Checks staging and production backend/frontend URLs.
   - Sends webhook alert on failure (if configured).
   - Fails job on incidents to surface in GitHub Actions.

## Required Secrets

Set these in GitHub Environments.

### Staging Environment

- `STAGING_MONITOR_BACKEND_HEALTH_URL` (recommended: `/health/ready` URL)
- `STAGING_MONITOR_FRONTEND_URL`
- `STAGING_ALERT_WEBHOOK_URL` (optional but recommended)

### Production Environment

- `PRODUCTION_MONITOR_BACKEND_HEALTH_URL` (recommended: `/health/ready` URL)
- `PRODUCTION_MONITOR_FRONTEND_URL`
- `PRODUCTION_ALERT_WEBHOOK_URL` (optional but recommended)

## Dashboard Recommendations

To satisfy dashboard acceptance criteria, connect these into your observability stack:

1. API uptime and latency
   - Source: health endpoints and reverse proxy/API gateway logs.
2. Error rate
   - Source: backend structured logs from Pino.
3. Queue depth and execution success
   - Source: execution worker logs and code execution tables.
4. Runtime saturation
   - Source: `/health/metrics` memory and db pool signals.

## Suggested Threshold Alerts

1. Backend readiness down for 2 consecutive checks
2. Frontend unavailable for 2 consecutive checks
3. API 5xx error rate > 5% for 5 minutes
4. dbPool.waiting > 0 sustained for 5 minutes

## Validation Steps

1. Manually run `Monitoring Alerts` workflow.
2. Verify both environments pass checks.
3. Temporarily point one URL to a failing endpoint and verify:
   - webhook notification (if configured)
   - workflow failure signal
4. Restore URL and verify green run.
