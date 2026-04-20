# Queue

This folder contains the execution queue worker used by the `/execution` routes.

Current behavior:

1. `enqueueExecution` persists a `code_executions` row in `queued` state.
2. Worker processes jobs serially (in-process queue) and marks row as `running`.
3. Job is executed in Docker with `--network none`, memory cap, and timeout.
4. Worker persists final status and outputs (`stdout`, `stderr`, `runtime_ms`).
