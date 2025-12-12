import { apiFetch } from "./api-fetch";

export async function getTagByDomain(_domain, slug) {
  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/tags?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&where[slug][equals]=${slug}&depth=2`;
  const response = await apiFetch(url, {});
  return response;
}

export async function getTagsByDomain(_domain) {
  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/tags?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&where[visibility][equals]=public&depth=2`;

  const response = await apiFetch(url, {});

  return response;
}

export async function getDataByTag(_domain, slug) {
  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/tags/getDataByTag?domain=${_domain}&slug=${slug}`;
  const response = await apiFetch(url, {});
  return response;
}
