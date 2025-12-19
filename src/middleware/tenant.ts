import { defineMiddleware } from "astro/middleware";

export const tenant = defineMiddleware((context, next) => {
  console.log("=== Theme Middleware Debug ===");
  const hostname = context.request.headers.get("host") || "NA";
  context.locals.host = hostname;

  // Get tenant-specific theme configuration from tenant data
  // The tenant object should be loaded from payload/weblet API
  // and should contain a themeConfig property with color overrides
  let tenantData = context.locals.tenant; // Tenant data from API
  console.log("Tenant Data:", tenantData);

  return next();
});
