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
