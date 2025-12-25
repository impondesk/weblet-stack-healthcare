import { apiFetch } from "./api-fetch";

export async function getWebinarsByDomain(_domain) {
  // FIXME &where[visibility][equals]=public
  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/webinars?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&depth=3`;
  const response = await apiFetch(url, {});
  return response;
}

export async function getWebinarByDomain(_domain, slug) {
  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/webinars?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&where[slug][equals]=${slug}&depth=5`;
  const response = await apiFetch(url, {});
  return response;
}
