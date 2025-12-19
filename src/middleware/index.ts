// import { auth } from "./auth";
// import { validate } from "./validate";
import { loadTenant } from "./load-tenant";
import { tenant } from "./tenant";
import { sequence } from "astro:middleware";

// IMPORTANT: loadTenant must run BEFORE tenant middleware
// to ensure theme configuration is available
export const onRequest = sequence(
  // loadTenant,  // Load tenant data first
  tenant // Then apply theme
);
