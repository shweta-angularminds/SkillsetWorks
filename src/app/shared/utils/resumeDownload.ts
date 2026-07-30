export function getDownloadUrl(
  resumeUrl: string,
  candidateName: string,
): string {
  const fileName = `${candidateName.replace(/\s+/g, '_')}_Resume`;

  return resumeUrl.replace('/upload/', `/upload/fl_attachment:${fileName}/`);
}
