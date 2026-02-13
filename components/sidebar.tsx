"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight, FileText, Folder, X, Home, BookOpen, Youtube } from "lucide-react";
import type { SlideFolder } from "@/lib/slides";
import { useState, useEffect, useRef } from "react";

const YOUTUBE_URL = "https://youtube.com/@decypherlabs";

const SIDEBAR_MIN = 220;
const SIDEBAR_MAX = 380;
export const SIDEBAR_DEFAULT = 300;

type SidebarProps = {
  tree: SlideFolder[];
  collapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
  onClose?: () => void;
  width?: number;
};

export function Sidebar({
  tree,
  collapsed,
  onToggle,
  isMobile = false,
  onClose,
  width = SIDEBAR_DEFAULT,
}: SidebarProps) {
  const pathname = usePathname();
  const firstDoc = tree[0]?.files[0]
    ? `/${tree[0].name}/${tree[0].files[0].slug}`
    : null;

  const content = (
    <>
      <div className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-border/40 px-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {isMobile ? "Navigation" : "Contents"}
        </span>
        <div className="flex items-center gap-0.5">
          {isMobile && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {!isMobile && (
            <button
              type="button"
              onClick={onToggle}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              aria-label="Collapse sidebar"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
            </button>
          )}
        </div>
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-4">
        {isMobile && (
          <ul className="mb-6 space-y-1 border-b border-border/40 pb-6">
            <li>
              <Link
                href="/"
                onClick={onClose}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                  pathname === "/"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                <Home className="h-4 w-4 shrink-0" />
                <span>Home</span>
              </Link>
            </li>
            {firstDoc && (
              <li>
                <Link
                  href={firstDoc}
                  onClick={onClose}
                  className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                    pathname.startsWith(`/${tree[0].name}`)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  <BookOpen className="h-4 w-4 shrink-0" />
                  <span>Docs</span>
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/blogs"
                onClick={onClose}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                  pathname.startsWith("/blogs")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                <FileText className="h-4 w-4 shrink-0" />
                <span>Blogs</span>
              </Link>
            </li>
            <li>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
              >
                <Youtube className="h-4 w-4 shrink-0" />
                <span>YouTube</span>
              </a>
            </li>
          </ul>
        )}
        {isMobile && tree.length > 0 && (
          <div className="mb-3">
            <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Contents
            </span>
          </div>
        )}
        {tree.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border/60 bg-muted/30 px-3 py-4 text-center text-sm text-muted-foreground">
            Add folders and <code className="rounded bg-muted px-1">.md</code> files in{" "}
            <code className="rounded bg-muted px-1">slides/</code>
          </p>
        ) : (
          <ul className="space-y-1">
            {tree.map((folder) => (
              <FolderSection
                key={folder.name}
                folder={folder}
                pathname={pathname}
                onLinkClick={isMobile ? onClose : undefined}
                isMobile={isMobile}
              />
            ))}
          </ul>
        )}
      </nav>
    </>
  );

  if (isMobile) {
    return (
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col rounded-r-2xl border-r border-border/50 bg-card/95 shadow-2xl backdrop-blur-xl transition-transform duration-200 lg:hidden ${
          collapsed ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{ top: "3.5rem" }}
      >
        {content}
      </aside>
    );
  }

  const asideWidth = collapsed ? 0 : width;

  return (
    <aside
      className="glass-panel flex min-h-0 shrink-0 flex-col overflow-hidden rounded-r-xl shadow-sm transition-[width] duration-200"
      style={{
        width: collapsed ? 0 : `${width}px`,
        minWidth: collapsed ? 0 : `${SIDEBAR_MIN}px`,
        maxWidth: collapsed ? 0 : `${width}px`,
        flexShrink: 0,
      }}
    >
      {content}
    </aside>
  );
}

function FolderSection({
  folder,
  pathname,
  onLinkClick,
  isMobile = false,
}: {
  folder: SlideFolder;
  pathname: string;
  onLinkClick?: () => void;
  isMobile?: boolean;
}) {
  // On mobile, folders start closed; on desktop, they start open
  const [open, setOpen] = useState(() => {
    // Always start closed on mobile, open on desktop
    return isMobile === true ? false : true;
  });
  const basePath = `/${folder.name}`;

  // Close folders when switching to mobile view
  useEffect(() => {
    if (isMobile && open) {
      setOpen(false);
    }
  }, [isMobile]);

  return (
    <li>
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted/80">
          <Folder className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate">{folder.title}</span>
          {open ? (
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
          )}
        </Collapsible.Trigger>
        <Collapsible.Content className="overflow-hidden transition-all duration-150 ease-out">
          <ul className="ml-3 mt-1 space-y-0.5 border-l border-border/50 pl-3">
            {folder.files.map((file) => {
              const href = `${basePath}/${file.slug}`;
              const isActive = pathname === href;
              return (
                <li key={file.slug}>
                  <Link
                    href={href}
                    onClick={onLinkClick}
                    className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }`}
                  >
                    <FileText className="h-3.5 w-3.5 shrink-0 opacity-80" />
                    <span className="truncate">{file.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Collapsible.Content>
      </Collapsible.Root>
    </li>
  );
}
