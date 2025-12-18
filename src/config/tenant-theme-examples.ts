/**
 * Example Tenant Theme Configurations
 *
 * This file shows examples of theme configurations that should be returned
 * from your backend API (payload/weblet). These are NOT used directly in the app,
 * but serve as reference for building your backend responses.
 *
 * Use the color utilities to generate RGB values for your backend API.
 */

import {
  hexToRgb,
  convertPaletteHexToRgb,
  generateSimplePalette,
} from "../utils/color-utils";
import type { TenantThemeConfig } from "./tenant-theme-config";
import type { TenantData } from "../types/tenant";

/**
 * Example 1: Manually specify RGB values
 * Best for: When you already have RGB values or converted them externally
 */
export const manualRgbExample: TenantThemeConfig = {
  colors: {
    primary: {
      50: "254, 242, 242",
      100: "254, 226, 226",
      500: "239, 68, 68", // Red-500
      600: "220, 38, 38",
      900: "127, 29, 29",
    },
  },
};

/**
 * Example 2: Convert hex colors on-the-fly
 * Best for: When you have hex values and want quick conversion
 */
export const hexConversionExample: TenantThemeConfig = {
  colors: {
    primary: {
      50: hexToRgb("#fef2f2"),
      100: hexToRgb("#fee2e2"),
      500: hexToRgb("#ef4444"), // Red-500
      600: hexToRgb("#dc2626"),
      900: hexToRgb("#7f1d1d"),
    },
  },
};

/**
 * Example 3: Convert entire palette from color generator
 * Best for: When you generated a palette using UIColors.app or similar
 */
export const paletteConversionExample: TenantThemeConfig = {
  colors: {
    primary: convertPaletteHexToRgb({
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316", // Orange-500
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12",
    }),
    accent: convertPaletteHexToRgb({
      500: "#8b5cf6", // Violet-500
      600: "#7c3aed",
    }),
  },
};

/**
 * Example 4: Generate palette from single color
 * Best for: Quick setup with one brand color
 * Note: Generated palettes are basic - use a proper tool for production
 */
export const generatedPaletteExample: TenantThemeConfig = {
  colors: {
    primary: generateSimplePalette("#ff4500"), // OrangeRed
  },
};

/**
 * Example 5: Corporate brand example (Coca-Cola inspired)
 * Shows a real-world corporate branding scenario
 */
export const corporateExample: TenantThemeConfig = {
  colors: {
    primary: convertPaletteHexToRgb({
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#f40009", // Coca-Cola red
      600: "#dc0007",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
    }),
    secondary: {
      500: hexToRgb("#1a1a1a"), // Near black
      600: hexToRgb("#0a0a0a"),
    },
    accent: {
      500: hexToRgb("#f0f0f0"), // Off-white for accents
    },
  },
};

/**
 * Example 6: Tech startup (Modern blue/purple)
 */
export const techStartupExample: TenantThemeConfig = {
  colors: {
    primary: convertPaletteHexToRgb({
      50: "#eff6ff",
      100: "#dbeafe",
      500: "#3b82f6", // Modern blue
      600: "#2563eb",
      900: "#1e3a8a",
    }),
    accent: convertPaletteHexToRgb({
      50: "#faf5ff",
      100: "#f3e8ff",
      500: "#a855f7", // Purple
      600: "#9333ea",
      900: "#581c87",
    }),
  },
};

/**
 * Example 7: E-commerce (Green for trust/growth)
 */
export const ecommerceExample: TenantThemeConfig = {
  colors: {
    primary: convertPaletteHexToRgb({
      50: "#f0fdf4",
      100: "#dcfce7",
      500: "#22c55e", // Green-500
      600: "#16a34a",
      900: "#14532d",
    }),
    secondary: convertPaletteHexToRgb({
      50: "#fafaf9",
      100: "#f5f5f4",
      500: "#78716c", // Stone-500
      600: "#57534e",
      900: "#1c1917",
    }),
  },
};

/**
 * Example 8: Minimal override (only change one color)
 * Best for: Quick brand color application
 */
export const minimalExample: TenantThemeConfig = {
  colors: {
    primary: {
      500: hexToRgb("#ff4500"), // Just override the main brand color
    },
  },
};

/**
 * Example 9: Financial services (Conservative blue/navy)
 */
export const financialExample: TenantThemeConfig = {
  colors: {
    primary: {
      50: hexToRgb("#eff6ff"),
      100: hexToRgb("#dbeafe"),
      500: hexToRgb("#1e40af"), // Navy blue
      600: hexToRgb("#1e3a8a"),
      900: hexToRgb("#172554"),
    },
    secondary: {
      500: hexToRgb("#475569"), // Neutral slate
      600: hexToRgb("#334155"),
    },
    accent: {
      500: hexToRgb("#0ea5e9"), // Sky blue for CTAs
      600: hexToRgb("#0284c7"),
    },
  },
};

/**
 * Example 10: Creative agency (Vibrant multi-color)
 */
export const creativeAgencyExample: TenantThemeConfig = {
  colors: {
    primary: convertPaletteHexToRgb({
      500: "#ec4899", // Pink-500
      600: "#db2777",
    }),
    secondary: convertPaletteHexToRgb({
      500: "#8b5cf6", // Purple-500
      600: "#7c3aed",
    }),
    accent: convertPaletteHexToRgb({
      500: "#f59e0b", // Amber-500
      600: "#d97706",
    }),
  },
};

/**
 * Backend API Response Examples
 *
 * These show what your backend API should return for different tenant scenarios.
 */

/**
 * Example API response for a branded tenant
 */
export const brandedTenantAPIResponse: TenantData = {
  id: "tenant-001",
  name: "Branded Company",
  domain: "branded.com",
  theme: brandedExample,
};

/**
 * Example API response for a corporate tenant
 */
export const corporateTenantAPIResponse: TenantData = {
  id: "tenant-002",
  name: "ACME Corporation",
  domain: "acme-corp.com",
  theme: corporateExample,
};

/**
 * Example API response for a tech startup
 */
export const techStartupAPIResponse: TenantData = {
  id: "tenant-003",
  name: "TechStart Inc",
  domain: "techstart.com",
  theme: techStartupExample,
};

/**
 * How to use these examples in your backend:
 *
 * 1. Store tenant theme data in your database
 * 2. Use the color utilities to convert hex to RGB when saving:
 *
 *    const primaryColor = hexToRgb('#ff4500'); // "255, 69, 0"
 *
 * 3. Return theme data in your API response:
 *
 *    GET /api/tenants/by-domain?domain=example.com
 *    Response: {
 *      "id": "tenant-123",
 *      "name": "Example Tenant",
 *      "theme": {
 *        "colors": {
 *          "primary": { "500": "255, 69, 0" }
 *        }
 *      }
 *    }
 *
 * 4. The frontend will automatically apply the theme
 *
 * See BACKEND_API_SPEC.md for complete API specifications.
 */
