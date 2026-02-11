import { getSlidesTree } from "@/lib/slides";
import { AppShell } from "@/components/app-shell";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tree = getSlidesTree();

  return <AppShell tree={tree}>{children}</AppShell>;
}
