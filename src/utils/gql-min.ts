/**
 *  Minifies a GraphQL string query to its smallest shape
 */
export default function gqlMin(query: string) {
  return query
    .trim()
    .replace(/[\n\s]+/g, ' ') // remove newlines and indentation
    .replace(/([^A-z\d])\s+/g, '$1') // remove whitespace trailing special chars (brackets, commas, colons, etc.)
    .replace(/\s+([^A-z\d])/g, '$1'); // remove whitespace leading special chars
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Converts a GraphQL response body into a GET request with URL Params
 */
export function gqlSearch(requestBody: any) {
  const minifiedRequest = Object.entries(requestBody).reduce(
    (req, [key, value]) => ({
      ...req,
      [key]: key === 'query' ? gqlMin(value as string) : JSON.stringify(value),
    }),
    {}
  );
  return new URLSearchParams(minifiedRequest).toString();
}
/* eslint-enable @typescript-eslint/no-explicit-any */
