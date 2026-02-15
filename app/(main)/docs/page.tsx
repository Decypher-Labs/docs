import type { Metadata } from "next";
import { getSlidesTree } from "@/lib/slides";
import { DocsList } from "@/components/docs-list";

export const metadata: Metadata = {
  title: "Docs | DecypherLabs",
  description: "Reference docs: Docker, Kubernetes, and more.",
};

export default async function DocsPage() {
  const tree = getSlidesTree();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Docs
        </h1>
        <p className="mt-2 text-muted-foreground">
          Reference guides and slides. Pick a topic to browse.
        </p>
      </header>
      {tree.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-12 text-center text-muted-foreground">
          Add folders under <code className="rounded bg-muted px-1">static/docs/</code> with{" "}
          <code className="rounded bg-muted px-1">.md</code> files to see them here.
        </div>
      ) : (
        <DocsList folders={tree} />
      )}
    </div>
  );
}
