# Theme Configuration Guide

This guide explains how to create and customize themes in the Weblet Theme Template.

## Overview

The theming system is designed to allow easy white-labeling and customization without modifying the base component implementations. All visual styling is controlled through theme configuration files.

## Architecture

```
src/themes/
├── default/                    # Base theme (this repository)
│   ├── theme-config.ts        # Default theme configuration
│   ├── hero/
│   │   └── hero-default.astro # Components consume theme-config
│   └── ...
└── [child-theme]/             # Your custom theme (in child repository)
    ├── theme-config.ts        # Override default config
    └── ...
```

## Creating a Child Theme

### Method 1: Fork this Repository

1. **Fork the Repository**
   ```bash
   # Fork this repository to your organization
   # Clone your fork
   git clone https://github.com/your-org/your-custom-theme.git
   cd your-custom-theme
   ```

2. **Customize the Theme Config**
   
   Edit `src/themes/default/theme-config.ts` with your brand colors and styling:
   
   ```typescript
   export const colorScheme = {
     brand: {
       primary: {
         500: '#your-primary-color',  // Change to your brand color
         600: '#your-primary-hover',
         // ...
       },
       // ...
     },
     // ...
   };
   ```

3. **Test Your Changes**
   ```bash
   npm install
   npm run dev
   ```

4. **Keep Updated from Upstream**
   ```bash
   # Add upstream remote
   git remote add upstream https://github.com/original-org/weblet-theme-template.git
   
   # Pull latest changes (components, features, bug fixes)
   git fetch upstream
   git merge upstream/main
   
   # Resolve conflicts in theme-config.ts to preserve your customizations
   ```

### Method 2: Create a New Theme Directory (Advanced)

For more complex setups where you want multiple themes:

1. **Create Theme Directory**
   ```bash
   mkdir -p src/themes/your-brand
   ```

2. **Copy Default Config**
   ```bash
   cp src/themes/default/theme-config.ts src/themes/your-brand/theme-config.ts
   ```

3. **Customize Your Theme**
   
   Edit `src/themes/your-brand/theme-config.ts`:
   
   ```typescript
   // Import default config to extend it
   import defaultTheme from '../default/theme-config';
   
   // Override specific values
   export const colorScheme = {
     ...defaultTheme.colors,
     brand: {
       primary: {
         ...defaultTheme.colors.brand.primary,
         500: '#FF6B35',  // Your brand color
         600: '#E85D2C',
       },
     },
   };
   
   export const themeConfig = {
     ...defaultTheme,
     colors: colorScheme,
   };
   
   export default themeConfig;
   ```

4. **Update Component Imports**
   
   When creating custom components, import from your theme:
   
   ```astro
   ---
   // Instead of:
   // import { themeConfig } from '@themes/default/theme-config';
   
   // Use:
   import { themeConfig } from '@themes/your-brand/theme-config';
   ---
   ```

## Theme Configuration Structure

### Color Scheme

```typescript
colorScheme: {
  brand: {
    primary: { ... },    // Main brand colors
    secondary: { ... },  // Secondary colors
    accent: { ... },     // Accent colors
  },
  semantic: {
    success: { ... },
    warning: { ... },
    error: { ... },
    info: { ... },
  },
  surface: {
    light: { ... },      // Background colors
    dark: { ... },
  },
  text: {
    light: { ... },      // Text colors
    dark: { ... },
  },
  border: {
    light: { ... },      // Border colors
    dark: { ... },
  }
}
```

### Typography

```typescript
typography: {
  fontFamily: {
    display: '...',
    body: '...',
    mono: '...',
  },
  fontSize: { ... },
  fontWeight: { ... },
  lineHeight: { ... },
}
```

### Component-Specific Theming

Each component has its own configuration section:

```typescript
components: {
  hero: {
    default: {
      minHeight: '500px',
      overlay: {
        gradient: '...',
        backdropBlur: '4px',
      },
      subtitle: {
        fontSize: '...',
        color: {
          light: '...',
          dark: '...',
          withImage: '...',
        },
      },
      // ... more settings
    }
  },
  card: { ... },
  button: { ... },
}
```

## Customization Examples

### Example 1: Change Brand Colors

```typescript
export const colorScheme = {
  ...defaultTheme.colors,
  brand: {
    primary: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',  // Red brand color
      600: '#dc2626',
      900: '#7f1d1d',
    },
  },
};
```

### Example 2: Custom Typography

```typescript
export const typography = {
  fontFamily: {
    display: '"Playfair Display", serif',
    body: '"Inter", sans-serif',
    mono: '"Fira Code", monospace',
  },
  // ... rest of typography config
};
```

### Example 3: Customize Hero Component

```typescript
export const components = {
  hero: {
    default: {
      ...defaultTheme.components.hero.default,
      minHeight: '600px',  // Taller hero
      overlay: {
        gradient: 'linear-gradient(135deg, rgba(239,68,68,0.8), rgba(220,38,38,0.9))',
        backdropBlur: '8px',  // More blur
      },
      cta: {
        ...defaultTheme.components.hero.default.cta,
        primary: {
          light: {
            background: '#10b981',  // Green CTA button
            backgroundHover: '#059669',
            text: '#ffffff',
          },
        },
      },
    },
  },
};
```

### Example 4: Dark Mode Customization

```typescript
export const colorScheme = {
  ...defaultTheme.colors,
  surface: {
    light: { ... },
    dark: {
      primary: '#0a0a0a',      // Darker background
      secondary: '#1a1a1a',
      tertiary: '#2a2a2a',
      elevated: '#1e1e1e',
    },
  },
  text: {
    light: { ... },
    dark: {
      primary: '#ffffff',
      secondary: '#d1d5db',
      tertiary: '#9ca3af',
      inverse: '#0a0a0a',
    },
  },
};
```

## Component Override Strategy

When you need more than just color/spacing changes:

1. **Copy the Component**
   ```bash
   cp src/themes/default/hero/hero-default.astro \
      src/themes/your-brand/hero/hero-custom.astro
   ```

2. **Modify the Component**
   ```astro
   ---
   import { themeConfig } from '../theme-config';
   
   // Your custom logic
   // But still use theme-config for colors/spacing
   ---
   
   <section>
     <!-- Your custom HTML structure -->
     <!-- Using theme colors and spacing -->
   </section>
   ```

3. **Use Custom Component**
   ```astro
   ---
   // In your layout/page
   import Hero from '@themes/your-brand/hero/hero-custom.astro';
   ---
   ```

## Best Practices

### ✅ DO

- **Use theme-config for all colors and spacing**
  ```astro
  <div style={`color: ${themeConfig.colors.brand.primary[500]};`}>
  ```

- **Extend default config when possible**
  ```typescript
  export const themeConfig = {
    ...defaultTheme,
    colors: customColors,
  };
  ```

- **Keep your theme-config changes version controlled**
  ```bash
  git add src/themes/default/theme-config.ts
  git commit -m "feat: update brand colors"
  ```

- **Document your customizations**
  ```typescript
  // theme-config.ts
  // Custom colors for Acme Corp branding (approved 2024-12)
  brand: {
    primary: {
      500: '#FF6B35',  // Acme Orange
      // ...
    },
  },
  ```

### ❌ DON'T

- **Don't hardcode colors in components**
  ```astro
  <!-- Bad -->
  <div class="bg-blue-600 text-white">
  
  <!-- Good -->
  <div style={`background: ${primaryButtonBg}; color: ${primaryButtonText};`}>
  ```

- **Don't modify base component files directly in child themes**
  - Copy and rename instead
  - Or override via theme-config

- **Don't ignore upstream updates**
  - Regularly merge from upstream to get bug fixes and features

## Migration Guide

If you have existing hardcoded components:

1. **Identify hardcoded values**
   ```astro
   <!-- Before -->
   <h1 class="text-blue-600 text-5xl font-bold">
   ```

2. **Move to theme-config**
   ```typescript
   // theme-config.ts
   components: {
     hero: {
       title: {
         color: '#2563eb',
         fontSize: '3rem',
         fontWeight: '700',
       }
     }
   }
   ```

3. **Update component**
   ```astro
   <!-- After -->
   <h1 style={`
     color: ${heroTheme.title.color};
     font-size: ${heroTheme.title.fontSize};
     font-weight: ${heroTheme.title.fontWeight};
   `}>
   ```

## TypeScript Support

The theme configuration is fully typed:

```typescript
import type { ThemeConfig, ColorScheme } from '@themes/default/theme-config';

// Type-safe theme customization
const customColors: ColorScheme = {
  // TypeScript will ensure you don't miss required properties
  brand: { ... },
  semantic: { ... },
  // ...
};
```

## CSS Variables Integration

For dynamic theming, CSS variables can be generated from theme-config:

```typescript
// utils/theme-to-css-vars.ts
export function generateCSSVariables(theme: ThemeConfig) {
  return {
    '--color-primary-500': theme.colors.brand.primary[500],
    '--color-primary-600': theme.colors.brand.primary[600],
    // ...
  };
}
```

```astro
---
import { themeConfig } from '@themes/default/theme-config';
import { generateCSSVariables } from '@utils/theme-to-css-vars';

const cssVars = generateCSSVariables(themeConfig);
---

<html style={cssVars}>
  <!-- Your content -->
</html>
```

## Testing Your Theme

1. **Visual Testing**
   ```bash
   npm run dev
   # Visit http://localhost:4321
   # Check all pages with your theme
   ```

2. **Build Testing**
   ```bash
   npm run build
   npm run preview
   ```

3. **Dark Mode Testing**
   - Toggle dark mode in your browser
   - Verify all colors look good in both modes

4. **Component Testing**
   - Test hero with/without images
   - Test different content lengths
   - Test CTA buttons

## Support and Resources

- **Base Template Repository**: [Link to original repo]
- **Documentation**: [Link to docs]
- **Examples**: Check `src/themes/default/` for reference implementations
- **Issues**: Report bugs or request features in the upstream repository

## Version Compatibility

When merging updates from upstream:

- ✅ **Safe to merge**: Component improvements, bug fixes, new features
- ⚠️ **Review carefully**: Changes to theme-config structure
- 🔍 **Test thoroughly**: After merging, test all customized components

```bash
# Before merging
git fetch upstream
git diff upstream/main src/themes/default/theme-config.ts

# Review changes to theme-config structure
# Update your customizations accordingly
```

---

**Happy Theming!** 🎨

For questions or issues, please open an issue in the repository.
