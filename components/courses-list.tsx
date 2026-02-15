"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BookOpen, ChevronDown, Loader2 } from "lucide-react";
import type { Course } from "@/lib/courses";
import { CourseCardBanner } from "@/components/course-card-banner";
import { Tooltip } from "@/components/tooltip";

const INITIAL = 6;
const LOAD_MORE = 3;
const LOAD_MORE_DELAY_MS = 1000;

type CoursesListProps = {
  courses: Course[];
};

function getAllKeywords(courses: Course[]): string[] {
  const set = new Set<string>();
  for (const c of courses) {
    for (const k of c.keywords ?? []) {
      if (k.trim()) set.add(k.trim());
    }
  }
  return Array.from(set).sort();
}

export function CoursesList({ courses }: CoursesListProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL);
  const [keywordFilter, setKeywordFilter] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const allKeywords = useMemo(() => getAllKeywords(courses), [courses]);
  const filtered = useMemo(() => {
    if (!keywordFilter) return courses;
    return courses.filter(
      (c) => c.keywords?.some((k) => k.toLowerCase() === keywordFilter.toLowerCase())
    );
  }, [courses, keywordFilter]);
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
          No courses match this filter.
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {toShow.map((course) => {
              const firstFile = course.files[0];
              const href = firstFile
                ? `/courses/${course.slug}/${firstFile.slug}`
                : `/courses/${course.slug}`;
              return (
                <Link
                  key={course.slug}
                  href={href}
                  className="content-card glass-panel flex flex-col overflow-hidden rounded-2xl border border-border/50 shadow-sm"
                >
                  <CourseCardBanner title={course.title} slug={course.slug} />
                  <div className="flex flex-col gap-2 p-6">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1 overflow-hidden">
                        <Tooltip content={course.title} side="top">
                          <h2 className="truncate text-lg font-semibold text-foreground">
                            {course.title}
                          </h2>
                        </Tooltip>
                      </div>
                    </div>
                    {course.keywords && course.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {course.keywords.map((kw) => (
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
                      {course.description}
                    </p>
                    <span className="mt-1 text-sm font-medium text-primary">
                      Start course →
                    </span>
                  </div>
                </Link>
              );
            })}
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
