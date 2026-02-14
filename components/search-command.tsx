"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, BookOpen, Keyboard, GraduationCap } from "lucide-react";
import { KeyboardShortcuts } from "./keyboard-shortcuts";

export type SearchItem = {
  title: string;
  href: string;
  type: "doc" | "blog" | "guide";
};

type SearchCommandProps = {
  items: SearchItem[];
};

const INITIAL_LIMIT = 5;
const SEARCH_LIMIT = 10;
const LOAD_MORE_STEP = 10;

export function SearchCommand({ items }: SearchCommandProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? items.filter((item) => {
        const slug = item.type === "blog" ? item.href.replace(/^\/blogs\//, "") : "";
        const searchable = `${item.title} ${item.type} ${slug}`.toLowerCase();
        return searchable.includes(q);
      })
    : items;

  const slice = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  useEffect(() => {
    setVisibleCount(q ? SEARCH_LIMIT : INITIAL_LIMIT);
  }, [q]);

  const openSearch = useCallback(() => {
    setOpen(true);
    setQuery("");
    setSelected(0);
    setVisibleCount(INITIAL_LIMIT);
  }, []);

  const closeSearch = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
      if (e.key === "Escape") {
        if (shortcutsOpen) {
          setShortcutsOpen(false);
        } else {
          closeSearch();
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        setShortcutsOpen(true);
      }
    };
    const onOpenSearch = () => openSearch();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-search", onOpenSearch);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-search", onOpenSearch);
    };
  }, [openSearch, closeSearch, shortcutsOpen]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => (s < slice.length - 1 ? s + 1 : 0));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => (s > 0 ? s - 1 : slice.length - 1));
      }
      if (e.key === "Enter" && slice[selected]) {
        e.preventDefault();
        router.push(slice[selected]!.href);
        closeSearch();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, selected, slice, router, closeSearch]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-foreground/20 backdrop-blur-sm"
        aria-hidden
        onClick={closeSearch}
      />
      <div
        data-search-command
        className="fixed left-1/2 top-[15%] z-[101] w-full max-w-xl -translate-x-1/2 rounded-xl border border-border bg-card shadow-2xl"
        role="dialog"
        aria-label="Search"
      >
        <div className="flex items-center gap-2 border-b border-border px-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            placeholder="Search docs and blogs…"
            className="min-w-0 flex-1 border-0 bg-transparent py-3 text-foreground placeholder:text-muted-foreground"
            style={{ outline: "none", boxShadow: "none" }}
            autoFocus
          />
          <button
            onClick={() => setShortcutsOpen(true)}
            className="hidden rounded border border-border/60 bg-muted/50 p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex"
            aria-label="Keyboard shortcuts"
            title="Keyboard shortcuts (⌘/)"
          >
            <Keyboard className="h-3.5 w-3.5" />
          </button>
          <kbd className="hidden rounded border border-border/60 bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground sm:inline">
            ESC
          </kbd>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto py-2">
          {slice.length === 0 ? (
            <li className="px-3 py-4 text-center text-sm text-muted-foreground">
              No results
            </li>
          ) : (
            slice.map((item, i) => (
              <li key={`${item.type}-${item.href}`}>
                <button
                  type="button"
                  onClick={() => {
                    router.push(item.href);
                    closeSearch();
                  }}
                  className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors ${
                    i === selected
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted/60"
                  }`}
                >
                  {item.type === "doc" ? (
                    <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
                  ) : item.type === "guide" ? (
                    <GraduationCap className="h-4 w-4 shrink-0 text-muted-foreground" />
                  ) : (
                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                  )}
                  <span className="min-w-0 truncate">{item.title}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {item.type === "blog" ? "Blog" : item.type === "guide" ? "Course" : "Doc"}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
        {hasMore && (
          <div className="border-t border-border/60 px-3 py-2">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + LOAD_MORE_STEP)}
              className="w-full rounded-lg border border-border/60 bg-muted/30 py-2 text-center text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
            >
              Load more ({filtered.length - visibleCount} more)
            </button>
          </div>
        )}
        <div className="border-t border-border/60 px-3 py-2 text-xs text-muted-foreground">
          <kbd className="rounded border border-border/60 bg-muted/50 px-1.5 py-0.5">↑</kbd>{" "}
          <kbd className="rounded border border-border/60 bg-muted/50 px-1.5 py-0.5">↓</kbd> to
          navigate · <kbd className="rounded border border-border/60 bg-muted/50 px-1.5 py-0.5">↵</kbd> to
          select ·{" "}
          <button
            onClick={() => setShortcutsOpen(true)}
            className="text-primary hover:underline"
          >
            <kbd className="rounded border border-border/60 bg-muted/50 px-1.5 py-0.5">⌘</kbd>{" "}
            <kbd className="rounded border border-border/60 bg-muted/50 px-1.5 py-0.5">/</kbd> for shortcuts
          </button>
        </div>
      </div>
      <KeyboardShortcuts open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </>
  );
}
