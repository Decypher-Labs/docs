import Link from "next/link";
import { getSlidesTree } from "@/lib/slides";

export default function HomePage() {
  const tree = getSlidesTree();
  const firstFolder = tree[0];
  const firstFile = firstFolder?.files[0];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8">
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Welcome to Decypher Docs
      </h1>
      <p className="mt-3 text-muted-foreground">
        Pick a topic from the sidebar or start with the first slide below.
      </p>
      {firstFile && firstFolder ? (
        <Link
          href={`/${firstFolder.name}/${firstFile.slug}`}
          className="mt-6 inline-flex items-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          Start reading: {firstFile.title}
        </Link>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground">
          Add a <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">slides/</code> folder
          with subfolders and <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">.md</code> files
          to see them here.
        </p>
      )}
    </div>
  );
}
