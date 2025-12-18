# Tenant Theme System - Implementation Summary

## What Was Implemented

A complete **dynamic multi-tenant theming system** that loads tenant-specific theme configurations from your backend API (payload/weblet) and applies them automatically. Each tenant can override default theme colors without code changes or deployments.

## Architecture

**Data Flow:**
```
Backend API → Tenant Loader → Astro.locals.tenant → Theme Middleware → CSS Variables → Page Render
```

**Key Principle:** Theme configurations are NOT hardcoded - they come from your backend API response.

## Files Created/Modified

### New Files Created

1. **`src/config/tenant-theme-config.ts`**
   - Defines tenant theme configuration interface
   - Contains default theme colors (blue primary, slate secondary, purple accent)
   - Manages per-tenant color overrides
   - Provides utility functions for theme merging and CSS variable generation

2. **`src/components/TenantTheme.astro`**
   - Component that injects tenant-specific CSS variables into the page
   - Automatically included in the layout's `<head>`

3. **`src/utils/color-utils.ts`**
   - Helper functions for color conversion (hex to RGB and vice versa)
   - Palette generation utilities
   - Color validation functions
   - **Use these in your backend to convert hex colors to RGB format**

4. **`src/types/tenant.ts`**
   - TypeScript types for tenant data from API
   - Example tenant response structures

5. **`BACKEND_API_SPEC.md`** ⭐
   - **Complete specification for backend API**
   - Required response structure
   - Color format requirements
   - Database schema examples
   - Conversion examples for multiple languages

6. **`TENANT_THEMING_GUIDE.md`**
   - Comprehensive documentation on how to use the tenant theming system
   - Examples and best practices
   - Troubleshooting guide

7. **`MIGRATION_GUIDE.md`**
   - How to update existing components to use theme colors

8. **`DYNAMIC_THEMES_README.md`** ⭐
   - **Quick reference for the dynamic theme system**
   - Backend integration requirements
   - Complete workflow examples
   - Demo page showing all theme colors in action
   - Component examples using theme colors
   - Useful for testing tenant configurations

### Files Modified

1. **`src/middleware/tenant.ts`**
   - Now loads tenant-specific theme configuration from `Astro.locals.tenant`
   - Extracts theme from tenant API data
   - Merges tenant overrides with default theme
   - Stores CSS variables in `Astro.locals` for use in layouts

2. **`src/pages/env.d.ts`**
   - Added `themeCSSVars` to the `App.Locals` interface

3. **`src/layouts/layout.astro`**
   - Now imports and includes `TenantTheme` component
   - Automatically injects tenant-specific CSS variables

4. **`tailwind.config.mjs`**
   - Expanded to include all color shades (50-900) for primary, secondary, and accent
   - Uses RGB CSS variables for dynamic theming

5. **`src/styles/theme-variables.css`**
   - Updated with RGB format for tenant-overridable colors
   - Maintains backward compatibility with legacy brand colors

## How It Works

### 1. Request Flow

```
Request → Load Tenant → Tenant Middleware → Theme Processing → CSS Variables → Page Render
```

1. User accesses the site from a specific hostname
2. Tenant loader middleware fetches tenant data from payload/weblet API
3. Tenant data (including theme) is stored in `Astro.locals.tenant`
4. Tenant middleware extracts theme configuration from tenant data
5. Theme is merged with defaults (tenant overrides take precedence)
6. CSS variables are generated and stored in `Astro.locals.themeCSSVars`
7. Layout injects CSS variables via `TenantTheme` component
8. Page renders with tenant-specific colors

### 2. Color System

**Format**: Colors are stored in RGB format (e.g., `'59, 130, 246'`) to support Tailwind's opacity modifiers:

```html
<!-- Works with opacity -->
<div class="bg-primary-500/50">50% opacity</div>
```

**Inheritance**: Tenants only need to override the colors they want to change:

```typescript
'tenant.com': {
  colors: {
    primary: {
      500: '255, 69, 0',  // Only override main color
    },
  },
}
// All other shades use defaults
```

### 3. Usage in Components

**Tailwind Classes** (Recommended):
```html
<button class="bg-primary-500 hover:bg-primary-600">
  Button
</button>
```

**CSS Variables** (Advanced):
```css
.custom {
  background-color: rgb(var(--color-primary-500));
}
```

## Quick Start: Setting Up Tenant Themes

1. **Configure your backend API** to return tenant data with theme:
```json
{
  "name": "Your Tenant",
  "theme": {
    "colors": {
      "primary": { "500": "255, 69, 0" },
      "secondary": { "500": "100, 116, 139" }
    }
  }
}
```

2. **Ensure tenant data loads** before theme middleware:
```typescript
// In your tenant loader middleware
context.locals.tenant = await fetchTenantData(hostname);
```

3. **Convert hex to RGB** (if needed in your backend):
```typescript
import { hexToRgb } from './utils/color-utils';
const rgb = hexToRgb('#ff4500'); // Returns '255, 69, 0'
```

4. **Test** by visiting your tenant domain

5. **View demo** at `/theme-demo` to see all colors

## Default Theme Colors

- **Primary**: Blue (`#3b82f6` → `59, 130, 246`)
- **Secondary**: Slate/Gray (`#64748b` → `100, 116, 139`)
- **Accent**: Purple (`#d946ef` → `217, 70, 239`)

## Key Features

✅ **Dynamic theming** per tenant/hostname
✅ **Partial overrides** - only override what you need
✅ **Tailwind integration** - full opacity support
✅ **Default fallback** - unrecognized tenants use default theme
✅ **Type-safe** - TypeScript interfaces for theme config
✅ **Easy conversion** - hex to RGB utilities included
✅ **Demo page** - visual testing of theme colors
✅ **Comprehensive docs** - guide and examples

## Next Steps

1. **Add your tenant configurations** in `tenant-theme-config.ts`
2. **Test locally** using the demo page
3. **Deploy** and verify on actual tenant domains
4. **Extend** the system:
   - Add database integration for dynamic tenant configs
   - Support per-user theme preferences
   - Add more color categories (success, warning, error)
   - Implement automatic palette generation from a single brand color

## Maintenance

- **Adding new tenants**: Update tenant data in your backend API/database
- **Changing defaults**: Edit `DEFAULT_THEME_COLORS` in `tenant-theme-config.ts`
- **Adding color shades**: Update both the default config and Tailwind config
- **Testing changes**: Use `/theme-demo` page for visual verification
- **Debugging**: Check `Astro.locals.tenant` and `Astro.locals.themeCSSVars` in middleware

## Support

See `TENANT_THEMING_GUIDE.md` for detailed documentation, examples, and troubleshooting.
