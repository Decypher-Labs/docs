import Link from "next/link";
import { getBlogsList } from "@/lib/blogs";
import { FileText } from "lucide-react";
import { BlogCardBanner } from "@/components/blog-card-banner";

const INITIAL = 6;
const LOAD_MORE = 3;

type Props = { searchParams: Promise<{ count?: string }> };

export default async function BlogsPage({ searchParams }: Props) {
  const posts = getBlogsList();
  const countParam = (await searchParams).count;
  const visible = Math.min(
    Math.max(parseInt(countParam ?? "", 10) || INITIAL, INITIAL),
    posts.length
  );
  const toShow = posts.slice(0, visible);
  const hasMore = visible < posts.length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Blogs
        </h1>
        <p className="mt-2 text-muted-foreground">
          Articles and posts on DevOps, development, and more.
        </p>
      </header>
      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center text-muted-foreground">
          Add <code className="rounded bg-muted px-1">.md</code> files in{" "}
          <code className="rounded bg-muted px-1">static/blogs/</code> to see them here.
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {toShow.map((post) => (
              <Link
                key={post.slug}
                href={`/blogs/${post.slug}`}
                className="content-card glass-panel flex flex-col overflow-hidden rounded-2xl border border-border/50 shadow-sm"
              >
                <BlogCardBanner title={post.title} slug={post.slug} />
                <div className="flex flex-col gap-2 p-6">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                      <FileText className="h-4 w-4" />
                    </div>
                    <h2 className="text-lg font-semibold text-foreground">{post.title}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt ?? `Read: ${post.title}`}
                  </p>
                  <span className="mt-1 text-sm font-medium text-primary">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {hasMore && (
            <div className="mt-8 flex justify-center">
              <Link
                href={`/blogs?count=${visible + LOAD_MORE}`}
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
