import { db } from "@/dbConfig/dbConfig";
import { MetadataRoute } from "next";
import { blogTable } from "../../db/schema";

const pages = ["/", "/projects", "/contact-me", "/blog"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const blogSlugs = await db.select({ slug: blogTable.slug }).from(blogTable);

  const blogEnteries = blogSlugs.map((blogs) => ({
    url: `${baseUrl}/blog/${blogs}/`,
    lastModified: new Date().toISOString(),
  }));

  const pathEntries = pages.map((path) => ({
    url: `${baseUrl}${path}/`,
    lastModified: new Date().toISOString(),
  }));

  return [...pathEntries, ...blogEnteries];
}
