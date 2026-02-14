"use client";

import { useState, useRef, useEffect, cloneElement, isValidElement } from "react";

const SHOW_DELAY_MS = 400;
const HIDE_DELAY_MS = 0;

type Props = {
  content: string;
  children: React.ReactElement;
  side?: "top" | "bottom";
};

export function Tooltip({ content, children, side = "top" }: Props) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    timeoutRef.current = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
  };

  const hide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    timeoutRef.current = setTimeout(() => setVisible(false), HIDE_DELAY_MS);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const positionClasses =
    side === "top"
      ? "bottom-full left-1/2 -translate-x-1/2 mb-2"
      : "top-full left-1/2 -translate-x-1/2 mt-2";

  const trigger = isValidElement(children)
    ? cloneElement(children as React.ReactElement<{ onMouseEnter?: (e: React.MouseEvent) => void; onMouseLeave?: (e: React.MouseEvent) => void; onFocus?: (e: React.FocusEvent) => void; onBlur?: (e: React.FocusEvent) => void }>, {
        onMouseEnter: show,
        onMouseLeave: hide,
        onFocus: show,
        onBlur: hide,
      })
    : children;

  return (
    <div className="relative inline-flex">
      {trigger}
      {visible && (
        <span
          role="tooltip"
          className={`pointer-events-none absolute z-50 whitespace-nowrap rounded-lg border border-border/80 bg-card px-2.5 py-1.5 text-xs font-medium text-foreground shadow-lg backdrop-blur-sm ${positionClasses}`}
        >
          {content}
        </span>
      )}
    </div>
  );
}
