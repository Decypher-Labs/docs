import fs from "fs";
import path from "path";

const SLIDES_DIR = path.join(process.cwd(), "slides");

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

/** Get folder display name: docker -> Docker */
function folderToTitle(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

/** Read slides directory and return tree of folders and .md files */
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
      folders.push({
        name: entry.name,
        title: folderToTitle(entry.name),
        files: mdFiles,
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

/** Get all [folder, slug] pairs for generateStaticParams */
export function getAllSlideParams(): { folder: string; slug: string }[] {
  const tree = getSlidesTree();
  const params: { folder: string; slug: string }[] = [];
  for (const folder of tree) {
    for (const file of folder.files) {
      params.push({ folder: folder.name, slug: file.slug });
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

/** Get previous and next doc for a given folder/slug. */
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
