"use client";

import { useState, useRef, useEffect, cloneElement, isValidElement } from "react";
import { createPortal } from "react-dom";

const SHOW_DELAY_MS = 400;
const HIDE_DELAY_MS = 0;
const GAP_PX = 8;

type Props = {
  content: string;
  children: React.ReactElement;
  side?: "top" | "bottom";
};

export function Tooltip({ content, children, side = "top" }: Props) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const show = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    timeoutRef.current = setTimeout(() => {
      const el = triggerRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        setCoords({
          x: rect.left + rect.width / 2,
          y: side === "top" ? rect.top : rect.bottom,
        });
      }
      setVisible(true);
    }, SHOW_DELAY_MS);
  };

  const hide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      setCoords(null);
    }, HIDE_DELAY_MS);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const trigger = isValidElement(children)
    ? cloneElement(children as React.ReactElement<{ onMouseEnter?: (e: React.MouseEvent) => void; onMouseLeave?: (e: React.MouseEvent) => void; onFocus?: (e: React.FocusEvent) => void; onBlur?: (e: React.FocusEvent) => void }>, {
        onMouseEnter: show,
        onMouseLeave: hide,
        onFocus: show,
        onBlur: hide,
      })
    : children;

  const tooltipEl =
    visible && coords && typeof document !== "undefined"
      ? createPortal(
          <span
            role="tooltip"
            className="pointer-events-none fixed z-[9999] max-w-[min(20rem,90vw)] rounded-lg border border-border/80 bg-card px-2.5 py-1.5 text-xs font-medium text-foreground shadow-lg backdrop-blur-sm"
            style={{
              left: coords.x,
              top: side === "top" ? coords.y - GAP_PX : coords.y + GAP_PX,
              transform:
                side === "top"
                  ? "translate(-50%, -100%)"
                  : "translate(-50%, 0)",
            }}
          >
            {content}
          </span>,
          document.body
        )
      : null;

  return (
    <div ref={triggerRef} className="relative inline-flex min-w-0 max-w-full">
      {trigger}
      {tooltipEl}
    </div>
  );
}
