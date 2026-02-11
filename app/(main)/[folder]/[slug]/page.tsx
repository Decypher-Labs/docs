import { notFound } from "next/navigation";
import { getSlidesTree, getMarkdownContent, getAllSlideParams } from "@/lib/slides";
import { MarkdownContent } from "@/components/markdown-content";

type PageProps = {
  params: Promise<{ folder: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllSlideParams().map(({ folder, slug }) => ({
    folder,
    slug,
  }));
}

export default async function DocPage({ params }: PageProps) {
  const { folder, slug } = await params;
  const content = getMarkdownContent(folder, slug);
  if (content === null) notFound();

  const tree = getSlidesTree();
  const folderMeta = tree.find((f) => f.name === folder);
  const fileMeta = folderMeta?.files.find((f) => f.slug === slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <header className="mb-8 border-b border-border pb-6">
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl">
          {fileMeta?.title ?? slug}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{folderMeta?.title}</p>
      </header>
      <MarkdownContent content={content} />
    </article>
  );
}
