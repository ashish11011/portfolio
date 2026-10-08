import { db } from "@/dbConfig/dbConfig";
import React from "react";
import { blogForm, blogTable } from "../../../db/schema";
import { desc } from "drizzle-orm";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export const dynamic = "force-dynamic";

const index = async () => {
  const [blogResult, messageResult] = await Promise.allSettled([
    db.select().from(blogTable),
    db.select().from(blogForm).orderBy(desc(blogForm.createdAt)).limit(50),
  ]);
  const blogData = blogResult.status === "fulfilled" ? blogResult.value : [];
  const messages = messageResult.status === "fulfilled" ? messageResult.value : [];
  const blogStorageReady = blogResult.status === "fulfilled";
  return (
    <div className=" mt-24 max-w-7xl mx-auto px-4">
      <div className="mb-6 flex flex-wrap gap-6"><Link href="/admin/projects" className="text-link">Manage projects</Link><Link href="/projects" className="text-link text-muted-foreground">View portfolio</Link></div>
      {!blogStorageReady && <p className="mb-4 text-sm text-muted-foreground">Blog storage is unavailable.</p>}
      <Link className=" my-2 hover:underline" href="/admin/blogs/">
        Create new blog
      </Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Index</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>slug</TableHead>
            <TableHead>views</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogData.map((data, idx) => {
            return (
              <TableRow key={idx}>
                <TableHead>{idx}</TableHead>
                <TableHead>{data?.title}</TableHead>
                <TableHead>
                  <Link href={"/admin/blogs/" + data?.slug || ""}>
                    {data?.slug}
                  </Link>
                </TableHead>
                <TableHead>{data?.viewCount}</TableHead>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <section aria-labelledby="admin-messages-heading" className="my-10 flex flex-col gap-6 border-t pt-8">
        <div><h2 id="admin-messages-heading">Messages</h2><p className="mt-2 text-sm text-muted-foreground">The latest 50 inquiries from your portfolio.</p></div>
        {messageResult.status === "rejected" ? <p className="text-sm text-muted-foreground">Message storage is unavailable.</p> : messages.length === 0 ? <p className="text-sm text-muted-foreground">No messages yet.</p> : messages.map((inquiry) => (
          <article key={inquiry.id} className="surface flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="break-all text-sm font-medium">{inquiry.email}</p>
              {inquiry.createdAt && <time dateTime={inquiry.createdAt.toISOString()} className="eyebrow">{inquiry.createdAt.toLocaleDateString("en-GB", { timeZone: "Asia/Kolkata" })}</time>}
            </div>
            {inquiry.name && <p className="text-sm text-muted-foreground">{inquiry.name}</p>}
            <p className="whitespace-pre-wrap break-words text-sm">{inquiry.message}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default index;
