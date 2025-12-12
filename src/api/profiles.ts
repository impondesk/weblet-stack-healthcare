import { apiFetch } from "./api-fetch";

export async function getProfileByDomain(_domain, slug) {
  if (!slug) return false;
  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/profiles?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&where[slug][equals]=${slug}&depth=5`;
  const response = await apiFetch(url, {});
  return response;
}

export async function getProfilesListByDomain(_domain) {
  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/profiles?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&where[visibility][equals]=public`;

  const response = await apiFetch(url, {});

  return response;
}
