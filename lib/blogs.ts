import fs from "fs";
import path from "path";
import { getBlogConfig } from "./content-config";

const BLOGS_DIR = path.join(process.cwd(), "static", "blogs");

export type BlogPost = {
  slug: string;
  title: string;
  filename: string;
  /** First paragraph or excerpt for cards; optional */
  excerpt?: string;
  /** Keywords for filtering e.g. ["devops", "Docker"] */
  keywords?: string[];
  /** ISO date from config.yaml for "Updated" display; overrides file mtime when set */
  updated?: string;
};

/** Convert filename to title (e.g. 01_my-first-post.md -> My first post); 01_, 02_ prefix stripped for display */
function filenameToTitle(filename: string): string {
  const withoutExt = filename.replace(/\.md$/i, "");
  const withoutLeadingNumbers = withoutExt.replace(/^\d+_?/, "");
  const withSpaces = withoutLeadingNumbers.replace(/-/g, " ").replace(/_/g, " ");
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).toLowerCase();
}

/** List all blog posts from static/blogs/*.md (flat), ordered by 01_, 02_ filename convention */
export function getBlogsList(): BlogPost[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];
  const files = fs.readdirSync(BLOGS_DIR);
  const mdFiles = files
    .filter((f) => f.endsWith(".md") && f !== "config.yaml")
    .sort();
  const configMap = getBlogConfig();
  return mdFiles.map((filename) => {
    const slug = filename.replace(/\.md$/i, "");
    const defaultTitle = filenameToTitle(filename);
    const config = configMap.get(slug);
    return {
      filename,
      slug,
      title: config?.heading ?? defaultTitle,
      excerpt: config?.excerpt ?? config?.description,
      keywords: config?.keywords,
      updated: config?.updated,
    };
  });
}

/** Get raw markdown content for a blog slug */
export function getBlogContent(slug: string): string | null {
  const filePath = path.join(BLOGS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

/** Get file modification time for a blog */
export function getBlogModificationTime(slug: string): Date | null {
  const filePath = path.join(BLOGS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const stats = fs.statSync(filePath);
  return stats.mtime;
}

/** Get all blog slugs for generateStaticParams */
export function getAllBlogSlugs(): string[] {
  return getBlogsList().map((p) => p.slug);
}
