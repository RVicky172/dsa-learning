# Backend Scaffold

This is a starter backend scaffold aligned with the docs roadmap.

## Quick Start

1. Install dependencies:
   - npm install
2. Create env file:
   - copy .env.example to .env
3. Start database with Docker:
   - docker compose up -d
4. Run initial migration:
   - npm run migrate:init
5. Create or refresh the default admin user:
   - npm run seed:admin
6. Start dev server:
   - npm run dev

## Database

PostgreSQL is used as the primary database.

For details about why PostgreSQL is used and why a running database is required, see:

- DATABASE_SETUP.md

## Default Admin

The admin seed script reads these values from `.env`:

- DEFAULT_ADMIN_EMAIL
- DEFAULT_ADMIN_PASSWORD
- DEFAULT_ADMIN_NAME

Run this to create/update the admin account:

- npm run seed:admin

## Planned Modules

- auth
- users
- topics
- problems
- progress
- subscriptions
- admin
- execution
- payments
- health
