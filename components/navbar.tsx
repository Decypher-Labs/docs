"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Youtube, BookOpen, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import type { SlideFolder } from "@/lib/slides";

type NavbarProps = {
  tree: SlideFolder[];
  onMenuClick?: () => void;
  showMenuButton?: boolean;
};

const YOUTUBE_URL = "https://youtube.com/@decypherlabs";

export function Navbar({ tree, onMenuClick, showMenuButton = false }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const firstDoc = tree[0]?.files[0]
    ? `/${tree[0].name}/${tree[0].files[0].slug}`
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
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
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
        {showMenuButton && (
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-white/20 hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>
        )}
        <a
          href={YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-xl border border-primary/40 bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20 sm:inline-flex"
        >
          <Youtube className="h-4 w-4" />
          Watch
        </a>
        {mounted && (
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 bg-white/50 text-muted-foreground transition-colors hover:bg-white/70 hover:text-foreground dark:bg-white/10 dark:hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </header>
  );
}
