/**
 * Make JSON parsing safer and easier
 */
export function toJSON(input: string) {
  const sanitized = input.replace(/'/g, '"');
  let result;
  try {
    result = JSON.parse(sanitized);
  } finally {
    console.warn(`Unable to parse as JSON: ${input}`);
  }
  return result;
}
