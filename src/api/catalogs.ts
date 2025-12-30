import { apiFetch } from "./api-fetch";

export async function getCatalogByDomain(_domain, slug) {
  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/catalogs?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&where[slug][equals]=${slug}&[visibility][equals]=public&depth=2`;
  const response = await apiFetch(url, {});
  return response;
}

export async function getCatalogsByDomain(_domain) {
  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/catalogs?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&where[visibility][equals]=public&depth=2`;

  const response = await apiFetch(url, {});

  return response;
}

export async function getRestrictedCatalog(_domain, accessLink) {
  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/catalogs?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&[accessLink][equals]=${accessLink}&depth=2`;
  const response = await apiFetch(url, {});
  return response;
}

// export async function getDataByCatalog(_domain, slug) {
//   const url = `${
//     import.meta.env.PUBLIC_API_URL
//   }/catalogs/getDataByCatalog?domain=${_domain}&slug=${slug}`;
//   const response = await apiFetch(url, {});
//   return response;
// }
