# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Run linting**: `npm run lint`
- **Preview production build**: `npm run preview`
- **Install dependencies**: `npm install`

## Project Architecture

This project is a React 19 web application built with Vite and TypeScript, focused on interactive Data Structures and Algorithms (DSA) learning.

### Core Tech Stack
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS & Framer Motion
- **Data Visualization**: Recharts (for Big-O analysis)
- **Persistence**: IndexedDB via `idb-keyval`

### Directory Structure
- `src/components/`: Contains reusable UI components, including interactive data structure visualizers and navigation.
- `src/contexts/`: React Context providers for managing global application state.
- `src/data/`: The core curriculum content, containing topic definitions, problem sets, and algorithm logic.
- `src/hooks/`: Custom React hooks for encapsulating complex logic (e.g., visualizer step control).
- `src/pages/`: Main route components that compose the application views.
- `src/types/`: TypeScript interfaces and type definitions used throughout the project.
- `src/App.tsx`: The root component handling routing and high-level configuration.

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- After modifying code files in this session, run `graphify update .` to keep the graph current (AST-only, no API cost)
