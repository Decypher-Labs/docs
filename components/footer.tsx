import Link from "next/link";
import { Youtube, Twitter, MessageCircle, Github, Linkedin, Coffee } from "lucide-react";
import { GITHUB_ORG_URL, BUYMEACOFFEE_URL } from "@/lib/site-config";
import { Tooltip } from "@/components/tooltip";

const SOCIAL_LINKS = [
  { label: "GitHub", tooltip: "Follow on GitHub", href: GITHUB_ORG_URL, icon: Github },
  { label: "YouTube", tooltip: "Watch on YouTube", href: "https://youtube.com/@decypherlabs", icon: Youtube },
  { label: "Buy Me a Coffee", tooltip: "Support us on Buy Me a Coffee", href: BUYMEACOFFEE_URL, icon: Coffee },
  { label: "LinkedIn", tooltip: "Connect on LinkedIn", href: "https://linkedin.com/in/decypherlabs", icon: Linkedin },
  { label: "Twitter", tooltip: "Follow on Twitter", href: "https://x.com/io_decypherlabs", icon: Twitter },
  { label: "Discord", tooltip: "Join Discord community", href: "https://discord.gg/NvznJsbV", icon: MessageCircle },
] as const;

const iconButtonClass =
  "flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted/70 hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
          <Link
            href="/"
            className="text-lg font-semibold text-foreground transition-colors hover:text-primary"
          >
            <span className="font-brand font-semibold">Decypher</span>
            <span className="text-primary font-medium">Labs</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            DevOps &amp; Development — learn by doing.
          </p>
        </div>
        <nav className="flex items-center gap-1" aria-label="Social and community links">
          {SOCIAL_LINKS.map(({ label, tooltip, href, icon: Icon }) => (
            <Tooltip key={label} content={tooltip} side="top">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={iconButtonClass}
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            </Tooltip>
          ))}
        </nav>
      </div>
      <div className="border-t border-border/60 px-4 py-4 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
        © {new Date().getFullYear()} DecypherLabs. Docs &amp; All Rights Reserved.
      </div>
    </footer>
  );
}
