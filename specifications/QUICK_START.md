# Tenant Theme System - Quick Start

## Test the Implementation

### 1. Start Development Server
```powershell
npm run dev
```

### 2. View Theme Demo
Navigate to: http://localhost:4321/theme-demo

### 3. Test with Custom Tenant (Local)

#### Option A: Modify Hosts File

**Windows** (`C:\Windows\System32\drivers\etc\hosts`):
```
127.0.0.1 example-tenant.com
127.0.0.1 dark-theme-tenant.com
```

**Mac/Linux** (`/etc/hosts`):
```
127.0.0.1 example-tenant.com
127.0.0.1 dark-theme-tenant.com
```

Then access:
- http://example-tenant.com:4321/theme-demo
- http://dark-theme-tenant.com:4321/theme-demo

#### Option B: Use Browser Extension

1. Install **ModHeader** (Chrome/Edge) or **Modify Header Value** (Firefox)
2. Add header: `Host: example-tenant.com`
3. Visit http://localhost:4321/theme-demo

### 4. Configure Your Tenant API

Ensure your payload/weblet API returns tenant data with theme configuration:

```json
{
  "name": "Your Tenant",
  "themeConfig": {
    "colors": {
      "primary": {
        "500": "255, 69, 0"
      }
    }
  }
}
```

The tenant data should be loaded and stored in `Astro.locals.tenant` before the tenant middleware runs.

### 5. Convert Hex to RGB

If you have hex colors:

```typescript
import { hexToRgb } from './utils/color-utils';

// In Node REPL or test file:
console.log(hexToRgb('#ff4500')); // Output: '255, 69, 0'
```

### 6. Use in Components

```astro
<!-- Your component -->
<button class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded">
  Tenant-Themed Button
</button>
```

## Files to Know

- **Config**: `src/config/tenant-theme-config.ts` - Theme configuration logic
- **Examples**: `src/config/tenant-theme-examples.ts` - Example theme structures
- **Utils**: `src/utils/color-utils.ts` - Color conversion helpers
- **Middleware**: `src/middleware/tenant.ts` - Theme application logic
- **Demo**: `src/pages/theme-demo.astro` - Visual test page
- **Docs**: `TENANT_THEMING_GUIDE.md` - Full documentation

## Quick Commands

```powershell
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Next Steps

1. ✅ Installed - Theme system is ready
2. 📝 Configure - Set up tenant API to return theme data
3. 🔌 Integrate - Ensure tenant data loads before theme middleware
4. 🎨 Test - Use /theme-demo to verify colors
5. 🚀 Deploy - Push to production and test with real domains

## Need Help?

- Read: `TENANT_THEMING_GUIDE.md`
- See examples: `src/config/tenant-theme-examples.ts`
- Migration: `MIGRATION_GUIDE.md`
- Summary: `TENANT_THEME_IMPLEMENTATION.md`
