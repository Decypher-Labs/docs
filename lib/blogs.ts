import fs from "fs";
import path from "path";

const BLOGS_DIR = path.join(process.cwd(), "blogs");

export type BlogPost = {
  slug: string;
  title: string;
  filename: string;
  /** First paragraph or excerpt for cards; optional */
  excerpt?: string;
};

/** Convert filename to title (e.g. my-first-post.md -> My first post) */
function filenameToTitle(filename: string): string {
  const withoutExt = filename.replace(/\.md$/i, "");
  const withSpaces = withoutExt.replace(/-/g, " ");
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).toLowerCase();
}

/** List all blog posts from blogs/*.md (flat), sorted by filename desc (newest first) */
export function getBlogsList(): BlogPost[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];
  const files = fs.readdirSync(BLOGS_DIR);
  const mdFiles = files
    .filter((f) => f.endsWith(".md"))
    .sort()
    .reverse();
  return mdFiles.map((filename) => ({
    filename,
    slug: filename.replace(/\.md$/i, ""),
    title: filenameToTitle(filename),
  }));
}

/** Get raw markdown content for a blog slug */
export function getBlogContent(slug: string): string | null {
  const filePath = path.join(BLOGS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

/** Get all blog slugs for generateStaticParams */
export function getAllBlogSlugs(): string[] {
  return getBlogsList().map((p) => p.slug);
}
