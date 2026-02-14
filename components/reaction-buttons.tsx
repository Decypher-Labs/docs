"use client";

import { useState, useCallback } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

type Reaction = "like" | "dislike" | null;

export function ReactionButtons() {
  const [reaction, setReaction] = useState<Reaction>(null);
  const [toast, setToast] = useState<"like" | "dislike" | null>(null);

  const showToast = useCallback((type: "like" | "dislike") => {
    setToast(type);
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, []);

  const handleLike = () => {
    if (reaction === "like") return;
    setReaction("like");
    showToast("like");
  };

  const handleDislike = () => {
    if (reaction === "dislike") return;
    setReaction("dislike");
    showToast("dislike");
  };

  return (
    <>
      <section className="mt-8 border-t border-border/60 pt-6" aria-label="Was this helpful?">
        <p className="mb-3 text-sm font-medium text-muted-foreground">Was this helpful?</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLike}
            aria-pressed={reaction === "like"}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
              reaction === "like"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/60 bg-card text-muted-foreground hover:bg-muted/60 hover:text-foreground hover:border-primary/40"
            }`}
          >
            <ThumbsUp className="h-4 w-4" />
            Yes
          </button>
          <button
            type="button"
            onClick={handleDislike}
            aria-pressed={reaction === "dislike"}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
              reaction === "dislike"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/60 bg-card text-muted-foreground hover:bg-muted/60 hover:text-foreground hover:border-primary/40"
            }`}
          >
            <ThumbsDown className="h-4 w-4" />
            No
          </button>
        </div>
      </section>
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="toast-entry fixed right-4 bottom-6 z-[100] flex items-center gap-2 rounded-xl border border-border/60 bg-card px-4 py-3 text-sm font-medium text-foreground shadow-lg"
        >
          {toast === "like" ? (
            <>
              <span className="toast-emoji" aria-hidden>🙌</span>
              <span>Thanks! Glad it helped.</span>
            </>
          ) : (
            <>
              <span className="toast-emoji" aria-hidden>💪</span>
              <span>Thanks for the feedback. We&apos;ll try to improve!</span>
            </>
          )}
        </div>
      )}
    </>
  );
}
