"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import type { HeadingItem } from "@/lib/markdown-utils";

type OnThisPageProps = {
  headings: HeadingItem[];
  editHref?: string | null;
};

export function OnThisPage({ headings, editHref }: OnThisPageProps) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .map((e) => ({ id: e.target.id, top: e.boundingClientRect.top }));
        if (intersecting.length === 0) return;
        const topmost = intersecting.sort((a, b) => a.top - b.top)[0];
        setActiveId(topmost.id);
      },
      { rootMargin: "-80px 0% -70% 0%", threshold: 0 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname, headings]);

  return (
    <nav className="sticky top-20 shrink-0" aria-label="On this page">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On this page
      </p>
      {editHref && (
        <a
          href={editHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center gap-2 rounded-lg border border-border/60 bg-muted/40 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted/60 hover:text-primary"
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit this page on GitHub
        </a>
      )}
      {headings.length === 0 ? null : (
      <ul className="mt-3 space-y-1 border-l-2 border-border/60 pl-4">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li key={h.id}>
              <Link
                href={`${pathname}#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(h.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                    // Update URL without scrolling
                    window.history.pushState(null, "", `${pathname}#${h.id}`);
                  }
                }}
                className={`block rounded-r-md border-l-2 py-1.5 pl-3 pr-2 text-sm transition-[color,background-color,border-color] duration-300 hover:border-primary/50 hover:bg-muted/60 hover:text-primary hover:pl-4 ${
                  isActive
                    ? "border-primary bg-primary/10 font-medium text-primary"
                    : "border-transparent"
                }`}
                style={{ marginLeft: "-2px" }}
              >
                <span className={h.level === 3 && !isActive ? "text-muted-foreground" : ""}>
                  {h.text}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      )}
    </nav>
  );
}
