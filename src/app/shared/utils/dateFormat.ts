export function formatDate(dateValue: Date | string): string {
  const date = new Date(dateValue);

  return date.toISOString().split('T')[0];
}
