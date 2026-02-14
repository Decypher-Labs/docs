import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type DocNavProps = {
  prev: { folder: string; slug: string; title: string } | null;
  next: { folder: string; slug: string; title: string } | null;
  /** e.g. "/courses" for course lesson pages; omit for docs */
  basePath?: string;
  /** For doc pages: (folder, slug) => pretty href; used when basePath is not set */
  buildDocHref?: (folder: string, slug: string) => string;
};

function buildHref(
  folder: string,
  slug: string,
  basePath?: string,
  buildDocHref?: (folder: string, slug: string) => string
) {
  if (basePath) return `${basePath}/${folder}/${slug}`;
  if (buildDocHref) return buildDocHref(folder, slug);
  return `/${folder}/${slug}`;
}

export function DocNav({ prev, next, basePath, buildDocHref }: DocNavProps) {
  return (
    <nav
      className="mt-8 flex flex-col gap-3 border-t border-border/60 pt-6 sm:flex-row sm:justify-between"
      aria-label="Document navigation"
    >
      <div className="min-w-0 flex-1">
        {prev ? (
          <Link
            href={buildHref(prev.folder, prev.slug, basePath, buildDocHref)}
            className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4 shrink-0" />
            <span className="min-w-0">
              <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground/80">
                Previous
              </span>
              <span className="block truncate font-medium">{prev.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
      </div>
      <div className="min-w-0 flex-1 text-right">
        {next ? (
          <Link
            href={buildHref(next.folder, next.slug, basePath, buildDocHref)}
            className="group ml-auto flex items-center justify-end gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <span className="min-w-0 text-right">
              <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground/80">
                Next
              </span>
              <span className="block truncate font-medium">{next.title}</span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0" />
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  );
}
