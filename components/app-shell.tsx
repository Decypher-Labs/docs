"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Sidebar, SIDEBAR_DEFAULT } from "./sidebar";
import { SidebarResizeHandle } from "./sidebar-resize-handle";
import { Footer } from "./footer";
import type { SlideFolder } from "@/lib/slides";
import { getDocPrettyUrl } from "@/lib/doc-pretty-url";
import type { BlogPost } from "@/lib/blogs";
import type { Course } from "@/lib/courses";
import { useMediaQuery } from "./use-media-query";
import { SearchCommand } from "./search-command";
import { ThemeTransition } from "./theme-transition";

const SIDEBAR_WIDTH_KEY = "docs-sidebar-width";

type SearchItem = { title: string; href: string; type: "doc" | "blog" | "guide"; keywords?: string[] };

type AppShellProps = {
  tree: SlideFolder[];
  blogs: BlogPost[];
  courses: Course[];
  children: React.ReactNode;
  /** When true, sidebar is hidden (e.g. on 404 page) */
  hideSidebar?: boolean;
};

function buildSearchItems(tree: SlideFolder[], blogs: BlogPost[], courses: Course[]): SearchItem[] {
  const docItems: SearchItem[] = [];
  for (const f of tree) {
    for (const file of f.files) {
      docItems.push({
        title: file.title,
        href: getDocPrettyUrl(f.name, file.slug),
        type: "doc",
        keywords: f.keywords,
      });
    }
  }
  const blogItems: SearchItem[] = blogs.map((b) => ({
    title: b.title,
    href: `/blogs/${b.slug}`,
    type: "blog",
    keywords: b.keywords,
  }));
  const guideItems: SearchItem[] = [];
  for (const c of courses) {
    for (const file of c.files) {
      guideItems.push({
        title: `${c.title}: ${file.title}`,
        href: `/courses/${c.slug}/${file.slug}`,
        type: "guide",
        keywords: c.keywords,
      });
    }
  }
  return [...docItems, ...blogItems, ...guideItems];
}

export function AppShell({ tree, blogs, courses, children, hideSidebar = false }: AppShellProps) {
  const searchItems = buildSearchItems(tree, blogs, courses);
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SIDEBAR_WIDTH_KEY);
      if (stored) {
        const w = Number(stored);
        if (w >= 220 && w <= 380) setSidebarWidth(w);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (sidebarWidth === SIDEBAR_DEFAULT) return;
    try {
      localStorage.setItem(SIDEBAR_WIDTH_KEY, String(sidebarWidth));
    } catch {
      /* ignore */
    }
  }, [sidebarWidth]);

  useEffect(() => {
    setCollapsed(pathname === "/");
  }, [pathname]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  // Show sidebar on docs, blogs, and courses (all views). Hidden when hideSidebar (e.g. 404).
  const showSidebar = !hideSidebar && pathname !== "/";
  const shouldRenderSidebar = !hideSidebar && (showSidebar || isMobile);
  const sidebarVisible = isMobile ? mobileOpen : !collapsed;

  const closeSidebar = () => {
    if (isMobile) setMobileOpen(false);
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileOpen((o) => !o);
    } else {
      setCollapsed((c) => !c);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-mesh">
      <ThemeTransition />
      <SearchCommand items={searchItems} />
      <Navbar
        tree={tree}
        onMenuClick={toggleSidebar}
        showMenuButton={isMobile}
        mobileMenuOpen={isMobile ? mobileOpen : false}
      />
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-1">
        {isMobile && sidebarVisible && (
          <button
            type="button"
            onClick={closeSidebar}
            className="fixed inset-0 z-40 bg-foreground/10 backdrop-blur-sm lg:hidden"
            aria-label="Close sidebar"
          />
        )}
        {shouldRenderSidebar && (
          <div
            className="flex shrink-0"
            style={{
              width: isMobile || !sidebarVisible ? undefined : `${sidebarWidth + 8}px`, // sidebar width + resize handle width (8px)
              flexShrink: 0,
            }}
          >
            <Sidebar
              tree={tree}
              blogs={blogs}
              courses={courses}
              collapsed={!sidebarVisible}
              onToggle={toggleSidebar}
              isMobile={isMobile}
              onClose={closeSidebar}
              width={sidebarWidth}
            />
            {!isMobile && sidebarVisible && (
              <SidebarResizeHandle width={sidebarWidth} onWidthChange={setSidebarWidth} />
            )}
          </div>
        )}
        <main className="min-w-0 flex-1 min-h-[calc(100vh-3.5rem)]" style={{ paddingLeft: shouldRenderSidebar && !isMobile && sidebarVisible ? '12px' : undefined }}>
          {showSidebar && !isMobile && !sidebarVisible && (
            <button
              type="button"
              onClick={() => (isMobile ? setMobileOpen(true) : setCollapsed(false))}
              className="glass-panel fixed left-2 top-16 z-40 flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 text-primary shadow-lg transition-colors hover:bg-white/50 dark:hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-ring sm:left-4"
              aria-label="Open sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 3v18" />
              </svg>
            </button>
          )}
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
