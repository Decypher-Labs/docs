import { getSlidesTree } from "@/lib/slides";
import { getBlogsList } from "@/lib/blogs";
import { AppShell } from "@/components/app-shell";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tree = getSlidesTree();
  const blogs = getBlogsList();

  return (
    <AppShell tree={tree} blogs={blogs}>
      {children}
    </AppShell>
  );
}
