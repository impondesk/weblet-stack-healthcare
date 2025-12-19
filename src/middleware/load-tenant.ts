import { defineMiddleware } from "astro/middleware";
import { getPageByDomain } from "../api/page";

/**
 * Load Tenant Middleware
 *
 * This middleware loads tenant data from the API and stores it in Astro.locals
 * BEFORE the theme middleware runs. This ensures tenant theme configuration
 * is available for theme processing.
 */
export const loadTenant = defineMiddleware(async (context, next) => {
  console.log("=== Load Tenant Middleware ===");

  const hostname = context.request.headers.get("host") || "NA";
  const url = new URL(context.request.url);
  const searchParams = url.searchParams;
  const proxyDomain = searchParams.get("proxy-domain");

  const targetHost = proxyDomain || hostname;
  console.log("Loading tenant for:", targetHost);

  try {
    // Try to fetch a page to get tenant data
    // Using "index" as a fallback slug to get tenant info
    const data = await getPageByDomain(targetHost, "index");

    if (data?.docs?.[0]?.tenant) {
      context.locals.tenant = data.docs[0].tenant;

      // FIXME: For testing, override themeCssUrl here
      context.locals.tenant = {
        themeCssUrl: "/themes/ocean-blue-theme.css", // ← Try different themes!
      };

      context.locals.theme = data.docs[0].tenant.theme;

      console.log("✓ Tenant loaded:", data.docs[0].tenant.name);
      console.log("✓ Tenant ID:", data.docs[0].tenant.id);
      console.log("✓ Has tenantTheme:", !!data.docs[0].tenant.tenantTheme);
      console.log("✓ Has themeConfig:", !!data.docs[0].tenant.themeConfig);

      // Log the actual structure for debugging
      if (data.docs[0].tenant.tenantTheme) {
        console.log(
          "✓ tenantTheme structure:",
          JSON.stringify(data.docs[0].tenant.tenantTheme, null, 2)
        );
      }
    } else {
      console.log("⚠ No tenant data found, using defaults");
    }
  } catch (error) {
    console.error("✗ Error loading tenant:", error);
    // Continue without tenant data - will use default theme
  }

  console.log("=== End Load Tenant ===\n");

  return next();
});
