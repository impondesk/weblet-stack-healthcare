# 🎨 THEME QUICK REFERENCE CARD

## Available Themes

```
🟤 coffee-brown  →  Warm, cozy browns
🔵 ocean-blue    →  Professional blues  
🟢 forest-green  →  Natural greens
🟣 sunset-purple →  Vibrant purples
```

## Instant Test (Copy & Paste)

### Option 1: In Middleware
```typescript
// src/middleware/load-tenant.ts
context.locals.tenant = {
  themeCssUrl: '/themes/ocean-blue-theme.css' // ← Change this!
};
```

### Option 2: Visit Demo
```
http://localhost:4321/theme-switcher
```

### Option 3: URL Parameter
```
?theme=ocean-blue-theme
?theme=coffee-brown-theme
?theme=forest-green-theme
?theme=sunset-purple-theme
```

## Production Usage

### API Response
```json
{
  "themeCssUrl": "/themes/ocean-blue-theme.css"
}
```

### Domain Mapping
```javascript
const themes = {
  'coffee.example.com': 'coffee-brown',
  'ocean.example.com': 'ocean-blue',
  'forest.example.com': 'forest-green',
  'sunset.example.com': 'sunset-purple',
};
```

## Using Colors in Code

### Tailwind Classes
```html
<button class="bg-primary-500 hover:bg-primary-600">
<div class="text-secondary-700 border-primary-300">
<span class="bg-accent-500 text-white">
```

### CSS Variables
```css
background: var(--color-primary-500);
color: var(--color-accent-600);
```

## Color Shades

```
50  ←  Very light
100
200
300
400
500 ←  Base color (use this!)
600
700
800
900 ←  Very dark
```

## Quick Tips

✅ Use 500 for backgrounds  
✅ Use 600 for hover states  
✅ Use 700-900 for text  
✅ Use 50-200 for light backgrounds  

## Files Location

```
/public/themes/
  coffee-brown-theme.css
  ocean-blue-theme.css
  forest-green-theme.css
  sunset-purple-theme.css
```

## Documentation

📖 [README_THEMES.md](./README_THEMES.md) - Start here!  
📚 [OKLCH_THEME_GUIDE.md](./OKLCH_THEME_GUIDE.md) - Complete guide  
💻 [THEME_SWITCHING_REFERENCE.ts](./THEME_SWITCHING_REFERENCE.ts) - Code  
📊 [THEME_COMPARISON.md](./THEME_COMPARISON.md) - Visual comparison  

## Common Tasks

### Switch Theme
```typescript
tenant.themeCssUrl = '/themes/new-theme.css';
```

### Test Theme
```
Visit /theme-switcher
```

### Create Custom
```bash
cp coffee-brown-theme.css my-theme.css
# Edit colors, then use:
{ "themeCssUrl": "/themes/my-theme.css" }
```

---

**Need help?** See [README_THEMES.md](./README_THEMES.md)
