/**
 * Shared constants for the DSA Learning app
 */

/* Breakpoints for responsive design */
export const BREAKPOINTS = {
  xs: 320,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/* Spacing scale (in rem) */
export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
  '3xl': '3rem',
  '4xl': '4rem',
} as const;

/* Typography scale (in rem) */
export const FONT_SIZES = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
} as const;

/* Animation durations (in ms) */
export const ANIMATION_DURATIONS = {
  fast: 150,
  smooth: 300,
  standard: 400,
  slow: 600,
  slowest: 800,
} as const;

/* Easing functions */
export const EASING = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  easeOutElastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

/* Z-index scale */
export const Z_INDEX = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

/* Touch target minimum size (in pixels) */
export const TOUCH_TARGET_MIN = 44;
export const TOUCH_TARGET_PADDING = 12;

/* Maximum container width */
export const MAX_CONTAINER_WIDTH = 1200;

/* Navbar height */
export const NAVBAR_HEIGHT = 80;

/* Difficulty levels */
export const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard', 'expert'] as const;

/* Problem categories */
export const PROBLEM_CATEGORIES = [
  'array',
  'string',
  'linkedlist',
  'stack',
  'queue',
  'tree',
  'graph',
  'dynamicprogramming',
  'greedy',
  'searching',
  'sorting',
  'recursion',
  'backtracking',
  'bitmanipulation',
  'math',
  'design',
] as const;

/* DSA Topics */
export const DSA_TOPICS = [
  'arrays',
  'strings',
  'linkedlists',
  'stacks',
  'queues',
  'trees',
  'graphs',
  'hashing',
  'heaps',
  'tries',
  'sorting',
  'searching',
  'dynamicprogramming',
  'greedy',
  'backtracking',
  'recursion',
  'bitmanipulation',
  'math',
  'geometry',
  'design',
] as const;

/* Programming languages supported */
export const SUPPORTED_LANGUAGES = [
  'javascript',
  'typescript',
  'python',
  'java',
  'cpp',
  'csharp',
  'go',
  'rust',
] as const;

/* Code complexity notations */
export const COMPLEXITY_NOTATIONS = [
  'O(1)',
  'O(log n)',
  'O(n)',
  'O(n log n)',
  'O(n²)',
  'O(n³)',
  'O(2^n)',
  'O(n!)',
] as const;
