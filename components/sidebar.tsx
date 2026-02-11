"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronLeft, ChevronRight, FileText, Folder, X } from "lucide-react";
import type { SlideFolder } from "@/lib/slides";
import { useState } from "react";

type SidebarProps = {
  tree: SlideFolder[];
  collapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
  onClose?: () => void;
};

export function Sidebar({
  tree,
  collapsed,
  onToggle,
  isMobile = false,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  const content = (
    <>
      <div className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-border px-3">
        <span className="truncate text-sm font-medium text-muted-foreground">
          Slides
        </span>
        <div className="flex items-center gap-0.5">
          {isMobile && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {!isMobile && (
            <button
              type="button"
              onClick={onToggle}
              className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      <nav className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-2">
        {tree.length === 0 ? (
          <p className="px-2 py-4 text-sm text-muted-foreground">
            Add folders and .md files in{" "}
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
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-border bg-card shadow-xl transition-transform duration-200 lg:hidden ${
          collapsed ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{ top: "3.5rem" }}
      >
        {content}
      </aside>
    );
  }

  return (
    <aside
      className={`sticky top-14 flex h-[calc(100vh-3.5rem)] shrink-0 flex-col overflow-hidden border-r border-border bg-muted/40 transition-[width] duration-200 ${
        collapsed ? "w-0 border-0" : "w-64 min-w-[16rem]"
      }`}
    >
      {content}
    </aside>
  );
}

function FolderSection({
  folder,
  pathname,
  onLinkClick,
}: {
  folder: SlideFolder;
  pathname: string;
  onLinkClick?: () => void;
}) {
  const [open, setOpen] = useState(true);
  const basePath = `/${folder.name}`;

  return (
    <li>
      <Collapsible.Root open={open} onOpenChange={setOpen}>
        <Collapsible.Trigger className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Folder className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="truncate">{folder.title}</span>
          {open ? (
            <ChevronDown className="ml-auto h-4 w-4 shrink-0" />
          ) : (
            <ChevronRight className="ml-auto h-4 w-4 shrink-0" />
          )}
        </Collapsible.Trigger>
        <Collapsible.Content>
          <ul className="ml-2 mt-0.5 space-y-0.5 border-l border-border pl-3">
            {folder.files.map((file) => {
              const href = `${basePath}/${file.slug}`;
              const isActive = pathname === href;
              return (
                <li key={file.slug}>
                  <Link
                    href={href}
                    onClick={onLinkClick}
                    className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                      isActive
                        ? "border-l-2 border-primary bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <FileText className="h-3.5 w-3.5 shrink-0" />
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
