/**
 * Color utilities and mappings for the DSA Learning app
 */

export const DIFFICULTY_COLORS = {
  easy: '#22c55e',
  medium: '#eab308',
  hard: '#ef4444',
  expert: '#8b5cf6',
} as const;

export const STATUS_COLORS = {
  success: '#22c55e',
  warning: '#eab308',
  error: '#ef4444',
  info: '#38bdf8',
} as const;

export const THEME_COLORS = {
  primary: '#8b5cf6',
  secondary: '#14b8a6',
  accent: '#f43f5e',
  text: '#f1f5f9',
  textSecondary: '#e2e8f0',
  textMuted: '#94a3b8',
  bg: '#060b18',
  bgSecondary: '#0a1128',
  surface: '#131f38',
} as const;

/**
 * Get color for difficulty level
 */
export function getDifficultyColor(difficulty: string): string {
  const normalized = difficulty.toLowerCase();
  return (
    DIFFICULTY_COLORS[normalized as keyof typeof DIFFICULTY_COLORS] ||
    DIFFICULTY_COLORS.easy
  );
}

/**
 * Get color for status
 */
export function getStatusColor(status: string): string {
  const normalized = status.toLowerCase();
  return (
    STATUS_COLORS[normalized as keyof typeof STATUS_COLORS] ||
    STATUS_COLORS.info
  );
}

/**
 * Get color for complexity
 */
export function getComplexityColor(complexity: string): string {
  // Maps complexity to difficulty colors
  const complexityMap: Record<string, keyof typeof DIFFICULTY_COLORS> = {
    'o(1)': 'easy',
    'o(log n)': 'easy',
    'o(n)': 'medium',
    'o(n log n)': 'medium',
    'o(n^2)': 'hard',
    'o(n^3)': 'hard',
    'o(2^n)': 'expert',
    'o(n!)': 'expert',
  };

  const normalized = complexity.toLowerCase();
  const difficultyKey = complexityMap[normalized] || 'easy';
  return DIFFICULTY_COLORS[difficultyKey];
}

/**
 * Get background color for difficulty level
 */
export function getDifficultyBgColor(difficulty: string): string {
  const color = getDifficultyColor(difficulty);
  const colorMap: Record<string, string> = {
    '#22c55e': 'rgba(34, 197, 94, 0.12)',
    '#eab308': 'rgba(234, 179, 8, 0.12)',
    '#ef4444': 'rgba(239, 68, 68, 0.12)',
    '#8b5cf6': 'rgba(139, 92, 246, 0.12)',
  };

  return colorMap[color] || 'rgba(139, 92, 246, 0.12)';
}

/**
 * Convert color hex to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Convert color hex to CSS RGB string
 */
export function hexToRgbString(hex: string): string {
  const rgb = hexToRgb(hex);
  return rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : '139, 92, 246';
}
