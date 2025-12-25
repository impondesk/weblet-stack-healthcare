export function cleanSlug(slug: string | undefined) {
  if (slug && slug.includes("favicon.ico")) {
    // Return an empty response or redirect if necessary
    return new Response(null, { status: 404 });
  }
  if (slug && slug.includes("/")) {
    slug = slug.split("/")[0].toString();
    // Return an empty response or redirect if necessary
  }

  return slug?.replace(/[^a-z0-9-]/g, "-").toLowerCase() || "";
}
