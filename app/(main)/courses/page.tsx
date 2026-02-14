import type { Metadata } from "next";
import Link from "next/link";
import { getCoursesTree } from "@/lib/courses";
import { BookOpen } from "lucide-react";
import { CourseCardBanner } from "@/components/course-card-banner";

const INITIAL = 6;
const LOAD_MORE = 3;

export const metadata: Metadata = {
  title: "Courses | DecypherLabs",
  description: "Structured courses: HTML, CSS, and more.",
};

type Props = { searchParams: Promise<{ count?: string }> };

export default async function CoursesPage({ searchParams }: Props) {
  const courses = getCoursesTree();
  const countParam = (await searchParams).count;
  const visible = Math.min(
    Math.max(parseInt(countParam ?? "", 10) || INITIAL, INITIAL),
    courses.length
  );
  const toShow = courses.slice(0, visible);
  const hasMore = visible < courses.length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Courses
        </h1>
        <p className="mt-2 text-muted-foreground">
          Step-by-step guides by topic. Pick a course and follow the pages in order.
        </p>
      </header>
      {courses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center text-muted-foreground">
          <p>No courses yet. Add folders under <code className="rounded bg-muted px-1">static/courses/</code> (e.g. <code className="rounded bg-muted px-1">01_html</code>) with <code className="rounded bg-muted px-1">.md</code> files.</p>
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
                    <div className="flex items-center gap-2">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <h2 className="text-lg font-semibold text-foreground">{course.title}</h2>
                    </div>
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
              <Link
                href={`/courses?count=${visible + LOAD_MORE}`}
                className="rounded-xl border border-border bg-muted/50 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Load more
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
