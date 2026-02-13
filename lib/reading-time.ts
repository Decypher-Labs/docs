/**
 * Calculate reading time in minutes based on word count
 * Average reading speed: 200-250 words per minute
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 225;
  const text = content.replace(/```[\s\S]*?```/g, ""); // Remove code blocks
  const words = text.trim().split(/\s+/).filter((word) => word.length > 0);
  const minutes = Math.ceil(words.length / wordsPerMinute);
  return Math.max(1, minutes); // At least 1 minute
}

/**
 * Format reading time as a human-readable string
 */
export function formatReadingTime(minutes: number): string {
  if (minutes === 1) return "1 min read";
  return `${minutes} min read`;
}
