import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Manage projects - Ashish Bishnoi", robots: { index: false, follow: false } };

export default async function ProjectAdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthenticated())) redirect("/");
  return <div className="site-shell flex flex-col gap-8 py-8">
    <nav aria-label="Project administration" className="flex flex-wrap gap-6 border-b pb-6 text-sm">
      <Link href="/admin" className="text-link">Admin dashboard</Link>
      <Link href="/admin/projects" className="text-link">Manage projects</Link>
      <Link href="/projects" className="text-link text-muted-foreground">View portfolio</Link>
    </nav>
    {children}
  </div>;
}
