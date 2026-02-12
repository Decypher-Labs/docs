"use client";

import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

type CodeBlockWithCopyProps = {
  children: React.ReactNode;
};

export function CodeBlockWithCopy({ children }: CodeBlockWithCopyProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    const code = wrapperRef.current?.querySelector("code");
    if (!code) return;
    navigator.clipboard.writeText(code.textContent ?? "").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div ref={wrapperRef} className="group/code relative">
      <button
        type="button"
        onClick={copy}
        className="absolute right-2 top-2 z-10 flex items-center gap-1.5 rounded-md border border-border bg-card/90 px-2.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur-sm transition-all hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring opacity-0 group-hover/code:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-primary" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Copy
          </>
        )}
      </button>
      {children}
    </div>
  );
}
