import { apiFetch } from "./api-fetch";

export async function getCategoryByDomain(_domain, slug) {
  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/categories?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&where[slug][equals]=${slug}&depth=2`;
  const response = await apiFetch(url, {});

  // console.log("getCategoryByDomain response:", response);

  return response;
}

export async function getCategoryListByDomain(_domain) {
  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/categories?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&where[visibility][equals]=public`;

  const response = await apiFetch(url, {});

  return response;
}
