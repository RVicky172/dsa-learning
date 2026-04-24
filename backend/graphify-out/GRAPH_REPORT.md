# Graph Report - .  (2026-04-24)

## Corpus Check
- 85 files · ~0 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 82 nodes · 112 edges · 16 communities detected
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 10 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]

## God Nodes (most connected - your core abstractions)
1. `executeInDocker()` - 6 edges
2. `processQueue()` - 5 edges
3. `hasPremiumAccess()` - 3 edges
4. `ensureAdminRole()` - 2 edges
5. `run()` - 2 edges
6. `loadProblemsFromFile()` - 2 edges
7. `seedAllProblems()` - 2 edges
8. `mapProblemListItem()` - 2 edges
9. `mapProblemDetail()` - 2 edges
10. `recomputeUserTopicProgress()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Topics Routes (/topics)` --queries_topics_via_pool--> `PostgreSQL Pool Client (client.ts)`  [INFERRED]
   →   _Bridges community 3 → community 6_
- `Progress Routes (/progress)` --reads_writes_progress_via_pool--> `PostgreSQL Pool Client (client.ts)`  [INFERRED]
   →   _Bridges community 3 → community 4_
- `Subscriptions Routes (/subscriptions)` --reads_writes_subscriptions_via_pool--> `PostgreSQL Pool Client (client.ts)`  [INFERRED]
   →   _Bridges community 3 → community 7_
- `Express App Entry (main.ts)` --registers_pino_http_logger--> `Pino Logger (logger.ts)`  [EXTRACTED]
   →   _Bridges community 7 → community 5_
- `Express App Entry (main.ts)` --mounts_route_at /users--> `Users Routes (/users)`  [EXTRACTED]
   →   _Bridges community 7 → community 4_

## Hyperedges (group relationships)
- **** —  [INFERRED]
- **** —  [INFERRED]
- **** —  [INFERRED]

## Communities

### Community 0 - "Community 0"
Cohesion: 0.0
Nodes (0): 

### Community 1 - "Community 1"
Cohesion: 0.0
Nodes (11): buildDockerArgs(), enqueueExecution(), executeInDocker(), getLanguageRuntime(), looksLikeTypeScript(), persistQueuedExecution(), processQueue(), transpileTypeScriptToNodeJs() (+3 more)

### Community 2 - "Community 2"
Cohesion: 0.0
Nodes (4): hasPremiumAccess(), mapProblemDetail(), mapProblemListItem(), recomputeUserTopicProgress()

### Community 3 - "Community 3"
Cohesion: 0.0
Nodes (8): Env Config / Zod Schema (env.ts), PostgreSQL Pool Client (client.ts), Migration CLI Runner (runMigration.ts), Payments Routes (/payments), Seed Admin User (seedAdmin.ts), Seed All Problems (seedAllProblems.ts), Seed Sample Topics & Problems (seedTopicsAndProblems.ts), Seeds README

### Community 4 - "Community 4"
Cohesion: 0.0
Nodes (5): Admin Routes (/admin), Auth Middleware (authenticate.ts), Progress Routes (/progress), Admin Guard Middleware (requireAdmin.ts), Users Routes (/users)

### Community 5 - "Community 5"
Cohesion: 0.0
Nodes (4): Execution Routes (/execution), Execution Worker / Docker Queue (executionWorker.ts), Pino Logger (logger.ts), Execution Queue README

### Community 6 - "Community 6"
Cohesion: 0.0
Nodes (4): Express Request Augmentation (express.d.ts), Optional Auth Middleware (optionalAuthenticate.ts), Problems Routes (/problems), Topics Routes (/topics)

### Community 7 - "Community 7"
Cohesion: 0.0
Nodes (4): Auth Routes (/auth), Health Routes (/health), Express App Entry (main.ts), Subscriptions Routes (/subscriptions)

### Community 8 - "Community 8"
Cohesion: 0.0
Nodes (0): 

### Community 9 - "Community 9"
Cohesion: 0.0
Nodes (2): ensureAdminRole(), run()

### Community 10 - "Community 10"
Cohesion: 0.0
Nodes (2): loadProblemsFromFile(), seedAllProblems()

### Community 11 - "Community 11"
Cohesion: 0.0
Nodes (0): 

### Community 12 - "Community 12"
Cohesion: 0.0
Nodes (0): 

### Community 13 - "Community 13"
Cohesion: 0.0
Nodes (0): 

### Community 14 - "Community 14"
Cohesion: 0.0
Nodes (0): 

### Community 15 - "Community 15"
Cohesion: 0.0
Nodes (0): 

## Knowledge Gaps
- **Thin community `Community 11`** (2 nodes): `authenticate()`, `authenticate.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (2 nodes): `optionalAuthenticate()`, `optionalAuthenticate.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (2 nodes): `requireAdmin()`, `requireAdmin.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (2 nodes): `seedTopicsAndProblems()`, `seedTopicsAndProblems.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 15`** (1 nodes): `express.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.