/**
 * Tenant Data Types
 *
 * Types for tenant data coming from payload/weblet API
 */

import type { TenantThemeConfig } from "../config/tenant-theme-config";

/**
 * Complete tenant data structure from API
 */
export interface TenantData {
  id?: string;
  name: string;
  domain?: string;
  domains?: Array<{ domain: string; id: string }>;
  theme?: any; // The theme object (metadata about theme)
  themeConfig?: TenantThemeConfig; // The actual color configuration

  // Dynamic CSS options - NEW!
  themeCssUrl?: string; // URL to complete theme.css file (highest priority)
  themeCssContent?: string; // Raw CSS content as string (alternative to URL)

  demo?: boolean;
  // Add other tenant properties as needed
  [key: string]: any;
}

/**
 * Example tenant API responses for reference
 */
export const exampleTenantResponses = {
  /**
   * Minimal tenant - uses all default colors
   */
  minimal: {
    name: "Default Tenant",
    domain: "example.com",
  } as TenantData,

  /**
   * Branded tenant - overrides primary color only
   */
  branded: {
    name: "Branded Tenant",
    domain: "branded.com",
    themeConfig: {
      colors: {
        primary: {
          500: "255, 69, 0", // #ff4500 OrangeRed
          600: "230, 62, 0",
        },
      },
    },
  } as TenantData,

  /**
   * Fully customized tenant - overrides all colors
   */
  fullyCustomized: {
    name: "Custom Tenant",
    domain: "custom.com",
    themeConfig: {
      colors: {
        primary: {
          50: "254, 242, 242",
          100: "254, 226, 226",
          200: "254, 202, 202",
          300: "252, 165, 165",
          400: "248, 113, 113",
          500: "239, 68, 68",
          600: "220, 38, 38",
          700: "185, 28, 28",
          800: "153, 27, 27",
          900: "127, 29, 29",
        },
        secondary: {
          50: "248, 250, 252",
          100: "241, 245, 249",
          500: "100, 116, 139",
          600: "71, 85, 105",
          900: "15, 23, 42",
        },
        accent: {
          50: "253, 244, 255",
          100: "250, 232, 255",
          500: "217, 70, 239",
          600: "192, 38, 211",
          900: "112, 26, 117",
        },
      },
    },
  } as TenantData,
};
