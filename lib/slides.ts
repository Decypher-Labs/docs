import fs from "fs";
import path from "path";
import { getDocsConfig, getDocsFolderConfig } from "./content-config";
import {
  folderNameToPrettySlug,
  fileSlugToPretty,
  getDocPrettyUrl,
} from "./doc-pretty-url";

export { folderNameToPrettySlug, fileSlugToPretty, getDocPrettyUrl } from "./doc-pretty-url";

const SLIDES_DIR = path.join(process.cwd(), "static", "docs");

export type SlideFile = {
  slug: string;
  title: string;
  filename: string;
};

export type SlideFolder = {
  name: string;
  title: string;
  files: SlideFile[];
};

/** Convert filename like 01_introduction_to_docker to "Introduction to Docker" */
function filenameToTitle(filename: string): string {
  const withoutExt = filename.replace(/\.md$/i, "");
  const withoutLeadingNumbers = withoutExt.replace(/^\d+_?/, "");
  const withSpaces = withoutLeadingNumbers.replace(/_/g, " ");
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).toLowerCase();
}

/** Get folder display name: 01_docker -> Docker (strips 01_, 02_ prefix) */
function folderToTitle(name: string): string {
  const withoutNumbers = name.replace(/^\d+_?/, "");
  return withoutNumbers.charAt(0).toUpperCase() + withoutNumbers.slice(1).toLowerCase();
}

/** Resolve pretty URL segments to actual folder name and file slug. Returns null if not found. */
export function resolveDocPrettyUrl(
  prettyFolder: string,
  prettySlug: string
): { folder: string; fileSlug: string } | null {
  const tree = getSlidesTree();
  const prettyFolderLower = prettyFolder.toLowerCase();
  const prettySlugLower = prettySlug.toLowerCase();
  for (const f of tree) {
    if (folderNameToPrettySlug(f.name) !== prettyFolderLower) continue;
    for (const file of f.files) {
      if (fileSlugToPretty(file.slug) === prettySlugLower) {
        return { folder: f.name, fileSlug: file.slug };
      }
    }
    return null;
  }
  return null;
}

/** Read slides directory and return tree of folders and .md files. Ordered by 01_, 02_ folder and filename convention. */
export function getSlidesTree(): SlideFolder[] {
  if (!fs.existsSync(SLIDES_DIR)) {
    return [];
  }
  const entries = fs.readdirSync(SLIDES_DIR, { withFileTypes: true });
  const folders: SlideFolder[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const dirPath = path.join(SLIDES_DIR, entry.name);
    const files = fs.readdirSync(dirPath);
    const mdFiles = files
      .filter((f) => f.endsWith(".md"))
      .sort()
      .map((filename) => ({
        filename,
        slug: filename.replace(/\.md$/i, ""),
        title: filenameToTitle(filename),
      }));

    if (mdFiles.length > 0) {
      const defaultFolderTitle = folderToTitle(entry.name);
      const folderConfig = getDocsConfig().get(entry.name);
      const fileConfig = getDocsFolderConfig(entry.name);
      const filesWithTitles = mdFiles.map((f) => ({
        ...f,
        title: fileConfig.get(f.slug)?.heading ?? f.title,
      }));
      folders.push({
        name: entry.name,
        title: folderConfig?.heading ?? defaultFolderTitle,
        files: filesWithTitles,
      });
    }
  }

  return folders.sort((a, b) => a.name.localeCompare(b.name));
}

/** Get raw markdown content for a file in a folder */
export function getMarkdownContent(folder: string, fileSlug: string): string | null {
  const filePath = path.join(SLIDES_DIR, folder, `${fileSlug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

/** Get file modification time for a file */
export function getFileModificationTime(folder: string, fileSlug: string): Date | null {
  const filePath = path.join(SLIDES_DIR, folder, `${fileSlug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const stats = fs.statSync(filePath);
  return stats.mtime;
}

/** Get all [folder, slug] pairs for generateStaticParams (pretty URL segments) */
export function getAllSlideParams(): { folder: string; slug: string }[] {
  const tree = getSlidesTree();
  const params: { folder: string; slug: string }[] = [];
  for (const folder of tree) {
    for (const file of folder.files) {
      params.push({
        folder: folderNameToPrettySlug(folder.name),
        slug: fileSlugToPretty(file.slug),
      });
    }
  }
  return params;
}

/** Flat list of docs in sidebar order: { folder, slug, title } */
export function getFlatDocList(): { folder: string; slug: string; title: string }[] {
  const tree = getSlidesTree();
  const list: { folder: string; slug: string; title: string }[] = [];
  for (const f of tree) {
    for (const file of f.files) {
      list.push({ folder: f.name, slug: file.slug, title: file.title });
    }
  }
  return list;
}

/** Get previous and next doc for a given folder/slug (actual names). Returns items with actual folder/slug; use getDocPrettyUrl for href. */
export function getPrevNext(
  folder: string,
  slug: string
): {
  prev: { folder: string; slug: string; title: string } | null;
  next: { folder: string; slug: string; title: string } | null;
} {
  const list = getFlatDocList();
  const i = list.findIndex((d) => d.folder === folder && d.slug === slug);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? list[i - 1]! : null,
    next: i < list.length - 1 ? list[i + 1]! : null,
  };
}
