"use client";

import { useState } from "react";
import { Twitter, Linkedin, Link2, Check } from "lucide-react";

type ShareButtonsProps = {
  title: string;
  url: string;
};

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const fullUrl = typeof window !== "undefined" ? window.location.origin + url : url;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(fullUrl);

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      "_blank",
      "width=550,height=420"
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      "_blank",
      "width=550,height=420"
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  return (
    <section className="mt-8 border-t border-border/60 pt-6" aria-label="Share">
      <h2 className="mb-4 text-lg font-semibold text-foreground">Share this article</h2>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={shareToTwitter}
          className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground hover:border-primary/40"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
          <span className="hidden sm:inline">Twitter</span>
        </button>
        <button
          onClick={shareToLinkedIn}
          className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground hover:border-primary/40"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
          <span className="hidden sm:inline">LinkedIn</span>
        </button>
        <button
          onClick={copyLink}
          className="flex items-center gap-1.5 rounded-lg border border-border/60 bg-card px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground hover:border-primary/40"
          aria-label="Copy link"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-primary" />
              <span className="hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4" />
              <span className="hidden sm:inline">Copy link</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
