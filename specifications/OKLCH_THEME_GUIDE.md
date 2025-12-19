# OKLCH Tenant Theme Guide

## Overview

This guide shows how to create and switch between tenant themes using OKLCH color format with Tailwind's `@theme` directive.

## Available Themes

### 1. Coffee Brown Theme
**File:** `/themes/coffee-brown-theme.css`  
**Colors:** Warm coffee browns, caramel, cream & gold  
**Best for:** Coffee shops, bakeries, cozy businesses

### 2. Ocean Blue Theme
**File:** `/themes/ocean-blue-theme.css`  
**Colors:** Deep ocean blues, teals, coral accents  
**Best for:** Tech companies, corporate, professional services

### 3. Forest Green Theme
**File:** `/themes/forest-green-theme.css`  
**Colors:** Deep forest greens, sage, sunset orange  
**Best for:** Eco-friendly, sustainable, outdoor businesses

### 4. Sunset Purple Theme
**File:** `/themes/sunset-purple-theme.css`  
**Colors:** Rich purples, magentas, golden yellow  
**Best for:** Creative agencies, modern brands, lifestyle

## How to Use

### Method 1: Domain-Based Switching (Backend API)

Configure your backend to return different themes based on domain:

```javascript
// In your Payload API or backend
async function getTenantByDomain(domain) {
  const themeMap = {
    'coffee.example.com': '/themes/coffee-brown-theme.css',
    'ocean.example.com': '/themes/ocean-blue-theme.css',
    'forest.example.com': '/themes/forest-green-theme.css',
    'sunset.example.com': '/themes/sunset-purple-theme.css',
  };
  
  return {
    id: getTenantId(domain),
    name: getTenantName(domain),
    domain: domain,
    themeCssUrl: themeMap[domain] || '/themes/coffee-brown-theme.css',
  };
}
```

### Method 2: Tenant ID Mapping

Copy theme file to match tenant ID:

```bash
# Copy theme for specific tenant
cp public/themes/ocean-blue-theme.css public/themes/tenant-123.css
```

The system will automatically load `/themes/tenant-123.css`.

### Method 3: Direct URL (CDN)

Upload themes to CDN and reference:

```json
{
  "id": "tenant-123",
  "name": "My Business",
  "themeCssUrl": "https://cdn.yoursite.com/themes/ocean-blue-theme.css"
}
```

### Method 4: Inline Content

Pass entire CSS in API response:

```javascript
const themeContent = await fs.readFile('./themes/coffee-brown-theme.css', 'utf-8');

return {
  id: "tenant-123",
  name: "Coffee Shop",
  themeCssContent: themeContent
};
```

## OKLCH Color Format Explained

### What is OKLCH?

OKLCH is a modern color format that's perceptually uniform and provides better color consistency than RGB/HSL.

**Format:** `oklch(L C H [/ A])`
- **L** (Lightness): 0-1 (0 = black, 1 = white)
- **C** (Chroma): 0-0.4 (0 = gray, higher = more vibrant)
- **H** (Hue): 0-360 (color angle)
- **A** (Alpha): 0-1 (optional transparency)

### Benefits

✅ **Perceptually uniform** - Equal lightness values look equally light  
✅ **Better gradients** - Smoother color transitions  
✅ **Wider gamut** - Access to more vivid colors  
✅ **Predictable** - Easier to create color palettes

### Examples

```css
/* Warm Brown */
oklch(0.48 0.065 38)
/* L=0.48 (medium), C=0.065 (moderate saturation), H=38 (orange-brown) */

/* Ocean Blue */
oklch(0.52 0.135 225)
/* L=0.52 (medium), C=0.135 (vivid), H=225 (blue) */

/* Forest Green */
oklch(0.54 0.135 138)
/* L=0.54 (medium), C=0.135 (vivid), H=138 (green) */
```

## Creating Custom Themes

### Step 1: Choose Your Base Color

Pick your primary color in OKLCH format using tools like:
- [OKLCH Color Picker](https://oklch.com/)
- [Color.js](https://colorjs.io/apps/picker/)

### Step 2: Generate Shades

Create 10 shades (50-900) by varying lightness:

```css
@theme {
  --color-primary-50: oklch(0.97 0.025 310);   /* Very light */
  --color-primary-100: oklch(0.93 0.048 308);  /* Light */
  --color-primary-200: oklch(0.86 0.090 305);
  --color-primary-300: oklch(0.77 0.135 302);
  --color-primary-400: oklch(0.66 0.175 300);
  --color-primary-500: oklch(0.56 0.195 298);  /* Base color */
  --color-primary-600: oklch(0.47 0.180 295);
  --color-primary-700: oklch(0.39 0.160 293);
  --color-primary-800: oklch(0.32 0.140 290);
  --color-primary-900: oklch(0.25 0.115 288);  /* Very dark */
}
```

**Pattern:**
- **50**: L ≈ 0.97 (lightest)
- **500**: L ≈ 0.56 (base)
- **900**: L ≈ 0.25 (darkest)
- Adjust Chroma (C) slightly for each shade
- Keep Hue (H) similar or shift slightly

### Step 3: Add Secondary & Accent

Choose complementary colors:

```css
/* If Primary is Blue (H=225) */
--color-secondary-500: oklch(0.58 0.115 183);  /* Teal (H=183) */
--color-accent-500: oklch(0.65 0.175 22);      /* Coral (H=22) */
```

**Color Harmony Tips:**
- **Analogous**: Hues within 30° (e.g., 220, 240, 260)
- **Complementary**: Opposite hues (e.g., 30 + 210)
- **Triadic**: 120° apart (e.g., 0, 120, 240)

### Step 4: Save Theme File

```css
/* my-custom-theme.css */
@theme {
  /* Add all color definitions */
}

/* Optional: Custom utilities */
.my-custom-button {
  background-color: oklch(0.56 0.195 298);
}
```

### Step 5: Use in Tenant Config

```json
{
  "themeCssUrl": "/themes/my-custom-theme.css"
}
```

## Testing Themes

### Test Locally

1. Copy a theme file to `public/themes/test.css`
2. Modify your middleware to force load it:

```typescript
// In src/middleware/load-tenant.ts
context.locals.tenant = {
  id: 'test',
  name: 'Test Tenant',
  themeCssUrl: '/themes/test.css'
};
```

3. Restart dev server
4. Check browser console for theme loading

### Switch Between Themes

Create a test switcher in your admin panel:

```html
<select onchange="switchTheme(this.value)">
  <option value="coffee-brown-theme">Coffee Brown</option>
  <option value="ocean-blue-theme">Ocean Blue</option>
  <option value="forest-green-theme">Forest Green</option>
  <option value="sunset-purple-theme">Sunset Purple</option>
</select>

<script>
function switchTheme(themeName) {
  // Update tenant API to return new theme
  fetch('/api/update-theme', {
    method: 'POST',
    body: JSON.stringify({ 
      themeCssUrl: `/themes/${themeName}.css` 
    })
  }).then(() => window.location.reload());
}
</script>
```

## Using Theme Colors in Components

### With Tailwind Classes

The `@theme` directive automatically makes colors available as Tailwind utilities:

```html
<!-- Primary colors -->
<div class="bg-primary-500 text-white">Primary background</div>
<button class="bg-primary-600 hover:bg-primary-700">Button</button>

<!-- Secondary colors -->
<div class="text-secondary-600 border-secondary-300">Text</div>

<!-- Accent colors -->
<span class="bg-accent-500 text-accent-50">Badge</span>
```

### With CSS Variables

Access colors directly:

```css
.custom-element {
  background-color: var(--color-primary-500);
  border-color: var(--color-secondary-300);
  color: var(--color-accent-600);
}
```

### With Inline Styles

```html
<div style="background-color: var(--color-primary-500)">
  Custom styled element
</div>
```

## Advanced: Dynamic Theme Generation

### Generate Themes Programmatically

```javascript
// Backend function to generate OKLCH shades
function generateOKLCHPalette(baseL, baseC, baseH) {
  const shades = {
    50: { l: 0.97, c: baseC * 0.3 },
    100: { l: 0.93, c: baseC * 0.4 },
    200: { l: 0.86, c: baseC * 0.6 },
    300: { l: 0.77, c: baseC * 0.8 },
    400: { l: 0.66, c: baseC * 0.95 },
    500: { l: baseL, c: baseC },
    600: { l: baseL - 0.09, c: baseC * 0.95 },
    700: { l: baseL - 0.17, c: baseC * 0.85 },
    800: { l: baseL - 0.24, c: baseC * 0.75 },
    900: { l: baseL - 0.31, c: baseC * 0.65 },
  };
  
  let css = '@theme {\n';
  Object.entries(shades).forEach(([shade, { l, c }]) => {
    css += `  --color-primary-${shade}: oklch(${l.toFixed(3)} ${c.toFixed(3)} ${baseH});\n`;
  });
  css += '}';
  
  return css;
}

// Example: Generate purple theme
const purpleTheme = generateOKLCHPalette(0.56, 0.195, 298);
```

### Color Conversion Tools

Convert from HEX to OKLCH:

```javascript
import { convertHexToOKLCH } from 'culori';

const oklch = convertHexToOKLCH('#ff4500');
// Returns: { l: 0.65, c: 0.21, h: 38 }
```

## Browser Support

OKLCH is supported in modern browsers:
- ✅ Chrome 111+
- ✅ Safari 15.4+
- ✅ Firefox 113+
- ✅ Edge 111+

**Fallback:** For older browsers, Tailwind CSS automatically provides fallbacks.

## Resources

- **OKLCH Picker**: https://oklch.com/
- **Color.js Picker**: https://colorjs.io/apps/picker/
- **Tailwind @theme**: https://tailwindcss.com/docs/theme
- **All 4 sample themes**: `/public/themes/`

## FAQ

**Q: Can I mix OKLCH with RGB?**  
A: Yes, but stick to one format per project for consistency.

**Q: How do I convert existing RGB themes to OKLCH?**  
A: Use color conversion libraries like `culori` or online tools.

**Q: Can tenants customize colors themselves?**  
A: Yes! Build a color picker in your admin that generates OKLCH themes on the fly.

**Q: How do I test themes without backend changes?**  
A: Directly reference theme files in global.css for testing, then move to tenant system.
