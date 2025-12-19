/**
 * Quick Reference: Switch Themes by Tenant Domain
 * 
 * Use this in your backend to map domains to themes
 */

// =============================================================================
// OPTION 1: Simple Domain-to-Theme Mapping
// =============================================================================

export const tenantThemeMap = {
  // Coffee Shop
  'coffee.example.com': '/themes/coffee-brown-theme.css',
  'cafe.example.com': '/themes/coffee-brown-theme.css',
  'bakery.example.com': '/themes/coffee-brown-theme.css',
  
  // Ocean/Corporate
  'ocean.example.com': '/themes/ocean-blue-theme.css',
  'tech.example.com': '/themes/ocean-blue-theme.css',
  'corporate.example.com': '/themes/ocean-blue-theme.css',
  
  // Forest/Eco
  'forest.example.com': '/themes/forest-green-theme.css',
  'eco.example.com': '/themes/forest-green-theme.css',
  'green.example.com': '/themes/forest-green-theme.css',
  
  // Sunset/Creative
  'sunset.example.com': '/themes/sunset-purple-theme.css',
  'creative.example.com': '/themes/sunset-purple-theme.css',
  'agency.example.com': '/themes/sunset-purple-theme.css',
};

/**
 * Get theme CSS URL for a domain
 */
export function getThemeForDomain(domain: string): string {
  return tenantThemeMap[domain] || '/themes/coffee-brown-theme.css'; // default
}

// =============================================================================
// OPTION 2: Use in Middleware (Astro)
// =============================================================================

import { defineMiddleware } from 'astro/middleware';

export const loadTenant = defineMiddleware(async (context, next) => {
  const hostname = context.request.headers.get('host') || '';
  const domain = hostname.split(':')[0]; // Remove port if present
  
  // Simple theme switching based on domain
  const themeCssUrl = getThemeForDomain(domain);
  
  // Set tenant data
  context.locals.tenant = {
    id: domain,
    name: getTenantName(domain),
    domain: domain,
    themeCssUrl: themeCssUrl, // ← This is the key!
  };
  
  return next();
});

function getTenantName(domain: string): string {
  const nameMap: Record<string, string> = {
    'coffee.example.com': 'Coffee Shop',
    'ocean.example.com': 'Ocean Business',
    'forest.example.com': 'Eco Company',
    'sunset.example.com': 'Creative Agency',
  };
  return nameMap[domain] || 'Default Tenant';
}

// =============================================================================
// OPTION 3: Payload CMS Hook
// =============================================================================

export const TenantsCollection = {
  slug: 'tenants',
  fields: [
    {
      name: 'domain',
      type: 'text',
      required: true,
    },
    {
      name: 'themePreset',
      type: 'select',
      options: [
        { label: 'Coffee Brown', value: 'coffee-brown' },
        { label: 'Ocean Blue', value: 'ocean-blue' },
        { label: 'Forest Green', value: 'forest-green' },
        { label: 'Sunset Purple', value: 'sunset-purple' },
      ],
      required: true,
    },
    {
      name: 'themeCssUrl',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Auto-generated from theme preset',
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        // Auto-set themeCssUrl based on preset
        if (data.themePreset) {
          data.themeCssUrl = `/themes/${data.themePreset}-theme.css`;
        }
        return data;
      },
    ],
  },
};

// =============================================================================
// OPTION 4: API Endpoint (Express/Next.js)
// =============================================================================

import express from 'express';

const router = express.Router();

router.get('/api/tenants/by-domain', async (req, res) => {
  const { domain } = req.query;
  
  // Fetch tenant from database
  const tenant = await db.tenants.findOne({ domain });
  
  if (!tenant) {
    return res.status(404).json({ error: 'Tenant not found' });
  }
  
  // Return with theme CSS URL based on preset
  res.json({
    id: tenant.id,
    name: tenant.name,
    domain: tenant.domain,
    themeCssUrl: `/themes/${tenant.themePreset}-theme.css`,
    themePreset: tenant.themePreset,
  });
});

// =============================================================================
// OPTION 5: Test Locally with Query Parameter
// =============================================================================

/**
 * For testing, allow theme switching via query parameter
 * Example: http://localhost:3000?theme=ocean-blue
 */
export const testThemeSwitcher = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);
  const themeParam = url.searchParams.get('theme');
  
  if (themeParam) {
    const validThemes = ['coffee-brown', 'ocean-blue', 'forest-green', 'sunset-purple'];
    if (validThemes.includes(themeParam)) {
      context.locals.tenant = {
        ...context.locals.tenant,
        themeCssUrl: `/themes/${themeParam}-theme.css`,
      };
    }
  }
  
  return next();
});

// Add to middleware chain:
// export const onRequest = sequence(loadTenant, testThemeSwitcher, tenant);

// =============================================================================
// USAGE EXAMPLES
// =============================================================================

/**
 * Example 1: Static mapping in middleware
 */
export const staticExample = {
  'coffee.example.com': {
    id: 'tenant-coffee',
    name: 'Coffee Shop',
    domain: 'coffee.example.com',
    themeCssUrl: '/themes/coffee-brown-theme.css',
  },
};

/**
 * Example 2: Dynamic from database
 */
export async function getTenantWithTheme(domain: string) {
  const tenant = await db.query('SELECT * FROM tenants WHERE domain = ?', [domain]);
  
  return {
    id: tenant.id,
    name: tenant.name,
    domain: tenant.domain,
    themeCssUrl: `/themes/${tenant.theme_preset}-theme.css`,
  };
}

/**
 * Example 3: CDN-hosted themes
 */
export function getTenantWithCDN(domain: string) {
  const themePreset = getThemePreset(domain);
  const cdnBase = 'https://cdn.yoursite.com';
  
  return {
    themeCssUrl: `${cdnBase}/themes/${themePreset}-theme.css`,
  };
}

/**
 * Example 4: Inline theme content (for small changes)
 */
export async function getTenantWithInlineTheme(domain: string) {
  const themeFile = getThemeForDomain(domain);
  const themeContent = await fs.readFile(`./public${themeFile}`, 'utf-8');
  
  return {
    themeCssContent: themeContent, // Pass entire CSS as string
  };
}

// =============================================================================
// TESTING CHECKLIST
// =============================================================================

/**
 * 1. Test theme loads correctly:
 *    - Open http://localhost:3000?theme=ocean-blue
 *    - Check console: "Load Method: dynamic-url"
 *    - Check Network tab: /themes/ocean-blue-theme.css (200)
 * 
 * 2. Test theme applies:
 *    - Inspect element, check computed styles
 *    - Primary color should match theme (blue for ocean, brown for coffee)
 * 
 * 3. Test domain switching:
 *    - Configure hosts file or use ngrok
 *    - Access different domains
 *    - Verify each loads its correct theme
 * 
 * 4. Test fallback:
 *    - Use unknown domain
 *    - Should load default theme (coffee-brown)
 */

// =============================================================================
// QUICK START
// =============================================================================

/**
 * To use these themes right now:
 * 
 * 1. In src/middleware/load-tenant.ts:
 */
import { defineMiddleware } from 'astro/middleware';

export const loadTenant = defineMiddleware((context, next) => {
  const hostname = context.request.headers.get('host') || '';
  
  // Quick test - change this line to switch themes:
  const themeCssUrl = '/themes/ocean-blue-theme.css'; // ← Change here!
  
  context.locals.tenant = {
    id: 'test',
    name: 'Test Tenant',
    themeCssUrl: themeCssUrl,
  };
  
  return next();
});

/**
 * 2. Restart dev server
 * 
 * 3. Refresh browser - you should see new colors!
 * 
 * 4. Try different themes:
 *    - '/themes/coffee-brown-theme.css'
 *    - '/themes/ocean-blue-theme.css'
 *    - '/themes/forest-green-theme.css'
 *    - '/themes/sunset-purple-theme.css'
 */
