"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { SlideFolder } from "@/lib/slides";
import { getDocPrettyUrl } from "@/lib/doc-pretty-url";
import { Tooltip } from "@/components/tooltip";
import { DocCardBanner } from "@/components/doc-card-banner";

type DocsListProps = {
  folders: SlideFolder[];
};

function getAllKeywords(folders: SlideFolder[]): string[] {
  const set = new Set<string>();
  for (const f of folders) {
    for (const k of f.keywords ?? []) {
      if (k.trim()) set.add(k.trim());
    }
  }
  return Array.from(set).sort();
}

export function DocsList({ folders }: DocsListProps) {
  const [keywordFilter, setKeywordFilter] = useState<string | null>(null);

  const allKeywords = useMemo(() => getAllKeywords(folders), [folders]);
  const filtered = useMemo(() => {
    if (!keywordFilter) return folders;
    return folders.filter(
      (f) => f.keywords?.some((k) => k.toLowerCase() === keywordFilter.toLowerCase())
    );
  }, [folders, keywordFilter]);

  return (
    <>
      {allKeywords.length > 0 && (
        <div className="filter-tabs-scroll mb-6 pb-1">
          <div className="flex min-w-0 flex-nowrap items-center gap-2">
            <span className="shrink-0 text-sm font-medium text-muted-foreground">Filter:</span>
            <button
              type="button"
              onClick={() => setKeywordFilter(null)}
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
              onClick={() => setKeywordFilter(kw)}
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
          No docs match this filter.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((folder) => {
            const firstFile = folder.files[0];
            const href = firstFile
              ? getDocPrettyUrl(folder.name, firstFile.slug)
              : "#";
            return (
              <Link
                key={folder.name}
                href={href}
                className="content-card glass-panel flex flex-col overflow-hidden rounded-2xl border border-border/50 shadow-sm"
              >
                <DocCardBanner title={folder.title} slug={folder.name} />
                <div className="flex min-w-0 flex-col gap-2 p-6">
                  <div className="min-w-0 overflow-hidden">
                    <Tooltip content={folder.title} side="top">
                      <h2 className="truncate text-lg font-semibold text-foreground">
                        {folder.title}
                      </h2>
                    </Tooltip>
                  </div>
                  {folder.keywords && folder.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {folder.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                  {folder.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {folder.description}
                    </p>
                  )}
                  <span className="mt-1 text-sm font-medium text-primary">
                    Open docs →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
