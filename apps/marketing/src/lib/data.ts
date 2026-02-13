export function calculateWordCountFromHtml(html: string): number {
  if (!html) return 0;
  const text = html
    .replace(/<[^>]*>/g, ' ') // remove all HTML tags
    .replace(/\s+/g, ' ') // normalize spaces
    .trim();
  if (!text) return 0;
  return text.split(' ').length;
}

export function readingTime(wordCount: number): string {
  const wordsPerMinute = 200; // average reading speed
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

/* Optional: simple slugify utility */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/* Optional: delay / sleep helper */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
