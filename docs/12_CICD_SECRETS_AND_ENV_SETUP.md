# CI/CD Secrets and Environment Setup

## Status

This setup guide is currently deferred during the product-enhancement-first phase. Treat this as reference only until deployment work is reactivated.

This document defines the required GitHub Actions environment configuration for TKT-018.

## Environments

Create two GitHub Environments:

1. `staging`
2. `production`

Recommended protections:

- `production`: required reviewers before deployment approval
- `staging`: optional reviewers

## Repository Variables

Set repository/environment variable:

- `RUN_DB_MIGRATIONS`
  - `true` to run backend migrations during deploy jobs
  - `false` to skip migration steps

## Required Secrets

Set these in each environment.

### Staging

- `STAGING_BACKEND_DEPLOY_HOOK`
- `STAGING_FRONTEND_DEPLOY_HOOK`
- `STAGING_BACKEND_HEALTH_URL` (example: https://staging-api.example.com/health)
- `STAGING_FRONTEND_URL` (example: https://staging.example.com)
- `STAGING_DATABASE_URL` (required only if `RUN_DB_MIGRATIONS=true`)

### Production

- `PRODUCTION_BACKEND_DEPLOY_HOOK`
- `PRODUCTION_FRONTEND_DEPLOY_HOOK`
- `PRODUCTION_BACKEND_HEALTH_URL` (example: https://api.example.com/health)
- `PRODUCTION_FRONTEND_URL` (example: https://example.com)
- `PRODUCTION_DATABASE_URL` (required only if `RUN_DB_MIGRATIONS=true`)

## Trigger Behavior

- Pull request to `main`: runs checks only (lint/build).
- Push to `main`: runs checks and deploys to `staging`.
- Push tag `v*` (for example `v1.0.0`): runs checks and deploys to `production`.
- Manual run (`workflow_dispatch`): deploy to selected target (`staging` or `production`).

## Environment Readiness Audit

A dedicated workflow verifies CI/CD and monitoring environment wiring:

- `.github/workflows/environment-readiness.yml`
- Runs weekly and on manual trigger.
- Validates required staging/production environment secrets.
- Validates required repository variable: `RUN_DB_MIGRATIONS`.
- Validates production environment protection rule: `required_reviewers`.

Recommended usage before release windows:

1. Run `Environment Readiness` with target `both`.
2. Resolve any missing secrets, variables, or protection findings.
3. Re-run until the workflow is green for both environments.

## Post-Deploy Verification

The workflow validates:

1. backend health endpoint (`/health`)
2. frontend URL response

If smoke checks fail, the deploy job fails.
