# Dynamic Tenant Theme System - Final Summary

## Overview

The tenant theme system has been refactored to load theme configurations **dynamically from your backend API** (payload/weblet) instead of hardcoded mappings. This provides maximum flexibility for managing tenant themes at runtime.

## How It Works

### 1. Backend Provides Theme Data

Your payload/weblet API returns tenant data including theme configuration:

```json
{
  "name": "Beanery",
  "domain": "beanery.menovadx.weblethq.com",
  "themeConfig": {
    "colors": {
      "primary": { "500": "255, 69, 0", "600": "234, 61, 0" },
      "secondary": { "500": "100, 116, 139" },
      "accent": { "500": "217, 70, 239" }
    }
  }
}
```

### 2. Frontend Applies Theme

```
Request → Load Tenant API → Extract Theme → Merge with Defaults → Inject CSS Vars → Render
```

1. Tenant loader middleware fetches data from your API
2. Stores in `Astro.locals.tenant`
3. Theme middleware extracts theme from tenant data
4. Merges with defaults (tenant overrides win)
5. Generates CSS variables
6. Injects into page via `<TenantTheme />` component

## Key Files

### Configuration & Types
- **`src/config/tenant-theme-config.ts`** - Theme processing logic, default colors
- **`src/types/tenant.ts`** - TypeScript types for tenant data
- **`src/config/tenant-theme-examples.ts`** - Reference examples for backend

### Implementation
- **`src/middleware/tenant.ts`** - Applies theme from `Astro.locals.tenant`
- **`src/components/TenantTheme.astro`** - Injects CSS variables
- **`src/utils/color-utils.ts`** - Hex↔RGB conversion helpers

### Documentation
- **`BACKEND_API_SPEC.md`** - Complete backend API specification ⭐
- **`TENANT_THEMING_GUIDE.md`** - Frontend usage guide
- **`MIGRATION_GUIDE.md`** - Update existing components
- **`QUICK_START.md`** - Quick start guide

## What You Need to Do

### 1. Implement Tenant Loader Middleware

Create a middleware to load tenant data from your API:

```typescript
// src/middleware/load-tenant.ts
import { defineMiddleware } from 'astro/middleware';

export const loadTenant = defineMiddleware(async (context, next) => {
  const hostname = context.request.headers.get('host') || '';
  
  // Fetch from your payload/weblet API
  const response = await fetch(`${API_URL}/tenants/by-domain?domain=${hostname}`);
  const data = await response.json();
  
  // Store in locals
  context.locals.tenant = data;
  
  return next();
});
```

### 2. Update Middleware Chain

```typescript
// src/middleware/index.ts
import { sequence } from 'astro/middleware';
import { loadTenant } from './load-tenant';
import { tenant } from './tenant';

export const onRequest = sequence(
  loadTenant,  // Load tenant first
  tenant,      // Then apply theme
);
```

### 3. Backend API Response

Ensure your API returns theme data in RGB format:

```json
{
  "id": "tenant-123",
  "name": "Acme Corp",
  "themeConfig": {
    "colors": {
      "primary": {
        "500": "255, 69, 0",
        "600": "234, 61, 0"
      }
    }
  }
}
```

### 4. Convert Hex to RGB (Backend)

Use these helpers in your backend to convert hex to RGB:

**Node.js/TypeScript:**
```typescript
function hexToRgb(hex: string): string {
  const clean = hex.replace(/^#/, '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}
```

**Python:**
```python
def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    rgb = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
    return f"{rgb[0]}, {rgb[1]}, {rgb[2]}"
```

## Color Format Requirements

✅ **Correct**: `"255, 69, 0"` (RGB comma-separated)
❌ **Wrong**: `"#ff4500"` (Hex)
❌ **Wrong**: `"rgb(255, 69, 0)"` (CSS function)

## Default Theme

If no theme is provided in the API response, these defaults are used:

- **Primary**: Blue (`#3b82f6` / `59, 130, 246`)
- **Secondary**: Slate (`#64748b` / `100, 116, 139`)
- **Accent**: Purple (`#d946ef` / `217, 70, 239`)

## Testing

1. **Start dev server**: `npm run dev`
2. **View demo**: `http://localhost:4321/theme-demo`
3. **Mock API response** in your tenant loader for testing
4. **Verify CSS variables** in browser DevTools

## Example Workflow

### Backend (Storing Theme)

```javascript
// When creating/updating tenant
const tenant = {
  name: "Acme Corp",
  domain: "acme.com",
  themeConfig: {
    colors: {
      primary: {
        "500": "255, 69, 0",
        "600": "234, 61, 0"
      }
    }
  }
};

await db.tenants.save(tenant);
```

### Backend (API Response)

```javascript
// GET /api/tenants/by-domain?domain=acme.com
app.get('/api/tenants/by-domain', async (req, res) => {
  const { domain } = req.query;
  const tenant = await db.tenants.findByDomain(domain);
  
  res.json({
    id: tenant.id,
    name: tenant.name,
    domain: tenant.domain,
    themeConfig: tenant.themeConfig, // Already in RGB format
  });
});
```

### Frontend (Automatic)

```astro
<!-- No code needed - theme applies automatically! -->
<button class="bg-primary-500 hover:bg-primary-600">
  Themed Button
</button>
```

## Advantages of This Approach

✅ **No code deploys for theme changes** - Update via API/database
✅ **Centralized management** - All tenant config in one place
✅ **Multi-tenant ready** - Each tenant gets their own theme
✅ **Partial overrides** - Only override what you need
✅ **Type-safe** - Full TypeScript support
✅ **Cached** - Theme data can be cached for performance

## Troubleshooting

### Theme not applying?
- Check `Astro.locals.tenant` has data
- Verify theme middleware runs after tenant loader
- Check CSS variables in DevTools:
  1. Open browser DevTools (F12 or right-click → Inspect)
  2. Go to **Elements** tab (Chrome/Edge) or **Inspector** tab (Firefox)
  3. Look in the `<head>` section for a `<style>` tag with `:root` CSS variables
  4. Click on any element (like a button with `bg-primary-500`)
  5. In the **Computed** tab, search for "background-color" 
  6. Or in **Styles** tab, look for `:root` to see all CSS variables
  7. Verify `--color-primary-500` shows the correct RGB value (e.g., `255, 69, 0`)

### Colors wrong format?
- Ensure RGB format: `"255, 69, 0"`
- Check backend conversion from hex to RGB

### Performance issues?
- Implement caching in tenant loader
- Cache at CDN level for static responses

## Next Steps

1. ✅ Theme system configured
2. 📋 Read `BACKEND_API_SPEC.md` for API requirements
3. 🔧 Implement tenant loader middleware
4. 🎨 Update backend to return theme data
5. 🧪 Test with `/theme-demo` page
6. 🚀 Deploy and verify

## Support Files

- **`BACKEND_API_SPEC.md`** - Complete backend specification
- **`TENANT_THEMING_GUIDE.md`** - How to use themes in components
- **`MIGRATION_GUIDE.md`** - Update existing components
- **`src/types/tenant.ts`** - TypeScript type definitions
- **`src/utils/color-utils.ts`** - Color conversion utilities

---

**Remember**: No hardcoded tenant mappings! All theme data comes from your API. 🎨
