export default function gqlMin(query: string) {
  return query
    .trim()
    .replace(/[\n\s]+/g, ' ') // remove newlines and indentation
    .replace(/([^A-z\d])\s+/g, '$1') // remove whitespace trailing special chars (brackets, commas, colons, etc.)
    .replace(/\s+([^A-z\d])/g, '$1'); // remove whitespace leading special chars
}
