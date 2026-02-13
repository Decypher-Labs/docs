import Link from "next/link";
import { FileText, BookOpen } from "lucide-react";
import type { SlideFolder } from "@/lib/slides";
import type { BlogPost } from "@/lib/blogs";

type RelatedArticlesProps = {
  currentFolder: string;
  currentSlug: string;
  tree: SlideFolder[];
  blogs: BlogPost[];
  maxItems?: number;
};

export function RelatedArticles({
  currentFolder,
  currentSlug,
  tree,
  blogs,
  maxItems = 3,
}: RelatedArticlesProps) {
  // If currentFolder is empty, it's a blog post
  const isBlogPost = !currentFolder;

  let related: Array<{ title: string; href: string; type: "doc" | "blog" }> = [];

  if (isBlogPost) {
    // For blog posts, show other blogs first, then docs
    const otherBlogs = blogs
      .filter((b) => b.slug !== currentSlug)
      .slice(0, maxItems)
      .map((blog) => ({
        title: blog.title,
        href: `/blogs/${blog.slug}`,
        type: "blog" as const,
      }));

    const docs = tree
      .flatMap((folder) =>
        folder.files.slice(0, 2).map((file) => ({
          title: file.title,
          href: `/${folder.name}/${file.slug}`,
          type: "doc" as const,
        }))
      )
      .slice(0, maxItems - otherBlogs.length);

    related = [...otherBlogs, ...docs].slice(0, maxItems);
  } else {
    // For docs, show same folder docs first, then other docs, then blogs
    const currentFolderData = tree.find((f) => f.name === currentFolder);
    const sameFolderDocs =
      currentFolderData?.files
        .filter((f) => f.slug !== currentSlug)
        .slice(0, maxItems)
        .map((file) => ({
          title: file.title,
          href: `/${currentFolder}/${file.slug}`,
          type: "doc" as const,
        })) || [];

    const otherDocs = tree
      .filter((f) => f.name !== currentFolder)
      .flatMap((folder) =>
        folder.files.slice(0, 2).map((file) => ({
          title: file.title,
          href: `/${folder.name}/${file.slug}`,
          type: "doc" as const,
        }))
      )
      .slice(0, maxItems - sameFolderDocs.length);

    const recentBlogs = blogs
      .slice(0, maxItems - sameFolderDocs.length - otherDocs.length)
      .map((blog) => ({
        title: blog.title,
        href: `/blogs/${blog.slug}`,
        type: "blog" as const,
      }));

    related = [...sameFolderDocs, ...otherDocs, ...recentBlogs].slice(0, maxItems);
  }

  if (related.length === 0) return null;

  return (
    <div className="mt-12 border-t border-border/60 pt-8">
      <h2 className="mb-4 text-lg font-semibold text-foreground">Related articles</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-lg border border-border/50 bg-card p-4 transition-all hover:border-primary/40 hover:bg-muted/30 hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {item.type === "blog" ? (
                  <FileText className="h-4 w-4" />
                ) : (
                  <BookOpen className="h-4 w-4" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground group-hover:text-primary">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.type === "blog" ? "Blog" : "Documentation"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
