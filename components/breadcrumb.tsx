import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-1 text-xs text-muted-foreground sm:gap-1.5 sm:text-sm">
        {items.map((item, i) => (
          <li key={i} className="flex min-w-0 items-center gap-1 sm:gap-1.5">
            {i > 0 && (
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60 sm:h-4 sm:w-4" aria-hidden />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="min-w-0 truncate transition-colors hover:text-foreground"
                title={item.label}
              >
                {item.label}
              </Link>
            ) : (
              <span className="min-w-0 truncate font-medium text-foreground" title={item.label}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
