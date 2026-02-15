"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight, FileText, Folder, X, Home, BookOpen, Youtube, GraduationCap, Github, Coffee } from "lucide-react";
import { GITHUB_ORG_URL, BUYMEACOFFEE_URL } from "@/lib/site-config";
import type { SlideFolder } from "@/lib/slides";
import { getDocPrettyUrl, folderNameToPrettySlug } from "@/lib/doc-pretty-url";
import type { BlogPost } from "@/lib/blogs";
import type { Course } from "@/lib/courses";
import { useState, useEffect, useRef } from "react";

const YOUTUBE_URL = "https://youtube.com/@decypherlabs";

const SIDEBAR_MIN = 220;
const SIDEBAR_MAX = 380;
export const SIDEBAR_DEFAULT = 300;

type SidebarSection = "docs" | "blogs" | "courses";

type SidebarProps = {
  tree: SlideFolder[];
  blogs: BlogPost[];
  courses: Course[];
  collapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
  onClose?: () => void;
  width?: number;
};

function getSidebarSection(pathname: string): SidebarSection {
  if (pathname.startsWith("/blogs")) return "blogs";
  if (pathname.startsWith("/courses")) return "courses";
  return "docs";
}

export function Sidebar({
  tree,
  blogs,
  courses,
  collapsed,
  onToggle,
  isMobile = false,
  onClose,
  width = SIDEBAR_DEFAULT,
}: SidebarProps) {
  const pathname = usePathname();
  const section = getSidebarSection(pathname);

  const content = (
    <>
      <div className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-border/40 px-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {isMobile ? "Navigation" : section === "blogs" ? "Blogs" : section === "courses" ? "Courses" : "Contents"}
        </span>
        <div className="flex items-center gap-0.5">
          {isMobile && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {!isMobile && (
            <button
              type="button"
              onClick={onToggle}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              aria-label="Collapse sidebar"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
            </button>
          )}
        </div>
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-4">
        {isMobile && (
          <ul className="mb-6 space-y-1 border-b border-border/40 pb-6">
            <li>
              <Link
                href="/"
                onClick={onClose}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                  pathname === "/"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                <Home className="h-4 w-4 shrink-0" />
                <span>Home</span>
              </Link>
            </li>
            <li>
                <Link
                  href="/docs"
                  onClick={onClose}
                  className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                    pathname === "/docs"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  <BookOpen className="h-4 w-4 shrink-0" />
                  <span>Docs</span>
                </Link>
              </li>
            <li>
              <Link
                href="/courses"
                onClick={onClose}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                  pathname.startsWith("/courses")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                <GraduationCap className="h-4 w-4 shrink-0" />
                <span>Courses</span>
              </Link>
            </li>
            <li>
              <Link
                href="/blogs"
                onClick={onClose}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                  pathname.startsWith("/blogs")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                <FileText className="h-4 w-4 shrink-0" />
                <span>Blogs</span>
              </Link>
            </li>
            <li>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
              >
                <Youtube className="h-4 w-4 shrink-0" />
                <span>YouTube</span>
              </a>
            </li>
            <li>
              <a
                href={GITHUB_ORG_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
              >
                <Github className="h-4 w-4 shrink-0" />
                <span>Follow on GitHub</span>
              </a>
            </li>
          </ul>
        )}
        {pathname !== "/" && isMobile && section === "docs" && tree.length > 0 && (
          <div className="mb-3">
            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Contents
            </span>
          </div>
        )}
        {pathname !== "/" && section === "docs" && (
          tree.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border/60 bg-muted/30 px-3 py-4 text-center text-sm text-muted-foreground">
              Will be added soon.
            </p>
          ) : (
            <ul className="space-y-1">
              {tree.map((folder) => (
                <FolderSection
                  key={folder.name}
                  folder={folder}
                  pathname={pathname}
                  onLinkClick={isMobile ? onClose : undefined}
                  isMobile={isMobile}
                />
              ))}
            </ul>
          )
        )}
        {pathname !== "/" && section === "blogs" && (
          blogs.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border/60 bg-muted/30 px-3 py-4 text-center text-sm text-muted-foreground">
              No blog posts yet.
            </p>
          ) : (
            <ul className="space-y-0.5">
              {blogs.map((post) => {
                const href = `/blogs/${post.slug}`;
                const isActive = pathname === href;
                return (
                  <li key={post.slug}>
                    <Link
                      href={href}
                      onClick={isMobile ? onClose : undefined}
                      className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                        isActive
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      }`}
                    >
                      <FileText className="h-3.5 w-3.5 shrink-0 opacity-80" />
                      <span className="truncate">{post.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )
        )}
        {pathname !== "/" && section === "courses" && (
          courses.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border/60 bg-muted/30 px-3 py-4 text-center text-sm text-muted-foreground">
              No courses yet.
            </p>
          ) : pathname === "/courses" ? (
            <ul className="space-y-0.5">
              {courses.map((course) => {
                const firstFile = course.files[0];
                const href = firstFile
                  ? `/courses/${course.slug}/${firstFile.slug}`
                  : `/courses/${course.slug}`;
                const isActive = pathname === href;
                return (
                  <li key={course.slug}>
                    <Link
                      href={href}
                      onClick={isMobile ? onClose : undefined}
                      className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                        isActive
                          ? "bg-primary/10 font-medium text-primary"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      }`}
                    >
                      <GraduationCap className="h-3.5 w-3.5 shrink-0 opacity-80" />
                      <span className="truncate">{course.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="space-y-1">
              {courses.map((course) => (
                <CourseSection
                  key={course.slug}
                  course={course}
                  pathname={pathname}
                  onLinkClick={isMobile ? onClose : undefined}
                  isMobile={isMobile}
                />
              ))}
            </ul>
          )
        )}
        {/* Divider + cross-links to other sections (hidden on home) */}
        {pathname !== "/" && (
        <div className="mt-4 border-t border-border/60 pt-4">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            See also
          </span>
          <ul className="space-y-0.5">
            {section !== "docs" && (
              <li>
                <Link
                  href="/docs"
                  onClick={isMobile ? onClose : undefined}
                  className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                >
                  <BookOpen className="h-3.5 w-3.5 shrink-0 opacity-80" />
                  <span>Docs</span>
                </Link>
              </li>
            )}
            {section !== "courses" && (
              <li>
                <Link
                  href="/courses"
                  onClick={isMobile ? onClose : undefined}
                  className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                >
                  <GraduationCap className="h-3.5 w-3.5 shrink-0 opacity-80" />
                  <span>Courses</span>
                </Link>
              </li>
            )}
            {section !== "blogs" && (
              <li>
                <Link
                  href="/blogs"
                  onClick={isMobile ? onClose : undefined}
                  className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                >
                  <FileText className="h-3.5 w-3.5 shrink-0 opacity-80" />
                  <span>Blogs</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
        )}
      </nav>
      {isMobile && (
        <div className="shrink-0 border-t border-border/60 px-4 py-4">
          <a
            href={BUYMEACOFFEE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-xl border border-primary/30 bg-primary/5 px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 hover:border-primary/50"
          >
            <Coffee className="h-4 w-4 shrink-0" />
            <span>Buy Me a Coffee</span>
          </a>
        </div>
      )}
    </>
  );

  if (isMobile) {
    return (
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col rounded-r-2xl border-r border-border/50 bg-card/95 shadow-2xl backdrop-blur-xl transition-transform duration-200 lg:hidden ${
          collapsed ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{ top: "3.5rem" }}
      >
        {content}
      </aside>
    );
  }

  const asideWidth = collapsed ? 0 : width;

  return (
    <aside
      className="glass-panel flex shrink-0 flex-col overflow-hidden rounded-r-xl shadow-sm transition-[width] duration-200 sticky top-14 self-start"
      style={{
        width: collapsed ? 0 : `${width}px`,
        minWidth: collapsed ? 0 : `${SIDEBAR_MIN}px`,
        maxWidth: collapsed ? 0 : `${width}px`,
        flexShrink: 0,
        minHeight: "calc(100vh - 3.5rem)",
        maxHeight: "calc(100vh - 3.5rem)",
      }}
    >
      {content}
    </aside>
  );
}

function FolderSection({
  folder,
  pathname,
  onLinkClick,
  isMobile = false,
}: {
  folder: SlideFolder;
  pathname: string;
  onLinkClick?: () => void;
  isMobile?: boolean;
}) {
  // On mobile, folders start closed; on desktop, they start open
  const [open, setOpen] = useState(() => {
    // Always start closed on mobile, open on desktop
    return isMobile === true ? false : true;
  });
  // Close folders when switching to mobile view
  useEffect(() => {
    if (isMobile && open) {
      setOpen(false);
    }
  }, [isMobile]);

  return (
    <li>
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted/80">
          <Folder className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate">{folder.title}</span>
          {open ? (
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
          )}
        </Collapsible.Trigger>
        <Collapsible.Content className="overflow-hidden transition-all duration-150 ease-out">
          <ul className="ml-3 mt-1 space-y-0.5 border-l border-border/50 pl-3">
            {folder.files.map((file) => {
              const href = getDocPrettyUrl(folder.name, file.slug);
              const isActive = pathname === href;
              return (
                <li key={file.slug}>
                  <Link
                    href={href}
                    onClick={onLinkClick}
                    className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }`}
                  >
                    <FileText className="h-3.5 w-3.5 shrink-0 opacity-80" />
                    <span className="truncate">{file.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Collapsible.Content>
      </Collapsible.Root>
    </li>
  );
}

function CourseSection({
  course,
  pathname,
  onLinkClick,
  isMobile = false,
}: {
  course: Course;
  pathname: string;
  onLinkClick?: () => void;
  isMobile?: boolean;
}) {
  const [open, setOpen] = useState(() => !isMobile);
  const basePath = `/courses/${course.slug}`;

  useEffect(() => {
    if (isMobile && open) setOpen(false);
  }, [isMobile]);

  return (
    <li>
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted/80">
          <GraduationCap className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate">{course.title}</span>
          {open ? (
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
          )}
        </Collapsible.Trigger>
        <Collapsible.Content className="overflow-hidden transition-all duration-150 ease-out">
          <ul className="ml-3 mt-1 space-y-0.5 border-l border-border/50 pl-3">
            {course.files.map((file) => {
              const href = `${basePath}/${file.slug}`;
              const isActive = pathname === href;
              return (
                <li key={file.slug}>
                  <Link
                    href={href}
                    onClick={onLinkClick}
                    className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }`}
                  >
                    <FileText className="h-3.5 w-3.5 shrink-0 opacity-80" />
                    <span className="truncate">{file.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Collapsible.Content>
      </Collapsible.Root>
    </li>
  );
}
