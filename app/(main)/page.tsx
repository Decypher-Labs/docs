import Link from "next/link";
import type { Metadata } from "next";
import { getSlidesTree, getDocPrettyUrl } from "@/lib/slides";
import { BookOpen, Code2, Youtube, FileText, ArrowRight, Zap, GraduationCap, Target } from "lucide-react";
import { GithubFollowLink } from "@/components/github-follow-link";

export const metadata: Metadata = {
  title: "DecypherLabs – Learn DevOps & Development | Tutorials, Docs & Courses",
  description:
    "Learn DevOps and software development by doing. Free tutorials, documentation, and step-by-step courses on Docker, Kubernetes, HTML, CSS and more. From the DecypherLabs YouTube channel.",
  openGraph: {
    title: "DecypherLabs – Learn DevOps & Development | Tutorials, Docs & Courses",
    description:
      "Learn DevOps and software development by doing. Free tutorials, docs, and courses on Docker, Kubernetes, HTML, CSS and more.",
  },
};

export default function HomePage() {
  const tree = getSlidesTree();
  const firstFolder = tree[0];
  const firstFile = firstFolder?.files[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-6 md:py-8 lg:px-8">
      {/* Hero: centered in viewport (x and y), full height on mobile for true center */}
      <section className="flex min-h-[calc(70vh-3.5rem)] flex-col items-center justify-center text-center sm:min-h-[calc(60vh-3.5rem)]">
        <div className="hero-pill-wrap relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary sm:text-sm">
          <Youtube className="h-4 w-4 shrink-0 animate-soft-pulse" />
          DevOps &amp; Development — learn by doing
          <span className="hero-pill-shine" aria-hidden />
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
            className="shine-on-hover inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border border-transparent bg-white px-3 py-2 text-xs font-medium text-slate-900 shadow-sm transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100 sm:flex-initial sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <Youtube className="h-4 w-4 shrink-0 animate-soft-pulse" />
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
              className="group flex flex-col gap-4 rounded-xl py-6 transition-all duration-200 hover:bg-muted/20 hover:text-primary sm:flex-row sm:items-center sm:justify-between sm:gap-1 sm:px-1 sm:py-6"
            >
              <div className="flex min-w-0 items-start gap-4 sm:items-center">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="h-5 w-5 animate-float-slow" />
                </span>
                <div className="min-w-0">
                  <span className="font-semibold text-foreground">Docs</span>
                  <p className="text-sm text-muted-foreground">
                    Reference guides and slides — Docker, Kubernetes, and more. Copy, run, learn.
                  </p>
                </div>
              </div>
              <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary self-end sm:self-auto">
                Open docs
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/courses"
              className="group flex flex-col gap-4 rounded-xl py-6 transition-all duration-200 hover:bg-muted/20 hover:text-primary sm:flex-row sm:items-center sm:justify-between sm:gap-1 sm:px-1 sm:py-6"
            >
              <div className="flex min-w-0 items-start gap-4 sm:items-center">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5 animate-float-slow" style={{ animationDelay: "0.5s" } as React.CSSProperties} />
                </span>
                <div className="min-w-0">
                  <span className="font-semibold text-foreground">Courses</span>
                  <p className="text-sm text-muted-foreground">
                    Step-by-step paths (HTML, CSS, and more). Build as you go.
                  </p>
                </div>
              </div>
              <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary self-end sm:self-auto">
                View courses
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/blogs"
              className="group flex flex-col gap-4 rounded-xl py-6 transition-all duration-200 hover:bg-muted/20 hover:text-primary sm:flex-row sm:items-center sm:justify-between sm:gap-1 sm:px-1 sm:py-6"
            >
              <div className="flex min-w-0 items-start gap-4 sm:items-center">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Code2 className="h-5 w-5 animate-float-slow" style={{ animationDelay: "1s" } as React.CSSProperties} />
                </span>
                <div className="min-w-0">
                  <span className="font-semibold text-foreground">Blogs</span>
                  <p className="text-sm text-muted-foreground">
                    Articles and how-tos — deep dives and practical tips.
                  </p>
                </div>
              </div>
              <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary self-end sm:self-auto">
                Read blogs
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </li>
        </ul>
      </section>

      {/* How to get started */}
      <section className="mt-20 border-t border-border/60 px-4 pt-16 sm:px-0">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          How to get started
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick the format that fits how you learn.
        </p>
        <ul className="mt-6 space-y-4 sm:mt-8">
          <li className="flex gap-4 rounded-xl border border-border/50 bg-card/50 p-4 transition-all duration-200 hover:scale-[1.01] hover:border-primary/30 hover:shadow-md sm:p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <GraduationCap className="h-5 w-5 animate-float-slow" />
            </span>
            <div>
              <span className="font-semibold text-foreground">New to a topic?</span>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Start with <Link href="/courses" className="text-primary hover:underline">Courses</Link> — step-by-step paths that build from basics. Follow along and build as you go.
              </p>
            </div>
          </li>
          <li className="flex gap-4 rounded-xl border border-border/50 bg-card/50 p-4 transition-all duration-200 hover:scale-[1.01] hover:border-primary/30 hover:shadow-md sm:p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="h-5 w-5 animate-float-slow" style={{ animationDelay: "0.3s" } as React.CSSProperties} />
            </span>
            <div>
              <span className="font-semibold text-foreground">Need a quick reference?</span>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Use <Link href={firstFile && firstFolder ? getDocPrettyUrl(firstFolder.name, firstFile.slug) : "/docs"} className="text-primary hover:underline">Docs</Link> — commands, configs, and concepts you can copy and run. Docker, Kubernetes, and more.
              </p>
            </div>
          </li>
          <li className="flex gap-4 rounded-xl border border-border/50 bg-card/50 p-4 transition-all duration-200 hover:scale-[1.01] hover:border-primary/30 hover:shadow-md sm:p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Code2 className="h-5 w-5 animate-float-slow" style={{ animationDelay: "0.6s" } as React.CSSProperties} />
            </span>
            <div>
              <span className="font-semibold text-foreground">Want a deep dive?</span>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Check <Link href="/blogs" className="text-primary hover:underline">Blogs</Link> — articles and how-tos with more context and practical tips.
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* What you get — value props */}
      <section className="mt-20 border-t border-border/60 px-4 pt-16 sm:px-0">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          What you get
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Practical learning, no fluff.
        </p>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2">
          <div className="flex gap-3 rounded-xl border border-border/50 bg-card/50 p-4 transition-all duration-200 hover:scale-[1.02] hover:border-primary/30 hover:shadow-md">
            <Target className="h-5 w-5 shrink-0 text-primary animate-float-slow" />
            <div>
              <span className="font-medium text-foreground">Problem → use case</span>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Every topic is taught around a real problem statement and ends with a use case you can apply — so you learn something that actually solves a need, not just theory.
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-xl border border-border/50 bg-card/50 p-4 transition-all duration-200 hover:scale-[1.02] hover:border-primary/30 hover:shadow-md">
            <Zap className="h-5 w-5 shrink-0 text-primary animate-float-slow" style={{ animationDelay: "0.4s" } as React.CSSProperties} />
            <div>
              <span className="font-medium text-foreground">Learn by doing</span>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Run commands and build things as you read. No passive watching.
              </p>
            </div>
          </div>
          <div className="flex gap-3 rounded-xl border border-border/50 bg-card/50 p-4 transition-all duration-200 hover:scale-[1.01] hover:border-primary/30 hover:shadow-md sm:col-span-2">
            <Youtube className="h-5 w-5 shrink-0 text-primary animate-soft-pulse" />
            <div>
              <span className="font-medium text-foreground">Free &amp; from the channel</span>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Everything here is free and open source. Same content you get on our <a href="https://youtube.com/@decypherlabs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">YouTube channel</a> — plus structured docs and courses you can use at your own pace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open source CTA — single card */}
      <section className="mt-20">
        <div className="glass-panel rounded-2xl border border-border/50 p-8 text-center shadow-lg transition-all duration-300 hover:border-primary/30 hover:shadow-xl sm:p-10">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            Open source &amp; community
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
            We&apos;re open source. Follow us on GitHub for updates — and star the repo if it helps you out.
          </p>
          <div className="mt-6 flex w-full flex-col gap-2 sm:flex-row sm:flex-nowrap sm:items-stretch sm:justify-center sm:gap-4">
            <GithubFollowLink variant="button" className="w-full justify-center px-3 py-2 text-xs sm:w-auto sm:flex-initial sm:px-4 sm:py-2.5 sm:text-sm" />
            <a
              href="https://youtube.com/@decypherlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="shine-on-hover inline-flex w-full items-center justify-center gap-2 rounded-xl border border-transparent bg-white px-3 py-2 text-xs font-medium text-slate-900 shadow-sm transition-all hover:bg-gray-100 dark:bg-white dark:text-slate-900 dark:hover:bg-gray-100 sm:w-auto sm:flex-initial sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              <Youtube className="h-4 w-4 shrink-0 animate-soft-pulse" />
              <span>Watch on YouTube</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
