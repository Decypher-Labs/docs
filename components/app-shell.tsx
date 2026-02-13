"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Sidebar, SIDEBAR_DEFAULT } from "./sidebar";
import { SidebarResizeHandle } from "./sidebar-resize-handle";
import { Footer } from "./footer";
import type { SlideFolder } from "@/lib/slides";
import { useMediaQuery } from "./use-media-query";

const SIDEBAR_WIDTH_KEY = "docs-sidebar-width";

type AppShellProps = {
  tree: SlideFolder[];
  children: React.ReactNode;
};

export function AppShell({ tree, children }: AppShellProps) {
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

  const sidebarVisible = isMobile ? mobileOpen : !collapsed;

  const closeSidebar = () => {
    if (isMobile) setMobileOpen(false);
  };

  const toggleSidebar = () => {
    if (isMobile) setMobileOpen((o) => !o);
    else setCollapsed((c) => !c);
  };

  return (
    <div className="flex min-h-screen flex-col bg-mesh">
      <Navbar
        tree={tree}
        onMenuClick={() => setMobileOpen(true)}
        showMenuButton={isMobile}
      />
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-1 gap-2 sm:gap-3">
        {isMobile && sidebarVisible && (
          <button
            type="button"
            onClick={closeSidebar}
            className="fixed inset-0 z-40 bg-foreground/10 backdrop-blur-sm lg:hidden"
            aria-label="Close sidebar"
          />
        )}
        <Sidebar
          tree={tree}
          collapsed={!sidebarVisible}
          onToggle={toggleSidebar}
          isMobile={isMobile}
          onClose={closeSidebar}
          width={sidebarWidth}
        />
        {!isMobile && sidebarVisible && (
          <SidebarResizeHandle width={sidebarWidth} onWidthChange={setSidebarWidth} />
        )}
        <main className="min-w-0 flex-1">
          {!isMobile && !sidebarVisible && (
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
