# Component Migration Guide

This guide helps you migrate existing components to use the new theme configuration system.

## 🎯 Quick Reference

### Before (Hardcoded):
```astro
<div class="bg-blue-600 text-white px-5 py-3 rounded-lg">
  Click me
</div>
```

### After (Theme-driven):
```astro
---
import { themeConfig } from '@themes/default/theme-config';

const buttonBg = themeConfig.colors.brand.primary[600];
const buttonText = '#ffffff';
const buttonPadding = '0.75rem 1.25rem';
const buttonRadius = themeConfig.borderRadius.lg;
---

<div style={`
  background: ${buttonBg};
  color: ${buttonText};
  padding: ${buttonPadding};
  border-radius: ${buttonRadius};
`}>
  Click me
</div>
```

## 📋 Step-by-Step Migration

### Step 1: Identify Hardcoded Values

Look for:
- ❌ Hardcoded colors: `bg-blue-600`, `text-gray-900`, `#3b82f6`
- ❌ Hardcoded sizes: `text-5xl`, `px-5`, `py-12`
- ❌ Hardcoded borders: `rounded-lg`, `border-gray-200`
- ❌ Hardcoded shadows: `shadow-lg`

### Step 2: Import Theme Config

Add to frontmatter:
```astro
---
import { themeConfig } from '../theme-config';
// or
import { themeConfig } from '@themes/default/theme-config';
---
```

### Step 3: Map Values to Theme

Create mapping variables:

```astro
---
import { themeConfig } from '../theme-config';

// Colors
const primaryColor = themeConfig.colors.brand.primary[500];
const textColor = themeConfig.colors.text.light.primary;
const bgColor = themeConfig.colors.surface.light.primary;

// Typography
const titleSize = themeConfig.typography.fontSize['3xl'];
const bodyFont = themeConfig.typography.fontFamily.body;

// Spacing
const sectionPadding = themeConfig.spacing.section.paddingY.lg;

// Effects
const cardShadow = themeConfig.shadows.lg;
const borderRadius = themeConfig.borderRadius.xl;
---
```

### Step 4: Replace Hardcoded Values

```astro
<!-- Before -->
<section class="py-12 bg-white">
  <h1 class="text-5xl text-gray-900 font-bold">Title</h1>
  <p class="text-gray-600">Content</p>
</section>

<!-- After -->
<section style={`
  padding-top: ${sectionPadding};
  padding-bottom: ${sectionPadding};
  background: ${bgColor};
`}>
  <h1 style={`
    font-size: ${titleSize};
    color: ${textColor};
    font-weight: ${themeConfig.typography.fontWeight.bold};
  `}>Title</h1>
  <p style={`color: ${themeConfig.colors.text.light.secondary};`}>
    Content
  </p>
</section>
```

## 🎨 Common Migration Patterns

### Pattern 1: Button Component

**Before:**
```astro
<button class="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg shadow-sm">
  Click me
</button>
```

**After:**
```astro
---
const btnConfig = themeConfig.components.button.default;
const btnBg = themeConfig.colors.brand.primary[600];
const btnBgHover = themeConfig.colors.brand.primary[700];
---

<button 
  class="button-primary"
  style={`
    background: ${btnBg};
    color: #ffffff;
    padding: 0.75rem 1.25rem;
    border-radius: ${btnConfig.borderRadius};
    box-shadow: ${themeConfig.shadows.sm};
    transition: ${btnConfig.transition};
  `}
>
  Click me
</button>

<style>
  .button-primary:hover {
    background: {btnBgHover};
  }
</style>
```

### Pattern 2: Card Component

**Before:**
```astro
<div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
  <h3 class="text-xl font-semibold text-gray-900">Card Title</h3>
  <p class="text-gray-600">Card content</p>
</div>
```

**After:**
```astro
---
const cardConfig = themeConfig.components.card.default;
---

<div style={`
  background: ${cardConfig.background};
  border-radius: ${cardConfig.borderRadius};
  box-shadow: ${cardConfig.shadow};
  padding: ${cardConfig.padding};
  border: 1px solid ${cardConfig.border};
`}>
  <h3 style={`
    font-size: ${themeConfig.typography.fontSize.xl};
    font-weight: ${themeConfig.typography.fontWeight.semibold};
    color: ${themeConfig.colors.text.light.primary};
  `}>Card Title</h3>
  <p style={`color: ${themeConfig.colors.text.light.secondary};`}>
    Card content
  </p>
</div>
```

### Pattern 3: Hero Section

**Before:**
```astro
<section class="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20">
  <div class="max-w-7xl mx-auto px-4">
    <h1 class="text-6xl font-bold text-gray-900">Hero Title</h1>
    <p class="text-xl text-gray-600 mt-4">Subtitle</p>
    <button class="mt-8 bg-blue-600 text-white px-8 py-4 rounded-lg">
      Get Started
    </button>
  </div>
</section>
```

**After:**
```astro
---
const heroConfig = themeConfig.components.hero.default;
---

<section style={`
  min-height: ${heroConfig.minHeight};
  background: linear-gradient(to bottom, ${themeConfig.colors.brand.primary[50]}, ${themeConfig.colors.surface.light.primary});
  padding: ${themeConfig.spacing.section.paddingY.xl} 0;
`}>
  <div style={`
    max-width: ${heroConfig.container.maxWidth};
    margin: 0 auto;
    padding: 0 ${heroConfig.container.padding.x};
  `}>
    <h1 style={`
      font-size: ${heroConfig.title.fontSize.sm};
      font-weight: ${heroConfig.title.fontWeight};
      color: ${heroConfig.title.color.light};
    `}>Hero Title</h1>
    
    <p style={`
      font-size: ${heroConfig.excerpt.fontSize};
      color: ${heroConfig.excerpt.color.light};
      margin-top: ${heroConfig.excerpt.marginTop};
    `}>Subtitle</p>
    
    <button style={`
      margin-top: ${heroConfig.cta.marginTop};
      background: ${heroConfig.cta.primary.light.background};
      color: ${heroConfig.cta.primary.light.text};
      padding: ${heroConfig.cta.padding.y} ${heroConfig.cta.padding.x};
      border-radius: ${heroConfig.cta.borderRadius};
    `}>
      Get Started
    </button>
  </div>
</section>
```

### Pattern 4: Dark Mode Support

**Before:**
```astro
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>
```

**After:**
```astro
---
const bgLight = themeConfig.colors.surface.light.primary;
const bgDark = themeConfig.colors.surface.dark.primary;
const textLight = themeConfig.colors.text.light.primary;
const textDark = themeConfig.colors.text.dark.primary;

// Helper function for mode-based colors
const getColorForMode = (lightColor: string, darkColor: string) => {
  // In practice, use CSS variables or class-based switching
  return lightColor; // Default to light
};
---

<div 
  class="theme-aware-container"
  style={`
    background: var(--color-surface-primary);
    color: var(--color-text-primary);
  `}
>
  Content
</div>

<!-- Or use the CSS variables approach -->
<style>
  .theme-aware-container {
    background: var(--color-surface-primary);
    color: var(--color-text-primary);
  }
</style>
```

## 🛠️ Advanced Patterns

### Dynamic Color Based on Props

```astro
---
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'error';
}

const { variant = 'primary' } = Astro.props;

const variantColors = {
  primary: themeConfig.colors.brand.primary[600],
  secondary: themeConfig.colors.brand.secondary[600],
  success: themeConfig.colors.semantic.success.DEFAULT,
  error: themeConfig.colors.semantic.error.DEFAULT,
};

const bgColor = variantColors[variant];
---

<div style={`background: ${bgColor};`}>
  Content
</div>
```

### Responsive Sizing

```astro
---
const titleSizeBase = themeConfig.typography.fontSize.xl;
const titleSizeLg = themeConfig.typography.fontSize['5xl'];
---

<h1 
  class="responsive-title"
  style={`
    font-size: ${titleSizeBase};
  `}
>
  Title
</h1>

<style>
  .responsive-title {
    font-size: var(--text-xl);
  }
  
  @media (min-width: 640px) {
    .responsive-title {
      font-size: var(--text-5xl);
    }
  }
</style>
```

### Component-Specific Config

```astro
---
// Add new component config to theme-config.ts first:
// components: {
//   navbar: {
//     default: {
//       height: '64px',
//       background: '#ffffff',
//       shadow: '0 1px 3px rgba(0,0,0,0.1)',
//     }
//   }
// }

const navbarConfig = themeConfig.components.navbar?.default || {
  height: '64px',
  background: themeConfig.colors.surface.light.primary,
  shadow: themeConfig.shadows.sm,
};
---

<nav style={`
  height: ${navbarConfig.height};
  background: ${navbarConfig.background};
  box-shadow: ${navbarConfig.shadow};
`}>
  Navigation
</nav>
```

## ✅ Migration Checklist

For each component:

- [ ] Import theme config
- [ ] Identify all hardcoded values
- [ ] Map colors to theme.colors
- [ ] Map typography to theme.typography
- [ ] Map spacing to theme.spacing
- [ ] Map effects to theme.shadows/borderRadius
- [ ] Test in light mode
- [ ] Test in dark mode
- [ ] Test responsive behavior
- [ ] Update component documentation
- [ ] Add component config to theme-config.ts (if needed)

## 🎓 Tips & Best Practices

### 1. Use CSS Variables for Frequently Changed Values

```astro
<style>
  .my-component {
    color: var(--color-text-primary);
    background: var(--color-surface-primary);
  }
</style>
```

### 2. Create Helper Functions

```astro
---
function getComponentColor(mode: 'light' | 'dark', hasImage: boolean) {
  if (hasImage) return themeConfig.components.hero.default.title.color.withImage;
  return mode === 'dark' 
    ? themeConfig.components.hero.default.title.color.dark
    : themeConfig.components.hero.default.title.color.light;
}
---
```

### 3. Add Component Config to theme-config.ts

```typescript
// In theme-config.ts
components: {
  navbar: {
    default: {
      height: '64px',
      // ... more config
    }
  },
  footer: {
    default: {
      background: colorScheme.surface.light.secondary,
      // ... more config
    }
  }
}
```

### 4. Document Your Changes

```astro
---
/**
 * MyComponent
 * 
 * Theme configuration:
 * - Uses theme.colors.brand.primary for main color
 * - Uses theme.spacing.section.paddingY for vertical spacing
 * - Supports dark mode via theme.colors.surface.dark
 * 
 * To customize in child theme:
 * Override theme.components.myComponent in theme-config.ts
 */
---
```

## 🚨 Common Pitfalls

### ❌ Don't Mix Approaches

```astro
<!-- Bad: Mixing Tailwind classes with theme styles -->
<div class="bg-blue-600" style={`color: ${textColor};`}>
```

```astro
<!-- Good: Use theme for everything -->
<div style={`background: ${bgColor}; color: ${textColor};`}>
```

### ❌ Don't Hardcode Fallbacks

```astro
<!-- Bad: Hardcoded fallback defeats the purpose -->
const color = themeConfig.colors.brand.primary[500] || '#3b82f6';
```

```astro
<!-- Good: Use theme defaults -->
const color = themeConfig.colors.brand.primary[500];
```

### ❌ Don't Skip Dark Mode

```astro
<!-- Bad: Only considering light mode -->
const textColor = themeConfig.colors.text.light.primary;
```

```astro
<!-- Good: Support both modes -->
<div style="color: var(--color-text-primary);">
```

## 📚 Resources

- See [hero-default.astro](../src/themes/default/hero/hero-default.astro) for complete example
- See [theme-config.ts](../src/themes/default/theme-config.ts) for all available options
- See [example-child-theme-config.ts](../src/themes/example-child-theme-config.ts) for customization examples

---

**Ready to migrate?** Start with one component, test thoroughly, then move to the next!
