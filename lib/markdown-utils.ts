/** Slugify heading text for anchor ids */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export type HeadingItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

/** Extract h2 and h3 headings from markdown content */
export function getHeadings(content: string): HeadingItem[] {
  const headings: HeadingItem[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)$/);
    const h3 = line.match(/^###\s+(.+)$/);
    if (h2) {
      headings.push({ id: slugify(h2[1]), text: h2[1].trim(), level: 2 });
    } else if (h3) {
      headings.push({ id: slugify(h3[1]), text: h3[1].trim(), level: 3 });
    }
  }

  return headings;
}

/** Remove the first # or ## heading if it matches the given title (avoids duplicate page title) */
export function stripFirstMatchingHeading(content: string, pageTitle: string): string {
  const normalizedTitle = pageTitle.trim().toLowerCase().replace(/\s+/g, " ");
  const lines = content.split("\n");
  let found = false;

  const result = lines.filter((line) => {
    const h1Match = line.match(/^#\s+(.+)$/);
    if (h1Match && !found) {
      const headingText = h1Match[1].trim().toLowerCase().replace(/\s+/g, " ");
      if (headingText === normalizedTitle) {
        found = true;
        return false;
      }
    }
    return true;
  });

  return result.join("\n").replace(/^\n+/, "");
}
