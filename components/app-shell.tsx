"use client";

import { useState } from "react";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import type { SlideFolder } from "@/lib/slides";
import { useMediaQuery } from "./use-media-query";

type AppShellProps = {
  tree: SlideFolder[];
  children: React.ReactNode;
};

export function AppShell({ tree, children }: AppShellProps) {
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const sidebarVisible = isMobile ? mobileOpen : !collapsed;

  const closeSidebar = () => {
    if (isMobile) setMobileOpen(false);
  };

  const toggleSidebar = () => {
    if (isMobile) setMobileOpen((o) => !o);
    else setCollapsed((c) => !c);
  };

  return (
    <>
      <Navbar onMenuClick={() => setMobileOpen(true)} showMenuButton={isMobile} />
      <div className="flex min-h-[calc(100vh-3.5rem)]">
        {/* Backdrop for mobile sidebar */}
        {isMobile && sidebarVisible && (
          <button
            type="button"
            onClick={closeSidebar}
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
            aria-label="Close sidebar"
          />
        )}
        <Sidebar
          tree={tree}
          collapsed={!sidebarVisible}
          onToggle={toggleSidebar}
          isMobile={isMobile}
          onClose={closeSidebar}
        />
        <main className="min-w-0 flex-1">
          {!isMobile && !sidebarVisible && (
            <button
              type="button"
              onClick={() => (isMobile ? setMobileOpen(true) : setCollapsed(false))}
              className="fixed left-2 top-16 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-primary shadow-sm hover:bg-accent-muted focus:outline-none focus:ring-2 focus:ring-ring sm:left-4"
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
    </>
  );
}
