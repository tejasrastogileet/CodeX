/**
 * AaharMitra Design System
 * Centralized styling constants and design tokens
 */

export const colors = {
  // Primary colors
  primary: '#2b7a5e', // Deep Green - Health & Nutrition
  primaryLight: '#4a9d7d',
  primaryDark: '#1f5841',

  // Secondary colors
  secondary: '#ff8c42', // Warm Orange - Energy & Joy
  secondaryLight: '#ffaa66',
  secondaryDark: '#e67e2a',

  // Status colors
  success: '#2b7a5e',
  warning: '#ff8c42',
  danger: '#ef4444',
  info: '#3b82f6',

  // Health status indicators
  bmiNormal: '#2b7a5e',
  bmiUnderweight: '#ff8c42',
  bmiOverweight: '#f59e0b',
  bmiSevere: '#ef4444',

  // Neutral colors
  background: '#faf9f7',
  foreground: '#1c2620',
  card: '#ffffff',
  muted: '#f3f1ee',
  mutedForeground: '#7f8278',
  border: '#e5e3df',
};

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
  '3xl': '3rem',
};

export const borderRadius = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
};

export const typography = {
  fontFamily: {
    primary: "'Poppins', sans-serif",
    secondary: "'Inter', sans-serif",
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
};

export const transitions = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
};

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

// Component size presets
export const componentSizes = {
  icon: {
    sm: '1rem',      // 16px
    md: '1.25rem',   // 20px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
  },
  button: {
    sm: '2rem',
    md: '2.75rem',
    lg: '3rem',
  },
};

// Status badge colors
export const statusColors = {
  active: colors.success,
  inactive: colors.mutedForeground,
  pending: colors.warning,
  error: colors.danger,
  info: colors.info,
};
