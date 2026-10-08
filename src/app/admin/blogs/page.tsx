import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/dbConfig/dbConfig";
import { blogTable } from "../../../../db/schema";
import { Button } from "@/components/ui/button";

export default async function AdminBlogsPage() {
  let blogs: typeof blogTable.$inferSelect[] = [];
  let storageReady = Boolean(process.env.DATABASE_URL);
  if (storageReady) {
    try { blogs = await db.select().from(blogTable).orderBy(desc(blogTable.id)); }
    catch { storageReady = false; }
  }
  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1>Manage blogs</h1>
        <Button asChild><Link href="/admin/blogs/new">Create blog</Link></Button>
      </div>
      <p className="text-sm text-muted-foreground">Edit articles, content, images, and metadata.</p>
      {!storageReady ? <p role="status" className="surface text-sm">Blog storage is unavailable. Check the database connection.</p>
        : blogs.length === 0 ? <p className="surface text-sm text-muted-foreground">No blogs yet. Create your first article.</p>
        : <ul className="flex flex-col gap-4">
          {blogs.map((blog) => (
            <li key={blog.id} className="surface flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="break-words text-base">{blog.title}</h2>
                <p className="eyebrow mt-2 break-all">{blog.slug ? `/blog/${blog.slug}` : "Missing URL slug"} · {blog.isVisible ? "Published" : "Hidden"} · {blog.viewCount || 0} views</p>
              </div>
              {blog.slug && <div className="flex shrink-0 gap-4">
                {blog.isVisible && <Link href={`/blog/${blog.slug}`} className="text-link text-muted-foreground">View</Link>}
                <Link href={`/admin/blogs/${blog.slug}`} className="text-link">Edit</Link>
              </div>}
            </li>
          ))}
        </ul>}
    </main>
  );
}
