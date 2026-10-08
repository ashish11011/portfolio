"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Projects", href: "/admin/projects" },
  { label: "Blogs", href: "/admin/blogs" },
  { label: "Contact responses", href: "/admin/messages" },
];

export function AdminNavbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link href="/admin" className="w-fit text-base font-medium">ab. <span className="ml-2 text-sm text-muted-foreground">Admin</span></Link>
        <nav aria-label="Admin navigation" className="flex flex-wrap gap-2">
          {links.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return <Link key={href} href={href} aria-current={active ? "page" : undefined}
              className={`inline-flex min-h-11 items-center rounded-md px-3 text-sm transition-colors hover:bg-muted ${active ? "bg-muted font-medium text-foreground" : "text-muted-foreground"}`}>{label}</Link>;
          })}
        </nav>
        <Link href="/" className="text-link w-fit text-muted-foreground">View portfolio</Link>
      </div>
    </header>
  );
}
