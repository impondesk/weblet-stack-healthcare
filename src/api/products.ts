import { apiFetch } from "./api-fetch";

export async function getProductByDomain(_domain, slug) {
  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/products?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&where[slug][equals]=${slug}&depth=5`;
  const response = await apiFetch(url, {});
  return response;
}

// FIXME - Add limit and offset and sorting
export async function getProductsByDomain(_domain, limit = 10) {
  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/products?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&depth=5&limit=${limit}&sort[createdAt][order]=desc`;
  const response = await apiFetch(url, {});
  return response;
}
