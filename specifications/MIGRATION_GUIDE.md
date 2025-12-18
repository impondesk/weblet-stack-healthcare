# Migration Guide: Updating Components to Use Tenant Theme Colors

This guide helps you update existing components to work with the new tenant theming system.

## Quick Reference

### Color Mapping

| Old Hardcoded Color | New Theme Class | CSS Variable |
|---------------------|----------------|--------------|
| `bg-blue-500` | `bg-primary-500` | `--color-primary-500` |
| `text-blue-600` | `text-primary-600` | `--color-primary-600` |
| `bg-gray-500` | `bg-secondary-500` | `--color-secondary-500` |
| `text-purple-500` | `text-accent-500` | `--color-accent-500` |
| `border-blue-300` | `border-primary-300` | `--color-primary-300` |

## Step-by-Step Migration

### Step 1: Identify Hardcoded Colors

Search your codebase for hardcoded Tailwind color classes:

```bash
# Search for common color patterns
grep -r "bg-blue-" src/
grep -r "text-blue-" src/
grep -r "border-blue-" src/
# etc.
```

### Step 2: Replace with Theme Colors

#### Before:
```astro
<button class="bg-blue-500 hover:bg-blue-600 text-white">
  Click me
</button>
```

#### After:
```astro
<button class="bg-primary-500 hover:bg-primary-600 text-white">
  Click me
</button>
```

### Step 3: Update Component Props

If your components accept color props, update them to use theme colors:

#### Before:
```astro
---
interface Props {
  color?: 'blue' | 'red' | 'green';
}
const { color = 'blue' } = Astro.props;
---
<div class={`bg-${color}-500`}>Content</div>
```

#### After:
```astro
---
interface Props {
  variant?: 'primary' | 'secondary' | 'accent';
}
const { variant = 'primary' } = Astro.props;
---
<div class={`bg-${variant}-500`}>Content</div>
```

### Step 4: Update Custom CSS

#### Before (hardcoded hex):
```css
.custom-element {
  background-color: #3b82f6;
  border: 1px solid #2563eb;
}
```

#### After (using CSS variables):
```css
.custom-element {
  background-color: rgb(var(--color-primary-500));
  border: 1px solid rgb(var(--color-primary-600));
}
```

## Common Patterns

### Pattern 1: Button Component

#### Before:
```astro
---
// Button.astro
interface Props {
  variant?: 'primary' | 'secondary';
}
const { variant = 'primary' } = Astro.props;

const variantClasses = {
  primary: 'bg-blue-500 hover:bg-blue-600',
  secondary: 'bg-gray-500 hover:bg-gray-600',
};
---
<button class={`${variantClasses[variant]} text-white px-4 py-2 rounded`}>
  <slot />
</button>
```

#### After:
```astro
---
// Button.astro
interface Props {
  variant?: 'primary' | 'secondary';
}
const { variant = 'primary' } = Astro.props;

const variantClasses = {
  primary: 'bg-primary-500 hover:bg-primary-600',
  secondary: 'bg-secondary-500 hover:bg-secondary-600',
};
---
<button class={`${variantClasses[variant]} text-white px-4 py-2 rounded`}>
  <slot />
</button>
```

### Pattern 2: Card Component

#### Before:
```astro
<div class="bg-white border border-gray-200 rounded-lg p-6">
  <h3 class="text-blue-600 font-bold mb-2">Title</h3>
  <p class="text-gray-700">Content</p>
</div>
```

#### After:
```astro
<div class="bg-surface-primary border border-secondary-200 rounded-lg p-6">
  <h3 class="text-primary-600 font-bold mb-2">Title</h3>
  <p class="text-secondary-700">Content</p>
</div>
```

### Pattern 3: Badge Component

#### Before:
```astro
<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
  Badge
</span>
```

#### After:
```astro
<span class="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
  Badge
</span>
```

### Pattern 4: Link Component

#### Before:
```astro
<a href="#" class="text-blue-600 hover:text-blue-800 underline">
  Link
</a>
```

#### After:
```astro
<a href="#" class="text-primary-600 hover:text-primary-800 underline">
  Link
</a>
```

## Advanced: Dynamic Color Selection

If you need to programmatically select colors based on data:

```astro
---
interface Props {
  status: 'active' | 'pending' | 'inactive';
}
const { status } = Astro.props;

const statusColors = {
  active: 'primary',
  pending: 'accent',
  inactive: 'secondary',
};

const colorScheme = statusColors[status];
---

<div class={`bg-${colorScheme}-100 border border-${colorScheme}-300 rounded p-4`}>
  <span class={`text-${colorScheme}-800 font-semibold`}>
    {status}
  </span>
</div>
```

## CSS-in-JS / Style Props

If you're using inline styles or CSS-in-JS:

#### Before:
```astro
<div style="background-color: #3b82f6; color: white;">
  Content
</div>
```

#### After:
```astro
<div style="background-color: rgb(var(--color-primary-500)); color: white;">
  Content
</div>
```

## Testing Your Migration

1. **Visual inspection**: Check key pages for correct color application
2. **Different tenants**: Test with multiple tenant configurations
3. **Dark mode** (if applicable): Ensure colors work in both modes
4. **Component library**: Create a style guide page showing all components

## Checklist

- [ ] Replace all hardcoded blue colors with `primary`
- [ ] Replace all hardcoded gray/slate colors with `secondary`
- [ ] Replace all hardcoded purple/pink colors with `accent`
- [ ] Update component props from specific colors to theme variants
- [ ] Convert hex/rgb values in CSS to CSS variables
- [ ] Update inline styles to use CSS variables
- [ ] Test with default theme
- [ ] Test with at least one custom tenant theme
- [ ] Update documentation/comments

## Automated Migration Script

You can use this bash/PowerShell script to help with bulk replacements:

### PowerShell (Windows):
```powershell
# Replace bg-blue with bg-primary
Get-ChildItem -Path "src" -Recurse -Include *.astro,*.tsx,*.ts | 
ForEach-Object {
    (Get-Content $_.FullName) -replace 'bg-blue-', 'bg-primary-' | 
    Set-Content $_.FullName
}

# Replace text-blue with text-primary
Get-ChildItem -Path "src" -Recurse -Include *.astro,*.tsx,*.ts | 
ForEach-Object {
    (Get-Content $_.FullName) -replace 'text-blue-', 'text-primary-' | 
    Set-Content $_.FullName
}
```

### Bash (Linux/Mac):
```bash
# Replace bg-blue with bg-primary
find src -type f \( -name "*.astro" -o -name "*.tsx" -o -name "*.ts" \) \
  -exec sed -i 's/bg-blue-/bg-primary-/g' {} +

# Replace text-blue with text-primary
find src -type f \( -name "*.astro" -o -name "*.tsx" -o -name "*.ts" \) \
  -exec sed -i 's/text-blue-/text-primary-/g' {} +
```

**⚠️ Warning**: Always commit your changes before running automated scripts, and review the changes carefully.

## Common Issues

### Issue 1: Safelist in Tailwind Config

If you're using dynamic class names, you may need to safelist them:

```javascript
// tailwind.config.mjs
export default {
  safelist: [
    {
      pattern: /bg-(primary|secondary|accent)-(50|100|500|600|900)/,
    },
  ],
  // ... rest of config
}
```

### Issue 2: PurgeCSS Removing Classes

Ensure your Tailwind content configuration includes all files:

```javascript
content: [
  './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'
],
```

### Issue 3: TypeScript Errors with Dynamic Classes

Use type-safe approach:

```typescript
type ThemeColor = 'primary' | 'secondary' | 'accent';
type ColorShade = '50' | '100' | '500' | '600' | '900';

function getColorClass(color: ThemeColor, shade: ColorShade) {
  return `bg-${color}-${shade}`;
}
```

## Best Practices

1. **Be Consistent**: Use `primary` for main brand color, `secondary` for neutral colors
2. **Document Decisions**: Comment why certain colors are chosen
3. **Create Components**: Encapsulate color logic in reusable components
4. **Test Accessibility**: Ensure color contrast ratios meet WCAG standards
5. **Version Control**: Make migration in small, reviewable commits

## Next Steps

After migration:
1. Remove any unused hardcoded color utilities from your config
2. Document your color usage patterns for the team
3. Create a component library/style guide
4. Set up automated visual regression testing
