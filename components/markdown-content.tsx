"use client";

import { useRef, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link2 } from "lucide-react";
import { slugify } from "@/lib/markdown-utils";
import { highlightAllInElement } from "@/lib/hljs-client";
import { CodeBlockWithCopy } from "@/components/code-block-with-copy";
import "highlight.js/styles/atom-one-dark.min.css";

type MarkdownContentProps = {
  content: string;
};

function getTextFromChildren(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(getTextFromChildren).join("");
  return "";
}

function HeadingWithLink({
  Tag,
  children,
  id,
}: {
  Tag: "h2" | "h3";
  children: React.ReactNode;
  id: string;
}) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const copyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}${pathname}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <Tag id={id} className="group/heading flex items-center gap-2">
      <span className="min-w-0 flex-1">{children}</span>
      <a
        href={`#${id}`}
        onClick={copyLink}
        className="shrink-0 rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-muted/60 hover:text-primary focus:opacity-100 focus:outline-none group-hover/heading:opacity-100"
        aria-label={copied ? "Link copied" : "Copy link to section"}
        title={copied ? "Copied!" : "Copy link"}
      >
        <Link2 className="h-4 w-4" />
      </a>
    </Tag>
  );
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    highlightAllInElement(containerRef.current);
  }, [content]);

  return (
    <div ref={containerRef} className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2({ children }) {
            const text = getTextFromChildren(children);
            const id = slugify(text);
            return (
              <HeadingWithLink Tag="h2" id={id}>
                {children}
              </HeadingWithLink>
            );
          },
          h3({ children }) {
            const text = getTextFromChildren(children);
            const id = slugify(text);
            return (
              <HeadingWithLink Tag="h3" id={id}>
                {children}
              </HeadingWithLink>
            );
          },
          pre({ children }) {
            return (
              <CodeBlockWithCopy>
                <pre>{children}</pre>
              </CodeBlockWithCopy>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
