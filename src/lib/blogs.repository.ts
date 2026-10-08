import "server-only";
import { cache } from "react";
import { desc, eq } from "drizzle-orm";
import { db } from "@/dbConfig/dbConfig";
import { blogTable } from "../../db/schema";

export type PublicBlog = typeof blogTable.$inferSelect & { slug: string };
export const BLOG_PAGE_SIZE = 10;

// Build-time reads also run when an admin save regenerates the static pages.
// A configured database failure must not replace published content with an empty page.
export const getPublicBlogs = cache(async (): Promise<PublicBlog[]> => {
  if (!process.env.DATABASE_URL) return [];
  const posts = await db.select().from(blogTable).where(eq(blogTable.isVisible, true)).orderBy(desc(blogTable.date));
  return posts.filter((post): post is PublicBlog => Boolean(post.slug));
});

export const getPublicBlogBySlug = cache(async (slug: string) => {
  if (!process.env.DATABASE_URL) return undefined;
  const [post] = await db.select().from(blogTable).where(eq(blogTable.slug, slug));
  return post?.isVisible && post.slug ? post as PublicBlog : undefined;
});
