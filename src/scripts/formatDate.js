// src/utils/formatDate.js
export function formatDate(dateString, locale = "en-US", options = {}) {
  const date = new Date(dateString);
  const defaultOptions = { year: "numeric", month: "long", day: "numeric" };

  return new Intl.DateTimeFormat(locale, {
    ...defaultOptions,
    ...options,
  }).format(date);
}
