/**
 * Client-side highlight.js with full language set.
 * Use in MarkdownContent to highlight all pre/code blocks after render.
 */
import hljs from "highlight.js";

/** Normalize language for highlight.js (e.g. "bash" and "shell" are both supported). */
function getLanguage(block: HTMLElement): string | null {
  const raw = block.getAttribute?.("class") ?? block.className ?? "";
  const m = raw.match(/\blanguage-(\S+)/);
  if (!m) return null;
  const lang = m[1].toLowerCase();
  // Map common aliases to bash
  if (lang === "sh" || lang === "zsh") return "bash";
  return lang;
}

export function highlightAllInElement(container: HTMLElement | null) {
  if (!container) return;
  const blocks = container.querySelectorAll("pre code:not(.hljs)");
  blocks.forEach((block) => {
    if (!(block instanceof HTMLElement)) return;
    const lang = getLanguage(block);
    try {
      if (lang && hljs.getLanguage(lang)) {
        // Explicitly highlight with the detected language
        const result = hljs.highlight(block.textContent ?? "", { language: lang });
        block.innerHTML = result.value;
        block.classList.add("hljs");
      } else {
        // Fallback: try highlightElement which auto-detects from className
        hljs.highlightElement(block);
      }
    } catch (err) {
      // If explicit highlighting fails, try auto-detection
      try {
        hljs.highlightElement(block);
      } catch {
        // Silently fail if both methods fail
      }
    }
  });
}

export default hljs;
