import { NotFoundContent } from "@/components/not-found-content";

/**
 * Root 404 fallback (e.g. when no route matches at all).
 * For routes under (main), (main)/not-found.tsx is used so navbar + footer stay visible.
 */
export default function NotFound() {
  return <NotFoundContent />;
}
