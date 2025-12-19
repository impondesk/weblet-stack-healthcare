/**
 * Complete Backend Implementation Example
 * 
 * This file shows how to implement dynamic CSS generation in your Payload CMS
 * or custom backend API.
 */

// =============================================================================
// PAYLOAD CMS HOOK EXAMPLE
// =============================================================================

/**
 * Add to your Payload tenant collection config
 */
export const TenantsCollection = {
  slug: 'tenants',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'domain',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'themeCssUrl',
      type: 'text',
      admin: {
        description: 'URL to complete theme CSS file (auto-generated)',
        readOnly: true,
      },
    },
    {
      name: 'themeCssContent',
      type: 'textarea',
      admin: {
        description: 'Raw CSS content (optional, for small overrides)',
      },
    },
    {
      name: 'themeVersion',
      type: 'number',
      defaultValue: 1,
      admin: {
        description: 'Increments on theme regeneration',
        readOnly: true,
      },
    },
    {
      name: 'themeConfig',
      type: 'group',
      fields: [
        {
          name: 'colors',
          type: 'group',
          fields: [
            {
              name: 'primary',
              type: 'group',
              fields: [
                { name: '50', type: 'text' },
                { name: '100', type: 'text' },
                { name: '500', type: 'text' },
                { name: '600', type: 'text' },
                { name: '900', type: 'text' },
              ],
            },
            // Add secondary, accent, etc.
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, previousDoc, operation }) => {
        // Auto-generate CSS when theme config changes
        if (
          operation === 'update' &&
          JSON.stringify(doc.themeConfig) !== JSON.stringify(previousDoc?.themeConfig)
        ) {
          await generateAndUploadTenantCSS(doc, req);
        }
      },
    ],
  },
};

// =============================================================================
// CSS GENERATION FUNCTION
// =============================================================================

import fs from 'fs/promises';
import path from 'path';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

/**
 * Generate complete CSS file for tenant
 */
async function generateTenantCSS(tenant) {
  const { themeConfig, id } = tenant;
  
  // Build Tailwind config with tenant colors
  const tailwindConfig = {
    content: [], // Not needed for CSS generation
    theme: {
      extend: {
        colors: {
          primary: convertColorsToHex(themeConfig?.colors?.primary),
          secondary: convertColorsToHex(themeConfig?.colors?.secondary),
          accent: convertColorsToHex(themeConfig?.colors?.accent),
        },
      },
    },
  };
  
  // Base CSS with Tailwind directives
  const baseCss = `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    
    /* Custom CSS Variables */
    :root {
      ${generateCSSVariables(themeConfig)}
    }
    
    /* Custom utility classes */
    @layer utilities {
      .text-brand {
        color: rgb(var(--color-primary-600));
      }
      
      .bg-brand {
        background-color: rgb(var(--color-primary-500));
      }
      
      .border-brand {
        border-color: rgb(var(--color-primary-500));
      }
    }
  `;
  
  // Process with PostCSS + Tailwind
  const result = await postcss([
    tailwindcss(tailwindConfig),
    autoprefixer,
  ]).process(baseCss, { from: undefined });
  
  return result.css;
}

/**
 * Generate CSS variables from theme config
 */
function generateCSSVariables(themeConfig) {
  if (!themeConfig?.colors) return '';
  
  const vars = [];
  
  // Process each color group (primary, secondary, accent)
  Object.entries(themeConfig.colors).forEach(([colorName, shades]) => {
    if (!shades || typeof shades !== 'object') return;
    
    Object.entries(shades).forEach(([shade, value]) => {
      if (value) {
        vars.push(`--color-${colorName}-${shade}: ${value};`);
      }
    });
  });
  
  return vars.join('\n      ');
}

/**
 * Convert RGB color object to Tailwind hex format
 */
function convertColorsToHex(colorObj) {
  if (!colorObj) return {};
  
  const result = {};
  Object.entries(colorObj).forEach(([shade, rgb]) => {
    if (rgb) {
      // Convert "255, 69, 0" to "#ff4500"
      const [r, g, b] = rgb.split(',').map(v => parseInt(v.trim()));
      result[shade] = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
  });
  
  return result;
}

// =============================================================================
// CDN UPLOAD FUNCTION
// =============================================================================

import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

/**
 * Upload CSS to S3/CDN
 */
async function uploadCSSToS3(cssContent, filename) {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `themes/${filename}`,
    Body: cssContent,
    ContentType: 'text/css',
    CacheControl: 'public, max-age=31536000', // 1 year
    ACL: 'public-read',
  };
  
  const result = await s3.upload(params).promise();
  
  // Return CDN URL (CloudFront or S3 URL)
  const cdnUrl = process.env.CDN_BASE_URL 
    ? `${process.env.CDN_BASE_URL}/themes/${filename}`
    : result.Location;
  
  return cdnUrl;
}

// =============================================================================
// COMPLETE WORKFLOW FUNCTION
// =============================================================================

/**
 * Generate CSS and upload to CDN
 * Call this from Payload hooks or API endpoint
 */
async function generateAndUploadTenantCSS(tenant, req) {
  try {
    console.log(`Generating CSS for tenant: ${tenant.name}`);
    
    // 1. Generate CSS
    const css = await generateTenantCSS(tenant);
    console.log(`Generated ${css.length} bytes of CSS`);
    
    // 2. Increment version
    const newVersion = (tenant.themeVersion || 0) + 1;
    
    // 3. Create filename with version
    const filename = `${tenant.id}-v${newVersion}.css`;
    
    // 4. Upload to CDN
    const cdnUrl = await uploadCSSToS3(css, filename);
    console.log(`Uploaded to: ${cdnUrl}`);
    
    // 5. Update tenant record (if using Payload)
    if (req?.payload) {
      await req.payload.update({
        collection: 'tenants',
        id: tenant.id,
        data: {
          themeCssUrl: cdnUrl,
          themeVersion: newVersion,
          themeLastUpdated: new Date(),
        },
      });
    }
    
    return cdnUrl;
  } catch (error) {
    console.error('Error generating tenant CSS:', error);
    throw error;
  }
}

// =============================================================================
// API ENDPOINT EXAMPLE (Express)
// =============================================================================

import express from 'express';

const router = express.Router();

/**
 * Get tenant by domain
 */
router.get('/tenants/by-domain', async (req, res) => {
  try {
    const { domain } = req.query;
    
    if (!domain) {
      return res.status(400).json({ error: 'Domain required' });
    }
    
    // Fetch from database/Payload
    const tenant = await req.payload.find({
      collection: 'tenants',
      where: {
        domain: { equals: domain },
      },
      limit: 1,
    });
    
    if (!tenant.docs[0]) {
      return res.status(404).json({ error: 'Tenant not found' });
    }
    
    const tenantData = tenant.docs[0];
    
    // Return with theme CSS URL
    res.json({
      id: tenantData.id,
      name: tenantData.name,
      domain: tenantData.domain,
      themeCssUrl: tenantData.themeCssUrl, // ← Key field!
      themeCssContent: tenantData.themeCssContent,
      themeConfig: tenantData.themeConfig,
      // ...other fields
    });
  } catch (error) {
    console.error('Error fetching tenant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * Regenerate theme CSS for tenant (admin endpoint)
 */
router.post('/tenants/:id/regenerate-theme', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Fetch tenant
    const tenant = await req.payload.findByID({
      collection: 'tenants',
      id,
    });
    
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant not found' });
    }
    
    // Generate and upload CSS
    const cssUrl = await generateAndUploadTenantCSS(tenant, req);
    
    res.json({
      success: true,
      themeCssUrl: cssUrl,
      message: 'Theme CSS regenerated successfully',
    });
  } catch (error) {
    console.error('Error regenerating theme:', error);
    res.status(500).json({ error: 'Failed to regenerate theme' });
  }
});

export default router;

// =============================================================================
// ALTERNATIVE: Simple CSS Generation (No Tailwind)
// =============================================================================

/**
 * Simpler approach without Tailwind build
 * Just generate CSS variables and basic utilities
 */
async function generateSimpleTenantCSS(tenant) {
  const { themeConfig } = tenant;
  
  const css = `
/* Auto-generated theme for ${tenant.name} */

:root {
  ${generateCSSVariables(themeConfig)}
}

/* Utility Classes */
.text-primary {
  color: rgb(var(--color-primary-600));
}

.bg-primary {
  background-color: rgb(var(--color-primary-500));
}

.border-primary {
  border-color: rgb(var(--color-primary-500));
}

.btn-primary {
  background-color: rgb(var(--color-primary-600));
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: rgb(var(--color-primary-700));
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(var(--color-primary-600), 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .btn-primary {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}
  `.trim();
  
  return css;
}

// =============================================================================
// TESTING HELPERS
// =============================================================================

/**
 * Test CSS generation locally
 */
async function testCSSGeneration() {
  const mockTenant = {
    id: 'test-123',
    name: 'Test Tenant',
    themeConfig: {
      colors: {
        primary: {
          50: '254, 242, 242',
          100: '254, 226, 226',
          500: '239, 68, 68',
          600: '220, 38, 38',
          900: '127, 29, 29',
        },
      },
    },
  };
  
  try {
    const css = await generateSimpleTenantCSS(mockTenant);
    console.log('Generated CSS:');
    console.log(css);
    
    // Save to file for inspection
    await fs.writeFile('./test-theme.css', css);
    console.log('Saved to test-theme.css');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Uncomment to run test:
// testCSSGeneration();

// =============================================================================
// ENVIRONMENT VARIABLES NEEDED
// =============================================================================

/*
# .env file for backend

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=your-tenant-themes-bucket

# CDN Configuration
CDN_BASE_URL=https://cdn.yoursite.com

# Optional: Different CDN services
# Cloudflare R2
# CLOUDFLARE_ACCOUNT_ID=xxx
# CLOUDFLARE_ACCESS_KEY_ID=xxx
# CLOUDFLARE_SECRET_ACCESS_KEY=xxx

# Optional: Azure Blob Storage
# AZURE_STORAGE_CONNECTION_STRING=xxx
# AZURE_STORAGE_CONTAINER=themes
*/

// =============================================================================
// ADMIN UI BUTTON (Payload Admin Panel)
// =============================================================================

/**
 * Add custom button in Payload admin to regenerate theme
 */
export const RegenerateThemeButton = {
  name: 'regenerateTheme',
  type: 'ui',
  admin: {
    position: 'sidebar',
    components: {
      Field: () => {
        const { id } = useDocumentInfo();
        
        const handleRegenerate = async () => {
          const response = await fetch(`/api/tenants/${id}/regenerate-theme`, {
            method: 'POST',
          });
          
          const data = await response.json();
          
          if (data.success) {
            alert('Theme regenerated successfully!');
            window.location.reload();
          } else {
            alert('Failed to regenerate theme');
          }
        };
        
        return (
          <button
            type="button"
            onClick={handleRegenerate}
            style={{
              padding: '10px 20px',
              background: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            🎨 Regenerate Theme CSS
          </button>
        );
      },
    },
  },
};

// Add to tenant collection fields array
