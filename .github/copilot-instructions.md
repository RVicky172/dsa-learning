# Copilot Instructions for DSA Learning App

## Project Overview
A React + TypeScript + Vite educational web application teaching Data Structures & Algorithms (DSA). The app provides comprehensive guides on DSA topics with theory, code examples, patterns, and interactive problem solving.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React icons

## Architecture & Data Flow

### Component Hierarchy
- **App.tsx** - Main state container managing navigation and topic selection
  - Uses `selectedTopicId` and `activeSection` state to control displayed content
  - Delegates rendering to specialized view components (Hero, TopicDetail, ProblemsPage, etc.)
- **TopicDetail.tsx** - Full-screen topic view with multi-tab interface
  - Manages tabs: `theory | examples | patterns | problems`
  - Handles show/hide solution state per problem with `showSolution` record
  - Expandable sections (concepts, applications) with `expandedSection` state
- **TopicCard.tsx** - Reusable card component using Framer Motion
  - Animated on scroll (whileInView) with staggered delay prop
  - Hovers trigger elevation effect (`y: -5`) and color change

### Data Architecture
- **[src/types/topic.ts](src/types/topic.ts)** - Central type definitions
  - `Topic` interface: id, title, description, icon, delay, and nested arrays of concepts/codeExamples/patterns/problems
  - `CodeExample`: code with language, time/space complexity, and explanation
  - `Problem`: full structure with solution, hints, and examples
- **[src/data/topicsData.ts](src/data/topicsData.ts)** - Static data (~1689 lines)
  - Large array of Topic objects (Arrays, Trees, Stacks, etc.)
  - Topics nested with rich content: `introduction`, `whyImportant`, `concepts`, `applications`, `codeExamples`, `patterns`, `problems`
  - Real-time complexity explanations and multi-language code examples

### State Management Pattern
- Single source of truth in App.tsx (no Redux/Context needed for current scope)
- State lifted from components → passed as props with callbacks
- Navigation handler example: `onNavigate(section: string)` callback from Navbar/Hero to App

## Styling Conventions

### CSS Variable System
- **Colors:** Primary (`#6366f1`), Secondary (`#06b6d4`), with hover/glow variants
- **Surfaces:** Background, surface, and hover states with glassmorphism effect
- **Typography:** Outfit (headings), Inter (body) imported from Google Fonts
- **Animations:** `--transition-smooth` (0.4s cubic-bezier) as standard easing

### Tailwind + Inline Styles Hybrid
- Tailwind classes for layout and utility
- Inline styles for dynamic values (colors, spacing via variables)
- Glass effect class: `.glass` in CSS with backdrop blur and border

### Layout Pattern
- Container-based layout with padding
- Responsive with `clamp()` for font sizes (e.g., `clamp(3rem, 8vw, 4.5rem)`)
- Framer Motion animations: `initial`, `whileInView`, `whileHover`, `transition` props

## Development Workflows

### Build & Run
```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # TypeScript check (`tsc -b`) then vite build
npm run lint     # ESLint across all files
npm run preview  # Preview production build locally
```

### Code Quality
- **ESLint:** Flat config in [eslint.config.js](eslint.config.js) with React Hooks + Refresh plugins
- **TypeScript:** Strict mode, split configs for app (tsconfig.app.json) and tools (tsconfig.node.json)
- **Type Safety:** All components fully typed; no implicit `any`

## Project-Specific Patterns

### Component Creation
1. Define interface for props (exported)
2. Use functional components with hooks (useState for local UI state)
3. Inline styles for reactive/variable values, Tailwind for structure
4. Export default at end of file

Example from [TopicCard.tsx](src/components/TopicCard.tsx):
```tsx
interface TopicCardProps {
  title: string;
  icon: React.ReactNode;
  delay?: number;
}
const TopicCard = ({ title, icon, delay = 0 }: TopicCardProps) => {
  return <motion.div initial={{...}} whileHover={{...}} />
}
export default TopicCard
```

### Animation Pattern (Framer Motion)
- Scroll-triggered: `whileInView` with `viewport={{ once: true }}`
- Stagger via `delay` prop (passed from data: `delay: 0.1`)
- Hover effects for interactivity: `whileHover` transforms
- Common pattern: fade + slide on view

### Content Structure in topicsData
Each Topic must include:
- **id, title, description, icon, complexity, delay** (metadata)
- **introduction, whyImportant, whenToUse, advantages, disadvantages** (theory)
- **concepts[]** with name, description, examples (fundamental ideas)
- **codeExamples[]** (CodeExample interface: language, code, complexity)
- **patterns[]** (Pattern interface: name, description, technique, whenToUse)
- **problems[]** (Problem interface: with solution object containing stepByStep[])

### Icon Usage
- Lucide React icons created with `React.createElement(IconName, { size: 24 })`
- Store icon as `React.ReactNode` in data, render in component
- Example: `React.createElement(Hash, { size: 24 })` for Arrays topic

### State Naming Conventions
- Boolean states: `show{Feature}`, `is{State}`, `expanded{Section}`
- Active/current states: `active{Category}`, `selected{Entity}`
- Toggle functions: `toggle{Feature}` for boolean flip

## Integration Points

### External Dependencies
- **Framer Motion:** For scroll animations and hover effects on cards
- **Lucide React:** Icon library (not material icons)
- **Tailwind CSS + tailwind-merge:** Utility classes + dynamic class merging

### No Custom Hooks/Utils Currently
- [src/hooks](src/hooks) and [src/utils](src/utils) directories exist but empty
- Future optimization point for shared stateful logic or helpers

### Navigation Flow
- Navbar/Hero component calls `onNavigate(sectionId: string)` → updates activeSection
- TopicCard click → calls parent handler → sets selectedTopicId
- Back button in TopicDetail → clears selectedTopicId → returns to grid
- Smooth scroll via `scrollIntoView({ behavior: 'smooth' })`

## Key Files & Their Purposes

| File | Purpose | Key Exports |
|------|---------|-------------|
| [App.tsx](src/App.tsx) | Main app orchestration, state container | App component |
| [TopicDetail.tsx](src/components/TopicDetail.tsx) | Full topic view with tabs and solutions | TopicDetail component |
| [TopicCard.tsx](src/components/TopicCard.tsx) | Reusable topic card with animations | TopicCard component |
| [types/topic.ts](src/types/topic.ts) | Type definitions for all domain entities | Topic, Problem, CodeExample, Pattern |
| [data/topicsData.ts](src/data/topicsData.ts) | All DSA content (arrays, trees, graphs, etc.) | topicsData array |
| [index.css](src/index.css) | Design tokens and layout utilities | CSS variables, `.glass`, `.gradient-text` |

## Common Tasks & Patterns

### Adding a New Topic
1. Create Topic object in [topicsData.ts](src/data/topicsData.ts) with all required fields
2. Add Lucide icon: `React.createElement(IconName, { size: 24 })`
3. Fill concepts, codeExamples, patterns, problems arrays
4. Component automatically renders via App.tsx logic

### Modifying Topic Content
- Direct edit in [topicsData.ts](src/data/topicsData.ts)
- No need to regenerate types (types follow data shape)
- Incremental changes safe; app hot-reloads (Vite HMR)

### Styling New Components
- Reference [index.css](src/index.css) CSS variables for colors and spacing
- Inline styles for computed/reactive values: `style={{ color: 'var(--primary-color)' }}`
- Framer Motion props for animations: `initial`, `whileInView`, `transition`

### Debugging State Flow
- Props passed down in App.tsx: `selectedTopicId`, `activeSection`
- Callbacks passed up: `onNavigate`, `onTopicSelect`, `onBack`
- Check React DevTools for prop drilling path if component doesn't update

## graphify

Before answering architecture or codebase questions, read `graphify-out/GRAPH_REPORT.md` if it exists.
If `graphify-out/wiki/index.md` exists, navigate it for deep questions.
Type `/graphify` in Copilot Chat to build or update the knowledge graph.
