import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBlogsList,
  getBlogContent,
  getAllBlogSlugs,
  getBlogModificationTime,
} from "@/lib/blogs";
import { getHeadings, stripFirstMatchingHeading } from "@/lib/markdown-utils";
import { calculateReadingTime, formatReadingTime } from "@/lib/reading-time";
import { MarkdownContent } from "@/components/markdown-content";
import { OnThisPage } from "@/components/on-this-page";
import { Breadcrumb } from "@/components/breadcrumb";
import { ReadingProgress } from "@/components/reading-progress";
import { ShareButtons } from "@/components/share-buttons";
import { ReactionButtons } from "@/components/reaction-buttons";
import { RelatedArticles } from "@/components/related-articles";
import { getSlidesTree } from "@/lib/slides";
import { Clock, Calendar } from "lucide-react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const list = getBlogsList();
  const post = list.find((p) => p.slug === slug);
  const title = post?.title ?? slug;
  return { title: `${title} | DecypherLabs Blog` };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const rawContent = getBlogContent(slug);
  if (rawContent === null) notFound();

  const list = getBlogsList();
  const tree = getSlidesTree();
  const post = list.find((p) => p.slug === slug);
  const title = post?.title ?? slug;

  const content = stripFirstMatchingHeading(rawContent, title);
  const headings = getHeadings(content);
  const readingTime = calculateReadingTime(content);
  const lastUpdated = getBlogModificationTime(slug);

  const pageUrl = `/blogs/${slug}`;

  return (
    <>
      <ReadingProgress />
      <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
        <div className="flex gap-3 sm:gap-4">
          <article className="min-w-0 flex-1">
            <div className="glass-panel rounded-2xl border border-border/50 p-6 shadow-lg sm:p-8 md:p-10">
              <div className="hidden md:block mb-4">
                <Breadcrumb
                  items={[
                    { label: "Blogs", href: "/blogs" },
                    { label: title },
                  ]}
                />
              </div>
              <header className="mb-8 border-b border-border/60 pb-6">
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                  {title}
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
                {post?.keywords && post.keywords.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {post.keywords.map((kw) => (
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
              <ShareButtons title={title} url={pageUrl} />
              <RelatedArticles
                currentFolder=""
                currentSlug={slug}
                tree={tree}
                blogs={list}
              />
            </div>
          </article>
          <aside className="hidden w-52 shrink-0 xl:block">
            <OnThisPage headings={headings} />
          </aside>
        </div>
      </div>
    </>
  );
}
