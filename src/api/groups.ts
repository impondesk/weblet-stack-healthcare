import { apiFetch } from "./api-fetch";

export async function getGroupByDomain(_domain, slug) {
  // First, find the document to get its ID
  const queryUrl = `${
    import.meta.env.PUBLIC_API_URL
  }/groups?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&where[slug][equals]=${slug}&depth=0`;

  const queryResponse = await apiFetch(queryUrl, {});

  if (!queryResponse.docs || queryResponse.docs.length === 0) {
    return { docs: [] }; // Or handle error appropriately
  }

  const groupId = queryResponse.docs[0].id;

  // Now, fetch the full document by its ID with depth=3
  const url = `${import.meta.env.PUBLIC_API_URL}/groups/${groupId}?depth=3`;

  const response = await apiFetch(url, {});

  // The final response is a single object, but the rest of your code expects a `docs` array.
  // So, we wrap it in a `docs` array to maintain the expected structure.
  return { docs: [response] };
}

export async function getGroupsByDomain(_domain) {
  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/groups?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&where[visibility][equals]=public&depth=3`;

  const response = await apiFetch(url, {});

  return response;
}

// FIXME
// export async function getDataByTag(_domain, slug) {
//   const url = `${
//     import.meta.env.PUBLIC_API_URL
//   }/tags/getDataByTag?domain=${_domain}&slug=${slug}`;
//   const response = await apiFetch(url, {});
//   return response;
// }
