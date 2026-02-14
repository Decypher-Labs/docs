"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Youtube, BookOpen, Menu, X, Search, FileText, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import type { SlideFolder } from "@/lib/slides";
import { getDocPrettyUrl } from "@/lib/doc-pretty-url";

type NavbarProps = {
  tree: SlideFolder[];
  onMenuClick?: () => void;
  showMenuButton?: boolean;
  mobileMenuOpen?: boolean;
};

const YOUTUBE_URL = "https://youtube.com/@decypherlabs";

export function Navbar({
  tree,
  onMenuClick,
  showMenuButton = false,
  mobileMenuOpen = false,
}: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [iconKey, setIconKey] = useState(0);

  useEffect(() => setMounted(true), []);

  // Trigger icon animation on theme change
  useEffect(() => {
    if (mounted) {
      setIconKey((prev) => prev + 1);
    }
  }, [theme, mounted]);

  const firstDoc = tree[0]?.files[0]
    ? getDocPrettyUrl(tree[0].name, tree[0].files[0].slug)
    : null;

  return (
    <header className="navbar-glass sticky top-0 z-50 flex h-14 items-center justify-between gap-4 px-4 shadow-sm sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-6">
        <Link
          href="/"
          className="shrink-0 font-semibold text-foreground transition-colors hover:text-primary"
        >
          <span className="text-xl tracking-tight">
            <span className="font-brand font-semibold">Decypher</span>
            <span className="text-primary font-medium">Labs</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
          >
            Home
          </Link>
          {firstDoc && (
            <Link
              href={firstDoc}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
            >
              <BookOpen className="h-4 w-4" />
              Docs
            </Link>
          )}
          <Link
            href="/courses"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
          >
            <GraduationCap className="h-4 w-4" />
            Courses
          </Link>
          <Link
            href="/blogs"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
          >
            <FileText className="h-4 w-4" />
            Blogs
          </Link>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
          >
            <Youtube className="h-4 w-4" />
            YouTube
          </a>
        </nav>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
          className="hidden md:inline-flex h-9 items-center gap-2 rounded-xl border border-border/50 bg-card/50 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Search (⌘K)"
          title="Search (⌘K)"
        >
          <Search className="h-4 w-4 shrink-0" />
          <span className="hidden lg:inline">Search</span>
          <kbd className="hidden xl:inline-flex items-center gap-1 rounded border border-border/60 bg-muted/50 px-1.5 py-0.5 text-xs font-medium">
            <span className="text-[10px]">⌘</span>
            <span>K</span>
          </kbd>
        </button>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring md:hidden"
          aria-label="Search (⌘K)"
          title="Search (⌘K)"
        >
          <Search className="h-4 w-4" />
        </button>
        {mounted && (
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 bg-white/50 text-muted-foreground overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:bg-white/70 hover:text-foreground dark:bg-white/10 dark:hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-ring group"
            aria-label="Toggle theme"
          >
            <span key={iconKey} className="relative z-10 transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
              {theme === "dark" ? (
                <Sun className="h-4 w-4 theme-icon-transition" />
              ) : (
                <Moon className="h-4 w-4 theme-icon-transition" />
              )}
            </span>
            <span className="absolute inset-0 rounded-xl bg-primary/10 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:opacity-100" />
          </button>
        )}
        {showMenuButton && (
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-white/20 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring lg:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </button>
        )}
      </div>
    </header>
  );
}
