import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getSlidesTree,
  getMarkdownContent,
  getAllSlideParams,
  getPrevNext,
  getFileModificationTime,
} from "@/lib/slides";
import { getHeadings, stripFirstMatchingHeading } from "@/lib/markdown-utils";
import { calculateReadingTime, formatReadingTime } from "@/lib/reading-time";
import { MarkdownContent } from "@/components/markdown-content";
import { OnThisPage } from "@/components/on-this-page";
import { DocNav } from "@/components/doc-nav";
import { Breadcrumb } from "@/components/breadcrumb";
import { ReadingProgress } from "@/components/reading-progress";
import { ShareButtons } from "@/components/share-buttons";
import { RelatedArticles } from "@/components/related-articles";
import { getBlogsList } from "@/lib/blogs";
import { Folder, Clock, Calendar } from "lucide-react";

type PageProps = {
  params: Promise<{ folder: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllSlideParams().map(({ folder, slug }) => ({
    folder,
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { folder, slug } = await params;
  const tree = getSlidesTree();
  const folderMeta = tree.find((f) => f.name === folder);
  const fileMeta = folderMeta?.files.find((f) => f.slug === slug);
  const title = fileMeta?.title ?? slug;
  return { title: `${title} | DecypherLabs Docs` };
}

export default async function DocPage({ params }: PageProps) {
  const { folder, slug } = await params;
  const rawContent = getMarkdownContent(folder, slug);
  if (rawContent === null) notFound();

  const tree = getSlidesTree();
  const blogs = getBlogsList();
  const folderMeta = tree.find((f) => f.name === folder);
  const fileMeta = folderMeta?.files.find((f) => f.slug === slug);
  const pageTitle = fileMeta?.title ?? slug;

  const content = stripFirstMatchingHeading(rawContent, pageTitle);
  const headings = getHeadings(content);
  const readingTime = calculateReadingTime(content);
  const lastUpdated = getFileModificationTime(folder, slug);

  const githubEditBase = "https://github.com/Decypher-Labs/docs/edit/main";
  const editHref = fileMeta?.filename
    ? `${githubEditBase}/slides/${folder}/${fileMeta.filename}`
    : null;

  const { prev, next } = getPrevNext(folder, slug);

  const firstDoc =
    tree[0]?.files[0] != null
      ? `/${tree[0].name}/${tree[0].files[0].slug}`
      : null;

  const pageUrl = `/${folder}/${slug}`;

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
                      { label: "Docs", href: firstDoc ?? "/" },
                      {
                        label: folderMeta?.title ?? folder,
                        href:
                          folderMeta?.files[0] != null
                            ? `/${folder}/${folderMeta.files[0].slug}`
                            : undefined,
                      },
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
              </header>
              <MarkdownContent content={content} />
              <ShareButtons title={pageTitle} url={pageUrl} />
              <RelatedArticles
                currentFolder={folder}
                currentSlug={slug}
                tree={tree}
                blogs={blogs}
              />
              <DocNav prev={prev} next={next} />
            </div>
          </article>
          <aside className="hidden w-64 shrink-0 xl:block">
            <OnThisPage headings={headings} editHref={editHref} />
          </aside>
        </div>
      </div>
    </>
  );
}
