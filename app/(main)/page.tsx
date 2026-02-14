import Link from "next/link";
import { getSlidesTree, getDocPrettyUrl } from "@/lib/slides";
import { BookOpen, Code2, Youtube, FileText, ArrowRight } from "lucide-react";
import { GithubFollowLink } from "@/components/github-follow-link";

export default function HomePage() {
  const tree = getSlidesTree();
  const firstFolder = tree[0];
  const firstFile = firstFolder?.files[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-6 md:py-8 lg:px-8">
      {/* Hero: centered in viewport (x and y), full height on mobile for true center */}
      <section className="flex min-h-[calc(70vh-3.5rem)] flex-col items-center justify-center text-center sm:min-h-[calc(60vh-3.5rem)]">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary sm:text-sm">
          <Youtube className="h-4 w-4" />
          DevOps &amp; Development — learn by doing
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Welcome to{" "}
          <span className="inline-block text-4xl font-bold sm:inline sm:text-4xl sm:font-bold md:text-5xl">
            <span className="font-brand">Decypher</span>
            <span className="text-primary">Labs</span>
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Tutorials, docs, and blogs for DevOps and software development. Learn by doing — on YouTube and right here.
        </p>
        <div className="mt-8 flex w-full flex-nowrap items-stretch justify-center gap-2 sm:flex-wrap sm:gap-4">
          <GithubFollowLink variant="button" className="min-w-0 flex-1 justify-center px-3 py-2 text-xs sm:flex-initial sm:px-4 sm:py-2.5 sm:text-sm" />
          <a
            href="https://youtube.com/@decypherlabs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border border-transparent bg-white px-3 py-2 text-xs font-medium text-slate-900 shadow-sm transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100 sm:flex-initial sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <Youtube className="h-4 w-4 shrink-0" />
            <span>Watch on YouTube</span>
          </a>
        </div>
      </section>

      {/* What's here: list style, not cards */}
      <section className="mt-20 border-t border-border/60 px-4 pt-16 sm:px-0">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          What&apos;s here
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Everything in one place. Pick what you need.
        </p>
        <ul className="mt-8 divide-y divide-border/60">
          <li>
            <Link
              href={firstFile && firstFolder ? getDocPrettyUrl(firstFolder.name, firstFile.slug) : "/"}
              className="flex flex-col gap-1 py-5 transition-colors hover:text-primary sm:flex-row sm:items-center sm:justify-between sm:py-6"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <span className="font-semibold text-foreground">Docs</span>
                  <p className="text-sm text-muted-foreground">
                    Reference guides and slides — Docker, Kubernetes, and more. Copy, run, learn.
                  </p>
                </div>
              </div>
              <span className="mt-1 flex items-center gap-1 text-sm font-medium text-primary sm:mt-0">
                Open docs
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/courses"
              className="flex flex-col gap-1 py-5 transition-colors hover:text-primary sm:flex-row sm:items-center sm:justify-between sm:py-6"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </span>
                <div>
                  <span className="font-semibold text-foreground">Courses</span>
                  <p className="text-sm text-muted-foreground">
                    Step-by-step paths (HTML, CSS, and more). Build as you go.
                  </p>
                </div>
              </div>
              <span className="mt-1 flex items-center gap-1 text-sm font-medium text-primary sm:mt-0">
                View courses
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/blogs"
              className="flex flex-col gap-1 py-5 transition-colors hover:text-primary sm:flex-row sm:items-center sm:justify-between sm:py-6"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Code2 className="h-5 w-5" />
                </span>
                <div>
                  <span className="font-semibold text-foreground">Blogs</span>
                  <p className="text-sm text-muted-foreground">
                    Articles and how-tos — deep dives and practical tips.
                  </p>
                </div>
              </div>
              <span className="mt-1 flex items-center gap-1 text-sm font-medium text-primary sm:mt-0">
                Read blogs
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </li>
        </ul>
      </section>

      {/* Open source CTA — single card */}
      <section className="mt-20">
        <div className="glass-panel rounded-2xl border border-border/50 p-8 text-center shadow-lg sm:p-10">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            Open source &amp; community
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            We&apos;re open source. Follow us on GitHub for updates — and star the repo if it helps you out.
          </p>
          <div className="mt-6 flex w-full flex-nowrap items-stretch justify-center gap-2 sm:flex-wrap sm:gap-4">
            <GithubFollowLink variant="button" className="min-w-0 flex-1 justify-center px-3 py-2 text-xs sm:flex-initial sm:px-4 sm:py-2.5 sm:text-sm" />
            <a
              href="https://youtube.com/@decypherlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border border-transparent bg-white px-3 py-2 text-xs font-medium text-slate-900 shadow-sm transition-all hover:bg-gray-100 dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100 sm:flex-initial sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              <Youtube className="h-4 w-4 shrink-0" />
              <span>Watch on YouTube</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
