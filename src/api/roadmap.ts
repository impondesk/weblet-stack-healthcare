import { apiFetch } from "./api-fetch";

export async function getRoadmapByDomain(_domain: string, slug: string) {
  console.warn(
    "getRoadmapByDomain called with domain: " + _domain + " and slug: " + slug
  );

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

  console.log("Loading roadmap " + slug + " for " + _domain);

  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/roadmaps?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&where[slug][equals]=${slug}&depth=3`;
  const response = await apiFetch(url, {});

  // console.log(response);
  return response;
}
