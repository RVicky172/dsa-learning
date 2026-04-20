# DSA Master

DSA Master is a full-stack learning platform for Data Structures and Algorithms.

It includes:
- an interactive frontend for theory, visualizers, and problem practice
- a backend API for auth, admin content management, progress, subscriptions, and payments
- planning and architecture documentation in the docs folder
- Graphify artifacts for codebase knowledge graph analysis

## Project Overview

### Frontend
- Stack: React 19, TypeScript, Vite, Framer Motion, Recharts
- Path: src
- Purpose: learner-facing UI, dashboards, visualizers, topic and problem flows

### Backend
- Stack: Node.js, TypeScript, Express, PostgreSQL, Zod
- Path: backend/src
- Purpose: auth, RBAC, admin CRUD, progress persistence, entitlement checks, payment webhook flows

### Planning Docs
- Path: docs
- Purpose: implementation roadmap, execution checklist, sprint board, architecture and ERD references

## Quick Start

### Prerequisites
- Node.js 18+
- npm
- Docker Desktop (recommended for local PostgreSQL)

### 1) Frontend Setup
```bash
npm install
npm run dev
```

Frontend default URL:
- http://localhost:5173

### 2) Backend Setup
```bash
cd backend
npm install
docker compose up -d
npm run migrate:init
npm run seed:admin
npm run dev
```

Backend defaults are documented in:
- backend/DATABASE_SETUP.md
- backend/README.md

## Core Scripts

From repository root:
- npm run dev
- npm run build
- npm run lint
- npm run preview
- npm run graphify:update

From backend:
- npm run dev
- npm run build
- npm run typecheck
- npm run migrate:init
- npm run migrate -- 002_user_problem_progress.sql
- npm run seed:admin

## Graphify Workflow

This repository tracks a graphify-out knowledge graph for architecture exploration.

Recommended update command:
```bash
npm run graphify:update
```

What it does:
1. Runs graphify incremental update on the repo.
2. Runs scripts/graphify_fix_sources.py to normalize source_file metadata in graph outputs.

Why the extra fix step exists:
- Graphify can emit extraction warnings for some semantic document nodes that are missing source_file.
- The post-step normalizes graphify-out/.graphify_extract.json and graphify-out/graph.json so downstream artifacts are consistent.

Main graph outputs:
- graphify-out/GRAPH_REPORT.md
- graphify-out/graph.json
- graphify-out/graph.html

## Repository Structure

```text
dsa-learning/
├── backend/                 # Express API, DB migrations, seeds
├── docs/                    # Planning and architecture docs
├── graphify-out/            # Knowledge graph outputs
├── src/                     # Frontend app
├── scripts/                 # Repository utility scripts
├── package.json             # Frontend/root scripts
└── README.md
```

## Additional Documentation

- docs/README.md
- backend/README.md
- backend/DATABASE_SETUP.md
- CLAUDE.md

## Contributing

1. Create a branch.
2. Make changes with focused commits.
3. Run lint/build checks.
4. Open a pull request with a clear summary.

