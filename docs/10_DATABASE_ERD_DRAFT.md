# Database ERD Draft

## Status Note (Updated: 2026-04-20)

- Current implementation includes `user_problem_progress` and migration `002_user_problem_progress.sql` for per-problem completion state.
- Subscription and payments entities are now used by checkout + webhook sync paths.
- Final mandatory last task before release signoff: run the premium entitlement regression audit across free-vs-premium problem cards/details, API enforcement, and upgrade CTA paths.

## Scope

This draft schema covers authentication, role management, topic/problem content, attempts/results, subscriptions, payments, and code execution tracking.

## ERD (Mermaid)

```mermaid
erDiagram
    USERS ||--o{ USER_ROLES : has
    ROLES ||--o{ USER_ROLES : maps
    USERS ||--o{ USER_PROGRESS : tracks
    TOPICS ||--o{ USER_PROGRESS : summarizes

    TOPICS ||--o{ PROBLEMS : contains
    PROBLEMS ||--o{ PROBLEM_EXAMPLES : has
    PROBLEMS ||--o{ PROBLEM_HINTS : has
    PROBLEMS ||--o{ PROBLEM_SOLUTIONS : has

    USERS ||--o{ PROBLEM_ATTEMPTS : submits
    PROBLEMS ||--o{ PROBLEM_ATTEMPTS : receives

    USERS ||--o{ CODE_EXECUTIONS : runs
    PROBLEMS ||--o{ CODE_EXECUTIONS : optional_context

    USERS ||--o{ SUBSCRIPTIONS : owns
    SUBSCRIPTIONS ||--o{ PAYMENTS : records

    USERS ||--o{ ADMIN_AUDIT_LOGS : performs

    USERS {
      uuid id PK
      string email UK
      string password_hash
      string display_name
      string status
      datetime created_at
      datetime updated_at
    }

    ROLES {
      int id PK
      string name UK
      datetime created_at
    }

    USER_ROLES {
      uuid user_id FK
      int role_id FK
      datetime assigned_at
    }

    TOPICS {
      uuid id PK
      string slug UK
      string title
      text description
      int order_index
      boolean is_published
      datetime created_at
      datetime updated_at
    }

    PROBLEMS {
      uuid id PK
      uuid topic_id FK
      string slug UK
      string title
      string difficulty
      boolean is_premium
      text statement
      text constraints
      uuid created_by FK
      datetime created_at
      datetime updated_at
    }

    PROBLEM_EXAMPLES {
      uuid id PK
      uuid problem_id FK
      text input_text
      text output_text
      text explanation
      int sort_order
    }

    PROBLEM_HINTS {
      uuid id PK
      uuid problem_id FK
      text hint_text
      int sort_order
    }

    PROBLEM_SOLUTIONS {
      uuid id PK
      uuid problem_id FK
      string language
      text approach
      text code
      string time_complexity
      string space_complexity
      boolean is_optimal
      datetime created_at
    }

    PROBLEM_ATTEMPTS {
      uuid id PK
      uuid user_id FK
      uuid problem_id FK
      string language
      text submitted_code
      string status
      int runtime_ms
      int memory_kb
      datetime submitted_at
    }

    USER_PROGRESS {
      uuid id PK
      uuid user_id FK
      uuid topic_id FK
      int attempted_count
      int solved_count
      float mastery_score
      datetime updated_at
    }

    CODE_EXECUTIONS {
      uuid id PK
      uuid user_id FK
      uuid problem_id FK
      string language
      text source_code
      text stdin
      text stdout
      text stderr
      string status
      int runtime_ms
      int memory_kb
      datetime created_at
    }

    SUBSCRIPTIONS {
      uuid id PK
      uuid user_id FK
      string provider
      string plan_id
      string status
      datetime current_period_start
      datetime current_period_end
      boolean cancel_at_period_end
      datetime created_at
      datetime updated_at
    }

    PAYMENTS {
      uuid id PK
      uuid subscription_id FK
      string provider_payment_id UK
      int amount_minor
      string currency
      string status
      datetime paid_at
      datetime created_at
    }

    ADMIN_AUDIT_LOGS {
      uuid id PK
      uuid user_id FK
      string action
      string entity_type
      uuid entity_id
      json metadata
      datetime created_at
    }
```

## Indexing Recommendations

1. `users(email)` unique index.
2. `topics(slug)` and `problems(slug)` unique index.
3. `problems(topic_id, difficulty, is_premium)` composite index.
4. `problem_attempts(user_id, submitted_at desc)` index.
5. `user_progress(user_id, topic_id)` unique composite index.
6. `subscriptions(user_id, status)` index.
7. `code_executions(user_id, created_at desc)` index.

## Migration Order

1. Core identity tables: users, roles, user_roles.
2. Content tables: topics, problems, examples, hints, solutions.
3. Learning data tables: attempts, progress, executions.
4. Commerce tables: subscriptions, payments.
5. Audit tables and operational indexes.

## Notes

1. Keep `problem_attempts.submitted_code` retention policy configurable.
2. Encrypt sensitive fields at rest where required.
3. Add row-level access checks in APIs (user can access only own progress/attempts unless admin).
