# Tenant Theme Configuration Guide

This guide explains how to configure tenant-specific theme colors that override the default theme.

## Overview

The tenant theming system allows each tenant (identified by hostname) to have custom brand colors while maintaining a consistent default theme. Tenants can override:

- **Primary colors** (10 shades: 50-900)
- **Secondary colors** (10 shades: 50-900)
- **Accent colors** (5 shades: 50, 100, 500, 600, 900)

## How It Works

1. **Default Theme**: Defined in `src/config/tenant-theme-config.ts` with blue primary, slate secondary, and purple accent colors
2. **Tenant Overrides**: Configured per hostname in `TENANT_THEMES` object
3. **Middleware**: Automatically detects tenant and injects custom CSS variables
4. **Tailwind Integration**: Uses CSS variables for dynamic theming

## Adding a New Tenant Theme

### Step 1: Configure Tenant API Response

The tenant theme configuration comes from your payload/weblet API. Ensure your tenant API returns a response with the following structure:

```json
{
  "name": "Your Tenant Name",
  "themeConfig": {
    "colors": {
      "primary": {
        "500": "255, 69, 0",
        "600": "230, 62, 0",
        "700": "204, 55, 0"
      },
      "secondary": {
        "500": "18, 18, 18",
        "600": "28, 28, 28"
      },
      "accent": {
        "500": "255, 215, 0"
      }
    }
  }
}
```

**Note**: The tenant data should be loaded and stored in `Astro.locals.tenant` before the tenant middleware runs.

### Step 2: Color Format

Colors MUST be in RGB format (comma-separated values):

✅ **Correct**: `'255, 69, 0'`
❌ **Wrong**: `'#ff4500'`

You can convert hex to RGB using this formula:
- Hex `#ff4500` = RGB `255, 69, 0`

### Step 3: Partial Overrides

You only need to specify the shades you want to override. Unspecified shades will use the default theme values.

Example API response - only override primary color:
```json
{
  "name": "Minimal Tenant",
  "themeConfig": {
    "colors": {
      "primary": {
        "500": "50, 50, 50"
      }
    }
  }
}
```

## Using Theme Colors in Your Components

### In Tailwind Classes

Use the semantic color names:

```astro
<!-- Primary colors -->
<button class="bg-primary-500 hover:bg-primary-600 text-white">
  Click me
</button>

<!-- Secondary colors -->
<div class="bg-secondary-100 text-secondary-900">
  Content
</div>

<!-- Accent colors -->
<span class="text-accent-500 border-accent-600">
  Highlighted text
</span>
```

### In CSS

You can also use the CSS variables directly:

```css
.custom-element {
  background-color: rgb(var(--color-primary-500));
  color: rgb(var(--color-secondary-900));
  border: 1px solid rgb(var(--color-accent-500));
}

/* With opacity */
.semi-transparent {
  background-color: rgb(var(--color-primary-500) / 0.5);
}
```

## Default Theme Colors

### Primary (Blue)
- 50: `#eff6ff` (very light blue)
- 100: `#dbeafe`
- 500: `#3b82f6` (main blue)
- 600: `#2563eb` (darker blue)
- 900: `#1e3a8a` (very dark blue)

### Secondary (Slate/Gray)
- 50: `#f8fafc` (very light gray)
- 100: `#f1f5f9`
- 500: `#64748b` (medium gray)
- 600: `#475569`
- 900: `#0f172a` (very dark gray)

### Accent (Purple)
- 50: `#fdf4ff` (very light purple)
- 100: `#fae8ff`
- 500: `#d946ef` (vibrant purple)
- 600: `#c026d3`
- 900: `#701a75` (dark purple)

## Testing Your Theme

### Local Development

To test a tenant theme locally, you can:

1. **Modify your hosts file** to point a domain to localhost:
   ```
   127.0.0.1 your-domain.com
   ```

2. **Access via the mapped domain**:
   ```
   http://your-domain.com:4321
   ```

3. **Or use the Host header** (with a tool like ModHeader browser extension)

### Verifying Theme Application

1. Open browser DevTools
2. Inspect an element with theme colors
3. Check the computed styles - you should see your custom RGB values in the CSS variables

## Example: Complete Tenant API Response

```json
{
  "name": "ACME Corp",
  "themeConfig": {
    "colors": {
      "primary": {
        "50": "254, 242, 242",
        "100": "254, 226, 226",
        "200": "254, 202, 202",
        "300": "252, 165, 165",
        "400": "248, 113, 113",
        "500": "239, 68, 68",
        "600": "220, 38, 38",
        "700": "185, 28, 28",
        "800": "153, 27, 27",
        "900": "127, 29, 29"
      },
      "secondary": {
        "500": "30, 58, 138",
        "600": "29, 78, 216",
        "700": "37, 99, 235"
      },
      "accent": {
        "500": "245, 158, 11",
        "600": "217, 119, 6"
      }
    }
  }
}
```

## Color Palette Generation Tools

To generate a full color palette from a single color:

- [Tailwind Color Palette Generator](https://uicolors.app/create)
- [Coolors](https://coolors.co/)
- [Adobe Color](https://color.adobe.com/)

After generating, convert hex codes to RGB format.

## Troubleshooting

### Colors not applying
1. Check that tenant API is returning theme data correctly
2. Verify `Astro.locals.tenant` is populated before tenant middleware runs
3. Verify RGB format is correct in API response (no `#`, comma-separated)
4. Clear browser cache and hard refresh
5. Check browser console for errors

### Wrong colors showing
1. Verify the tenant API response includes the `themeConfig` property
2. Check that middleware is running (see `src/middleware/tenant.ts`)
3. Inspect CSS variables in DevTools to see computed values
4. Log `context.locals.tenant` in middleware to verify data

## Backend Integration

### Required: Tenant API Setup

The theme system expects tenant data to be loaded before the tenant middleware runs. You should:

1. **Load tenant data** based on hostname (typically in a separate middleware)
2. **Store in `Astro.locals.tenant`** so it's available to the tenant middleware
3. **Include theme property** in your tenant API response

Example middleware order in `src/middleware/index.ts`:
```typescript
import { sequence } from 'astro/middleware';
import { loadTenant } from './load-tenant';  // Your tenant loader
import { tenant } from './tenant';            // Theme middleware

export const onRequest = sequence(
  loadTenant,  // Load tenant data first
  tenant,      // Then apply theme
);
```

### Tenant API Response Structure

Your payload/weblet API should return:
```json
{
  "id": "tenant-123",
  "name": "Tenant Name",
  "domain": "tenant.com",
  "themeConfig": {
    "colors": {
      "primary": { "500": "255, 69, 0" },
      "secondary": { "500": "100, 116, 139" },
      "accent": { "500": "217, 70, 239" }
    }
  }
}
```

### Advanced: Dynamic Color Generation

You can enhance your backend API to:

1. Store only base colors and generate shades server-side
2. Support per-user theme preferences
3. Add more color categories (success, warning, error, etc.)
4. Cache theme configurations for performance

See `src/middleware/tenant.ts` and `src/config/tenant-theme-config.ts` for implementation details.
