# Auth, Admin, and Subscription Plan

## Implementation Status (Updated: 2026-04-20)

- Implemented: auth flows, RBAC guardrails, admin topic/problem CRUD, subscription status APIs, subscription page, mock checkout flow, payment webhook sync path, and API/UI premium gating with upgrade CTAs.
- Remaining: production payment provider integration and final release-grade entitlement regression run.
- Final mandatory last task before release signoff: run the premium entitlement regression audit across free-vs-premium problem cards/details, API enforcement, and upgrade CTA paths.

## Goals

1. Add secure user login and session handling.
2. Add admin interface for managing topics and problems.
3. Implement subscription model for premium content access.

## Role Model

1. guest
   - View public landing and limited topic previews.
2. user
   - Access free content, save progress, see personal dashboard.
3. premium_user
   - Access full premium problem set and advanced features.
4. admin
   - Manage users, content, subscriptions, and moderation.

## Authentication

## MVP Scope

1. Email/password signup and login.
2. Password reset flow.
3. Secure session/token handling.
4. Login state persistence.

## Security Essentials

1. Password hashing (argon2 or bcrypt).
2. Rate limiting on auth endpoints.
3. Email verification for new accounts.
4. Session invalidation on logout/password change.

## Admin Panel Scope

1. Topic management (create/update/archive).
2. Problem management (CRUD, difficulty, tags, free/premium flag).
3. User management (status, role updates).
4. Subscription override controls (support use cases).
5. Audit logs for admin actions.

## Subscription Model

## Tiers

1. Free
   - Limited problems per topic.
   - Basic progress tracking.
2. Pro Monthly
   - Full problem access.
   - Advanced analytics and recommendations.
3. Pro Yearly
   - Same as monthly with discounted billing.

## Entitlement Rules

1. Free users can only open free-flagged problems.
2. Premium users can open all problems.
3. Expired premium falls back to free entitlements.
4. UI and API both enforce access checks.

## Billing and Lifecycle

1. Subscription create
2. Renewal
3. Cancel at period end
4. Failed payment and grace period
5. Webhook-driven status sync

## Week-by-Week Plan

## Week 1

- Data model for users, roles, subscriptions.
- Implement login/register/password reset backend.

## Week 2

- Integrate auth flows in frontend.
- Build admin panel MVP for content management.

## Week 3

- Integrate payment provider in test mode.
- Add entitlement middleware and premium UI badges.

## Week 4

- Production billing configuration.
- Complete auth/subscription QA and security checks.

## Acceptance Criteria

1. User can register, login, logout, reset password.
2. Admin can manage problems and their free/premium visibility.
3. Free user cannot access premium-only problem details.
4. Premium user access updates correctly after subscription state changes.
5. Final mandatory last task before release signoff: run the premium entitlement regression audit across free-vs-premium problem cards/details, API enforcement, and upgrade CTA paths for all roles.
