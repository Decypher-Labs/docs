/**
 * Client-side highlight.js with full language set.
 * Use in MarkdownContent to highlight all pre/code blocks after render.
 */
import hljs from "highlight.js";

export function highlightAllInElement(container: HTMLElement | null) {
  if (!container) return;
  const blocks = container.querySelectorAll("pre code:not(.hljs)");
  blocks.forEach((block) => {
    if (block instanceof HTMLElement) hljs.highlightElement(block);
  });
}

export default hljs;
