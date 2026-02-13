import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogsList, getBlogContent, getAllBlogSlugs } from "@/lib/blogs";
import { getHeadings, stripFirstMatchingHeading } from "@/lib/markdown-utils";
import { MarkdownContent } from "@/components/markdown-content";
import { OnThisPage } from "@/components/on-this-page";
import { Breadcrumb } from "@/components/breadcrumb";

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
  const post = list.find((p) => p.slug === slug);
  const title = post?.title ?? slug;

  const content = stripFirstMatchingHeading(rawContent, title);
  const headings = getHeadings(content);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex gap-3 sm:gap-4">
        <article className="min-w-0 flex-1">
          <div className="glass-panel rounded-2xl border border-border/50 p-6 shadow-lg sm:p-8 md:p-10">
            <Breadcrumb
              items={[
                { label: "Blogs", href: "/blogs" },
                { label: title },
              ]}
            />
            <header className="mb-8 border-b border-border/60 pb-6">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                {title}
              </h1>
            </header>
            <MarkdownContent content={content} />
          </div>
        </article>
        <aside className="hidden w-52 shrink-0 xl:block">
          <OnThisPage headings={headings} />
        </aside>
      </div>
    </div>
  );
}
