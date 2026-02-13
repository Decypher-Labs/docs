"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GripVertical } from "lucide-react";

const SIDEBAR_MIN = 220;
const SIDEBAR_MAX = 380;

type SidebarResizeHandleProps = {
  width: number;
  onWidthChange: (w: number) => void;
};

export function SidebarResizeHandle({ width, onWidthChange }: SidebarResizeHandleProps) {
  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
      startXRef.current = e.clientX;
      startWidthRef.current = width;
    },
    [width]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const deltaX = e.clientX - startXRef.current;
      const newWidth = Math.min(
        SIDEBAR_MAX,
        Math.max(SIDEBAR_MIN, startWidthRef.current + deltaX)
      );
      onWidthChange(newWidth);
    },
    [onWidthChange]
  );

  const handleMouseUp = useCallback(() => setIsResizing(false), []);

  useEffect(() => {
    if (!isResizing) return;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-valuenow={width}
      tabIndex={0}
      onMouseDown={handleMouseDown}
      className="group flex w-2 shrink-0 cursor-col-resize items-center justify-center border-r border-border/50 transition-colors hover:border-primary/30 hover:bg-primary/5"
    >
      <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}
