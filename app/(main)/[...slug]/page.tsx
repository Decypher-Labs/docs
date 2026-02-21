import { notFound } from "next/navigation";

/**
 * Catch-all for routes under (main) that don't match a specific page (1+ segments).
 * Ensures 404s still render inside the main layout (navbar + footer visible).
 */
export default function CatchAllPage() {
  notFound();
}
