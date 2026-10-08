import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Manage projects - Ashish Bishnoi", robots: { index: false, follow: false } };

export default async function ProjectAdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthenticated())) redirect("/");
  return <div className="site-shell flex flex-col gap-8 py-8">
    {children}
  </div>;
}
