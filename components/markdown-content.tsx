"use client";

import { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
            return <h2 id={slugify(text)}>{children}</h2>;
          },
          h3({ children }) {
            const text = getTextFromChildren(children);
            return <h3 id={slugify(text)}>{children}</h3>;
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
