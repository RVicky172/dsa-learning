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

## Common Pitfalls & Anti-Patterns

### What to Avoid
| Issue | Problem | Solution |
|-------|---------|----------|
| Hardcoded colors in components | Breaks theming consistency | Use CSS variables: `var(--primary-color)` |
| Direct state mutations | Causes re-render bugs | Always use setState or spread syntax |
| Missing TypeScript types | Causes prop drilling issues | Define proper interfaces, use `React.ReactNode` for elements |
| Large topicsData single file | File becomes unmaintainable | Consider splitting by category if > 2500 lines |
| Inline icon creation in JSX | Re-creates icons on every render | Create icons in data layer, pass as `React.ReactNode` |
| Inconsistent prop naming | Confuses developers and readability | Follow: `show{X}`, `is{Y}`, `on{Event}` consistently |
| Animation without viewport check | Triggers on scroll throughout page | Always pair with `viewport={{ once: true }}` for performance |
| Missing error boundaries | Silent failures in UI | Add error boundaries for major sections |

### Performance Pitfalls
- **Prop drilling too many levels:** Extract context or lift state closer to child
- **Animations on every render:** Use `viewport={{ once: true }}` to trigger only once
- **Large component trees without React.memo:** Profile with React DevTools Profiler before optimizing
- **Unused dependencies:** Run `npm run lint` and check ESLint output regularly

## Testing Strategy

### Current State
- No test suite currently configured; ready for expansion
- ESLint catches code quality issues; use before commits

### Future Testing Approach
1. **Unit Tests:** Jest + React Testing Library for components
   - Test component rendering, state changes, callbacks
   - Place tests adjacent to components: `ComponentName.test.tsx`
2. **Integration Tests:** Test navigation flow and data integration
3. **Snapshot Tests:** For complex animations (use sparingly)

### Testing Checklist Before Merging
- [ ] Component renders without errors
- [ ] Props are properly typed
- [ ] State updates trigger re-renders
- [ ] Navigation callbacks fire correctly
- [ ] No TypeScript errors: `npm run build`
- [ ] No lint issues: `npm run lint`

## Performance & Optimization Guidelines

### Current Optimizations
- Vite for fast builds and HMR
- CSS variables avoid recompilation
- Framer Motion with `viewport={{ once: true }}` prevents unnecessary animations

### Optimization Checklist
1. **Bundle Size:** Monitor with `npm run build` output
2. **Component Rendering:** Use React DevTools Profiler to identify slow renders
3. **Image Assets:** Keep icons as Lucide components (vector-based)
4. **Data Loading:** topicsData is static; preload on app init

### When to Optimize
- Build time > 5 seconds
- Page paint time > 3 seconds
- DevTools Profiler shows repeated re-renders

## Accessibility Guidelines

### WCAG 2.1 AA Compliance Target
- **Keyboard Navigation:** All interactive elements must be tab-navigable
  - Use native `<button>` and `<a>` tags where possible
  - Framer Motion should not trap focus
- **Color Contrast:** Primary/Secondary colors meet 4.5:1 contrast ratio for text
  - Test with WebAIM Contrast Checker before finalizing colors
- **Labels & ARIA:** 
  - Use `aria-label` for icon-only buttons
  - Example: `<button aria-label="Toggle solution">{IconComponent}</button>`
- **Focus Indicators:** Tailwind's `focus:ring` classes used for outline feedback

### Testing Accessibility
```bash
# Use axe DevTools browser extension for automated checks
# Manual testing: Tab through entire page, verify all content is reachable
# Screen reader check: Enable Windows Narrator or macOS VoiceOver
```

## Environment Setup & Getting Started

### Prerequisites
- Node.js 18+ (check: `node --version`)
- npm 9+ (check: `npm --version`)
- Git (check: `git --version`)

### First-Time Setup
```bash
# 1. Clone and install
git clone <repo>
cd dsa-learning
npm install

# 2. Verify setup
npm run lint      # Should pass with no errors
npm run build     # Should complete successfully

# 3. Start development
npm run dev       # Open http://localhost:5173
```

### IDE Setup
- **VS Code Extensions Recommended:**
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Framer Motion docs (if available)
  - ESLint
- **Settings:** Enable format on save with Prettier (optional; ESLint enforces style)

### Environment Variables
- Currently: None required
- Future additions: Document here if API endpoints or feature flags are added

## Git Workflow & Conventions

### Branch Naming
```
feature/topic-name-or-feature-description
fix/bug-description
docs/documentation-update
perf/performance-improvement
```

### Commit Messages
- **Format:** `<type>: <description>`
- **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`
- **Examples:**
  ```
  feat: add quicksort algorithm to Sorting topic
  fix: correct hover animation timing on TopicCard
  docs: enhance Copilot instructions with testing guidelines
  perf: memoize TopicCard to prevent re-renders
  ```

### Before Pushing
```bash
npm run lint      # Fix any linting issues
npm run build     # Ensure TypeScript compilation succeeds
git status        # Verify only intended files changed
```

## Troubleshooting

### Common Issues & Solutions

#### "npm install" fails with dependency conflicts
```bash
# Solution: Clear cache and retry
npm cache clean --force
rm package-lock.json
npm install
```

#### Styles not applying to new component
- **Check:** Is component using Tailwind classes or CSS variables?
- **Verify:** CSS variables in [index.css](src/index.css) exist
- **Debug:** Inspect in DevTools; check cascade and specificity
- **Fix:** Use `!important` only as last resort; refactor selector instead

#### Component not updating when state changes
- **Check:** Are you mutating state directly? (Never do `state.prop = value`)
- **Debug:** React DevTools → Profiler → check re-render triggers
- **Verify:** Props are correctly passed from parent and callbacks invoked
- **Solution:** Use `setState((prev) => ({ ...prev, prop: newValue }))`

#### Animations not triggering on scroll
- **Check:** Is `whileInView` present in Framer Motion config?
- **Verify:** `viewport={{ once: true }}` is set to prevent re-triggering
- **Debug:** Check if element is within viewport before scroll happens
- **Fix:** Adjust initial state or add `margin` to viewport

#### Build fails with TypeScript errors
```bash
# Identify errors
npm run build     # Shows full error trace

# Common fixes
# 1. Missing type annotations
tsc --noEmit      # Run TypeScript checker directly

# 2. Implicit 'any' types
# Check tsconfig.app.json: "noImplicitAny": true is enforced
```

#### ESLint warnings about unused variables
```bash
# Auto-fix many issues
npm run lint -- --fix

# Manually fix remaining issues per the output
# Unused imports: remove or prefix with underscore if intentionally unused
```

#### HMR (Hot Module Reload) not working during development
```bash
# Solution: Restart dev server
npm run dev

# If still failing: Check if port 5173 is in use
# Kill process or specify different port
npm run dev -- --port 5174
```

### Performance Debugging

#### Page loads slowly
1. Open DevTools → Network tab
2. Check for large assets or failed requests
3. Run Lighthouse audit: DevTools → Lighthouse
4. Check React Profiler for slow component renders

#### Component re-renders too frequently
1. React DevTools → Profiler tab
2. Record a session → Identify "flamegraph" spikes
3. Add `React.memo()` to child components if stable props
4. Use `useCallback()` for stable function references

## Related Resources & Documentation

### Internal Docs
- **[CLAUDE.md](CLAUDE.md)** - Build commands and project structure
- **[GRAPH_REPORT.md](graphify-out/GRAPH_REPORT.md)** - Code structure analysis
- **[README.md](README.md)** - Project overview and features

### External References
- **React 19:** https://react.dev
- **Vite:** https://vitejs.dev
- **Framer Motion:** https://www.framer.com/motion/
- **Tailwind CSS:** https://tailwindcss.com
- **TypeScript:** https://www.typescriptlang.org
- **Lucide React:** https://lucide.dev

## graphify

Before answering architecture or codebase questions, read `graphify-out/GRAPH_REPORT.md` if it exists.
If `graphify-out/wiki/index.md` exists, navigate it for deep questions.
Type `/graphify` in Copilot Chat to build or update the knowledge graph.
