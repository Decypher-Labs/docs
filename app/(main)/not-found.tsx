import { NotFoundContent } from "@/components/not-found-content";

/**
 * Segment-level 404 for (main). Keeps navbar + footer when notFound() is called
 * from any page under (main) (catch-all, docs, courses, blogs).
 */
export default function NotFound() {
  return <NotFoundContent />;
}
