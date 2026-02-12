import Link from "next/link";
import {
  Youtube,
  Linkedin,
  Twitter,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://youtube.com/@decypherlabs", icon: Youtube },
  { label: "LinkedIn", href: "https://linkedin.com/in/decypherlabs", icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com/decypherlabs", icon: Twitter },
  { label: "Discord", href: "https://discord.gg/decypherlabs", icon: MessageCircle },
] as const;

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
        <nav
          className="flex flex-wrap items-center justify-center gap-4"
          aria-label="Social links"
        >
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-primary"
              aria-label={label}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          ))}
        </nav>
      </div>
      <div className="border-t border-border/60 px-4 py-4 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
        © {new Date().getFullYear()} DecypherLabs. Docs &amp; slides for the channel.
      </div>
    </footer>
  );
}
