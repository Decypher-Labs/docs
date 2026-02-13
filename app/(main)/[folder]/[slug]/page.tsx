import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSlidesTree, getMarkdownContent, getAllSlideParams, getPrevNext } from "@/lib/slides";
import { getHeadings, stripFirstMatchingHeading } from "@/lib/markdown-utils";
import { MarkdownContent } from "@/components/markdown-content";
import { OnThisPage } from "@/components/on-this-page";
import { DocNav } from "@/components/doc-nav";
import { Folder } from "lucide-react";

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
  const folderMeta = tree.find((f) => f.name === folder);
  const fileMeta = folderMeta?.files.find((f) => f.slug === slug);
  const pageTitle = fileMeta?.title ?? slug;

  const content = stripFirstMatchingHeading(rawContent, pageTitle);
  const headings = getHeadings(content);

  const githubEditBase = "https://github.com/Decypher-Labs/docs/edit/main";
  const editHref = fileMeta?.filename
    ? `${githubEditBase}/slides/${folder}/${fileMeta.filename}`
    : null;

  const { prev, next } = getPrevNext(folder, slug);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-6 lg:px-4">
      <div className="flex gap-3 sm:gap-4">
        <article className="min-w-0 flex-1">
          <div className="glass-panel rounded-2xl border border-border/50 p-6 shadow-lg sm:p-8 md:p-10">
            <header className="mb-8 border-b border-border/60 pb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Folder className="h-4 w-4" />
                <span>{folderMeta?.title}</span>
              </div>
              <h1 className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl">
                {pageTitle}
              </h1>
            </header>
            <MarkdownContent content={content} />
            <DocNav prev={prev} next={next} />
          </div>
        </article>
        <aside className="hidden w-52 shrink-0 xl:block">
          <OnThisPage headings={headings} editHref={editHref} />
        </aside>
      </div>
    </div>
  );
}
