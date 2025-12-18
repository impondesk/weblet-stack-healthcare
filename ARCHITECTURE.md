# Theme System Architecture

## 📊 System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    WEBLET THEME TEMPLATE                        │
│                     (Base Repository)                           │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │ Fork or Extend
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     CHILD THEME                                 │
│                  (Your Custom Theme)                            │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │  src/themes/default/theme-config.ts                       │ │
│  │  ┌─────────────────────────────────────────────────────┐  │ │
│  │  │  Brand Colors, Typography, Spacing, Components      │  │ │
│  │  │  - Change colors to match your brand                │  │ │
│  │  │  - Adjust typography for your style                 │  │ │
│  │  │  - Customize component behavior                     │  │ │
│  │  └─────────────────────────────────────────────────────┘  │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Components automatically use your theme config!               │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

```
theme-config.ts
    │
    │ Import
    ▼
┌─────────────────────┐
│   Component.astro   │
│                     │
│  Gets theme values  │◄───── Uses config values
│  from config        │       instead of hardcoded
└─────────────────────┘
    │
    │ Generates
    ▼
┌─────────────────────┐
│   Styled HTML       │
│                     │
│  Inline styles or   │
│  CSS variables      │
└─────────────────────┘
```

## 🎨 Theme Configuration Structure

```
themeConfig
├── colors
│   ├── brand
│   │   ├── primary (50-900)
│   │   ├── secondary (50-900)
│   │   └── accent
│   ├── semantic
│   │   ├── success
│   │   ├── warning
│   │   ├── error
│   │   └── info
│   ├── surface (light/dark)
│   ├── text (light/dark)
│   └── border (light/dark)
│
├── typography
│   ├── fontFamily (display, body, mono)
│   ├── fontSize (xs → 7xl)
│   ├── fontWeight
│   └── lineHeight
│
├── spacing
│   ├── container (sm → 2xl)
│   ├── section
│   └── component
│
├── borderRadius
├── shadows
├── animations
│
└── components
    ├── hero
    │   └── default
    │       ├── minHeight
    │       ├── overlay
    │       ├── subtitle
    │       ├── title
    │       ├── excerpt
    │       └── cta
    ├── card
    ├── button
    └── ... (add more as needed)
```

## 🏗️ Component Pattern

```
┌─────────────────────────────────────────────────────────────┐
│  hero-default.astro                                         │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Frontmatter (TypeScript)                            │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │ import { themeConfig } from '../theme-config'  │  │  │
│  │  │                                                 │  │  │
│  │  │ const heroTheme = themeConfig.components.hero  │  │  │
│  │  │ const primaryColor = heroTheme.cta.primary...  │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Template (HTML)                                     │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │ <section style={`color: ${primaryColor}`}>     │  │  │
│  │  │   <h1 style={`font-size: ${titleSize}`}>       │  │  │
│  │  │     {title}                                     │  │  │
│  │  │   </h1>                                         │  │  │
│  │  │ </section>                                      │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

Result: Component renders with theme colors automatically!
```

## 🔀 Multiple Theme Methods

### Method 1: Fork Repository (Simple)

```
Original Repo
    │
    │ Fork
    ▼
Your Repo
    │
    │ Edit theme-config.ts
    ▼
Customized Theme
    │
    │ Pull upstream updates
    ▼
Stay updated with features
```

### Method 2: Theme Directory (Advanced)

```
src/themes/
├── default/
│   └── theme-config.ts  ← Base theme
├── acme-corp/
│   └── theme-config.ts  ← Custom theme 1
└── globex/
    └── theme-config.ts  ← Custom theme 2

Import different configs in different components!
```

### Method 3: CSS Variables (Runtime)

```
theme-config.ts
    │
    │ Convert to CSS variables
    ▼
theme-variables.css
    │
    │ Applied to :root
    ▼
var(--color-primary-500)
    │
    │ Can be changed at runtime
    ▼
Theme switcher!
```

## 📦 File Organization

```
weblet-theme-template/
│
├── src/
│   ├── themes/
│   │   ├── default/
│   │   │   ├── theme-config.ts      ← 🎨 Main theme config
│   │   │   ├── hero/
│   │   │   │   └── hero-default.astro ← Uses theme config
│   │   │   └── ...
│   │   ├── THEMING.md               ← 📖 Detailed guide
│   │   └── example-child-theme-config.ts ← 💡 Example
│   │
│   ├── styles/
│   │   ├── global.css               ← Global styles
│   │   └── theme-variables.css      ← 🎨 CSS variables
│   │
│   ├── utils/
│   │   └── theme-to-css-vars.ts     ← 🔧 Theme utilities
│   │
│   └── ...
│
├── THEME_SYSTEM.md                  ← 📖 Quick start
├── COMPONENT_MIGRATION_GUIDE.md     ← 🔧 Migration help
├── THEME_IMPLEMENTATION_SUMMARY.md  ← ✅ What's included
└── README.md                        ← Overview
```

## 🎯 Customization Workflow

```
1. Identify What to Change
   ├── Colors? → Edit colorScheme
   ├── Fonts? → Edit typography
   ├── Spacing? → Edit spacing
   └── Component? → Edit components.componentName

2. Edit theme-config.ts
   └── Change values (colors, sizes, etc.)

3. Components Update Automatically
   └── No need to touch component files!

4. Test
   ├── Light mode ✓
   ├── Dark mode ✓
   └── Responsive ✓

5. Deploy
   └── Your customized theme is ready!
```

## 🌗 Dark Mode Flow

```
:root {
  --color-surface-primary: #ffffff;  ← Light mode
  --color-text-primary: #0f172a;
}

.dark {
  --color-surface-primary: #0f172a;  ← Dark mode
  --color-text-primary: #f8fafc;
}

Component uses: var(--color-surface-primary)
    │
    │ Automatically switches based on .dark class
    ▼
Correct color for current mode!
```

## 🔄 Update Flow from Upstream

```
Base Template (Upstream)
    │ New features,
    │ Bug fixes,
    │ New components
    ▼
Your Fork
    │
    │ git fetch upstream
    │ git merge upstream/main
    ▼
Conflicts?
    ├─ Yes → Resolve in theme-config.ts
    │         Keep your customizations
    │         Adopt new structure
    └─ No → Perfect! You're updated
    │
    ▼
Test & Deploy
```

## 💡 Example: Change Brand Color

```
Step 1: Edit theme-config.ts
────────────────────────────────
colorScheme: {
  brand: {
    primary: {
      500: '#10b981'  ← Changed from #3b82f6
    }
  }
}

Step 2: Save file
────────────────────────────────
(No other changes needed!)

Step 3: Result
────────────────────────────────
✅ Hero buttons → Green
✅ Links → Green
✅ CTAs → Green
✅ All components using primary color → Green

All automatically updated!
```

## 🎨 Theme Variants Example

```
Light Mode
──────────────────────
Background: White (#ffffff)
Text: Dark (#0f172a)
Primary: Blue (#3b82f6)
    │
    │ Toggle dark mode
    ▼
Dark Mode
──────────────────────
Background: Dark (#0f172a)
Text: Light (#f8fafc)
Primary: Blue (#3b82f6)

Same theme config, different mode!
```

## 🚀 Benefits Summary

```
For Template Maintainers:
┌────────────────────────────────┐
│ ✅ Update components safely    │
│ ✅ Add features easily          │
│ ✅ Don't break child themes     │
└────────────────────────────────┘

For Child Theme Developers:
┌────────────────────────────────┐
│ ✅ Change theme-config only    │
│ ✅ Get upstream updates         │
│ ✅ Easy white-labeling          │
└────────────────────────────────┘

For End Users:
┌────────────────────────────────┐
│ ✅ Consistent experience        │
│ ✅ Dark mode support            │
│ ✅ Performant theming           │
└────────────────────────────────┘
```

## 📊 Architecture Layers

```
Layer 1: Configuration
├── theme-config.ts (TypeScript)
└── theme-variables.css (CSS)
    │
    │ Consumed by
    ▼
Layer 2: Components
├── hero-default.astro
├── card.astro
└── button.astro
    │
    │ Renders to
    ▼
Layer 3: HTML/CSS
├── Styled elements
└── CSS variables
    │
    │ Displays as
    ▼
Layer 4: User Interface
└── Themed website
```

---

**This architecture enables:**
- 🎨 Easy theming without code changes
- 🔄 Safe updates from upstream
- 🌗 Built-in dark mode support
- 📦 Multiple theme variants
- ⚡ Type-safe customization
- 🚀 Production-ready theming

**Start customizing your theme now!** See [THEME_SYSTEM.md](THEME_SYSTEM.md) for quick start.
