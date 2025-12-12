import { defineMiddleware } from "astro/middleware";

export const tenant = defineMiddleware((context, next) => {
  // console.log("In Tenant middleware");
  context.locals.host = context.request.headers.get("host") || "NA";
  // console.log(context.locals.host);

  return next();
});
