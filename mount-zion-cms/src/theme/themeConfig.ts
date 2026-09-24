export interface ThemeModeColors {
  bg: string
  surface: string
  surfaceHover: string
  sidebarBg: string
  border: string
  text: string
  textMuted: string
}

export interface ThemeColors {
  name: string
  // Shared brand accents
  primary: string
  primaryHover: string
  accent: string
  accentHover: string

  // Mode specific color sets
  dark: ThemeModeColors
  light: ThemeModeColors

  // Typography & Layout
  fontFamily: string
  headingFont: string
  borderRadius: string
}

export type ThemePresetKey = 'school' | 'restaurant' | 'shop' | 'sneat'

export const themePresets: Record<ThemePresetKey, ThemeColors> = {
  // Preset: Sneat Modern Admin
  sneat: {
    name: 'sneat',
    primary: '#696cff',       // Sneat Royal Purple
    primaryHover: '#5f61e6',
    accent: '#ff3e1d',        // Sneat Vibrant Red (Badge)
    accentHover: '#e6381a',

    dark: {
      bg: '#232333',          // Sneat Dark Canvas
      surface: '#2b2c40',     // Sneat Dark Card / Surface
      surfaceHover: '#323249',
      sidebarBg: '#2b2c40',   // Sneat Dark Sidebar
      border: '#363852',
      text: '#cbcbe2',
      textMuted: '#7983bb',
    },

    light: {
      bg: '#f5f5f9',          // Sneat Light Canvas
      surface: '#ffffff',     // Pure White Surface
      surfaceHover: 'rgba(67, 89, 113, 0.04)',
      sidebarBg: '#ffffff',   // Crisp White Sidebar
      border: '#e7e7e8',
      text: '#566a7f',
      textMuted: '#a1acb8',
    },

    fontFamily: "'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    headingFont: "'Public Sans', sans-serif",
    borderRadius: '6px',
  },

  // Preset 1: School / Academic (Mount Zion default)
  school: {
    name: 'Mount Zion School',
    primary: '#03594E',       // Forest Green
    primaryHover: '#02433B',
    accent: '#EAB308',        // Golden Yellow
    accentHover: '#CA8A04',

    dark: {
      bg: '#080d11',          // Midnight Slate
      surface: '#0f171e',     // Card & Input Dark
      surfaceHover: '#16222c',
      sidebarBg: '#05090c',   // Contrast Dark Sidebar
      border: '#1e2b36',
      text: '#f1f5f9',
      textMuted: '#94a3b8',
    },

    light: {
      bg: '#f8fafc',          // Clean Light Slate
      surface: '#ffffff',     // Pure White Card & Input
      surfaceHover: '#f1f5f9',
      sidebarBg: '#ffffff',   // Crisp White Sidebar
      border: '#e2e8f0',
      text: '#0f172a',
      textMuted: '#64748b',
    },

    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    headingFont: "'Plus Jakarta Sans', sans-serif",
    borderRadius: '8px',
  },

  // Preset 2: Restaurant & Fine Dining
  restaurant: {
    name: 'Gourmet Bistro',
    primary: '#B91C1C',       // Warm Crimson / Wine
    primaryHover: '#991B1B',
    accent: '#F59E0B',        // Warm Amber
    accentHover: '#D97706',

    dark: {
      bg: '#0f0c0a',          // Espresso Charcoal
      surface: '#1a1614',
      surfaceHover: '#26201d',
      sidebarBg: '#090706',
      border: '#2e2622',
      text: '#fafaf9',
      textMuted: '#a8a29e',
    },

    light: {
      bg: '#faf7f5',          // Warm Cream / Ivory
      surface: '#ffffff',
      surfaceHover: '#f5ede6',
      sidebarBg: '#ffffff',
      border: '#e8dfd8',
      text: '#1c1917',
      textMuted: '#78716c',
    },

    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    headingFont: "'Playfair Display', serif",
    borderRadius: '10px',
  },

  // Preset 3: Modern Shop / E-Commerce
  shop: {
    name: 'Aura Store',
    primary: '#6366F1',       // Electric Indigo
    primaryHover: '#4F46E5',
    accent: '#06B6D4',        // Cyan / Teal
    accentHover: '#0891B2',

    dark: {
      bg: '#090d16',          // Deep Navy
      surface: '#111827',
      surfaceHover: '#1f2937',
      sidebarBg: '#060910',
      border: '#1f293d',
      text: '#f9fafb',
      textMuted: '#9ca3af',
    },

    light: {
      bg: '#f8fafc',          // Modern White / Slate
      surface: '#ffffff',
      surfaceHover: '#f1f5f9',
      sidebarBg: '#ffffff',
      border: '#e2e8f0',
      text: '#0f172a',
      textMuted: '#64748b',
    },

    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    headingFont: "'Plus Jakarta Sans', sans-serif",
    borderRadius: '12px',
  },
}

/**
 * ACTIVE THEME SELECTION:
 * 'sneat' provides the exact Sneat admin sidebar and color scheme.
 */
export const activePresetKey: ThemePresetKey = 'school'

export const activeTheme: ThemeColors = {
  ...themePresets[activePresetKey],
}
