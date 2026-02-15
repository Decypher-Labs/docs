"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FileText, ChevronDown, Loader2 } from "lucide-react";
import type { BlogPost } from "@/lib/blogs";
import { BlogCardBanner } from "@/components/blog-card-banner";
import { Tooltip } from "@/components/tooltip";

const INITIAL = 6;
const LOAD_MORE = 3;
const LOAD_MORE_DELAY_MS = 1000;

type BlogsListProps = {
  posts: BlogPost[];
};

function getAllKeywords(posts: BlogPost[]): string[] {
  const set = new Set<string>();
  for (const p of posts) {
    for (const k of p.keywords ?? []) {
      if (k.trim()) set.add(k.trim());
    }
  }
  return Array.from(set).sort();
}

export function BlogsList({ posts }: BlogsListProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL);
  const [keywordFilter, setKeywordFilter] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const allKeywords = useMemo(() => getAllKeywords(posts), [posts]);
  const filtered = useMemo(() => {
    if (!keywordFilter) return posts;
    return posts.filter(
      (p) => p.keywords?.some((k) => k.toLowerCase() === keywordFilter.toLowerCase())
    );
  }, [posts, keywordFilter]);
  const toShow = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const loadMore = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((n) => Math.min(n + LOAD_MORE, filtered.length));
      setIsLoadingMore(false);
    }, LOAD_MORE_DELAY_MS);
  };

  return (
    <>
      {allKeywords.length > 0 && (
        <div className="filter-tabs-scroll mb-6 pb-1">
          <div className="flex min-w-0 flex-nowrap items-center gap-2">
            <span className="shrink-0 text-sm font-medium text-muted-foreground">Filter:</span>
            <button
              type="button"
              onClick={() => {
                setKeywordFilter(null);
                setVisibleCount(INITIAL);
              }}
className={`shine-on-hover shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                keywordFilter === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/60 text-foreground hover:bg-muted"
            }`}
          >
            All
          </button>
          {allKeywords.map((kw) => (
            <button
              key={kw}
              type="button"
              onClick={() => {
                setKeywordFilter(kw);
                setVisibleCount(INITIAL);
              }}
              className={`shine-on-hover shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  keywordFilter === kw
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60 text-foreground hover:bg-muted"
                }`}
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      )}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center text-muted-foreground">
          No posts match this filter.
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {toShow.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="content-card glass-panel flex flex-col overflow-hidden rounded-2xl border border-border/50 shadow-sm"
              >
                <BlogCardBanner title={post.title} slug={post.slug} />
                <div className="flex flex-col gap-2 p-6">
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <Tooltip content={post.title} side="top">
                        <h2 className="truncate text-lg font-semibold text-foreground">
                          {post.title}
                        </h2>
                      </Tooltip>
                    </div>
                  </div>
                  {post.keywords && post.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {post.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt ?? `Read: ${post.title}`}
                  </p>
                  <span className="mt-1 text-sm font-medium text-primary">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {hasMore && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={loadMore}
                disabled={isLoadingMore}
                className="shine-on-hover inline-flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-70"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading…
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Load more
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
