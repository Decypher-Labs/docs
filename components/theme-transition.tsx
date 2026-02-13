"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeTransition() {
  const { theme } = useTheme();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevTheme, setPrevTheme] = useState<string | undefined>(theme);
  const [newTheme, setNewTheme] = useState<string | undefined>(theme);

  useEffect(() => {
    if (prevTheme && prevTheme !== theme) {
      setNewTheme(theme);
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 900); // Match animation duration
      setPrevTheme(theme);
      return () => clearTimeout(timer);
    } else if (!prevTheme) {
      setPrevTheme(theme);
      setNewTheme(theme);
    }
  }, [theme, prevTheme]);

  if (!isTransitioning) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden="true"
    >
      <div 
        className={`theme-transition-overlay ${newTheme === 'dark' ? 'dark' : ''}`}
        data-theme={newTheme}
      />
    </div>
  );
}
