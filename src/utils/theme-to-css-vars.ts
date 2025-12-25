/**
 * Theme to CSS Variables Utility
 * 
 * This utility converts theme configuration into CSS variables
 * for dynamic theming and runtime theme switching.
 */

import type { ThemeConfig } from '../themes/default/theme-config';

/**
 * Converts a nested object into CSS variable declarations
 * @param obj - The object to convert
 * @param prefix - The CSS variable prefix (e.g., '--theme')
 * @param result - Accumulator for recursive calls
 * @returns Object with CSS variable names as keys and values as values
 */
function flattenObject(
  obj: any,
  prefix: string = '--theme',
  result: Record<string, string> = {}
): Record<string, string> {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = `${prefix}-${key}`;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      flattenObject(value, newKey, result);
    } else if (typeof value === 'string' || typeof value === 'number') {
      result[newKey] = String(value);
    }
  }
  
  return result;
}

/**
 * Generates CSS variables from theme configuration
 * @param theme - The theme configuration object
 * @returns Object with CSS variable names and values
 */
export function generateCSSVariables(theme: ThemeConfig): Record<string, string> {
  const cssVars: Record<string, string> = {};
  
  // Process colors
  if (theme.colors) {
    Object.assign(cssVars, flattenObject(theme.colors, '--color'));
  }
  
  // Process typography
  if (theme.typography) {
    Object.assign(cssVars, flattenObject(theme.typography, '--typography'));
  }
  
  // Process spacing
  if (theme.spacing) {
    Object.assign(cssVars, flattenObject(theme.spacing, '--spacing'));
  }
  
  // Process border radius
  if (theme.borderRadius) {
    Object.assign(cssVars, flattenObject(theme.borderRadius, '--radius'));
  }
  
  // Process shadows
  if (theme.shadows) {
    Object.assign(cssVars, flattenObject(theme.shadows, '--shadow'));
  }
  
  // Process animations
  if (theme.animations) {
    Object.assign(cssVars, flattenObject(theme.animations, '--animation'));
  }
  
  return cssVars;
}

/**
 * Converts CSS variables object into inline style string
 * @param cssVars - Object with CSS variable names and values
 * @returns CSS string for inline styles
 */
export function cssVarsToStyleString(cssVars: Record<string, string>): string {
  return Object.entries(cssVars)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ');
}

/**
 * Generates a CSS string with :root selector
 * @param cssVars - Object with CSS variable names and values
 * @returns CSS string with :root selector
 */
export function cssVarsToCSSString(cssVars: Record<string, string>): string {
  const declarations = Object.entries(cssVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
  
  return `:root {\n${declarations}\n}`;
}

/**
 * Apply theme CSS variables to document
 * @param theme - The theme configuration object
 * @param mode - 'light' or 'dark' mode
 */
export function applyThemeToDocument(theme: ThemeConfig, mode: 'light' | 'dark' = 'light'): void {
  if (typeof document === 'undefined') return;
  
  const cssVars = generateCSSVariables(theme);
  const root = document.documentElement;
  
  // Apply CSS variables
  Object.entries(cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  
  // Set theme mode
  if (mode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

/**
 * Get CSS variable value
 * @param varName - The CSS variable name (with or without --)
 * @returns The computed value of the CSS variable
 */
export function getCSSVariable(varName: string): string {
  if (typeof document === 'undefined') return '';
  
  const name = varName.startsWith('--') ? varName : `--${varName}`;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/**
 * Helper to create scoped theme utilities
 * @param theme - The theme configuration object
 * @returns Object with theme utility functions
 */
export function createThemeUtils(theme: ThemeConfig) {
  return {
    /**
     * Get a color value from the theme
     */
    getColor: (path: string) => {
      const parts = path.split('.');
      let value: any = theme.colors;
      
      for (const part of parts) {
        value = value?.[part];
      }
      
      return typeof value === 'string' ? value : undefined;
    },
    
    /**
     * Get a typography value from the theme
     */
    getTypography: (path: string) => {
      const parts = path.split('.');
      let value: any = theme.typography;
      
      for (const part of parts) {
        value = value?.[part];
      }
      
      return typeof value === 'string' ? value : undefined;
    },
    
    /**
     * Get a spacing value from the theme
     */
    getSpacing: (path: string) => {
      const parts = path.split('.');
      let value: any = theme.spacing;
      
      for (const part of parts) {
        value = value?.[part];
      }
      
      return typeof value === 'string' ? value : undefined;
    },
    
    /**
     * Get a component config from the theme
     */
    getComponentConfig: (componentName: string) => {
      return theme.components[componentName as keyof typeof theme.components];
    },
    
    /**
     * Generate CSS variables for the theme
     */
    toCSSVariables: () => generateCSSVariables(theme),
    
    /**
     * Generate inline style string
     */
    toStyleString: () => cssVarsToStyleString(generateCSSVariables(theme)),
    
    /**
     * Generate CSS string with :root
     */
    toCSSString: () => cssVarsToCSSString(generateCSSVariables(theme)),
  };
}

/**
 * Example usage in an Astro component:
 * 
 * ---
 * import { themeConfig } from '@themes/default/theme-config';
 * import { createThemeUtils } from '@utils/theme-to-css-vars';
 * 
 * const theme = createThemeUtils(themeConfig);
 * const primaryColor = theme.getColor('brand.primary.500');
 * ---
 * 
 * <div style={`color: ${primaryColor};`}>
 *   Themed content
 * </div>
 */

export default {
  generateCSSVariables,
  cssVarsToStyleString,
  cssVarsToCSSString,
  applyThemeToDocument,
  getCSSVariable,
  createThemeUtils,
};
