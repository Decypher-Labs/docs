import Link from "next/link";
import { getSlidesTree } from "@/lib/slides";
import { getBlogsList } from "@/lib/blogs";
import { getCoursesTree } from "@/lib/courses";
import { AppShell } from "@/components/app-shell";
import { Home, BookOpen } from "lucide-react";

export default function NotFound() {
  const tree = getSlidesTree();
  const blogs = getBlogsList();
  const courses = getCoursesTree();

  return (
    <AppShell tree={tree} blogs={blogs} courses={courses} hideSidebar>
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 py-16">
        <div className="glass-panel w-full max-w-lg rounded-2xl border border-border/50 p-10 shadow-lg sm:p-12">
          {/* Decorative 404 */}
          <div className="relative flex justify-center">
            <span
              className="font-display text-[8rem] font-bold leading-none tracking-tighter text-primary/20 sm:text-[10rem]"
              style={{ fontFamily: "var(--font-display), var(--font-sans), sans-serif" }}
              aria-hidden
            >
              404
            </span>
          </div>
          <div className="-mt-6 text-center sm:-mt-8">
            <h1 className="font-brand text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Page not found
            </h1>
            <p className="mt-3 text-muted-foreground sm:text-lg">
              This page wandered off. Maybe it&apos;s learning something new.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/"
              className="shine-on-hover inline-flex items-center justify-center gap-2 rounded-xl border border-primary bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <Home className="h-4 w-4 shrink-0" />
              Back to Home
            </Link>
            <Link
              href={tree[0]?.files[0] ? `/docs` : "/courses"}
              className="shine-on-hover inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-muted/60 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <BookOpen className="h-4 w-4 shrink-0" />
              {tree[0]?.files[0] ? "Browse Docs" : "Browse Courses"}
            </Link>
          </div>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Try the <kbd className="rounded border border-border/60 bg-muted/50 px-1.5 py-0.5 font-mono text-[10px]">⌘K</kbd> search to find what you need.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
