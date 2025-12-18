import { apiFetch } from "./api-fetch";

export async function getProductByDomain(_domain, slug) {
  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/products?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&where[slug][equals]=${slug}&depth=9&limit=1`;
  const response = await apiFetch(url, {});
  return response;
}

// FIXME - Add limit and offset and sorting
export async function getProductsByDomain(
  _domain: string,
  options?: {
    limit?: number;
    page?: number;
    sortField?: string;
    sortOrder?: "asc" | "desc";
  }
) {
  const {
    limit = 10,
    page = 1,
    sortField = "createdAt",
    sortOrder = "desc",
  } = options || {};

  // Calculate offset from page number (page 1 = offset 0)
  const offset = (page - 1) * limit;

  const url = `${
    import.meta.env.PUBLIC_API_URL
  }/products?where[tenant.domains.domain][equals]=${_domain}&where[_status][equals]=published&depth=9&limit=${limit}&page=${page}&sort[${sortField}]=${sortOrder}`;

  const response = await apiFetch(url, {});
  return response;
}
