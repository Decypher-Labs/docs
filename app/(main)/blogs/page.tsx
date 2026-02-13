import Link from "next/link";
import { getBlogsList } from "@/lib/blogs";
import { Breadcrumb } from "@/components/breadcrumb";
import { FileText } from "lucide-react";

export default function BlogsPage() {
  const posts = getBlogsList();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
      <Breadcrumb items={[{ label: "Blogs" }]} />
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
        Blogs
      </h1>
      <p className="mt-2 text-muted-foreground">
        Articles and posts on DevOps, development, and more.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {posts.length === 0 ? (
          <div className="col-span-full rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
            Add <code className="rounded bg-muted px-1.5 py-0.5 font-mono">.md</code> files in the{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono">blogs/</code> folder to see them here.
          </div>
        ) : (
          posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="glass-panel flex flex-col gap-2 rounded-xl border border-border/50 p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="h-4 w-4" />
                </div>
                <h2 className="font-semibold text-foreground">{post.title}</h2>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {post.excerpt ?? `Read: ${post.title}`}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
