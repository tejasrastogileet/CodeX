/**
 * AaharMitra Theme Constants
 * Government-grade SaaS color palette & design tokens
 */

export const THEME = {
  colors: {
    primary: {
      50: '#F0F6F8',
      100: '#E0ECF0',
      200: '#B8D5E0',
      300: '#7FB5CC',
      400: '#4794B8',
      500: '#0B3C5D', // Deep Government Blue (main)
      600: '#082E4A',
      700: '#062139',
      800: '#042941',
      900: '#031E2E',
    },
    secondary: {
      50: '#F0FDFC',
      100: '#D4F8F5',
      200: '#ABEEE8',
      300: '#0F766E', // Teal (main)
      400: '#066D6A',
      500: '#055B58',
      600: '#044D4A',
      700: '#033E3B',
      800: '#022E2A',
      900: '#011D1B',
    },
    accent: {
      50: '#F0FDF9',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#10B981', // Emerald (main)
      500: '#059669',
      600: '#047857',
      700: '#055340',
      800: '#064E3B',
      900: '#022C1B',
    },
    warning: '#F59E0B',
    danger: '#EF4444',
    success: '#10B981',
    info: '#3B82F6',
    
    // Grayscale
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  
  gradients: {
    backgroundSoft: 'linear-gradient(135deg, #f0f6f8 0%, #ffffff 100%)',
    backgroundDark: 'linear-gradient(135deg, #0B3C5D 0%, #0F766E 100%)',
    accentGradient: 'linear-gradient(135deg, #0B3C5D 0%, #10B981 100%)',
    card: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 248, 255, 0.95) 100%)',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  },
  
  typography: {
    heading: {
      fontFamily: "'Poppins', 'Noto Sans Devanagari', sans-serif",
      fontWeight: 700,
    },
    body: {
      fontFamily: "'Inter', 'Noto Sans Devanagari', sans-serif",
      fontWeight: 400,
    },
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    full: '9999px',
  },
  
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '250ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '350ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export const BMI_COLORS = {
  'severely-underweight': '#DC2626', // Red-600
  'underweight': '#F59E0B',           // Amber-400
  'normal': '#10B981',                // Emerald-500
  'overweight': '#FF8A50',            // Orange
};

export const BMI_LABELS = {
  en: {
    'severely-underweight': 'Severely Underweight',
    'underweight': 'Underweight',
    'normal': 'Normal',
    'overweight': 'Overweight',
  },
  hi: {
    'severely-underweight': 'गंभीर रूप से कम वजन',
    'underweight': 'कम वजन',
    'normal': 'सामान्य',
    'overweight': 'अधिक वजन',
  },
};
