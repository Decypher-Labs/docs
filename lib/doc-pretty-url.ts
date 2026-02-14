/** Folder name to URL segment: 01_docker -> docker (no numbers, lowercase) */
export function folderNameToPrettySlug(name: string): string {
  const withoutNumbers = name.replace(/^\d+_?/, "");
  return withoutNumbers.toLowerCase();
}

/** File slug to URL segment: 01_introduction_to_docker -> introduction-to-docker (no numbers, _ to -) */
export function fileSlugToPretty(slug: string): string {
  const withoutNumbers = slug.replace(/^\d+_?/, "");
  return withoutNumbers.replace(/_/g, "-").toLowerCase();
}

/** Build doc URL from actual folder name and file slug */
export function getDocPrettyUrl(folderName: string, fileSlug: string): string {
  return `/${folderNameToPrettySlug(folderName)}/${fileSlugToPretty(fileSlug)}`;
}
