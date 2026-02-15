import type { Metadata } from "next";
import { getCoursesTree } from "@/lib/courses";
import { CoursesList } from "@/components/courses-list";

export const metadata: Metadata = {
  title: "Courses | DecypherLabs",
  description: "Structured courses: HTML, CSS, and more.",
};

export default async function CoursesPage() {
  const courses = getCoursesTree();

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
          <p className="text-sm text-muted-foreground">Admin will add courses here soon. Thanks for your patience.</p>
        </div>
      ) : (
        <CoursesList courses={courses} />
      )}
    </div>
  );
}
