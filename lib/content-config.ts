import fs from "fs";
import path from "path";
import { parse } from "yaml";

export type CourseConfigItem = {
  slug: string;
  heading?: string;
  description?: string;
  /** e.g. ["web-development", "HTML", "devops"] */
  keywords?: string[];
};

export type BlogConfigItem = {
  slug: string;
  heading?: string;
  description?: string;
  excerpt?: string;
  keywords?: string[];
  /** ISO date e.g. "2025-02-11" for "Updated" display; overrides file mtime when set */
  updated?: string;
};

export type DocConfigItem = {
  slug: string;
  heading?: string;
  description?: string;
  keywords?: string[];
};

/** Per-dir doc file override: slug = md filename without .md */
export type DocFileConfigItem = {
  slug: string;
  heading?: string;
  /** ISO date e.g. "2025-02-11" for "Updated" display; overrides file mtime when set */
  updated?: string;
};

/** Read optional config.yaml from a directory. Returns null if missing or invalid. */
function readConfigYaml<T>(dir: string, filename: string): T | null {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) return null;
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = parse(raw) as unknown;
    return data as T;
  } catch {
    return null;
  }
}

const STATIC_DIR = path.join(process.cwd(), "static");

/** Get course config: static/courses/config.yaml with optional "courses" array or root array */
export function getCourseConfig(): Map<string, { heading?: string; description?: string; keywords?: string[] }> {
  const dir = path.join(STATIC_DIR, "courses");
  const data = readConfigYaml<{ courses?: CourseConfigItem[] } | CourseConfigItem[]>(dir, "config.yaml");
  if (!data) return new Map();
  const list = Array.isArray(data) ? data : data.courses ?? [];
  const map = new Map<string, { heading?: string; description?: string; keywords?: string[] }>();
  for (const item of list) {
    if (item && typeof item === "object" && "slug" in item && typeof item.slug === "string") {
      const keywords = Array.isArray((item as CourseConfigItem).keywords)
        ? ((item as CourseConfigItem).keywords as unknown[]).filter((k): k is string => typeof k === "string")
        : undefined;
      map.set(item.slug, {
        heading: typeof item.heading === "string" ? item.heading : undefined,
        description: typeof item.description === "string" ? item.description : undefined,
        keywords: keywords?.length ? keywords : undefined,
      });
    }
  }
  return map;
}

/** Get blog config: static/blogs/config.yaml with optional "blogs" array or root array */
export function getBlogConfig(): Map<string, { heading?: string; description?: string; excerpt?: string; keywords?: string[]; updated?: string }> {
  const dir = path.join(STATIC_DIR, "blogs");
  const data = readConfigYaml<{ blogs?: BlogConfigItem[] } | BlogConfigItem[]>(dir, "config.yaml");
  if (!data) return new Map();
  const list = Array.isArray(data) ? data : data.blogs ?? [];
  const map = new Map<string, { heading?: string; description?: string; excerpt?: string; keywords?: string[]; updated?: string }>();
  for (const item of list) {
    if (item && typeof item === "object" && "slug" in item && typeof item.slug === "string") {
      const keywords = Array.isArray((item as BlogConfigItem).keywords)
        ? ((item as BlogConfigItem).keywords as unknown[]).filter((k): k is string => typeof k === "string")
        : undefined;
      const updated = typeof (item as BlogConfigItem).updated === "string" ? (item as BlogConfigItem).updated : undefined;
      map.set(item.slug, {
        heading: typeof item.heading === "string" ? item.heading : undefined,
        description: typeof item.description === "string" ? item.description : undefined,
        excerpt: typeof item.excerpt === "string" ? item.excerpt : undefined,
        keywords: keywords?.length ? keywords : undefined,
        updated: updated ?? undefined,
      });
    }
  }
  return map;
}

/** Get docs config: static/docs/config.yaml. Slug = folder name (e.g. 01_docker). Maps dirs to heading/description/keywords. */
export function getDocsConfig(): Map<string, { heading?: string; description?: string; keywords?: string[] }> {
  const dir = path.join(STATIC_DIR, "docs");
  const data = readConfigYaml<{ docs?: DocConfigItem[] } | DocConfigItem[]>(dir, "config.yaml");
  if (!data) return new Map();
  const list = Array.isArray(data) ? data : data.docs ?? [];
  const map = new Map<string, { heading?: string; description?: string; keywords?: string[] }>();
  for (const item of list) {
    if (item && typeof item === "object" && "slug" in item && typeof item.slug === "string") {
      const keywords = Array.isArray((item as DocConfigItem).keywords)
        ? ((item as DocConfigItem).keywords as unknown[]).filter((k): k is string => typeof k === "string")
        : undefined;
      map.set(item.slug, {
        heading: typeof item.heading === "string" ? item.heading : undefined,
        description: typeof item.description === "string" ? item.description : undefined,
        keywords: keywords?.length ? keywords : undefined,
      });
    }
  }
  return map;
}

/** Per-dir docs config: static/docs/{folderName}/config.yaml. Maps md file slugs in that dir to heading. */
export function getDocsFolderConfig(folderName: string): Map<string, { heading?: string; updated?: string }> {
  const dir = path.join(STATIC_DIR, "docs", folderName);
  const data = readConfigYaml<{ files?: DocFileConfigItem[] } | DocFileConfigItem[]>(dir, "config.yaml");
  if (!data) return new Map();
  const list = Array.isArray(data) ? data : data.files ?? [];
  const map = new Map<string, { heading?: string; updated?: string }>();
  for (const item of list) {
    if (item && typeof item === "object" && "slug" in item && typeof item.slug === "string") {
      const updated = typeof (item as DocFileConfigItem).updated === "string" ? (item as DocFileConfigItem).updated : undefined;
      map.set(item.slug, {
        heading: typeof item.heading === "string" ? item.heading : undefined,
        updated: updated ?? undefined,
      });
    }
  }
  return map;
}

/** Per-course file: file = md filename without .md, slug = URL slug. If only slug is set, it's used as file (backward compat). */
export type CourseFileConfigItem = {
  /** Filename without .md (e.g. 01_one). If omitted, slug is used as file. */
  file?: string;
  /** URL slug (e.g. introduction-to-html). If omitted, derived from heading or file. */
  slug?: string;
  heading?: string;
  /** ISO date e.g. "2025-02-11" for "Updated" display; overrides file mtime when set */
  updated?: string;
};

export type CourseFileConfigEntry = {
  file: string;
  slug: string;
  heading?: string;
  updated?: string;
};

/** Per-course config: static/courses/{folderName}/config.yaml. Returns list of file/slug/heading for each entry. */
export function getCourseFolderConfig(folderName: string): CourseFileConfigEntry[] {
  const dir = path.join(STATIC_DIR, "courses", folderName);
  const data = readConfigYaml<{ files?: CourseFileConfigItem[] } | CourseFileConfigItem[]>(dir, "config.yaml");
  if (!data) return [];
  const list = Array.isArray(data) ? data : data.files ?? [];
  const entries: CourseFileConfigEntry[] = [];
  for (const item of list) {
    if (!item || typeof item !== "object") continue;
    const hasFile = typeof item.file === "string";
    const slugVal = typeof item.slug === "string" ? item.slug : undefined;
    const hasSlug = slugVal !== undefined;
    const file = hasFile ? item.file : hasSlug ? slugVal : null;
    if (!file) continue;
    const heading = typeof item.heading === "string" ? item.heading : undefined;
    const updated = typeof (item as CourseFileConfigItem).updated === "string" ? (item as CourseFileConfigItem).updated : undefined;
    const slug: string =
      hasSlug && hasFile
        ? slugVal!
        : hasSlug && !hasFile
          ? prettyFileSlug(slugVal!)
          : slugifyFromHeading(heading) ?? prettyFileSlug(file);
    entries.push({ file, slug, heading, updated: updated ?? undefined });
  }
  return entries;
}

function slugifyFromHeading(heading: string | undefined): string | undefined {
  if (!heading || typeof heading !== "string") return undefined;
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function prettyFileSlug(fileSlug: string): string {
  const withoutNumbers = fileSlug.replace(/^\d+_?/, "");
  return withoutNumbers.replace(/_/g, "-").toLowerCase();
}

/** Parse optional ISO date string from config (e.g. "2025-02-11"). Returns null if missing or invalid. */
export function parseConfigDate(s: string | undefined): Date | null {
  if (!s || typeof s !== "string") return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}
