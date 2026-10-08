import { Reveal } from "@/components/reveal";
import Link from "next/link";
import { cn } from "@/lib/utils";

const footerLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/ashish-bishnoi/" },
  { name: "Twitter", href: "https://x.com/bishnoi11011" },
  { name: "Contact", href: "/contact-me" },
];

export function Footer({ className }: { className?: string }) {
  return (
    <Reveal as="footer" className={cn("site-shell", className)}>
      <div className="flex flex-col gap-6 border-t py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="eyebrow">Ashish Bishnoi</p>
        <nav aria-label="Social links" className="flex flex-wrap gap-6">
          {footerLinks.map(({ name, href }) => (
            <Link key={name} href={href} className="text-xs text-muted-foreground transition-colors hover:text-foreground">{name}</Link>
          ))}
        </nav>
      </div>
    </Reveal>
  );
}
