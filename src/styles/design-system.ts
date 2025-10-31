/**
 * Уніфікована система дизайну для всього проекту
 * Цей файл містить всі константи дизайну для консистентності
 */

// ============================================
// КОЛЬОРИ
// ============================================

export const colors = {
  // Primary palette (Material Design 3 Blue)
  primary: {
    DEFAULT: '#1976d2',
    hover: '#1565c0',
    light: '#42a5f5',
    dark: '#0d47a1',
    bg: '#e3f2fd',
  },
  
  // Secondary palette (Gray)
  secondary: {
    DEFAULT: '#64748b',
    hover: '#475569',
    light: '#94a3b8',
    bg: '#f1f5f9',
  },
  
  // Status colors
  success: {
    DEFAULT: '#2e7d32',
    hover: '#1b5e20',
    bg: '#e8f5e9',
    text: '#1b5e20',
  },
  
  warning: {
    DEFAULT: '#ed6c02',
    hover: '#e65100',
    bg: '#fff3e0',
    text: '#e65100',
  },
  
  error: {
    DEFAULT: '#d32f2f',
    hover: '#c62828',
    bg: '#ffebee',
    text: '#c62828',
  },
  
  info: {
    DEFAULT: '#0288d1',
    hover: '#01579b',
    bg: '#e1f5fe',
    text: '#01579b',
  },
  
  // Neutral colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Semantic colors
  background: {
    DEFAULT: '#ffffff',
    secondary: '#f8f9fa',
    tertiary: '#f0f0f0',
  },
  
  text: {
    primary: '#1c1b1f',
    secondary: '#44464f',
    tertiary: '#6b7280',
    disabled: '#9ca3af',
  },
  
  border: {
    DEFAULT: '#e5e7eb',
    light: '#f3f4f6',
    dark: '#d1d5db',
  },
} as const;

// ============================================
// ТІНІ (ELEVATION)
// ============================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 8px 0 rgba(0, 0, 0, 0.08)',
  lg: '0 8px 16px 0 rgba(0, 0, 0, 0.1)',
  xl: '0 12px 24px 0 rgba(0, 0, 0, 0.12)',
  
  // Colored shadows
  primary: {
    sm: '0 1px 3px rgba(25, 118, 210, 0.2)',
    DEFAULT: '0 2px 6px rgba(25, 118, 210, 0.3)',
    md: '0 4px 12px rgba(25, 118, 210, 0.4)',
  },
  
  error: {
    sm: '0 1px 3px rgba(211, 47, 47, 0.2)',
    DEFAULT: '0 2px 6px rgba(211, 47, 47, 0.3)',
    md: '0 4px 12px rgba(211, 47, 47, 0.4)',
  },
} as const;

// ============================================
// РАДІУСИ
// ============================================

export const radius = {
  none: '0',
  sm: '0.5rem',    // 8px
  DEFAULT: '0.75rem',  // 12px
  md: '1rem',      // 16px
  lg: '1.25rem',   // 20px
  xl: '1.5rem',    // 24px
  full: '9999px',  // pill shape
} as const;

// ============================================
// ВІДСТУПИ (SPACING)
// ============================================

export const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px
} as const;

// ============================================
// ТИПОГРАФІКА
// ============================================

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
} as const;

// ============================================
// АНИМАЦІЇ
// ============================================

export const transitions = {
  duration: {
    fast: '150ms',
    DEFAULT: '200ms',
    slow: '300ms',
  },
  
  easing: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// ============================================
// КОМПОНЕНТИ (Tailwind класи)
// ============================================

export const button = {
  base: `
    inline-flex items-center justify-center font-medium
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-[0.97]
  `.trim(),
  
  variants: {
    primary: `
      bg-[${colors.primary.DEFAULT}] text-white
      hover:bg-[${colors.primary.hover}]
      shadow-lg shadow-primary-sm
      hover:shadow-xl hover:shadow-primary-DEFAULT
      focus:ring-[${colors.primary.DEFAULT}]
    `.trim(),
    
    secondary: `
      bg-[${colors.secondary.bg}] text-[${colors.text.primary}]
      hover:bg-[${colors.gray[200]}]
      shadow-sm hover:shadow-md
      focus:ring-[${colors.secondary.DEFAULT}]
    `.trim(),
    
    outline: `
      border-2 border-[${colors.border.DEFAULT}] text-[${colors.text.primary}]
      hover:bg-[${colors.background.secondary}] hover:border-[${colors.border.dark}]
      shadow-sm
      focus:ring-[${colors.primary.DEFAULT}]
    `.trim(),
    
    ghost: `
      text-[${colors.text.primary}]
      hover:bg-[${colors.background.secondary}]
      focus:ring-[${colors.primary.DEFAULT}]
    `.trim(),
    
    danger: `
      bg-[${colors.error.DEFAULT}] text-white
      hover:bg-[${colors.error.hover}]
      shadow-lg shadow-error-sm
      hover:shadow-xl hover:shadow-error-DEFAULT
      focus:ring-[${colors.error.DEFAULT}]
    `.trim(),
  },
  
  sizes: {
    sm: 'px-4 py-2 text-sm rounded-full min-h-[40px]',
    md: 'px-6 py-3 text-sm rounded-full min-h-[48px]',
    lg: 'px-8 py-4 text-base rounded-full min-h-[52px]',
    xl: 'px-10 py-5 text-lg rounded-full min-h-[56px]',
  },
} as const;

export const card = {
  base: `
    bg-white rounded-[${radius.DEFAULT}]
    border border-[${colors.border.DEFAULT}]
    shadow-[${shadows.DEFAULT}]
    transition-all duration-200
  `.trim(),
  
  hover: `
    hover:shadow-[${shadows.md}]
    hover:-translate-y-0.5
  `.trim(),
} as const;

// Tailwind-сумісні класи (для використання в className)
export const designTokens = {
  colors: {
    primary: {
      DEFAULT: 'bg-[#1976d2] text-white hover:bg-[#1565c0]',
      light: 'bg-[#e3f2fd] text-[#0d47a1]',
    },
    secondary: {
      DEFAULT: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    },
    success: {
      DEFAULT: 'bg-[#2e7d32] text-white hover:bg-[#1b5e20]',
      light: 'bg-[#e8f5e9] text-[#1b5e20]',
    },
    warning: {
      DEFAULT: 'bg-[#ed6c02] text-white hover:bg-[#e65100]',
      light: 'bg-[#fff3e0] text-[#e65100]',
    },
    error: {
      DEFAULT: 'bg-[#d32f2f] text-white hover:bg-[#c62828]',
      light: 'bg-[#ffebee] text-[#c62828]',
    },
  },
  
  shadows: {
    sm: 'shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]',
    DEFAULT: 'shadow-[0_2px_4px_0_rgba(0,0,0,0.06)]',
    md: 'shadow-[0_4px_8px_0_rgba(0,0,0,0.08)]',
    lg: 'shadow-[0_8px_16px_0_rgba(0,0,0,0.1)]',
    primary: 'shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30',
    error: 'shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30',
  },
  
  radius: {
    sm: 'rounded-lg',      // 8px
    DEFAULT: 'rounded-xl', // 12px
    md: 'rounded-2xl',     // 16px
    lg: 'rounded-3xl',     // 20px
    full: 'rounded-full', // pill
  },
} as const;


