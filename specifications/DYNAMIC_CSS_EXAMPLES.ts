/**
 * Example Payload API Responses with Dynamic CSS
 * 
 * Copy these examples to your backend/payload implementation
 */

// =============================================================================
// EXAMPLE 1: CSS URL - Recommended for Production
// =============================================================================

export const cssUrlExample = {
  id: "tenant-123",
  name: "Coffee Shop Deluxe",
  domain: "coffee.example.com",
  
  // URL to complete theme CSS file (can include Tailwind customizations)
  themeCssUrl: "https://cdn.yoursite.com/themes/tenant-123/theme-v2.css",
  
  // Fallback color config (in case CSS fails to load)
  themeConfig: {
    colors: {
      primary: {
        500: "101, 67, 33", // Coffee brown
        600: "91, 57, 23",
      },
    },
  },
};

// =============================================================================
// EXAMPLE 2: Inline CSS Content - Good for Small Customizations
// =============================================================================

export const inlineCssExample = {
  id: "tenant-456",
  name: "Yoga Studio",
  domain: "yoga.example.com",
  
  // Raw CSS content injected inline
  themeCssContent: `
    :root {
      --color-primary-500: 139, 195, 74;
      --color-primary-600: 124, 179, 66;
      --color-accent-500: 255, 193, 7;
      --font-heading: 'Montserrat', sans-serif;
    }
    
    .hero-title {
      font-family: var(--font-heading);
      letter-spacing: 0.05em;
    }
    
    .zen-animation {
      animation: breathe 4s ease-in-out infinite;
    }
    
    @keyframes breathe {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.02); }
    }
  `,
};

// =============================================================================
// EXAMPLE 3: Complete Tailwind Customization
// =============================================================================

export const tailwindCustomExample = {
  id: "tenant-789",
  name: "Tech Startup",
  domain: "startup.example.com",
  
  // URL to custom Tailwind build
  themeCssUrl: "https://cdn.yoursite.com/themes/tenant-789/tailwind-custom.css",
  
  // This CSS file could contain:
  // - Custom color utilities (bg-brand-500, text-brand-600)
  // - Custom fonts (@font-face declarations)
  // - Custom animations
  // - Custom component classes
  // - Responsive utilities
  // - Dark mode variations
};

// =============================================================================
// EXAMPLE 4: Hybrid Approach - Base CSS + Overrides
// =============================================================================

export const hybridExample = {
  id: "tenant-999",
  name: "Restaurant Chain",
  domain: "restaurant.example.com",
  
  // Base Tailwind CSS from CDN (shared, cached)
  themeCssUrl: "https://cdn.yoursite.com/themes/base-tailwind-v3.css",
  
  // Small tenant-specific overrides
  themeCssContent: `
    :root {
      --brand-primary: 220, 38, 38;
      --brand-secondary: 253, 224, 71;
      --location-color: 34, 197, 94;
    }
    
    .restaurant-card {
      border-color: rgb(var(--brand-primary));
      box-shadow: 0 4px 6px rgba(var(--brand-primary), 0.1);
    }
  `,
};

// =============================================================================
// EXAMPLE 5: Backward Compatible - Just Color Config
// =============================================================================

export const backwardCompatibleExample = {
  id: "tenant-legacy",
  name: "Legacy Tenant",
  domain: "legacy.example.com",
  
  // No themeCssUrl or themeCssContent - uses color config only
  themeConfig: {
    colors: {
      primary: {
        50: "239, 246, 255",
        100: "219, 234, 254",
        200: "191, 219, 254",
        300: "147, 197, 253",
        400: "96, 165, 250",
        500: "59, 130, 246", // Blue
        600: "37, 99, 235",
        700: "29, 78, 216",
        800: "30, 64, 175",
        900: "30, 58, 138",
      },
      secondary: {
        500: "100, 116, 139", // Slate
        600: "71, 85, 105",
      },
      accent: {
        500: "217, 70, 239", // Purple
        600: "192, 38, 211",
      },
    },
  },
};

// =============================================================================
// EXAMPLE 6: Multi-Brand with Shared Base
// =============================================================================

export const multiBrandExample = {
  id: "tenant-multi",
  name: "Multi-Brand Company",
  domain: "multi.example.com",
  brands: ["brand-a", "brand-b", "brand-c"],
  
  // Shared base CSS for all brands
  themeCssUrl: "https://cdn.yoursite.com/themes/multi-brand-base.css",
  
  // Brand-specific overrides (could be dynamic based on subdomain)
  themeCssContent: `
    /* Default brand colors */
    :root {
      --brand-a-color: 239, 68, 68;
      --brand-b-color: 59, 130, 246;
      --brand-c-color: 34, 197, 94;
    }
    
    [data-brand="brand-a"] {
      --active-brand: var(--brand-a-color);
    }
    
    [data-brand="brand-b"] {
      --active-brand: var(--brand-b-color);
    }
    
    [data-brand="brand-c"] {
      --active-brand: var(--brand-c-color);
    }
  `,
};

// =============================================================================
// EXAMPLE 7: Season/Event Themes
// =============================================================================

export const seasonalThemeExample = {
  id: "tenant-seasonal",
  name: "Seasonal Business",
  domain: "seasonal.example.com",
  
  // Different CSS based on current season/event
  themeCssUrl: getCurrentSeasonalThemeUrl(), // Function returns appropriate URL
  
  // Fallback colors
  themeConfig: {
    colors: {
      primary: { 500: "239, 68, 68" }, // Default red
    },
  },
};

// Helper function for seasonal themes
function getCurrentSeasonalThemeUrl() {
  const month = new Date().getMonth();
  
  if (month === 11 || month === 0) {
    // December-January: Winter/Holiday theme
    return "https://cdn.yoursite.com/themes/seasonal/winter.css";
  } else if (month >= 2 && month <= 4) {
    // March-May: Spring theme
    return "https://cdn.yoursite.com/themes/seasonal/spring.css";
  } else if (month >= 5 && month <= 7) {
    // June-August: Summer theme
    return "https://cdn.yoursite.com/themes/seasonal/summer.css";
  } else {
    // September-November: Fall theme
    return "https://cdn.yoursite.com/themes/seasonal/fall.css";
  }
}

// =============================================================================
// EXAMPLE 8: A/B Testing Themes
// =============================================================================

export const abTestingExample = {
  id: "tenant-ab-test",
  name: "AB Testing Company",
  domain: "abtest.example.com",
  
  // Different theme based on A/B test variant
  themeCssUrl: getABTestThemeUrl(), // Returns variant A or B
  
  abTest: {
    active: true,
    variants: ["variant-a", "variant-b"],
    currentVariant: "variant-a", // Set by backend
  },
};

function getABTestThemeUrl() {
  // Your A/B testing logic here
  const variant = Math.random() > 0.5 ? "variant-a" : "variant-b";
  return `https://cdn.yoursite.com/themes/ab-test/${variant}.css`;
}

// =============================================================================
// EXAMPLE 9: Complete CSS File Example (what the URL would return)
// =============================================================================

export const cssFileContentExample = `
/* Complete theme.css example */
/* This is what your themeCssUrl would point to */

/* Import custom fonts */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

/* CSS Variables - Tailwind Compatible */
:root {
  /* Primary Colors */
  --color-primary-50: 254, 242, 242;
  --color-primary-100: 254, 226, 226;
  --color-primary-200: 254, 202, 202;
  --color-primary-300: 252, 165, 165;
  --color-primary-400: 248, 113, 113;
  --color-primary-500: 239, 68, 68;
  --color-primary-600: 220, 38, 38;
  --color-primary-700: 185, 28, 28;
  --color-primary-800: 153, 27, 27;
  --color-primary-900: 127, 29, 29;
  
  /* Custom Fonts */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
  
  /* Spacing */
  --spacing-hero: 8rem;
  --spacing-section: 4rem;
}

/* Custom Utility Classes */
.text-brand {
  color: rgb(var(--color-primary-600));
}

.bg-brand {
  background-color: rgb(var(--color-primary-500));
}

.border-brand {
  border-color: rgb(var(--color-primary-500));
}

/* Custom Components */
.hero-title {
  font-family: var(--font-heading);
  font-size: 4rem;
  line-height: 1.1;
  color: rgb(var(--color-primary-900));
}

.btn-primary {
  background-color: rgb(var(--color-primary-600));
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: rgb(var(--color-primary-700));
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(var(--color-primary-600), 0.3);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* Responsive Utilities */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  :root {
    --spacing-hero: 4rem;
    --spacing-section: 2rem;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary-500: 248, 113, 113;
    --color-primary-600: 252, 165, 165;
  }
}
`;

// =============================================================================
// BACKEND IMPLEMENTATION EXAMPLE
// =============================================================================

/**
 * Example backend function to generate theme CSS
 */
export async function generateTenantThemeCSS(tenant) {
  // 1. Get tenant customizations
  const { colors, fonts, spacing } = tenant.themeConfig;
  
  // 2. Build CSS content
  const cssContent = `
    :root {
      ${Object.entries(colors.primary || {})
        .map(([shade, rgb]) => `--color-primary-${shade}: ${rgb};`)
        .join('\n      ')}
      
      ${fonts?.heading ? `--font-heading: '${fonts.heading}';` : ''}
      ${fonts?.body ? `--font-body: '${fonts.body}';` : ''}
    }
    
    /* Auto-generated utility classes */
    .bg-primary { background-color: rgb(var(--color-primary-500)); }
    .text-primary { color: rgb(var(--color-primary-600)); }
    .border-primary { border-color: rgb(var(--color-primary-500)); }
  `;
  
  // 3. Upload to CDN
  const fileName = `${tenant.id}-v${tenant.themeVersion || 1}.css`;
  const cdnUrl = await uploadToCDN(cssContent, fileName);
  
  // 4. Update tenant record
  await updateTenant(tenant.id, {
    themeCssUrl: cdnUrl,
    themeLastUpdated: new Date(),
  });
  
  return cdnUrl;
}

/**
 * Example API endpoint
 */
export async function getTenantByDomain(domain) {
  // Fetch tenant from database
  const tenant = await db.tenants.findOne({ domain });
  
  if (!tenant) {
    return null;
  }
  
  // Return with theme CSS URL
  return {
    id: tenant.id,
    name: tenant.name,
    domain: tenant.domain,
    themeCssUrl: tenant.themeCssUrl, // ← New field
    themeCssContent: tenant.themeCssContent, // ← New field
    themeConfig: tenant.themeConfig, // ← Fallback
  };
}
`;
