# Monitoring and Alerts Setup

## Status

This monitoring setup is currently deferred while product enhancements are prioritized. Keep artifacts ready, but do not execute monitoring rollout as an active sprint objective right now.

This document covers TKT-019 setup for dashboards and critical alerts.

## Implemented in Repository

1. Backend health endpoints:
   - `/health` (liveness)
   - `/health/ready` (readiness with database check)
   - `/health/metrics` (runtime and db pool metrics)
   - `/health/metrics/prometheus` (Prometheus scrape format for dashboard providers)
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

## Provider Integration Assets

The repository now includes provider-ready assets for Prometheus + Grafana:

1. Prometheus scrape baseline:
   - `docs/monitoring/prometheus-scrape-example.yml`
   - Scrapes `/health/metrics/prometheus` for staging and production jobs.
2. Grafana dashboard import:
   - `docs/monitoring/grafana-dsa-learning-dashboard.json`
   - Includes panels for target uptime (`up`), DB pool waiting, process memory, DB pool totals, and app uptime.

## Prometheus + Grafana Runbook

1. Add targets from `docs/monitoring/prometheus-scrape-example.yml` into your Prometheus config.
2. Ensure backend instances expose `/health/metrics/prometheus` through ingress/network policy.
3. Restart/reload Prometheus and confirm the `up` metric for backend jobs is `1`.
4. Import `docs/monitoring/grafana-dsa-learning-dashboard.json` in Grafana.
5. Select the Prometheus datasource and the desired job(s) in dashboard variables.
6. Configure provider alerts:
   - `max(dsa_backend_db_pool_waiting) > 0` for 5 minutes
   - `up == 0` for critical backend job targets

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

## Wiring Verification Workflow

Use `.github/workflows/environment-readiness.yml` to verify that monitoring secrets are configured in both environments before relying on scheduled monitoring.

Checks covered:

1. `STAGING_MONITOR_BACKEND_HEALTH_URL`, `STAGING_MONITOR_FRONTEND_URL`, `STAGING_ALERT_WEBHOOK_URL`
2. `PRODUCTION_MONITOR_BACKEND_HEALTH_URL`, `PRODUCTION_MONITOR_FRONTEND_URL`, `PRODUCTION_ALERT_WEBHOOK_URL`
3. Production protection rule baseline (`required_reviewers`)

Runbook:

1. Trigger `Environment Readiness` with target `both`.
2. Apply missing secret/protection updates from workflow output.
3. Re-run `Monitoring Alerts` manually to confirm incident checks are live.
