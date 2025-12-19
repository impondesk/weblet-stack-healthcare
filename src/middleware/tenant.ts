import { defineMiddleware } from "astro/middleware";
import {
  getTenantTheme,
  mergeWithDefaultTheme,
  themeToCSSVars,
} from "../config/tenant-theme-config";
// import brownTheme from "../../brown-earth-theme-config.json";

export const tenant = defineMiddleware((context, next) => {
  console.log("=== Theme Middleware Debug ===");
  const hostname = context.request.headers.get("host") || "NA";
  context.locals.host = hostname;

  // Get tenant-specific theme configuration from tenant data
  // The tenant object should be loaded from payload/weblet API
  // and should contain a themeConfig property with color overrides
  let tenantData = context.locals.tenant; // Tenant data from API

  // TESTING: FORCE brown theme override (remove this block when done testing)
  // tenantData = {
  //   name: "Test Tenant (Brown Earth Theme)",
  //   themeConfig: brownTheme,
  // };
  // console.log("⚠ TESTING MODE: Forcing brown earth theme from JSON file");

  // console.log("Tenant Data:", tenantData ? "FOUND" : "NOT FOUND");
  // if (tenantData) {
  //   console.log("Tenant Name:", tenantData.name);
  //   console.log("Has themeConfig:", !!tenantData.themeConfig);
  //   if (tenantData.themeConfig?.colors) {
  //     console.log(
  //       "Theme Colors:",
  //       JSON.stringify(tenantData.themeConfig.colors, null, 2)
  //     );
  //   }
  // }

  // const tenantTheme = getTenantTheme(tenantData);
  // console.log("Extracted Theme:", tenantTheme);

  // const mergedColors = mergeWithDefaultTheme(tenantTheme);
  // console.log("Merged Colors:", mergedColors);

  // const cssVars = themeToCSSVars(mergedColors);
  // console.log("CSS Vars Count:", Object.keys(cssVars).length);
  // console.log("Primary 500:", cssVars["--color-primary-500"]);

  // // Store theme CSS variables in locals for use in layouts
  // context.locals.themeCSSVars = cssVars;
  // console.log("=== End Theme Middleware ===\n");

  return next();
});
