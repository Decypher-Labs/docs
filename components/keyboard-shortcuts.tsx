"use client";

import { useEffect, useState } from "react";
import { X, Command } from "lucide-react";

type Shortcut = {
  keys: string[];
  description: string;
};

const SHORTCUTS: Shortcut[] = [
  { keys: ["⌘", "K"], description: "Open search" },
  { keys: ["Esc"], description: "Close search/modal" },
  { keys: ["↑", "↓"], description: "Navigate search results" },
  { keys: ["Enter"], description: "Select search result" },
];

type KeyboardShortcutsProps = {
  open: boolean;
  onClose: () => void;
};

export function KeyboardShortcuts({ open, onClose }: KeyboardShortcutsProps) {
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-foreground/20 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      <div
        className="fixed left-1/2 top-1/2 z-[101] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card shadow-2xl"
        role="dialog"
        aria-label="Keyboard shortcuts"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">Keyboard shortcuts</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-4">
          <div className="space-y-3">
            {SHORTCUTS.map((shortcut, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{shortcut.description}</span>
                <div className="flex items-center gap-1.5">
                  {shortcut.keys.map((key, j) => (
                    <kbd
                      key={j}
                      className="flex items-center gap-1 rounded border border-border/60 bg-muted/50 px-2 py-1 text-xs font-medium text-foreground"
                    >
                      {key === "⌘" ? (
                        <Command className="h-3 w-3" />
                      ) : (
                        <span>{key}</span>
                      )}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
