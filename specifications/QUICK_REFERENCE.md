# Tenant Theme System - Quick Reference Card

## 🎯 Core Concept

**Tenant themes come from your backend API, not hardcoded in the frontend.**

## 📊 Data Flow

```
Backend API → Tenant Loader Middleware → Astro.locals.tenant → Theme Middleware → CSS Variables → Components
```

## 📋 Required API Response

```json
{
  "name": "Tenant Name",
  "themeConfig": {
    "colors": {
      "primary": { "500": "255, 69, 0" },
      "secondary": { "500": "100, 116, 139" },
      "accent": { "500": "217, 70, 239" }
    }
  }
}
```

## ⚙️ Setup Checklist

- [ ] Implement tenant loader middleware
- [ ] Ensure `Astro.locals.tenant` is populated
- [ ] Backend returns theme in RGB format
- [ ] Tenant middleware runs after loader
- [ ] Test with `/theme-demo` page

## 🎨 Color Format

| Format | Valid | Example |
|--------|-------|---------|
| RGB (string) | ✅ | `"255, 69, 0"` |
| Hex | ❌ | `"#ff4500"` |
| CSS RGB | ❌ | `"rgb(255, 69, 0)"` |

## 🔄 Conversion

**Hex to RGB (Backend):**

```typescript
// TypeScript/JavaScript
function hexToRgb(hex: string): string {
  const clean = hex.replace(/^#/, '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}
```

```python
# Python
def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    rgb = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
    return f"{rgb[0]}, {rgb[1]}, {rgb[2]}"
```

## 💻 Frontend Usage

```astro
<!-- Automatically themed -->
<button class="bg-primary-500 hover:bg-primary-600">
  Button
</button>

<div class="text-secondary-700 border-accent-500">
  Content
</div>
```

## 🎨 Available Colors

| Color | Shades | Purpose |
|-------|--------|---------|
| `primary` | 50-900 (10) | Brand color, main actions |
| `secondary` | 50-900 (10) | Neutral, text, borders |
| `accent` | 50, 100, 500, 600, 900 (5) | Highlights, CTAs |

## 📁 Key Files

| File | Purpose |
|------|---------|
| `BACKEND_API_SPEC.md` | Backend API requirements |
| `DYNAMIC_THEMES_README.md` | Complete guide |
| `src/middleware/tenant.ts` | Theme application |
| `src/config/tenant-theme-config.ts` | Default colors & logic |
| `src/types/tenant.ts` | TypeScript types |
| `/theme-demo` | Visual testing page |

## 🐛 Troubleshooting

| Issue | Check |
|-------|-------|
| No theme applying | `Astro.locals.tenant` populated? |
| Wrong colors | RGB format in API? |
| Default colors shown | API returning theme data? |
| Type errors | Import types from `src/types/tenant.ts` |

## ✅ Testing

1. Start: `npm run dev`
2. Visit: `http://localhost:4321/theme-demo`
3. Check: Browser DevTools → Computed styles → CSS variables
4. Verify: `--color-primary-500` has your custom RGB values

## 🚀 Deployment

1. Deploy frontend (theme system ready)
2. Deploy backend with theme API
3. Test on real tenant domains
4. Monitor: No errors in console
5. Verify: Colors appear correctly

## 📚 Documentation

- **Start here**: `DYNAMIC_THEMES_README.md`
- **Backend**: `BACKEND_API_SPEC.md`
- **Usage**: `TENANT_THEMING_GUIDE.md`
- **Migration**: `MIGRATION_GUIDE.md`

## 💡 Remember

- ❌ No hardcoded tenant themes
- ✅ All theme data from API
- ✅ RGB format required
- ✅ Partial overrides supported
- ✅ Defaults for missing data
