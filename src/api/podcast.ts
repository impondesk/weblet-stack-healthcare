import { apiFetch } from "./api-fetch";

export async function getPodcastByDomain(_domain, slug) {
  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/podcasts?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&where[slug][equals]=${slug}&depth=2`;
  const response = await apiFetch(url, {});
  return response;
}

export async function getPodcastsByDomain(_domain) {
  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/podcasts?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&where[visibility][equals]=public&depth=2`;

  const response = await apiFetch(url, {});

  return response;
}
