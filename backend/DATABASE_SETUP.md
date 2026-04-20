# Database Setup and Why It Is Needed

## Database We Are Using

This backend uses PostgreSQL.

## Why PostgreSQL

1. Strong relational model for users, roles, problems, attempts, and subscriptions.
2. Reliable ACID transactions for auth and payment-related workflows.
3. Mature indexing and query features for analytics and progress tracking.
4. Great TypeScript ecosystem support via pg and migration tooling.

## Why You Need to Install or Run a Database

The backend stores persistent data that cannot live only in memory:

1. User accounts and encrypted passwords.
2. Roles and permissions (user, premium_user, admin).
3. Problem attempts and progress history.
4. Subscription and payment status.
5. Code execution metadata and results.

Without a running database, register and login APIs cannot create or validate users, and progress/subscription features cannot work.

## Easiest Local Option (No Native Install): Docker

If Docker Desktop is installed, run PostgreSQL with one command:

1. Start PostgreSQL:
   - `docker compose up -d`
2. Verify container:
   - `docker ps`
3. Use this connection string in .env:
   - `DATABASE_URL=postgres://postgres:postgres@localhost:5432/dsa_learning`
4. Add local webhook secret for payment callbacks:
   - `PAYMENT_WEBHOOK_SECRET=local-webhook-secret`

## Native Install Option

You can also install PostgreSQL directly on your system and create:

1. Database: `dsa_learning`
2. User: `postgres` (or your chosen user)
3. Matching password and connection string in .env

## Initialize Schema

From backend folder:

1. Install dependencies:
   - `npm install`
2. Copy env file:
   - copy `.env.example` to `.env`
3. Run migration:
   - `npm run migrate:init`
4. Run latest migration files as needed:
   - `npm run migrate -- 002_user_problem_progress.sql`
5. Seed admin user:
   - `npm run seed:admin`
6. Start backend:
   - `npm run dev`

## Default Admin Account

You can create an admin account from `.env` values using:

1. `npm run seed:admin`

Default example values:

1. Email: `admin@dsamaster.local`
2. Password: `Admin12345`
