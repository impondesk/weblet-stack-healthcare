# Theme System Checklist

Use this checklist to ensure you've properly implemented the theme system in your child theme.

## 📋 Initial Setup

### For New Child Theme (Fork Method)

- [ ] Fork the base template repository
- [ ] Clone your fork locally
- [ ] Install dependencies (`npm install`)
- [ ] Verify dev server runs (`npm run dev`)
- [ ] Review base theme config (`src/themes/default/theme-config.ts`)

### For Multiple Themes (Directory Method)

- [ ] Create new theme directory (`src/themes/your-brand/`)
- [ ] Copy theme-config.ts to new directory
- [ ] Set up imports in components
- [ ] Configure build to use correct theme

## 🎨 Theme Customization

### Brand Colors

- [ ] Define primary brand color (500 shade)
- [ ] Define hover/active state (600 shade)
- [ ] Define full color palette (50-900 shades)
- [ ] Define secondary colors (if needed)
- [ ] Define accent colors (if needed)
- [ ] Test colors in light mode
- [ ] Test colors in dark mode
- [ ] Verify color contrast meets accessibility standards (WCAG AA minimum)

### Typography

- [ ] Choose display font (for headings)
- [ ] Choose body font (for text)
- [ ] Choose monospace font (for code, if needed)
- [ ] Add font imports to global.css
- [ ] Configure font sizes for mobile
- [ ] Configure font sizes for desktop
- [ ] Set font weights
- [ ] Set line heights

### Spacing & Layout

- [ ] Define container max-widths
- [ ] Set section padding (vertical)
- [ ] Set section padding (horizontal)
- [ ] Define component gaps
- [ ] Test on mobile (320px - 768px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (1024px+)

### Visual Effects

- [ ] Configure border radius values
- [ ] Define shadow styles
- [ ] Set animation durations
- [ ] Set animation timing functions

## 🧩 Component Configuration

### Hero Component

- [ ] Set minimum height
- [ ] Configure overlay gradient
- [ ] Set backdrop blur amount
- [ ] Configure subtitle styling
- [ ] Configure title styling
- [ ] Configure excerpt styling
- [ ] Configure CTA button colors (primary)
- [ ] Configure CTA button colors (secondary)
- [ ] Test with image background
- [ ] Test without image background
- [ ] Test in dark mode
- [ ] Test in light mode

### Other Components (as you add them)

- [ ] Card component configured
- [ ] Button component configured
- [ ] Navigation component configured
- [ ] Footer component configured
- [ ] Form components configured
- [ ] (Add more as needed)

## 🌗 Dark Mode

### Configuration

- [ ] Dark surface colors defined
- [ ] Dark text colors defined
- [ ] Dark border colors defined
- [ ] Dark mode shadows adjusted
- [ ] Component configs support dark mode

### Testing

- [ ] Toggle dark mode in browser
- [ ] Verify all text is readable
- [ ] Check contrast ratios
- [ ] Test interactive elements (hover, focus, active)
- [ ] Verify images/media display correctly
- [ ] Test transitions between modes

## 💻 Development

### Code Quality

- [ ] TypeScript types are correct
- [ ] No hardcoded colors in components
- [ ] No hardcoded spacing in components
- [ ] All values from theme config
- [ ] CSS variables properly defined
- [ ] No console errors
- [ ] No TypeScript errors

### Browser Testing

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Performance

- [ ] CSS bundle size reasonable
- [ ] No unused CSS variables
- [ ] Images optimized
- [ ] Fonts loaded efficiently

## 📖 Documentation

### Internal Documentation

- [ ] Document custom theme in theme-config.ts comments
- [ ] Note any deviations from base theme
- [ ] Document custom components
- [ ] Add usage examples

### Team Documentation

- [ ] Share theme guidelines with team
- [ ] Document brand colors and usage
- [ ] Create component style guide
- [ ] Document theming workflow

## 🧪 Testing

### Visual Testing

- [ ] All pages reviewed in light mode
- [ ] All pages reviewed in dark mode
- [ ] Components tested with different content lengths
- [ ] Responsive behavior verified
- [ ] Print styles tested (if applicable)

### Functional Testing

- [ ] Links work correctly
- [ ] Forms submit properly
- [ ] Navigation functions
- [ ] Dark mode toggle works
- [ ] No layout breaks

### Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader friendly
- [ ] Color contrast sufficient
- [ ] Focus indicators visible
- [ ] ARIA labels appropriate

## 🚀 Pre-Deployment

### Build Process

- [ ] Production build succeeds (`npm run build`)
- [ ] Preview build locally (`npm run preview`)
- [ ] No build warnings
- [ ] Assets optimized

### Final Checks

- [ ] All components use theme config
- [ ] No hardcoded values remain
- [ ] Dark mode works correctly
- [ ] Responsive design verified
- [ ] Performance acceptable
- [ ] SEO meta tags updated (if needed)

## 📦 Deployment

### Deployment Steps

- [ ] Choose hosting platform (Vercel, Netlify, etc.)
- [ ] Configure build settings
- [ ] Set environment variables (if needed)
- [ ] Deploy to staging
- [ ] Test staging environment
- [ ] Deploy to production

### Post-Deployment

- [ ] Verify production site loads
- [ ] Test all major functionality
- [ ] Check analytics/monitoring
- [ ] Monitor error logs
- [ ] Gather user feedback

## 🔄 Maintenance

### Regular Updates

- [ ] Check for upstream updates monthly
- [ ] Test updates in dev environment
- [ ] Merge updates to main branch
- [ ] Redeploy if needed

### Ongoing Tasks

- [ ] Monitor theme performance
- [ ] Gather user feedback
- [ ] Fix bugs as discovered
- [ ] Add new components as needed
- [ ] Update documentation

## 🎓 Knowledge Transfer

### Team Onboarding

- [ ] Share THEME_SYSTEM.md with team
- [ ] Provide access to theme-config.ts
- [ ] Explain customization workflow
- [ ] Document common tasks

### Best Practices Shared

- [ ] Don't hardcode colors
- [ ] Always use theme config
- [ ] Support both light and dark modes
- [ ] Test responsive behavior
- [ ] Document customizations

## 🆘 Troubleshooting

If you encounter issues, check:

- [ ] Theme config syntax is valid
- [ ] CSS variables are properly defined
- [ ] Components import correct theme config
- [ ] No conflicting styles
- [ ] Build cache cleared
- [ ] Dev server restarted

## 📊 Metrics & Success Criteria

### Before Launch

- [ ] Lighthouse score > 90 (Performance)
- [ ] Lighthouse score > 90 (Accessibility)
- [ ] Lighthouse score > 90 (Best Practices)
- [ ] Lighthouse score > 90 (SEO)
- [ ] Zero console errors
- [ ] Zero TypeScript errors

### Post Launch

- [ ] Monitor Core Web Vitals
- [ ] Track user engagement
- [ ] Monitor error rates
- [ ] Gather feedback
- [ ] Plan improvements

## ✅ Sign-Off

### Development Team

- [ ] Developer approved
- [ ] Code reviewed
- [ ] Tests passing

### Design Team

- [ ] Colors approved
- [ ] Typography approved
- [ ] Spacing approved
- [ ] Components approved

### Stakeholders

- [ ] Brand guidelines met
- [ ] Accessibility requirements met
- [ ] Performance targets met
- [ ] Ready for launch

---

## 📝 Notes Section

Use this space to track custom modifications or issues:

```
Date: _______________
Changes made:
_________________________________
_________________________________
_________________________________

Issues encountered:
_________________________________
_________________________________
_________________________________

Resolutions:
_________________________________
_________________________________
_________________________________
```

---

**Checklist Version**: 1.0
**Last Updated**: December 18, 2025

**Need help?** See:
- [THEME_SYSTEM.md](THEME_SYSTEM.md) - Quick start
- [THEMING.md](src/themes/THEMING.md) - Detailed guide
- [COMPONENT_MIGRATION_GUIDE.md](COMPONENT_MIGRATION_GUIDE.md) - Migration help
