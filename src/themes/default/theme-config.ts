/**
 * Default Theme Configuration
 *
 * This file contains all theme-related configuration for the default theme.
 * Child themes can override this file to create custom themes without modifying
 * the base component implementations.
 *
 * @usage
 * 1. For base template: Use this file as-is
 * 2. For child themes: Copy this file to your child theme and modify values
 * 3. Import in components: import { themeConfig } from '@themes/[theme-name]/theme-config'
 */

/**
 * Color Palette Configuration
 * Define your brand colors and semantic color mappings
 */
export const colorScheme = {
  // Brand Colors - Primary identity colors
  brand: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6", // Main brand color
      600: "#2563eb", // Hover/Active states
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },
    secondary: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },
    accent: {
      50: "#fdf4ff",
      100: "#fae8ff",
      500: "#d946ef",
      600: "#c026d3",
      900: "#701a75",
    },
  },

  // Semantic Colors - Contextual meanings
  semantic: {
    success: {
      light: "#10b981",
      DEFAULT: "#059669",
      dark: "#047857",
    },
    warning: {
      light: "#f59e0b",
      DEFAULT: "#d97706",
      dark: "#b45309",
    },
    error: {
      light: "#ef4444",
      DEFAULT: "#dc2626",
      dark: "#b91c1c",
    },
    info: {
      light: "#3b82f6",
      DEFAULT: "#2563eb",
      dark: "#1d4ed8",
    },
  },

  // Surface Colors - Backgrounds and containers
  surface: {
    light: {
      primary: "#ffffff",
      secondary: "#f9fafb",
      tertiary: "#f3f4f6",
      elevated: "#ffffff",
    },
    dark: {
      primary: "#0f172a",
      secondary: "#1e293b",
      tertiary: "#334155",
      elevated: "#1e293b",
    },
  },

  // Text Colors
  text: {
    light: {
      primary: "#0f172a",
      secondary: "#475569",
      tertiary: "#64748b",
      inverse: "#ffffff",
    },
    dark: {
      primary: "#f8fafc",
      secondary: "#cbd5e1",
      tertiary: "#94a3b8",
      inverse: "#0f172a",
    },
  },

  // Border Colors
  border: {
    light: {
      primary: "#e2e8f0",
      secondary: "#cbd5e1",
      focus: "#3b82f6",
    },
    dark: {
      primary: "#334155",
      secondary: "#475569",
      focus: "#60a5fa",
    },
  },
} as const;

/**
 * Typography Configuration
 * Define font families, sizes, weights, and line heights
 */
export const typography = {
  // Font Families
  fontFamily: {
    display: "ui-sans-serif, system-ui, sans-serif",
    body: "ui-sans-serif, system-ui, sans-serif",
    mono: "ui-monospace, monospace",
  },

  // Font Sizes (following Tailwind's scale)
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
    "7xl": "4.5rem", // 72px
  },

  // Font Weights
  fontWeight: {
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },

  // Line Heights
  lineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
    loose: "2",
  },
} as const;

/**
 * Spacing and Layout Configuration
 */
export const spacing = {
  // Container widths
  container: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // Common spacing values
  section: {
    paddingY: {
      sm: "3rem", // 48px
      md: "4rem", // 64px
      lg: "6rem", // 96px
      xl: "8rem", // 128px
    },
    paddingX: {
      sm: "1rem", // 16px
      md: "1.5rem", // 24px
      lg: "2rem", // 32px
    },
  },

  // Component spacing
  component: {
    gap: {
      sm: "0.5rem", // 8px
      md: "1rem", // 16px
      lg: "1.5rem", // 24px
      xl: "2rem", // 32px
    },
  },
} as const;

/**
 * Border Radius Configuration
 */
export const borderRadius = {
  none: "0",
  sm: "0.125rem", // 2px
  DEFAULT: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px",
} as const;

/**
 * Shadow Configuration
 */
export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  none: "none",
} as const;

/**
 * Animation and Transition Configuration
 */
export const animations = {
  duration: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
  },
  timing: {
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    linear: "linear",
  },
} as const;

/**
 * Shared Button/Link Configuration
 * Used consistently across all components (hero, CTA, cards, etc.)
 */
export const buttonStyles = {
  // Spacing and sizing
  padding: {
    x: "1.25rem", // px-5
    y: "0.75rem", // py-3
  },
  gap: "1rem", // Gap between buttons when in a group
  marginTop: "2.5rem", // Default margin-top for button groups

  // Visual styling
  borderRadius: borderRadius.none,
  fontSize: typography.fontSize.sm,
  fontWeight: typography.fontWeight.semibold,
  transition: `all ${animations.duration.normal} ${animations.timing.easeInOut}`,

  // Primary button variants (light/dark/withImage modes)
  primary: {
    light: {
      background: colorScheme.brand.primary[600],
      backgroundHover: colorScheme.brand.primary[700],
      text: "#ffffff",
      shadow: shadows.sm,
    },
    dark: {
      background: "#ffffff",
      backgroundHover: "#f3f4f6",
      text: colorScheme.text.light.primary,
      shadow: shadows.sm,
    },
    withImage: {
      background: "#ffffff",
      backgroundHover: "#f3f4f6",
      text: colorScheme.text.light.primary,
      shadow: shadows.sm,
    },
  },

  // Secondary button variants (text-only links)
  secondary: {
    light: {
      text: colorScheme.text.light.primary,
      textHover: colorScheme.text.light.secondary,
    },
    dark: {
      text: "#ffffff",
      textHover: "#e5e7eb",
    },
    withImage: {
      text: "#ffffff",
      textHover: "#e5e7eb",
    },
  },
} as const;

/**
 * Component-Specific Theme Configuration
 * Each component can have its own theme settings
 */
export const components = {
  // Hero Component Configuration
  hero: {
    // Default styles
    default: {
      minHeight: "500px",
      padding: {
        y: "3rem", // py-12
      },
      container: {
        maxWidth: "80rem", // max-w-7xl
        padding: {
          x: "1rem",
          y: "2rem",
        },
      },

      // Background overlay settings
      overlay: {
        gradient:
          "linear-gradient(to bottom, rgb(0 0 0 / 0.5), rgb(0 0 0 / 0.6), rgb(0 0 0 / 0.7))",
        backdropBlur: "4px",
      },

      // Typography within hero
      subtitle: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.semibold,
        textTransform: "uppercase",
        color: {
          light: colorScheme.text.light.secondary,
          dark: "#ffffff",
          withImage: "#ffffff",
        },
        marginTop: "0.5rem",
      },

      title: {
        fontSize: {
          base: typography.fontSize.xl,
          sm: typography.fontSize["5xl"],
        },
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.tight,
        color: {
          light: colorScheme.text.light.secondary,
          dark: "#ffffff",
          withImage: "#ffffff",
        },
        marginTop: "1rem",
      },

      excerpt: {
        maxWidth: "80rem", // max-w-5xl
        fontSize: typography.fontSize.xl,
        lineHeight: typography.lineHeight.normal,
        color: {
          light: colorScheme.text.light.secondary,
          dark: colorScheme.text.dark.secondary,
          withImage: "#f3f4f6", // gray-100
        },
        marginTop: "1rem",
      },
    },
  },

  // CTA Section Configuration
  cta: {
    default: {
      padding: {
        x: {
          sm: "1.5rem", // sm:px-6
          lg: "2rem", // lg:px-8
        },
        y: {
          sm: "6rem", // py-24
          md: "8rem", // sm:py-32
        },
      },
      container: {
        maxWidth: "80rem", // max-w-7xl
        padding: "1.25rem",
      },

      // Background colors
      background: {
        light: colorScheme.surface.light.primary,
        dark: colorScheme.surface.dark.primary,
      },

      text: {
        light: colorScheme.text.light.primary,
        dark: colorScheme.text.dark.primary,
      },
    },
  },

  // Card Component Configuration
  card: {
    default: {
      background: colorScheme.surface.light.primary,
      backgroundDark: colorScheme.surface.dark.primary,
      border: colorScheme.border.light.primary,
      borderDark: colorScheme.border.dark.primary,
      borderRadius: borderRadius.lg,
      shadow: shadows.md,
      padding: "1.5rem",
    },
  },
} as const;

/**
 * Main Theme Configuration Export
 * This is the primary export that components should import
 */
export const themeConfig = {
  colors: colorScheme,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
  buttonStyles, // Shared button configuration
  components,
} as const;

/**
 * Type exports for TypeScript support
 */
export type ThemeConfig = typeof themeConfig;
export type ColorScheme = typeof colorScheme;
export type Typography = typeof typography;
export type ComponentConfig = typeof components;

/**
 * Default export for convenience
 */
export default themeConfig;
