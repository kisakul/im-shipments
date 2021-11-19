/**
 * Transforms a timestamp into locale-specific datetime representation.
 */
export function formatDate(timestamp?: number) {
  return timestamp ? new Date(timestamp).toLocaleString() : '-';
}
