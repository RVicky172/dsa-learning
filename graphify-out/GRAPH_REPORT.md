# Graph Report - .  (2026-04-24)

## Corpus Check
- 302 files · ~0 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 178 nodes · 114 edges · 80 communities detected
- Extraction: 92% EXTRACTED · 7% INFERRED · 1% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.69)
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
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]

## God Nodes (most connected - your core abstractions)
1. `DataStructureVisualizer()` - 3 edges
2. `TopicCard()` - 3 edges
3. `useAuth()` - 3 edges
4. `useProgress()` - 3 edges
5. `getExampleData()` - 2 edges
6. `getDifficultyFromComplexity()` - 2 edges
7. `getDifficultyColor()` - 2 edges
8. `difficultyBadgeStyle()` - 2 edges
9. `useCodeExecution()` - 2 edges
10. `useVisualizerControls()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `DataStructureVisualizer()` --calls--> `getExampleData()`  [INFERRED]
  src\components\DataStructureVisualizer\DataStructureVisualizer.tsx → src\components\DataStructureVisualizer\utils\visualizationData.ts
- `DataStructureVisualizer()` --calls--> `useVisualizerControls()`  [INFERRED]
  src\components\DataStructureVisualizer\DataStructureVisualizer.tsx → src\hooks\useVisualizerControls.ts
- `TopicCard()` --calls--> `useProgress()`  [INFERRED]
  src\components\TopicCard\TopicCard.tsx → src\hooks\useProgress.ts
- `useCodeExecution()` --calls--> `useAuth()`  [INFERRED]
  src\hooks\useCodeExecution.ts → src\hooks\useAuth.ts
- `useProgress()` --calls--> `useAuth()`  [INFERRED]
  src\hooks\useProgress.ts → src\hooks\useAuth.ts

## Hyperedges (group relationships)
- **** —  [EXTRACTED]
- **** —  [EXTRACTED]

## Communities

### Community 0 - "Community 0"
Cohesion: 0.0
Nodes (21): apiClient, API Types (api.ts), CodeExecutionPanel, CTASection, FeaturesSection, Home, ProblemCard, ProblemsFilters (+13 more)

### Community 1 - "Community 1"
Cohesion: 0.0
Nodes (0): 

### Community 2 - "Community 2"
Cohesion: 0.0
Nodes (5): getDifficultyFromComplexity(), TopicCard(), useAuth(), useCodeExecution(), useProgress()

### Community 3 - "Community 3"
Cohesion: 0.0
Nodes (9): ExamplesTab, PatternsTab, ProblemsTab, TheoryTab, TopicCard, TopicDetail, Topic Types (topic.ts), useProgress (+1 more)

### Community 4 - "Community 4"
Cohesion: 0.0
Nodes (0): 

### Community 5 - "Community 5"
Cohesion: 0.0
Nodes (4): getDifficultyBgColor(), getDifficultyColor(), hexToRgb(), hexToRgbString()

### Community 6 - "Community 6"
Cohesion: 0.0
Nodes (3): DataStructureVisualizer(), useVisualizerControls(), getExampleData()

### Community 7 - "Community 7"
Cohesion: 0.0
Nodes (0): 

### Community 8 - "Community 8"
Cohesion: 0.0
Nodes (2): difficultyBadgeStyle(), getDifficultyColor()

### Community 9 - "Community 9"
Cohesion: 0.0
Nodes (0): 

### Community 10 - "Community 10"
Cohesion: 0.0
Nodes (2): buildHeaders(), request()

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

### Community 16 - "Community 16"
Cohesion: 0.0
Nodes (0): 

### Community 17 - "Community 17"
Cohesion: 0.0
Nodes (0): 

### Community 18 - "Community 18"
Cohesion: 0.0
Nodes (0): 

### Community 19 - "Community 19"
Cohesion: 0.0
Nodes (0): 

### Community 20 - "Community 20"
Cohesion: 0.0
Nodes (0): 

### Community 21 - "Community 21"
Cohesion: 0.0
Nodes (0): 

### Community 22 - "Community 22"
Cohesion: 0.0
Nodes (0): 

### Community 23 - "Community 23"
Cohesion: 0.0
Nodes (0): 

### Community 24 - "Community 24"
Cohesion: 0.0
Nodes (0): 

### Community 25 - "Community 25"
Cohesion: 0.0
Nodes (0): 

### Community 26 - "Community 26"
Cohesion: 0.0
Nodes (0): 

### Community 27 - "Community 27"
Cohesion: 0.0
Nodes (0): 

### Community 28 - "Community 28"
Cohesion: 0.0
Nodes (0): 

### Community 29 - "Community 29"
Cohesion: 0.0
Nodes (0): 

### Community 30 - "Community 30"
Cohesion: 0.0
Nodes (0): 

### Community 31 - "Community 31"
Cohesion: 0.0
Nodes (0): 

### Community 32 - "Community 32"
Cohesion: 0.0
Nodes (0): 

### Community 33 - "Community 33"
Cohesion: 0.0
Nodes (0): 

### Community 34 - "Community 34"
Cohesion: 0.0
Nodes (0): 

### Community 35 - "Community 35"
Cohesion: 0.0
Nodes (0): 

### Community 36 - "Community 36"
Cohesion: 0.0
Nodes (0): 

### Community 37 - "Community 37"
Cohesion: 0.0
Nodes (0): 

### Community 38 - "Community 38"
Cohesion: 0.0
Nodes (0): 

### Community 39 - "Community 39"
Cohesion: 0.0
Nodes (0): 

### Community 40 - "Community 40"
Cohesion: 0.0
Nodes (0): 

### Community 41 - "Community 41"
Cohesion: 0.0
Nodes (0): 

### Community 42 - "Community 42"
Cohesion: 0.0
Nodes (0): 

### Community 43 - "Community 43"
Cohesion: 0.0
Nodes (0): 

### Community 44 - "Community 44"
Cohesion: 0.0
Nodes (0): 

### Community 45 - "Community 45"
Cohesion: 0.0
Nodes (0): 

### Community 46 - "Community 46"
Cohesion: 0.0
Nodes (0): 

### Community 47 - "Community 47"
Cohesion: 0.0
Nodes (0): 

### Community 48 - "Community 48"
Cohesion: 0.0
Nodes (0): 

### Community 49 - "Community 49"
Cohesion: 0.0
Nodes (0): 

### Community 50 - "Community 50"
Cohesion: 0.0
Nodes (0): 

### Community 51 - "Community 51"
Cohesion: 0.0
Nodes (0): 

### Community 52 - "Community 52"
Cohesion: 0.0
Nodes (0): 

### Community 53 - "Community 53"
Cohesion: 0.0
Nodes (0): 

### Community 54 - "Community 54"
Cohesion: 0.0
Nodes (0): 

### Community 55 - "Community 55"
Cohesion: 0.0
Nodes (0): 

### Community 56 - "Community 56"
Cohesion: 0.0
Nodes (0): 

### Community 57 - "Community 57"
Cohesion: 0.0
Nodes (0): 

### Community 58 - "Community 58"
Cohesion: 0.0
Nodes (0): 

### Community 59 - "Community 59"
Cohesion: 0.0
Nodes (0): 

### Community 60 - "Community 60"
Cohesion: 0.0
Nodes (0): 

### Community 61 - "Community 61"
Cohesion: 0.0
Nodes (0): 

### Community 62 - "Community 62"
Cohesion: 0.0
Nodes (0): 

### Community 63 - "Community 63"
Cohesion: 0.0
Nodes (0): 

### Community 64 - "Community 64"
Cohesion: 0.0
Nodes (0): 

### Community 65 - "Community 65"
Cohesion: 0.0
Nodes (0): 

### Community 66 - "Community 66"
Cohesion: 0.0
Nodes (0): 

### Community 67 - "Community 67"
Cohesion: 0.0
Nodes (0): 

### Community 68 - "Community 68"
Cohesion: 0.0
Nodes (0): 

### Community 69 - "Community 69"
Cohesion: 0.0
Nodes (0): 

### Community 70 - "Community 70"
Cohesion: 0.0
Nodes (0): 

### Community 71 - "Community 71"
Cohesion: 0.0
Nodes (0): 

### Community 72 - "Community 72"
Cohesion: 0.0
Nodes (0): 

### Community 73 - "Community 73"
Cohesion: 0.0
Nodes (0): 

### Community 74 - "Community 74"
Cohesion: 0.0
Nodes (0): 

### Community 75 - "Community 75"
Cohesion: 0.0
Nodes (0): 

### Community 76 - "Community 76"
Cohesion: 0.0
Nodes (0): 

### Community 77 - "Community 77"
Cohesion: 0.0
Nodes (0): 

### Community 78 - "Community 78"
Cohesion: 0.0
Nodes (1): ThemeContext

### Community 79 - "Community 79"
Cohesion: 0.0
Nodes (1): Data Folder README

## Ambiguous Edges - Review These
- `ProblemCard` → `problemsService`  [AMBIGUOUS]
   · relation: uses

## Knowledge Gaps
- **Thin community `Community 11`** (2 nodes): `getStatusColor()`, `CodeExecutionPanel.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (2 nodes): `ArrayVisualization()`, `ArrayVisualization.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (2 nodes): `HashTableVisualization()`, `HashTableVisualization.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (2 nodes): `QueueVisualization()`, `QueueVisualization.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 15`** (2 nodes): `StackVisualization.tsx`, `StackVisualization()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 16`** (2 nodes): `scrollToSection()`, `Hero.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 17`** (2 nodes): `SearchBar()`, `SearchBar.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (2 nodes): `ProblemsHeader()`, `ProblemsHeader.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (2 nodes): `RoadmapCard()`, `RoadmapCard.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (2 nodes): `TheoryTab.tsx`, `buildFallbackLearningOutcomes()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (2 nodes): `VisualizationsTab.tsx`, `getVisualizationType()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (2 nodes): `useProblem.ts`, `useProblem()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (2 nodes): `useTheme.ts`, `useTheme()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (2 nodes): `useTopicBySlug.ts`, `useTopicBySlug()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (2 nodes): `loadRecommendations()`, `Home.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (2 nodes): `handleSubmit()`, `Login.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (2 nodes): `handleSubmit()`, `Register.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (2 nodes): `Subscription.tsx`, `handleUpgrade()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (2 nodes): `buildExecutionListPath()`, `executionService.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (2 nodes): `buildProblemListPath()`, `problemService.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (2 nodes): `topicIcons.tsx`, `getTopicIcon()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (1 nodes): `AdminProblemsManager.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (1 nodes): `AdminTopicsManager.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (1 nodes): `AppFooter.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (1 nodes): `LoadingSpinner.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 38`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 39`** (1 nodes): `BinaryTreeVisualization.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 40`** (1 nodes): `GraphVisualization.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (1 nodes): `HeapVisualization.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (1 nodes): `LinkedListVisualization.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 43`** (1 nodes): `AnimatedBackground.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 45`** (1 nodes): `CTASection.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 46`** (1 nodes): `FeaturesSection.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 47`** (1 nodes): `RecommendationsSection.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 48`** (1 nodes): `StatsSection.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 49`** (1 nodes): `TopicsPreviewSection.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 50`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 51`** (1 nodes): `Navbar.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 52`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 53`** (1 nodes): `ProblemCard.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 54`** (1 nodes): `ProblemsFilters.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 55`** (1 nodes): `ProblemsPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 56`** (1 nodes): `ProblemsStats.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 57`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 58`** (1 nodes): `Roadmap.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 59`** (1 nodes): `RoadmapBackground.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 60`** (1 nodes): `types.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 61`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 62`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 63`** (1 nodes): `TopicDetail.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 64`** (1 nodes): `ExamplesTab.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 65`** (1 nodes): `PatternsTab.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 66`** (1 nodes): `AuthContextDefinition.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 67`** (1 nodes): `AdminDashboard.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 68`** (1 nodes): `Profile.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 69`** (1 nodes): `authService.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 70`** (1 nodes): `problemsService.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 71`** (1 nodes): `progressService.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 72`** (1 nodes): `subscriptionService.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 73`** (1 nodes): `topicsService.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 74`** (1 nodes): `api.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 75`** (1 nodes): `topic.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 76`** (1 nodes): `animations.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 77`** (1 nodes): `constants.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 78`** (1 nodes): `ThemeContext`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 79`** (1 nodes): `Data Folder README`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.