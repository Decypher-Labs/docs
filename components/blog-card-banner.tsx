"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const BLOG_PLACEHOLDER_LIGHT = "/static/blogs/blog-card-light.svg";
const BLOG_PLACEHOLDER_DARK = "/static/blogs/blog-card-dark.svg";

type Props = { title: string; slug: string };

export function BlogCardBanner({ title }: Props) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";
  const src = isDark ? BLOG_PLACEHOLDER_DARK : BLOG_PLACEHOLDER_LIGHT;

  useEffect(() => setMounted(true), []);

  return (
    <div className="relative aspect-video w-full overflow-hidden">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  );
}
