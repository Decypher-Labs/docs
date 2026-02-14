import { getSlidesTree } from "@/lib/slides";
import { getBlogsList } from "@/lib/blogs";
import { getCoursesTree } from "@/lib/courses";
import { AppShell } from "@/components/app-shell";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tree = getSlidesTree();
  const blogs = getBlogsList();
  const courses = getCoursesTree();

  return (
    <AppShell tree={tree} blogs={blogs} courses={courses}>
      {children}
    </AppShell>
  );
}
