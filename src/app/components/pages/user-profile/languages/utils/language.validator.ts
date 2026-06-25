export function validateLanguage(
  language: string,
  existingLanguages: string[],
): string | null {
  const trimmed = language.trim();

  if (!trimmed) {
    return 'Please enter a language.';
  }

  const languageRegex = /^[A-Za-z\s]+$/;

  if (!languageRegex.test(trimmed)) {
    return 'Language name should contain only letters and spaces.';
  }

  const duplicate = existingLanguages.some(
    (l) => l.toLowerCase() === trimmed.toLowerCase(),
  );

  if (duplicate) {
    return 'This language has already been added.';
  }

  return null;
}
