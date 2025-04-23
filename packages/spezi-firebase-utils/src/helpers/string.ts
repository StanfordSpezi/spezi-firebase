/**
 * Capitalize each word in a string.
 */
export function capitalize(text: string): string {
  return text
    .split(' ')
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(' ')
}