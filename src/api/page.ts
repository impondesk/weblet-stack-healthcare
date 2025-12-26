import { apiFetch } from "./api-fetch";

export async function getPageByDomain(_domain: string, slug: string) {
  console.warn(
    "getPageByDomain called with domain: " + _domain + " and slug: " + slug
  );

  // if (_domain === undefined || _domain === null) {
  //   // Handle the case where the domain is not defined
  //   // return new Response(null, {
  //   //   status: 400,
  //   //   statusText: "Domain is required",
  //   // });
  //   return "";
  // }

  // if (slug === "undefined" || slug === null) {
  //   // Handle the case where the slug is not defined
  //   // return new Response(null, {
  //   //   status: 400,
  //   //   statusText: "Slug is required",
  //   // });
  //   return "";
  // }

  if (
    slug.includes("favicon.ico") ||
    slug.includes("robots.txt") ||
    slug.includes("sitemap.xml") ||
    slug.includes("sitemap-index.xml") ||
    slug.includes("styles")
  ) {
    // Return an empty response or redirect if necessary
    // return new Response(null, { status: 404, statusText: "Not Required" });
    return "";
  }

  console.log("Loading page " + slug + " for " + _domain);

  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/pages?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&where[slug][equals]=${slug}&depth=5`;
  const response = await apiFetch(url, {});

  // console.log(response);
  return response;
}
