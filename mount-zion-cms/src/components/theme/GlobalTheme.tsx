import React from 'react'
import { activeTheme, ThemeColors } from '@/theme/themeConfig'

interface GlobalThemeProps {
  customTheme?: Partial<ThemeColors>
}

/**
 * GlobalTheme Component
 * Injects dynamic CSS variables for theme colors, typography, elevations,
 * and component styles based on Light and Dark modes.
 */
export const GlobalTheme: React.FC<GlobalThemeProps> = ({ customTheme }) => {
  const theme: ThemeColors = {
    ...activeTheme,
    ...customTheme,
    dark: {
      ...activeTheme.dark,
      ...(customTheme?.dark || {}),
    },
    light: {
      ...activeTheme.light,
      ...(customTheme?.light || {}),
    },
  }

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');

    :root {
      /* Shared Brand Accents & Typography */
      --brand-primary: ${theme.primary};
      --brand-primary-hover: ${theme.primaryHover};
      --brand-accent: ${theme.accent};
      --brand-accent-hover: ${theme.accentHover};
      --brand-radius: ${theme.borderRadius};
      --brand-font: ${theme.fontFamily};
      --brand-heading-font: ${theme.headingFont};

      /* Default fallback (Dark mode) */
      --brand-bg: ${theme.dark.bg};
      --brand-surface: ${theme.dark.surface};
      --brand-surface-hover: ${theme.dark.surfaceHover};
      --brand-sidebar-bg: ${theme.dark.sidebarBg};
      --brand-border: ${theme.dark.border};
      --brand-text: ${theme.dark.text};
      --brand-text-muted: ${theme.dark.textMuted};

      --theme-bg: ${theme.dark.bg};
      --theme-elevation-0: ${theme.dark.bg};
      --theme-elevation-50: ${theme.dark.surface};
      --theme-elevation-100: ${theme.dark.surfaceHover};
      --theme-elevation-150: ${theme.dark.border};
      --theme-elevation-200: ${theme.dark.border};
      --theme-text: ${theme.dark.text};
      --theme-border-color: ${theme.dark.border};
      --theme-accent: ${theme.primary};
      --theme-accent-hover: ${theme.primaryHover};
      --theme-success-500: ${theme.primary};

      --brand-active-bg: rgba(45, 212, 191, 0.16);
      --brand-active-hover-bg: rgba(45, 212, 191, 0.24);
      --brand-active-color: #2dd4bf;
      --brand-active-bar: #2dd4bf;
    }

    /* Dark Mode (Payload attribute or system dark) */
    html[data-theme='dark'] {
      --brand-bg: ${theme.dark.bg};
      --brand-surface: ${theme.dark.surface};
      --brand-surface-hover: ${theme.dark.surfaceHover};
      --brand-sidebar-bg: ${theme.dark.sidebarBg};
      --brand-border: ${theme.dark.border};
      --brand-text: ${theme.dark.text};
      --brand-text-muted: ${theme.dark.textMuted};

      --theme-bg: ${theme.dark.bg};
      --theme-elevation-0: ${theme.dark.bg};
      --theme-elevation-50: ${theme.dark.surface};
      --theme-elevation-100: ${theme.dark.surfaceHover};
      --theme-elevation-150: ${theme.dark.border};
      --theme-elevation-200: ${theme.dark.border};
      --theme-text: ${theme.dark.text};
      --theme-border-color: ${theme.dark.border};

      --brand-active-bg: rgba(45, 212, 191, 0.16);
      --brand-active-hover-bg: rgba(45, 212, 191, 0.24);
      --brand-active-color: #2dd4bf;
      --brand-active-bar: #2dd4bf;
    }

    /* Light Mode (Payload attribute) */
    html[data-theme='light'] {
      --brand-bg: ${theme.light.bg};
      --brand-surface: ${theme.light.surface};
      --brand-surface-hover: ${theme.light.surfaceHover};
      --brand-sidebar-bg: ${theme.light.sidebarBg};
      --brand-border: ${theme.light.border};
      --brand-text: ${theme.light.text};
      --brand-text-muted: ${theme.light.textMuted};

      --theme-bg: ${theme.light.bg};
      --theme-elevation-0: ${theme.light.bg};
      --theme-elevation-50: ${theme.light.surface};
      --theme-elevation-100: ${theme.light.surfaceHover};
      --theme-elevation-150: ${theme.light.border};
      --theme-elevation-200: ${theme.light.border};
      --theme-text: ${theme.light.text};
      --theme-border-color: ${theme.light.border};

      --brand-active-bg: rgba(3, 89, 78, 0.10);
      --brand-active-hover-bg: rgba(3, 89, 78, 0.16);
      --brand-active-color: ${theme.primary};
      --brand-active-bar: ${theme.primary};
    }

    body {
      font-family: var(--brand-font) !important;
      background-color: var(--brand-bg) !important;
      color: var(--brand-text) !important;
    }
  `

  return (
    <style
      id="global-theme-styles"
      dangerouslySetInnerHTML={{ __html: css }}
    />
  )
}

export default GlobalTheme
