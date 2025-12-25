# weblet-theme-template

A flexible, white-label Astro theme template with a powerful theming system for easy customization.

## 🎨 Theming System

This template includes a comprehensive theming system that allows easy white-labeling and customization without modifying component code.

### Quick Start

1. **For Single Theme** - Fork this repository and customize `src/themes/default/theme-config.ts`
2. **For Multiple Themes** - Create theme directories under `src/themes/`
3. **For Simple Changes** - Edit CSS variables in `src/styles/theme-variables.css`

### Documentation

- **[📖 Theme System Overview](THEME_SYSTEM.md)** - Quick start guide for child themes
- **[📚 Detailed Theming Guide](src/themes/THEMING.md)** - Complete theming documentation
- **[🔧 Component Migration Guide](COMPONENT_MIGRATION_GUIDE.md)** - Migrate components to use themes
- **[✅ Implementation Summary](THEME_IMPLEMENTATION_SUMMARY.md)** - What's included in the theme system
- **[💡 Example Theme Config](src/themes/example-child-theme-config.ts)** - Example customization

### Features

- ✅ **Configuration-driven theming** - All styling in one config file
- ✅ **Component decoupling** - Components consume theme config, not hardcoded values
- ✅ **CSS variables support** - Runtime theming with CSS custom properties
- ✅ **Dark mode ready** - Built-in light/dark mode support
- ✅ **TypeScript types** - Type-safe theme customization
- ✅ **Child theme friendly** - Easy to fork and customize
- ✅ **Multiple override methods** - Choose what works for you

---

## Development

git remote add upstream https://github.com/impondesk/weblet-theme-template.git

git merge upstream/main --allow-unrelated-histories



git checkout main
git fetch upstream
git merge upstream/main
git push origin main


# Ports
Menova - yarn dev --port 9090
Default - yarn dev --port 9091
Menu - yarn dev --port 9092
Gunchiiis - yarn dev --port 9093
Reset Room - yarn dev --port 9094
Beanery - yarn dev --port 9095



https://menova.weblethq.com/
https://gunchiiis.menova.weblethq.com/
https://menova.weblethq.com/barber-menu
https://menova.weblethq.com/bakery-menu
https://menova.weblethq.com/cafe-menu



Menova Dx helps businesses design, manage, and deliver modern digital menu experiences across every customer touchpoint. A next-generation menu management platform built on Weblet. It helps restaurants, hotels, cafés, bars, retailers, and service brands create dynamic menus with real-time updates, powerful customization, and frictionless publishing, Reinventing Digital Menus for Every Business