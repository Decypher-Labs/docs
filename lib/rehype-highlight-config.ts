import rehypeHighlight from "rehype-highlight";
import { common } from "lowlight";
import dockerfile from "highlight.js/lib/languages/dockerfile";

/**
 * rehype-highlight with extra languages (e.g. Dockerfile).
 * Uses lowlight's common set + dockerfile. Pass detect: true to highlight
 * code blocks without a language tag.
 */
export const rehypeHighlightWithLanguages: [typeof rehypeHighlight, object] = [
  rehypeHighlight,
  {
    detect: true,
    languages: { ...common, dockerfile },
    aliases: { dockerfile: "Dockerfile" },
  },
];
