import fs from "fs";
import path from "path";
import { getCourseConfig, getCourseFolderConfig } from "./content-config";

const COURSE_DIR = path.join(process.cwd(), "static", "courses");

export type CourseFile = {
  /** Filename without .md, used to load content */
  fileSlug: string;
  /** URL slug for links and routes */
  slug: string;
  title: string;
  filename: string;
};

export type Course = {
  /** Folder name e.g. 01_html */
  folderName: string;
  /** URL slug e.g. html */
  slug: string;
  /** Display title e.g. HTML */
  title: string;
  /** Short description for course card */
  description: string;
  files: CourseFile[];
};

/** Convert filename like 01_intro.md to "Intro" */
function filenameToTitle(filename: string): string {
  const withoutExt = filename.replace(/\.md$/i, "");
  const withoutLeadingNumbers = withoutExt.replace(/^\d+_?/, "");
  const withSpaces = withoutLeadingNumbers.replace(/_/g, " ");
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1).toLowerCase();
}

/** Folder 01_html -> slug "html", title "HTML" */
function folderToSlugAndTitle(folderName: string): { slug: string; title: string } {
  const withoutNumbers = folderName.replace(/^\d+_?/, "");
  const title = withoutNumbers.charAt(0).toUpperCase() + withoutNumbers.slice(1).toLowerCase();
  const slug = withoutNumbers.toLowerCase();
  return { slug, title };
}

/** Read first paragraph or first line of first .md as description */
function getCourseDescription(folderPath: string): string {
  const files = fs.readdirSync(folderPath).filter((f) => f.endsWith(".md")).sort();
  if (files.length === 0) return "Course guide.";
  const firstPath = path.join(folderPath, files[0]!);
  const content = fs.readFileSync(firstPath, "utf-8");
  const withoutFrontmatter = content.replace(/^---[\s\S]*?---\s*/m, "").trim();
  const firstLine = withoutFrontmatter.split("\n")[0]?.replace(/^#+\s*/, "").trim() ?? "";
  if (firstLine.length > 120) return firstLine.slice(0, 117) + "...";
  return firstLine || "Course guide.";
}

/** Get all courses: static/courses/01_html, 02_css, etc. Ordered by 01_, 02_ folder and filename convention. */
export function getCoursesTree(): Course[] {
  if (!fs.existsSync(COURSE_DIR)) return [];
  const entries = fs.readdirSync(COURSE_DIR, { withFileTypes: true });
  const courses: Course[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const dirPath = path.join(COURSE_DIR, entry.name);
    const files = fs.readdirSync(dirPath);
    const configList = getCourseFolderConfig(entry.name);
    const mdFiles =
      configList.length > 0
        ? configList
            .filter((e) => fs.existsSync(path.join(dirPath, `${e.file}.md`)))
            .map((e) => ({
              filename: `${e.file}.md`,
              fileSlug: e.file,
              slug: e.slug,
              title: e.heading ?? filenameToTitle(`${e.file}.md`),
            }))
        : files
            .filter((f) => f.endsWith(".md"))
            .sort()
            .map((filename) => {
              const fileSlug = filename.replace(/\.md$/i, "");
              return {
                filename,
                fileSlug,
                slug: fileSlug.replace(/^\d+_?/, "").replace(/_/g, "-").toLowerCase(),
                title: filenameToTitle(filename),
              };
            });

    if (mdFiles.length > 0) {
      const { slug, title } = folderToSlugAndTitle(entry.name);
      const description = getCourseDescription(dirPath);
      const config = getCourseConfig().get(slug);
      courses.push({
        folderName: entry.name,
        slug,
        title: config?.heading ?? title,
        description: config?.description ?? description,
        files: mdFiles,
      });
    }
  }

  return courses.sort((a, b) => a.folderName.localeCompare(b.folderName));
}

/** Get a single course by URL slug (e.g. "html") */
export function getCourseBySlug(slug: string): Course | null {
  const tree = getCoursesTree();
  return tree.find((c) => c.slug === slug) ?? null;
}

/** Get markdown content for a guide page (fileSlug = filename without .md) */
export function getGuideContent(courseSlug: string, fileSlug: string): string | null {
  const course = getCourseBySlug(courseSlug);
  if (!course) return null;
  const filePath = path.join(COURSE_DIR, course.folderName, `${fileSlug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf-8");
}

export function getGuideModificationTime(courseSlug: string, fileSlug: string): Date | null {
  const course = getCourseBySlug(courseSlug);
  if (!course) return null;
  const filePath = path.join(COURSE_DIR, course.folderName, `${fileSlug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return fs.statSync(filePath).mtime;
}

/** Resolve URL slug to file slug for a course. Returns null if not found. */
export function resolveGuideUrlSlug(
  courseSlug: string,
  urlSlug: string
): { fileSlug: string } | null {
  const course = getCourseBySlug(courseSlug);
  if (!course) return null;
  const file = course.files.find((f) => f.slug === urlSlug);
  if (!file) return null;
  return { fileSlug: file.fileSlug };
}

/** All [courseSlug, slug] for generateStaticParams (slug = URL slug) */
export function getAllGuideParams(): { course: string; slug: string }[] {
  const tree = getCoursesTree();
  const params: { course: string; slug: string }[] = [];
  for (const course of tree) {
    for (const file of course.files) {
      params.push({ course: course.slug, slug: file.slug });
    }
  }
  return params;
}

/** Flat list for prev/next (slug = URL slug) */
export function getFlatGuideList(): { course: string; slug: string; title: string }[] {
  const tree = getCoursesTree();
  const list: { course: string; slug: string; title: string }[] = [];
  for (const c of tree) {
    for (const file of c.files) {
      list.push({ course: c.slug, slug: file.slug, title: file.title });
    }
  }
  return list;
}

/** Prev/next by URL slug */
export function getGuidePrevNext(
  courseSlug: string,
  urlSlug: string
): {
  prev: { course: string; slug: string; title: string } | null;
  next: { course: string; slug: string; title: string } | null;
} {
  const list = getFlatGuideList();
  const i = list.findIndex((d) => d.course === courseSlug && d.slug === urlSlug);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? list[i - 1]! : null,
    next: i < list.length - 1 ? list[i + 1]! : null,
  };
}
