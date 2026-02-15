import { getBlogsList } from "@/lib/blogs";
import { BlogsList } from "@/components/blogs-list";

export default async function BlogsPage() {
  const posts = getBlogsList();

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
        <BlogsList posts={posts} />
      )}
    </div>
  );
}
