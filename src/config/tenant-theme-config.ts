/**
 * Tenant Theme Configuration
 *
 * This file defines the structure for tenant-specific theme overrides.
 * Tenants can override default colors while keeping other theme settings intact.
 *
 * IMPORTANT: Tenant theme configurations are NOT hardcoded here.
 * They come from your backend API (payload/weblet) as part of the tenant data.
 *
 * The tenant API should return a response with this structure:
 * {
 *   "name": "Tenant Name",
 *   "theme": {
 *     "colors": {
 *       "primary": { "500": "255, 69, 0", ... },
 *       "secondary": { ... },
 *       "accent": { ... }
 *     }
 *   }
 * }
 *
 * See BACKEND_API_SPEC.md for complete API documentation.
 */

export interface TenantThemeColors {
  primary?: {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
  };
  secondary?: {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
  };
  accent?: {
    50?: string;
    100?: string;
    500?: string;
    600?: string;
    900?: string;
  };
}

export interface TenantThemeConfig {
  colors?: TenantThemeColors;
  // You can add more tenant-specific overrides here
  // typography?: Partial<TypographyConfig>;
  // spacing?: Partial<SpacingConfig>;
}

/**
 * Default theme colors - used when tenant doesn't specify overrides
 */
export const DEFAULT_THEME_COLORS: TenantThemeColors = {
  primary: {
    50: "239, 246, 255", // #eff6ff
    100: "219, 234, 254", // #dbeafe
    200: "191, 219, 254", // #bfdbfe
    300: "147, 197, 253", // #93c5fd
    400: "96, 165, 250", // #60a5fa
    500: "59, 130, 246", // #3b82f6
    600: "37, 99, 235", // #2563eb
    700: "29, 78, 216", // #1d4ed8
    800: "30, 64, 175", // #1e40af
    900: "30, 58, 138", // #1e3a8a
  },
  secondary: {
    50: "248, 250, 252", // #f8fafc
    100: "241, 245, 249", // #f1f5f9
    200: "226, 232, 240", // #e2e8f0
    300: "203, 213, 225", // #cbd5e1
    400: "148, 163, 184", // #94a3b8
    500: "100, 116, 139", // #64748b
    600: "71, 85, 105", // #475569
    700: "51, 65, 85", // #334155
    800: "30, 41, 59", // #1e293b
    900: "15, 23, 42", // #0f172a
  },
  accent: {
    50: "253, 244, 255", // #fdf4ff
    100: "250, 232, 255", // #fae8ff
    500: "217, 70, 239", // #d946ef
    600: "192, 38, 211", // #c026d3
    900: "112, 26, 117", // #701a75
  },
};

/**
 * Extract theme configuration from tenant API response
 * The tenant object from payload/weblet should contain a themeConfig property
 *
 * Expected tenant structure:
 * {
 *   name: "Tenant Name",
 *   themeConfig: {
 *     colors: {
 *       primary: { 500: "255, 69, 0", ... },
 *       secondary: { ... },
 *       accent: { ... }
 *     }
 *   }
 * }
 */
export function getTenantTheme(tenant: any): TenantThemeConfig {
  // If tenant has themeConfig, use it
  if (tenant?.themeConfig) {
    return tenant.themeConfig;
  }
  // Fallback to empty config (will use defaults)
  return {};
}

/**
 * Merge tenant theme with default theme
 * Tenant colors override defaults
 */
export function mergeWithDefaultTheme(
  tenantTheme: TenantThemeConfig
): TenantThemeColors {
  const mergedColors: TenantThemeColors = {
    primary: {
      ...DEFAULT_THEME_COLORS.primary,
      ...tenantTheme.colors?.primary,
    },
    secondary: {
      ...DEFAULT_THEME_COLORS.secondary,
      ...tenantTheme.colors?.secondary,
    },
    accent: {
      ...DEFAULT_THEME_COLORS.accent,
      ...tenantTheme.colors?.accent,
    },
  };

  return mergedColors;
}

/**
 * Convert theme colors to CSS variables object
 */
export function themeToCSSVars(
  colors: TenantThemeColors
): Record<string, string> {
  const cssVars: Record<string, string> = {};

  // Convert primary colors
  if (colors.primary) {
    Object.entries(colors.primary).forEach(([shade, value]) => {
      cssVars[`--color-primary-${shade}`] = value;
    });
  }

  // Convert secondary colors
  if (colors.secondary) {
    Object.entries(colors.secondary).forEach(([shade, value]) => {
      cssVars[`--color-secondary-${shade}`] = value;
    });
  }

  // Convert accent colors
  if (colors.accent) {
    Object.entries(colors.accent).forEach(([shade, value]) => {
      cssVars[`--color-accent-${shade}`] = value;
    });
  }

  return cssVars;
}
