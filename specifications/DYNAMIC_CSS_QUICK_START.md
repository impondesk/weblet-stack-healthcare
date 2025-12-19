# Quick Start: Dynamic CSS Delivery

## 🚀 In 5 Minutes

### 1. Update Your Payload API Response

Add either `themeCssUrl` OR `themeCssContent` to your tenant response:

```javascript
// Option A: URL to CSS file (recommended)
{
  "id": "tenant-123",
  "name": "My Tenant",
  "themeCssUrl": "https://cdn.yoursite.com/themes/tenant-123.css"
}

// Option B: Inline CSS content
{
  "id": "tenant-123", 
  "name": "My Tenant",
  "themeCssContent": ":root { --color-primary-500: 255, 69, 0; }"
}
```

### 2. That's It!

The frontend automatically detects and loads the CSS. No changes needed to your middleware or layouts.

## 🎯 Priority Order

```
1. themeCssUrl      → <link rel="stylesheet" href="...">
2. themeCssContent  → <style>...</style>
3. /themes/{id}.css → <link rel="stylesheet" href="...">
4. themeConfig      → <style>:root { ... }</style>
```

## ✅ Test It

### Check Console Log

```
=== TenantTheme Component (Enhanced) ===
Has Tenant Data: true
Tenant Name: My Tenant
Dynamic CSS URL: https://cdn.yoursite.com/themes/tenant-123.css
Load Method: dynamic-url
=== End TenantTheme ===
```

### Verify in Browser

1. Open DevTools → Network tab
2. Look for request to your CSS URL
3. Check Elements tab for `<link>` or `<style>` tag

## 📝 Common Patterns

### Pattern 1: CDN Hosted (Best for Production)

```json
{
  "themeCssUrl": "https://cdn.yoursite.com/themes/tenant-123-v5.css"
}
```

✅ Cached by browser  
✅ Can be updated independently  
✅ Works for large Tailwind builds

### Pattern 2: Small Overrides

```json
{
  "themeCssContent": ":root { --brand: 255, 0, 0; }"
}
```

✅ No external request  
✅ Fast for small CSS  
❌ Not cached across pages

### Pattern 3: Hybrid

```json
{
  "themeCssUrl": "https://cdn.site.com/base.css",
  "themeCssContent": ":root { --brand: 255, 0, 0; }"
}
```

Note: Only `themeCssUrl` will be used (highest priority)

### Pattern 4: Fallback

```json
{
  "themeCssUrl": "https://cdn.site.com/theme.css",
  "themeConfig": {
    "colors": { "primary": { "500": "255, 0, 0" } }
  }
}
```

✅ Falls back to `themeConfig` if URL fails to load (eventually)

## 🔧 Generate CSS in Backend

### Simple Example

```javascript
// In your Payload hooks or API
async function generateThemeCSS(tenant) {
  const css = `
    :root {
      --color-primary-500: ${tenant.primaryColor};
      --font-heading: '${tenant.headingFont}';
    }
    
    .brand-btn {
      background: rgb(var(--color-primary-500));
    }
  `;
  
  // Upload to CDN or return inline
  return css;
}
```

### Tailwind Example

```javascript
async function buildTailwindForTenant(tenant) {
  const config = {
    theme: {
      extend: {
        colors: {
          brand: {
            50: tenant.colors.brand50,
            500: tenant.colors.brand500,
            900: tenant.colors.brand900,
          }
        }
      }
    }
  };
  
  // Build with Tailwind CLI or postcss
  const css = await buildTailwind(config);
  
  // Upload to CDN
  const url = await uploadToCDN(css, `${tenant.id}.css`);
  
  return url;
}
```

## 🐛 Troubleshooting

### CSS Not Loading?

1. Check console for `Load Method:` - should be `dynamic-url` or `dynamic-content`
2. Check Network tab for 404 errors on CSS URL
3. Verify your API returns the correct field name

### CSS Loading But Not Applying?

1. Check CSS specificity - may need `!important`
2. Verify CSS variables match expected names
3. Check browser DevTools → Elements → Computed styles

### Fallback Not Working?

Make sure you also provide `themeConfig`:

```json
{
  "themeCssUrl": "https://might-fail.com/theme.css",
  "themeConfig": {
    "colors": { "primary": { "500": "255, 0, 0" } }
  }
}
```

## 📚 Full Documentation

- [DYNAMIC_CSS_DELIVERY.md](./DYNAMIC_CSS_DELIVERY.md) - Complete guide
- [DYNAMIC_CSS_EXAMPLES.ts](./DYNAMIC_CSS_EXAMPLES.ts) - Code examples
- [BACKEND_API_SPEC.md](./BACKEND_API_SPEC.md) - API specification

## 🎨 Example CSS Files

### Minimal Override

```css
/* https://cdn.yoursite.com/themes/minimal.css */
:root {
  --color-primary-500: 255, 69, 0;
}
```

### Complete Theme

```css
/* https://cdn.yoursite.com/themes/complete.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');

:root {
  --color-primary-500: 239, 68, 68;
  --color-secondary-500: 100, 116, 139;
  --font-heading: 'Inter', sans-serif;
}

.hero-title {
  font-family: var(--font-heading);
  color: rgb(var(--color-primary-500));
}

.btn-primary {
  background: rgb(var(--color-primary-500));
  padding: 1rem 2rem;
  border-radius: 0.5rem;
}
```

### Tailwind Custom Build

```css
/* https://cdn.yoursite.com/themes/tailwind-custom.css */
/* Tailwind base */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom configuration */
@layer base {
  :root {
    --color-brand-50: 254, 242, 242;
    --color-brand-500: 239, 68, 68;
    --color-brand-900: 127, 29, 29;
  }
}

@layer utilities {
  .text-brand { color: rgb(var(--color-brand-500)); }
  .bg-brand { background: rgb(var(--color-brand-500)); }
}
```

## ✨ Next Steps

1. **Test locally**: Add `themeCssContent` to your test tenant
2. **Build pipeline**: Create CSS generation in backend
3. **Deploy to CDN**: Upload CSS files to your CDN
4. **Update API**: Return `themeCssUrl` from your payload
5. **Monitor**: Check logs to verify loading method

---

**Questions?** See [DYNAMIC_CSS_DELIVERY.md](./DYNAMIC_CSS_DELIVERY.md) for detailed documentation.
