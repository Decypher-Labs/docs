"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const DOC_PLACEHOLDER_LIGHT = "/static/docs/doc-card-light.svg";
const DOC_PLACEHOLDER_DARK = "/static/docs/doc-card-dark.svg";

type Props = { title: string; slug: string };

export function DocCardBanner({ title }: Props) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";
  const src = isDark ? DOC_PLACEHOLDER_DARK : DOC_PLACEHOLDER_LIGHT;

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
