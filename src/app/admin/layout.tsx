import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminNavbar } from "@/components/admin-navbar";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin | Ashish Bishnoi",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthenticated())) redirect("/");
  return <div className="min-h-screen"><AdminNavbar />{children}</div>;
}
