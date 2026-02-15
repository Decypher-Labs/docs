import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCourseBySlug,
  getGuideContent,
  getAllGuideParams,
  getGuidePrevNext,
  getGuideModificationTime,
  resolveGuideUrlSlug,
} from "@/lib/courses";
import { getHeadings, stripFirstMatchingHeading } from "@/lib/markdown-utils";
import { calculateReadingTime, formatReadingTime } from "@/lib/reading-time";
import { MarkdownContent } from "@/components/markdown-content";
import { OnThisPage } from "@/components/on-this-page";
import { DocNav } from "@/components/doc-nav";
import { Breadcrumb } from "@/components/breadcrumb";
import { ReadingProgress } from "@/components/reading-progress";
import { ShareButtons } from "@/components/share-buttons";
import { ReactionButtons } from "@/components/reaction-buttons";
import { Clock, Calendar } from "lucide-react";

type PageProps = {
  params: Promise<{ course: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllGuideParams().map(({ course, slug }) => ({ course, slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { course, slug: urlSlug } = await params;
  const courseMeta = getCourseBySlug(course);
  const fileMeta = courseMeta?.files.find((f) => f.slug === urlSlug);
  const title = fileMeta?.title ?? urlSlug;
  return { title: `${title} | DecypherLabs Guides` };
}

export default async function GuidePage({ params }: PageProps) {
  const { course: courseSlug, slug: urlSlug } = await params;
  const resolved = resolveGuideUrlSlug(courseSlug, urlSlug);
  if (!resolved) notFound();

  const { fileSlug } = resolved;
  const rawContent = getGuideContent(courseSlug, fileSlug);
  if (rawContent === null) notFound();

  const courseMeta = getCourseBySlug(courseSlug);
  if (!courseMeta) notFound();
  const fileMeta = courseMeta.files.find((f) => f.slug === urlSlug);
  const pageTitle = fileMeta?.title ?? urlSlug;

  const content = stripFirstMatchingHeading(rawContent, pageTitle);
  const headings = getHeadings(content);
  const readingTime = calculateReadingTime(content);
  const lastUpdated = getGuideModificationTime(courseSlug, fileSlug);

  const { prev, next } = getGuidePrevNext(courseSlug, urlSlug);
  const prevDoc = prev ? { folder: prev.course, slug: prev.slug, title: prev.title } : null;
  const nextDoc = next ? { folder: next.course, slug: next.slug, title: next.title } : null;

  const firstFile = courseMeta.files[0];
  const courseHref = firstFile
    ? `/courses/${courseSlug}/${firstFile.slug}`
    : `/courses/${courseSlug}`;
  const pageUrl = `/courses/${courseSlug}/${urlSlug}`;

  return (
    <>
      <ReadingProgress />
      <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-6 lg:px-4">
        <div className="flex gap-3 sm:gap-4">
          <article className="min-w-0 flex-1 max-w-4xl">
            <div className="glass-panel rounded-2xl border border-border/50 p-6 shadow-lg sm:p-8 md:p-10">
              <header className="mb-8 border-b border-border/60 pb-6">
                <div className="hidden md:block">
                  <Breadcrumb
                    items={[
                      { label: "Courses", href: "/courses" },
                      { label: courseMeta.title, href: courseHref },
                      { label: pageTitle },
                    ]}
                  />
                </div>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                  {pageTitle}
                </h1>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground sm:gap-4 sm:text-sm">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span>{formatReadingTime(readingTime)}</span>
                  </div>
                  {lastUpdated && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span>
                        Updated {lastUpdated.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  )}
                </div>
                {courseMeta.keywords && courseMeta.keywords.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {courseMeta.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </header>
              <MarkdownContent content={content} />
              <ReactionButtons />
              <ShareButtons title={pageTitle} url={pageUrl} />
              <DocNav prev={prevDoc} next={nextDoc} basePath="/courses" />
            </div>
          </article>
          <aside className="hidden w-64 shrink-0 xl:block">
            <OnThisPage headings={headings} />
          </aside>
        </div>
      </div>
    </>
  );
}
