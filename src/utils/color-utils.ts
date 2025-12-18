/**
 * Color Utilities for Tenant Theming
 * 
 * Helper functions to convert and work with colors in the tenant theme system.
 */

/**
 * Converts a hex color to RGB format (comma-separated string)
 * @param hex - Hex color string (with or without #)
 * @returns RGB string in format "r, g, b" (e.g., "59, 130, 246")
 * 
 * @example
 * hexToRgb('#3b82f6') // Returns '59, 130, 246'
 * hexToRgb('3b82f6')  // Returns '59, 130, 246'
 */
export function hexToRgb(hex: string): string {
  // Remove # if present
  const cleanHex = hex.replace(/^#/, '');
  
  // Parse hex to RGB
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
}

/**
 * Converts RGB string to hex color
 * @param rgb - RGB string in format "r, g, b"
 * @returns Hex color string with # prefix
 * 
 * @example
 * rgbToHex('59, 130, 246') // Returns '#3b82f6'
 */
export function rgbToHex(rgb: string): string {
  const [r, g, b] = rgb.split(',').map(s => parseInt(s.trim()));
  
  const toHex = (n: number) => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Converts an object of hex colors to RGB format
 * Useful for converting a palette from a color generator
 * 
 * @example
 * const hexPalette = {
 *   50: '#eff6ff',
 *   500: '#3b82f6',
 *   900: '#1e3a8a',
 * };
 * const rgbPalette = convertPaletteHexToRgb(hexPalette);
 * // Returns: { 50: '239, 246, 255', 500: '59, 130, 246', 900: '30, 58, 138' }
 */
export function convertPaletteHexToRgb(
  palette: Record<string, string>
): Record<string, string> {
  const result: Record<string, string> = {};
  
  for (const [shade, hex] of Object.entries(palette)) {
    result[shade] = hexToRgb(hex);
  }
  
  return result;
}

/**
 * Generates a basic color palette from a single base color
 * Creates lighter and darker shades
 * Note: For production use, consider using a proper color palette generator
 * 
 * @param baseHex - Base color in hex format
 * @returns Object with color shades 50-900 in RGB format
 */
export function generateSimplePalette(baseHex: string): Record<string, string> {
  const base = hexToRgb(baseHex);
  const [r, g, b] = base.split(',').map(s => parseInt(s.trim()));
  
  // Simple palette generation (not as sophisticated as Tailwind's)
  const shades: Record<string, string> = {
    50: lighten(r, g, b, 0.95),
    100: lighten(r, g, b, 0.9),
    200: lighten(r, g, b, 0.75),
    300: lighten(r, g, b, 0.5),
    400: lighten(r, g, b, 0.25),
    500: base, // Base color
    600: darken(r, g, b, 0.1),
    700: darken(r, g, b, 0.25),
    800: darken(r, g, b, 0.4),
    900: darken(r, g, b, 0.55),
  };
  
  return shades;
}

/**
 * Lightens a color by a given amount
 */
function lighten(r: number, g: number, b: number, amount: number): string {
  const newR = Math.round(r + (255 - r) * amount);
  const newG = Math.round(g + (255 - g) * amount);
  const newB = Math.round(b + (255 - b) * amount);
  
  return `${newR}, ${newG}, ${newB}`;
}

/**
 * Darkens a color by a given amount
 */
function darken(r: number, g: number, b: number, amount: number): string {
  const newR = Math.round(r * (1 - amount));
  const newG = Math.round(g * (1 - amount));
  const newB = Math.round(b * (1 - amount));
  
  return `${newR}, ${newG}, ${newB}`;
}

/**
 * Validates if a string is in correct RGB format
 */
export function isValidRgbFormat(rgb: string): boolean {
  const parts = rgb.split(',');
  
  if (parts.length !== 3) return false;
  
  return parts.every(part => {
    const num = parseInt(part.trim());
    return !isNaN(num) && num >= 0 && num <= 255;
  });
}

/**
 * Example usage for quick tenant config generation
 */
export const exampleTenantConfig = {
  // Convert a single hex color to RGB for immediate use
  quickColor: hexToRgb('#ff4500'), // '255, 69, 0'
  
  // Convert an entire palette
  paletteExample: convertPaletteHexToRgb({
    50: '#fff7ed',
    100: '#ffedd5',
    500: '#f97316',
    600: '#ea580c',
    900: '#7c2d12',
  }),
  
  // Generate a simple palette from one color
  generatedPalette: generateSimplePalette('#3b82f6'),
};
