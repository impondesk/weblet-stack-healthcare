/**
 * Example Child Theme Configuration
 *
 * This is an example of how to create a custom theme by extending the default theme.
 * Copy this file to create your own branded theme.
 *
 * Usage:
 * 1. Copy this file to: src/themes/your-brand/theme-config.ts
 * 2. Customize the values below
 * 3. Update component imports to use your theme
 */

import defaultTheme from "./default/theme-config";
import type { ThemeConfig } from "./default/theme-config";

/**
 * Example: Custom Color Scheme
 * Override brand colors while keeping the rest of the default theme
 */
export const colorScheme = {
  ...defaultTheme.colors,

  brand: {
    // Example: Purple brand theme
    primary: {
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a855f7", // Main brand color
      600: "#9333ea", // Hover/Active states
      700: "#7e22ce",
      800: "#6b21a8",
      900: "#581c87",
    },

    secondary: {
      // Keep default secondary colors
      ...defaultTheme.colors.brand.secondary,
    },

    accent: {
      // Example: Teal accent
      50: "#f0fdfa",
      100: "#ccfbf1",
      500: "#14b8a6",
      600: "#0d9488",
      900: "#134e4a",
    },
  },

  // Keep other color configurations from default
  semantic: defaultTheme.colors.semantic,
  surface: defaultTheme.colors.surface,
  text: defaultTheme.colors.text,
  border: defaultTheme.colors.border,
};

/**
 * Example: Custom Typography
 * Use custom fonts while keeping default sizing
 */
export const typography = {
  ...defaultTheme.typography,

  fontFamily: {
    display: '"Playfair Display", serif', // Elegant serif for headings
    body: '"Inter", sans-serif', // Clean sans-serif for body
    mono: '"JetBrains Mono", monospace', // Modern monospace
  },

  // Keep default font sizes and weights
  // Or override specific ones:
  fontSize: {
    ...defaultTheme.typography.fontSize,
    "5xl": "3.5rem", // Larger hero titles
  },
};

/**
 * Example: Custom Component Configurations
 * Customize specific components while keeping others default
 */
export const components = {
  ...defaultTheme.components,

  hero: {
    default: {
      ...defaultTheme.components.hero.default,

      // Make hero taller
      minHeight: "600px",

      // Custom overlay with brand colors
      overlay: {
        gradient:
          "linear-gradient(135deg, rgba(168, 85, 247, 0.8), rgba(147, 51, 234, 0.9))",
        backdropBlur: "6px",
      },

      // Custom title styling
      title: {
        ...defaultTheme.components.hero.default.title,
        fontSize: {
          base: "1.5rem",
          sm: "4rem", // Even larger on desktop
        },
      },

      // Custom CTA button colors
      cta: {
        ...defaultTheme.components.hero.default.cta,
        primary: {
          light: {
            background: "#a855f7", // Purple button
            backgroundHover: "#9333ea",
            text: "#ffffff",
            shadow: "0 4px 6px -1px rgb(168 85 247 / 0.3)",
          },
          dark: {
            background: "#ffffff",
            backgroundHover: "#f3e8ff",
            text: "#581c87",
            shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          },
          withImage: {
            background: "#ffffff",
            backgroundHover: "#f3e8ff",
            text: "#581c87",
            shadow: "0 4px 6px -1px rgb(0 0 0 / 0.2)",
          },
        },
      },
    },
  },

  // Customize card styling
  card: {
    default: {
      ...defaultTheme.components.card.default,
      borderRadius: "1rem", // More rounded cards
      shadow: "0 10px 15px -3px rgb(168 85 247 / 0.1)",
    },
  },

  // Keep button config from default
  button: defaultTheme.components.button,
};

/**
 * Main Theme Configuration Export
 */
export const themeConfig: ThemeConfig = {
  colors: colorScheme,
  typography,
  spacing: defaultTheme.spacing, // Use default spacing
  borderRadius: {
    ...defaultTheme.borderRadius,
    DEFAULT: "0.5rem", // Slightly more rounded by default
  },
  shadows: defaultTheme.shadows, // Use default shadows
  animations: defaultTheme.animations, // Use default animations
  components,
};

/**
 * Default export
 */
export default themeConfig;

/**
 * USAGE EXAMPLE IN COMPONENTS:
 *
 * Instead of:
 *   import { themeConfig } from '@themes/default/theme-config';
 *
 * Use:
 *   import { themeConfig } from '@themes/your-brand/theme-config';
 *
 * The component code remains the same!
 */

/**
 * ALTERNATIVE: Minimal Override Example
 * If you only need to change colors:
 */

/*
export const minimalTheme: ThemeConfig = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    brand: {
      primary: {
        ...defaultTheme.colors.brand.primary,
        500: '#10b981',  // Just change the main color
        600: '#059669',
      },
    },
  },
};

export default minimalTheme;
*/

/**
 * CSS VARIABLES ALTERNATIVE:
 * Instead of creating a full theme config, you can override CSS variables
 * in your styles/theme-variables.css:
 *
 * :root {
 *   --color-brand-primary-500: #a855f7;
 *   --color-brand-primary-600: #9333ea;
 * }
 *
 * This is simpler but less flexible than the TypeScript approach.
 */
