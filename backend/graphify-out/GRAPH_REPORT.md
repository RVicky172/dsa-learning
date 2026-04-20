# Graph Report - .  (2026-04-20)

## Corpus Check
- 21 files · ~7,182 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 48 nodes · 51 edges · 10 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
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

## God Nodes (most connected - your core abstractions)
1. `processQueue()` - 5 edges
2. `executeInDocker()` - 4 edges
3. `ensureAdminRole()` - 2 edges
4. `run()` - 2 edges
5. `hasPremiumAccess()` - 2 edges
6. `mapProblemListItem()` - 2 edges
7. `mapProblemDetail()` - 2 edges
8. `recomputeUserTopicProgress()` - 2 edges
9. `getLanguageRuntime()` - 2 edges
10. `buildDockerArgs()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Community 0"
Cohesion: 0.27
Nodes (9): buildDockerArgs(), enqueueExecution(), executeInDocker(), getLanguageRuntime(), persistQueuedExecution(), processQueue(), updateExecutionFailure(), updateExecutionResult() (+1 more)

### Community 1 - "Community 1"
Cohesion: 0.18
Nodes (0): 

### Community 2 - "Community 2"
Cohesion: 0.29
Nodes (4): hasPremiumAccess(), mapProblemDetail(), mapProblemListItem(), recomputeUserTopicProgress()

### Community 3 - "Community 3"
Cohesion: 0.5
Nodes (0): 

### Community 4 - "Community 4"
Cohesion: 0.67
Nodes (0): 

### Community 5 - "Community 5"
Cohesion: 1.0
Nodes (2): ensureAdminRole(), run()

### Community 6 - "Community 6"
Cohesion: 1.0
Nodes (0): 

### Community 7 - "Community 7"
Cohesion: 1.0
Nodes (0): 

### Community 8 - "Community 8"
Cohesion: 1.0
Nodes (0): 

### Community 9 - "Community 9"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **Thin community `Community 6`** (2 nodes): `authenticate()`, `authenticate.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 7`** (2 nodes): `optionalAuthenticate()`, `optionalAuthenticate.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 8`** (2 nodes): `requireAdmin()`, `requireAdmin.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (1 nodes): `express.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Not enough signal to generate questions. This usually means the corpus has no AMBIGUOUS edges, no bridge nodes, no INFERRED relationships, and all communities are tightly cohesive. Add more files or run with --mode deep to extract richer edges._