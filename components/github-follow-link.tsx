import Link from "next/link";
import { Github } from "lucide-react";
import { GITHUB_ORG_URL } from "@/lib/site-config";

type Props = {
  className?: string;
  variant?: "default" | "button" | "muted";
};

/** "Follow on GitHub" link for use in footer, hero, sidebars. Uses GitHub org URL. */
export function GithubFollowLink({ className = "", variant = "default" }: Props) {
  const base = "inline-flex items-center gap-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  const variants = {
    default:
      "rounded-xl border border-border bg-card px-4 py-2.5 text-foreground shadow-sm hover:bg-muted/60 hover:border-primary/50",
    button:
      "rounded-xl border border-primary bg-primary px-4 py-2.5 text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:border-primary/90",
    muted:
      "rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted/60 hover:text-foreground",
  };
  return (
    <a
      href={GITHUB_ORG_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
      aria-label="Follow Decypher-Labs on GitHub"
    >
      <Github className="h-4 w-4 shrink-0" />
      <span>Follow on GitHub</span>
    </a>
  );
}
