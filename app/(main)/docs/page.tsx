import { redirect } from "next/navigation";
import { getSlidesTree } from "@/lib/slides";

export default function DocsRedirect() {
  const tree = getSlidesTree();
  const first = tree[0]?.files[0];
  if (first) redirect(`/${tree[0].name}/${first.slug}`);
  redirect("/");
}
