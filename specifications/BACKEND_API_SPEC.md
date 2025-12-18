# Tenant API Specification for Theme System

This document describes the required API response structure for tenant data to support the theme system.

## Overview

The theme system expects tenant data to be available in `Astro.locals.tenant` before the tenant middleware runs. Your backend API (payload/weblet) should provide tenant data including optional theme overrides.

## Required Middleware Setup

Your application should have a middleware that loads tenant data before the theme middleware:

```typescript
// src/middleware/load-tenant.ts
import { defineMiddleware } from 'astro/middleware';

export const loadTenant = defineMiddleware(async (context, next) => {
  const hostname = context.request.headers.get('host') || '';
  
  // Fetch tenant data from your API
  const tenantData = await fetchTenantFromAPI(hostname);
  
  // Store in locals for use by theme middleware
  context.locals.tenant = tenantData;
  
  return next();
});
```

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

## API Response Structure

### Minimal Response (Uses Default Theme)

```json
{
  "id": "tenant-123",
  "name": "My Tenant",
  "domain": "example.com"
}
```

**Result**: All default theme colors will be used (blue primary, slate secondary, purple accent).

### Partial Theme Override

```json
{
  "id": "tenant-123",
  "name": "My Tenant",
  "domain": "example.com",
  "themeConfig": {
    "colors": {
      "primary": {
        "500": "255, 69, 0"
      }
    }
  }
}
```

**Result**: 
- Primary-500 uses the custom color `#ff4500` (255, 69, 0)
- All other primary shades (50, 100, 600, 900, etc.) use defaults
- Secondary and accent colors use defaults

### Full Theme Override

```json
{
  "id": "tenant-123",
  "name": "My Tenant",
  "domain": "example.com",
  "theme": {
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
        "50": "248, 250, 252",
        "100": "241, 245, 249",
        "200": "226, 232, 240",
        "300": "203, 213, 225",
        "400": "148, 163, 184",
        "500": "100, 116, 139",
        "600": "71, 85, 105",
        "700": "51, 65, 85",
        "800": "30, 41, 59",
        "900": "15, 23, 42"
      },
      "accent": {
        "50": "253, 244, 255",
        "100": "250, 232, 255",
        "500": "217, 70, 239",
        "600": "192, 38, 211",
        "900": "112, 26, 117"
      }
    }
  }
}
```

## Color Format Requirements

### RGB Format (Required)

All color values MUST be in RGB format as comma-separated strings:

✅ **Correct**: `"255, 69, 0"`
❌ **Wrong**: `"#ff4500"` or `"rgb(255, 69, 0)"`

### Why RGB Format?

Tailwind CSS requires RGB values for opacity modifiers to work:

```html
<!-- This works with RGB format -->
<div class="bg-primary-500/50">50% opacity</div>
```

### Converting Hex to RGB

**Server-side (Node.js/TypeScript)**:
```typescript
function hexToRgb(hex: string): string {
  const cleanHex = hex.replace(/^#/, '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

// Usage
const rgb = hexToRgb('#ff4500'); // Returns "255, 69, 0"
```

**Python**:
```python
def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    rgb = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
    return f"{rgb[0]}, {rgb[1]}, {rgb[2]}"

# Usage
rgb = hex_to_rgb('#ff4500')  # Returns "255, 69, 0"
```

## Color Shade Guidelines

### Primary Colors (10 shades)
Main brand color used for primary actions and brand identity.

- **50**: Very light (backgrounds)
- **100**: Light (hover states, borders)
- **500**: Base color (main brand color)
- **600**: Darker (hover states for buttons)
- **900**: Very dark (text on light backgrounds)

### Secondary Colors (10 shades)
Neutral colors for text, borders, and backgrounds.

- **50**: Very light gray (subtle backgrounds)
- **100**: Light gray (borders, dividers)
- **500**: Medium gray (secondary text)
- **600**: Dark gray (primary text)
- **900**: Very dark gray (headings)

### Accent Colors (5 shades)
Used for highlights, badges, and call-to-actions.

- **50**: Very light (backgrounds)
- **100**: Light (subtle highlights)
- **500**: Base accent color
- **600**: Darker accent
- **900**: Very dark accent

## Database Schema Recommendations

### SQL Example

```sql
CREATE TABLE tenants (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  domain VARCHAR(255) UNIQUE NOT NULL,
  theme_colors_primary_50 VARCHAR(20),
  theme_colors_primary_100 VARCHAR(20),
  theme_colors_primary_500 VARCHAR(20),
  theme_colors_primary_600 VARCHAR(20),
  theme_colors_primary_900 VARCHAR(20),
  -- Add other shades as needed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### MongoDB/JSON Example

```json
{
  "_id": "tenant-123",
  "name": "My Tenant",
  "domain": "example.com",
  "themeConfig": {
    "colors": {
      "primary": {
        "50": "254, 242, 242",
        "500": "239, 68, 68",
        "600": "220, 38, 38"
      }
    }
  },
  "createdAt": "2025-12-19T00:00:00Z"
}
```

## API Endpoint Examples

### REST API

```
GET /api/tenants/by-domain?domain=example.com
GET /api/tenants/{tenantId}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "tenant-123",
    "name": "My Tenant",
    "domain": "example.com",
    "theme": {
      "colors": {
        "primary": {
          "500": "255, 69, 0"
        }
      }
    }
  }
}
```

### GraphQL

```graphql
query GetTenantByDomain($domain: String!) {
  tenant(domain: $domain) {
    id
    name
    domain
    themeConfig {
      colors {
        primary {
          shade50: value_50
          shade500: value_500
          shade600: value_600
        }
      }
    }
  }
}
```

## Caching Recommendations

For performance, implement caching:

```typescript
// Example with Redis
async function fetchTenantFromAPI(hostname: string) {
  const cacheKey = `tenant:${hostname}`;
  
  // Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Fetch from API
  const tenant = await api.getTenantByDomain(hostname);
  
  // Cache for 1 hour
  await redis.setex(cacheKey, 3600, JSON.stringify(tenant));
  
  return tenant;
}
```

## Validation

### TypeScript Validation

```typescript
import type { TenantData } from './types/tenant';

function validateTenantTheme(tenant: TenantData): boolean {
  if (!tenant.themeConfig?.colors) return true; // No theme is valid
  
  const { colors } = tenant.themeConfig;
  
  // Validate RGB format
  const rgbPattern = /^\d{1,3},\s*\d{1,3},\s*\d{1,3}$/;
  
  for (const colorType of ['primary', 'secondary', 'accent']) {
    const color = colors[colorType];
    if (color) {
      for (const [shade, value] of Object.entries(color)) {
        if (!rgbPattern.test(value)) {
          console.error(`Invalid RGB format for ${colorType}-${shade}: ${value}`);
          return false;
        }
      }
    }
  }
  
  return true;
}
```

## Testing Your API

Use these example payloads to test your implementation:

1. **Test without theme** (should use defaults)
2. **Test with partial theme** (primary only)
3. **Test with full theme** (all colors)
4. **Test with invalid RGB format** (should handle gracefully)
5. **Test with missing tenant** (should fallback to defaults)

## Support

- See `TENANT_THEMING_GUIDE.md` for theme usage
- See `src/types/tenant.ts` for TypeScript types
- See `src/config/tenant-theme-config.ts` for implementation
