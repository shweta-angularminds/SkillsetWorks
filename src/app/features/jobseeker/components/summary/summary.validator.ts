export function validateSummary(summary: string): string | null {
  if (!summary?.trim()) {
    return 'Please enter a profile summary.';
  }

  return null;
}
