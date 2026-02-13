import Link from "next/link";
import { getSlidesTree } from "@/lib/slides";
import { BookOpen, Code2, Server, Youtube, FileText, ArrowRight } from "lucide-react";

export default function HomePage() {
  const tree = getSlidesTree();
  const firstFolder = tree[0];
  const firstFile = firstFolder?.files[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-6 md:py-8 lg:px-8">
      {/* Hero: centered in viewport (x and y) */}
      <section className="flex min-h-[calc(55vh-3.5rem)] flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary sm:text-sm">
          <Youtube className="h-4 w-4" />
          DevOps &amp; Development — learn by doing
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Welcome to{" "}
          <span className="font-brand font-semibold">Decypher</span>
          <span className="text-primary font-medium">Labs</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Tutorials, docs, and blogs for DevOps and software development. Watch on YouTube and use this site for written guides and references.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {firstFile && firstFolder ? (
            <Link
              href={`/${firstFolder.name}/${firstFile.slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <FileText className="h-4 w-4" />
              Start with docs
            </Link>
          ) : null}
          <a
            href="https://youtube.com/@decypherlabs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted/60 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <Youtube className="h-4 w-4" />
            Watch on YouTube
          </a>
        </div>
      </section>

      {/* Two pillars */}
      <section className="mt-16 grid gap-6 sm:grid-cols-2">
        <div className="glass-panel rounded-2xl border border-border/50 p-6 shadow-lg transition-all hover:border-primary/30 hover:shadow-xl sm:p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Server className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-foreground">DevOps</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Containers, CI/CD, Kubernetes, and cloud. Step-by-step guides you can run locally or in the cloud.
          </p>
          <Link
            href={firstFile && firstFolder ? `/${firstFolder.name}/${firstFile.slug}` : "#"}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Browse DevOps docs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="glass-panel rounded-2xl border border-border/50 p-6 shadow-lg transition-all hover:border-primary/30 hover:shadow-xl sm:p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Code2 className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-foreground">Development</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Backend, APIs, and tooling. Code-along sessions and written references to level up your workflow.
          </p>
          <Link
            href={firstFile && firstFolder ? `/${firstFolder.name}/${firstFile.slug}` : "#"}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Browse dev docs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Quick start card */}
      <section className="mt-12">
        <div className="glass-panel rounded-2xl border border-border/50 p-6 shadow-lg sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Docs &amp; blogs</h2>
              <p className="text-sm text-muted-foreground">
                Use the sidebar to jump to any doc topic. Each page has an “On this page” menu for quick navigation. Blogs are full-width reads.
              </p>
            </div>
          </div>
          {(!firstFile || !firstFolder) && (
            <p className="mt-4 rounded-xl border border-dashed border-border bg-muted/50 p-4 text-sm text-muted-foreground">
              Add a <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">slides/</code> folder
              with subfolders and <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">.md</code> files
              to see them in the sidebar.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
