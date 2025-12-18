# 🎨 Weblet Theme System - Quick Start

This template repository provides a flexible, white-label theming system that allows child themes to customize appearance without modifying base components.

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Quick Start for Child Themes](#quick-start-for-child-themes)
- [Architecture](#architecture)
- [Customization Options](#customization-options)
- [Documentation](#documentation)

## 🎯 Overview

The Weblet Theme Template uses a **configuration-driven theming system** where:

- ✅ **All visual styling** is controlled via `theme-config.ts`
- ✅ **Components are decoupled** from hardcoded colors and styles
- ✅ **Child themes** can override the config without touching components
- ✅ **CSS variables** provide runtime theming support
- ✅ **TypeScript types** ensure type-safe theme customization

## ✨ Key Features

### 1. **Theme Configuration**
All theme settings in one place:
- Brand colors (primary, secondary, accent)
- Typography (fonts, sizes, weights)
- Spacing (containers, sections, gaps)
- Component-specific styling (hero, cards, buttons)

### 2. **Component Decoupling**
Components consume theme config instead of hardcoded values:
```astro
<!-- ❌ Old way -->
<div class="bg-blue-600 text-white">

<!-- ✅ New way -->
<div style={`background: ${primaryColor}; color: ${textColor};`}>
```

### 3. **CSS Variables Support**
Runtime theming with CSS variables:
```css
:root {
  --color-brand-primary-500: #3b82f6;
  --text-base: 1rem;
  /* ... and more */
}
```

### 4. **Multiple Override Methods**
Three ways to customize:
1. **Fork & Modify** - Simple for single child theme
2. **Theme Directory** - Advanced for multiple themes
3. **CSS Variables** - Runtime theme switching

## 🚀 Quick Start for Child Themes

### Method 1: Fork This Repository (Recommended)

```bash
# 1. Fork this repository to your organization
# 2. Clone your fork
git clone https://github.com/your-org/your-brand-theme.git
cd your-brand-theme

# 3. Install dependencies
npm install

# 4. Customize the theme
# Edit: src/themes/default/theme-config.ts
```

**Edit `src/themes/default/theme-config.ts`:**

```typescript
export const colorScheme = {
  brand: {
    primary: {
      500: '#FF6B35',  // 👈 Your brand color
      600: '#E85D2C',  // 👈 Hover state
      // ...
    },
  },
  // ... rest of config
};
```

```bash
# 5. Run development server
npm run dev

# 6. Build for production
npm run build
```

**Keep Updated:**
```bash
# Add upstream repository
git remote add upstream https://github.com/original-org/weblet-theme-template.git

# Pull updates (components, features, bug fixes)
git fetch upstream
git merge upstream/main

# Resolve conflicts in theme-config.ts to keep your customizations
```

### Method 2: Create New Theme Directory

```bash
# 1. Create new theme folder
mkdir -p src/themes/your-brand

# 2. Copy theme config
cp src/themes/default/theme-config.ts src/themes/your-brand/theme-config.ts

# 3. Customize your theme
# Edit: src/themes/your-brand/theme-config.ts
```

**Extend default theme:**

```typescript
import defaultTheme from '../default/theme-config';

export const themeConfig = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    brand: {
      primary: {
        500: '#your-color',
        // ...
      },
    },
  },
};
```

## 🏗️ Architecture

```
weblet-theme-template/
├── src/
│   ├── themes/
│   │   ├── default/
│   │   │   ├── theme-config.ts          # 🎨 Main theme configuration
│   │   │   ├── hero/
│   │   │   │   └── hero-default.astro   # Uses theme-config
│   │   │   └── ...
│   │   └── THEMING.md                   # 📖 Detailed theming guide
│   │
│   ├── styles/
│   │   ├── global.css                   # Global styles
│   │   └── theme-variables.css          # 🎨 CSS variables from config
│   │
│   ├── utils/
│   │   └── theme-to-css-vars.ts         # 🔧 Theme utilities
│   │
│   └── ...
│
├── THEME_SYSTEM.md                      # 📖 This file
└── ...
```

### Key Files

| File | Purpose | Modify in Child Theme? |
|------|---------|----------------------|
| `themes/default/theme-config.ts` | Theme configuration | ✅ **YES** - Main customization point |
| `themes/default/hero/hero-default.astro` | Hero component | ⚠️ Only if extending functionality |
| `styles/theme-variables.css` | CSS variables | ✅ **YES** - For CSS-only customization |
| `utils/theme-to-css-vars.ts` | Theme utilities | ❌ No need to modify |

## 🎨 Customization Options

### 1. Brand Colors

```typescript
// theme-config.ts
export const colorScheme = {
  brand: {
    primary: {
      500: '#3b82f6',  // Main brand color
      600: '#2563eb',  // Hover/active states
    },
    secondary: { /* ... */ },
    accent: { /* ... */ },
  },
};
```

### 2. Typography

```typescript
export const typography = {
  fontFamily: {
    display: '"Your Display Font", sans-serif',
    body: '"Your Body Font", sans-serif',
  },
  fontSize: {
    base: '1rem',
    xl: '1.25rem',
    // ...
  },
};
```

### 3. Component Styling

```typescript
export const components = {
  hero: {
    default: {
      minHeight: '600px',  // Customize hero height
      overlay: {
        gradient: 'linear-gradient(...)',  // Custom overlay
      },
      cta: {
        primary: {
          light: {
            background: '#your-color',
          },
        },
      },
    },
  },
};
```

### 4. Spacing & Layout

```typescript
export const spacing = {
  container: {
    xl: '1280px',  // Max container width
  },
  section: {
    paddingY: {
      lg: '6rem',  // Section vertical padding
    },
  },
};
```

## 📚 Documentation

- **[Detailed Theming Guide](src/themes/THEMING.md)** - Complete theming documentation
- **[Theme Config Reference](src/themes/default/theme-config.ts)** - All available options
- **[Theme Utilities](src/utils/theme-to-css-vars.ts)** - Helper functions

## 🎯 Common Use Cases

### Use Case 1: Change Brand Colors

```typescript
// theme-config.ts - Change this
brand: {
  primary: {
    500: '#10b981',  // Green
    600: '#059669',
  }
}
```

### Use Case 2: Custom Fonts

```typescript
// 1. Add font import in global.css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

// 2. Update theme-config.ts
typography: {
  fontFamily: {
    body: '"Inter", sans-serif',
  }
}
```

### Use Case 3: Adjust Hero Styling

```typescript
components: {
  hero: {
    default: {
      minHeight: '700px',           // Taller hero
      overlay: {
        backdropBlur: '8px',        // More blur
      },
      title: {
        fontSize: {
          sm: '4rem',                // Larger title
        },
      },
    },
  },
}
```

### Use Case 4: Dark Mode Customization

```typescript
colorScheme: {
  surface: {
    dark: {
      primary: '#0a0a0a',    // Darker background
      secondary: '#1a1a1a',
    },
  },
  text: {
    dark: {
      primary: '#ffffff',    // Brighter text
    },
  },
}
```

## 🔄 Updating from Upstream

When the base template adds new features or fixes bugs:

```bash
# 1. Fetch updates
git fetch upstream

# 2. Check what changed
git diff upstream/main

# 3. Merge updates
git merge upstream/main

# 4. Resolve conflicts (usually in theme-config.ts)
# Keep your customizations, adopt new structure

# 5. Test thoroughly
npm run dev
```

## 🛠️ Development Workflow

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for errors
npm run check
```

## 📦 Deployment

Your child theme can be deployed like any Astro project:

```bash
# Build
npm run build

# The dist/ folder contains your themed site
# Deploy to: Vercel, Netlify, AWS, etc.
```

## 🆘 Troubleshooting

### Theme changes not appearing?

1. **Clear cache and restart dev server**
   ```bash
   rm -rf .astro node_modules/.vite
   npm run dev
   ```

2. **Check CSS variable updates**
   - Ensure `theme-variables.css` is imported in `global.css`
   - Verify CSS variables in browser DevTools

3. **Verify theme-config syntax**
   ```bash
   npm run check
   ```

### Merge conflicts from upstream?

1. **Preserve your customizations**
   - Keep your color values
   - Adopt new structure/properties from upstream
   
2. **Use merge tool**
   ```bash
   git mergetool
   ```

3. **Test after merge**
   ```bash
   npm run dev
   ```

## 🤝 Contributing

If you create useful theme utilities or components:

1. Fork the original template
2. Add your improvements
3. Submit a pull request to benefit all users

## 📄 License

[Your License Here]

## 🔗 Resources

- **Base Template**: [Link to original repository]
- **Documentation**: [Link to docs site]
- **Examples**: [Link to example child themes]
- **Support**: [Link to issue tracker]

---

**Happy Theming! 🎨**

For detailed theming instructions, see [src/themes/THEMING.md](src/themes/THEMING.md)
