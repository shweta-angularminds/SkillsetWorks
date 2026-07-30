export function validateSkill(
  skill: string,
  existingSkills: string[],
): string | null {
  const trimmed = skill.trim();

  if (!trimmed) {
    return 'Please enter a skill.';
  }

  const duplicate = existingSkills.some(
    (s) => s.toLowerCase() === trimmed.toLowerCase(),
  );

  if (duplicate) {
    return 'This skill has already been added.';
  }

  return null;
}
