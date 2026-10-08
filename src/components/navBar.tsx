"use client";

import { Reveal } from "@/components/reveal";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact-me" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const isOpen = openPath === pathname;

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPath(null);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <Reveal as="header" onMount className="site-shell pt-8">
      <nav aria-label="Main navigation" className="flex flex-wrap items-center justify-between gap-x-3 border-b pb-6 sm:gap-x-6">
        <Link href="/" aria-label="Ashish Bishnoi home" className="mr-auto flex h-8 w-8 items-center justify-center rounded-sm border font-mono text-xs font-medium">
          ab.
        </Link>
        <button ref={menuButton} type="button" aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen} aria-controls="navigation-links" onClick={() => setOpenPath(isOpen ? null : pathname)}
          className="flex h-11 w-11 items-center justify-center rounded-md border transition-colors hover:bg-muted sm:hidden">
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
        <div id="navigation-links" className={`${isOpen ? "flex mobile-nav-appear" : "hidden"} mt-4 w-full flex-col gap-1 border-t pt-3 sm:order-1 sm:mt-0 sm:flex sm:w-auto sm:flex-row sm:items-center sm:gap-4 sm:border-0 sm:pt-0`}>
          {navigation.map(({ label, href }) => {
            const active = href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href);
            return (
              <Link key={href} href={href} aria-current={active ? "page" : undefined} onClick={() => setOpenPath(null)}
                className={`rounded-sm py-3 text-sm transition-colors hover:text-foreground sm:py-0 ${active ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </Reveal>
  );
}
