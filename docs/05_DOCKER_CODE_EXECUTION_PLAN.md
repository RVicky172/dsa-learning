# Docker-Based Code Execution Plan

## Goal

Allow users to execute code securely from the platform and receive output, errors, and basic performance metrics.

## High-Level Architecture

1. API service receives execution request.
2. Request is validated and queued.
3. Worker picks job and starts isolated Docker container.
4. Code runs with strict limits.
5. Output and metadata returned and stored.

## Supported Languages (MVP)

1. Python
2. JavaScript (Node.js)
3. Java
4. C++

## Security Controls (Mandatory)

1. Disable container network access.
2. CPU and memory limits per container.
3. Strict timeout (for example 2-5 seconds for normal runs).
4. Read-only base filesystem with temporary writable workspace.
5. Non-root user inside container.
6. Process count limits to prevent fork abuse.
7. Request-level rate limiting per user.

## Execution Pipeline

1. Validate language and payload size.
2. Save request as `queued`.
3. Worker prepares language image and mounts temp files.
4. Compile if required (for Java/C++).
5. Execute tests or stdin input.
6. Capture stdout, stderr, exit code, runtime, memory.
7. Save result and return response.

## Data to Store per Execution

1. Execution ID, user ID, optional problem ID.
2. Language and source hash.
3. Input payload (bounded/truncated as needed).
4. Status (`queued`, `running`, `success`, `error`, `timeout`).
5. stdout, stderr, exit code.
6. Runtime and memory usage.
7. Created/completed timestamps.


## Status Note (Updated: 2026-04-20)

- Auth, progress, subscription, and premium entitlement layers are implemented and ready for execution integration.
- Execution work should preserve existing entitlement checks when code-run is tied to premium problems.
- Final mandatory last task before release signoff: run the premium entitlement regression audit across free-vs-premium problem cards/details, API enforcement, and upgrade CTA paths.

## Implementation Plan by Week

## Week 1

- Finalize architecture and threat model.
- Build container image templates per language.

## Week 2

- Implement queue + worker service.
- Implement execution API and status tracking.

## Week 3

- Integrate frontend run-code UI and result rendering.
- Add guardrails (timeouts, limits, payload constraints).

## Week 4

- Load test and abuse test.
- Add observability and incident response playbook.

## Risk Controls and Monitoring

1. Alert on spike in failed/timeout executions.
2. Alert on queue latency above threshold.
3. Log high-risk payload patterns for review.
4. Keep image versions pinned and regularly patched.

## Acceptance Criteria

1. Users can run code and receive deterministic response payload.
2. Execution is isolated with no outbound network.
3. Timeouts and memory limits are enforced.
4. Results are persisted and visible in user attempt history.
5. Final mandatory last task before release signoff: run the premium entitlement regression audit across free-vs-premium problem cards/details, API enforcement, and upgrade CTA paths.
