# Dynamic CSS Delivery from Payload

## Overview

You can now pass complete `theme.css` files from your payload/backend dynamically to tenant websites. This allows you to:

✅ Share Tailwind customization files on the fly  
✅ Generate custom CSS per tenant in your backend  
✅ Update tenant themes without redeploying the frontend  
✅ Include any custom CSS (Tailwind utilities, animations, fonts, etc.)

## How It Works

The system now supports **4 loading methods** with priority:

```
1. themeCssUrl      → Link to external CSS file (HIGHEST PRIORITY)
2. themeCssContent  → Raw CSS content as string
3. Static file      → /themes/{tenantId}.css
4. CSS Variables    → Generated from themeConfig (FALLBACK)
```

## Implementation

### Backend Payload Response

Your payload API can now return:

```json
{
  "id": "tenant-123",
  "name": "My Tenant",
  "domain": "example.com",
  
  // OPTION 1: URL to CSS file (recommended for large files)
  "themeCssUrl": "https://cdn.yoursite.com/themes/tenant-123/theme.css",
  
  // OPTION 2: Raw CSS content (good for small customizations)
  "themeCssContent": ":root { --color-primary-500: 255, 69, 0; } .custom-btn { ... }",
  
  // OPTION 3: Still support color configs (fallback)
  "themeConfig": {
    "colors": {
      "primary": { "500": "255, 69, 0" }
    }
  }
}
```

### Priority System

```javascript
if (tenant.themeCssUrl) {
  // Load from CDN/external URL
  <link rel="stylesheet" href="https://cdn.yoursite.com/themes/tenant-123/theme.css" />
}
else if (tenant.themeCssContent) {
  // Inject raw CSS
  <style>:root { --color-primary-500: 255, 69, 0; }</style>
}
else if (exists `/themes/${tenantId}.css`) {
  // Load from static file
  <link rel="stylesheet" href="/themes/tenant-123.css" />
}
else if (tenant.themeConfig) {
  // Generate CSS variables
  <style>:root { --color-primary-500: 255, 69, 0 !important; }</style>
}
```

## Use Cases

### 1. Tailwind Custom Build per Tenant

**In your backend:**

```javascript
// Generate custom Tailwind CSS for tenant
const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        brand: tenant.brandColor,
        accent: tenant.accentColor
      },
      fontFamily: {
        sans: [tenant.customFont, 'sans-serif']
      }
    }
  }
};

// Build CSS with Tailwind CLI or programmatically
const customCSS = await buildTailwindCSS(tailwindConfig);

// Upload to CDN
const cssUrl = await uploadToCDN(customCSS, `tenant-${tenant.id}.css`);

// Return in API
return {
  ...tenant,
  themeCssUrl: cssUrl
};
```

### 2. Dynamic CSS Content

**Small customizations:**

```javascript
return {
  id: "tenant-123",
  name: "Coffee Shop",
  themeCssContent: `
    :root {
      --color-primary-500: 101, 67, 33;
      --color-primary-600: 91, 57, 23;
      --font-heading: 'Playfair Display', serif;
    }
    
    .hero-title {
      font-family: var(--font-heading);
      color: rgb(var(--color-primary-600));
    }
    
    .custom-animation {
      animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `
};
```

### 3. CDN-Hosted Theme Files

**For better performance:**

```javascript
// Store theme CSS on CDN
const themeUrl = `https://cdn.yoursite.com/themes/${tenant.id}/theme-v${tenant.themeVersion}.css`;

return {
  id: "tenant-123",
  name: "My Tenant",
  themeCssUrl: themeUrl // Browser will cache this!
};
```

### 4. Hybrid Approach

**Combine methods for flexibility:**

```javascript
return {
  id: "tenant-123",
  name: "My Tenant",
  
  // Core theme from CDN (cached, large file)
  themeCssUrl: "https://cdn.yoursite.com/themes/base-tailwind.css",
  
  // Small tenant-specific overrides inline
  themeCssContent: `:root { --brand-color: ${tenant.brandColor}; }`,
  
  // Fallback color config
  themeConfig: {
    colors: {
      primary: { 500: tenant.primaryColor }
    }
  }
};
```

## Benefits

### For Backend Teams

✅ **Full Control**: Generate any CSS dynamically  
✅ **No Frontend Deploy**: Update themes without rebuilding frontend  
✅ **Centralized**: Manage all tenant themes in payload  
✅ **Flexible**: Support simple colors OR complex Tailwind builds

### For Frontend Teams

✅ **Simple Integration**: Just pass URL or content from payload  
✅ **Performance**: Use CDN URLs for caching  
✅ **Backwards Compatible**: Existing color configs still work  
✅ **Debug Friendly**: Console shows which method is used

## Migration Path

### Current Setup (Still Works)

```json
{
  "themeConfig": {
    "colors": {
      "primary": { "500": "255, 69, 0" }
    }
  }
}
```

### Enhanced Setup (New!)

```json
{
  "themeCssUrl": "https://cdn.yoursite.com/themes/tenant-123.css"
}
```

### Gradual Migration

1. **Phase 1**: Test with `themeCssContent` for one tenant
2. **Phase 2**: Build CSS generation pipeline in backend
3. **Phase 3**: Upload to CDN, use `themeCssUrl`
4. **Phase 4**: Deprecate `themeConfig` (optional)

## Example Workflow

### Step 1: Tenant Updates Theme in Admin Panel

```
Admin Panel → Select Colors → Click "Generate Theme"
```

### Step 2: Backend Generates Custom CSS

```javascript
// In your payload hooks or API
async function generateTenantTheme(tenant) {
  // Build Tailwind CSS with tenant colors
  const css = await buildCustomTailwind({
    colors: tenant.colors,
    fonts: tenant.fonts,
    spacing: tenant.spacing
  });
  
  // Upload to CDN
  const url = await uploadToCDN(css, `${tenant.id}.css`);
  
  // Update tenant record
  await updateTenant(tenant.id, { themeCssUrl: url });
  
  return url;
}
```

### Step 3: Frontend Loads Theme Automatically

```
Request → Middleware loads tenant → TenantTheme.astro detects themeCssUrl → Injects <link>
```

### Step 4: Instant Theme Update

No frontend rebuild needed! Just update `themeCssUrl` in payload.

## Technical Details

### Modified Files

1. **`src/types/tenant.ts`** - Added `themeCssUrl` and `themeCssContent` fields
2. **`src/components/TenantTheme.astro`** - Enhanced with 4-tier loading system

### No Changes Required

- Middleware still works the same
- Existing color configs still work
- Backward compatible with all current implementations

### Console Output

```
=== TenantTheme Component (Enhanced) ===
Has Tenant Data: true
Tenant Name: Coffee Shop
Tenant ID: tenant-123
Dynamic CSS URL: https://cdn.yoursite.com/themes/tenant-123.css
Dynamic CSS Content: None
CSS Vars Count: 0
Load Method: dynamic-url
=== End TenantTheme ===
```

## Best Practices

### 1. Use CDN URLs for Production

```javascript
// ✅ Good - Cached, fast
themeCssUrl: "https://cdn.yoursite.com/themes/tenant-123-v5.css"

// ❌ Avoid - Not cached
themeCssContent: "/* 50KB of CSS */"
```

### 2. Version Your CSS Files

```javascript
// Include version in URL for cache busting
themeCssUrl: `https://cdn.yoursite.com/themes/${tenantId}-v${themeVersion}.css`
```

### 3. Keep Content Small

```javascript
// ✅ Good - Small override
themeCssContent: ":root { --brand-color: #ff4500; }"

// ❌ Avoid - Large content (use URL instead)
themeCssContent: "/* entire Tailwind build */"
```

### 4. Provide Fallbacks

```javascript
// Always include fallback for safety
{
  themeCssUrl: "https://cdn.yoursite.com/themes/tenant.css",
  themeConfig: {
    colors: { primary: { 500: "255, 69, 0" } }
  }
}
```

## Testing

### Test URL Loading

```javascript
// In your test tenant
{
  "themeCssUrl": "https://cdn.yoursite.com/themes/test.css"
}
```

Check browser console:
```
Load Method: dynamic-url
```

### Test Content Loading

```javascript
{
  "themeCssContent": ":root { --test: red; }"
}
```

Check page source for `<style>:root { --test: red; }</style>`

### Test Fallback

```javascript
{
  // No themeCssUrl or themeCssContent
  "themeConfig": {
    "colors": { "primary": { "500": "255, 0, 0" } }
  }
}
```

Check console:
```
Load Method: inline-vars
```

## FAQ

**Q: Can I use both themeCssUrl and themeConfig?**  
A: Yes! themeCssUrl takes priority, themeConfig is ignored if URL is provided.

**Q: What if the CSS URL fails to load?**  
A: The browser will show a 404 in console. Consider adding fallback with `themeConfig`.

**Q: Can I use relative URLs?**  
A: Yes, but absolute CDN URLs are recommended for performance.

**Q: Does this work with Tailwind JIT?**  
A: Yes! Generate your CSS with Tailwind in the backend, then serve via URL.

**Q: How do I update a theme?**  
A: Update the CSS file at the URL, or change `themeCssUrl` to a new version.

**Q: Can I use SCSS/LESS?**  
A: No, provide compiled CSS. Build SCSS/LESS in your backend before serving.

## Next Steps

1. **Test locally**: Add `themeCssContent` to a test tenant
2. **Build pipeline**: Create CSS generation in your backend
3. **Setup CDN**: Configure CDN for theme CSS files
4. **Update API**: Add `themeCssUrl` to tenant responses
5. **Monitor**: Check console logs to verify loading method

## Related Documentation

- [TENANT_THEMING_GUIDE.md](./TENANT_THEMING_GUIDE.md) - Frontend usage
- [BACKEND_API_SPEC.md](./BACKEND_API_SPEC.md) - API specification
- [DYNAMIC_THEMES_README.md](./DYNAMIC_THEMES_README.md) - System overview
