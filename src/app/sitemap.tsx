import { MetadataRoute } from "next";
import { getPublicProjects } from "@/lib/projects.repository";
import { BLOG_PAGE_SIZE, getPublicBlogs } from "@/lib/blogs.repository";
import { absoluteUrl } from "@/lib/seo";

const pages = ["/", "/projects", "/contact-me", "/blog"];
export const dynamic = "force-static";
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, blogs] = await Promise.all([getPublicProjects(), getPublicBlogs()]);
  const blogPageCount = Math.ceil(blogs.length / BLOG_PAGE_SIZE);
  return [
    ...pages.map((path) => ({ url: absoluteUrl(path) })),
    ...projects.map((project) => ({ url: absoluteUrl(`/projects/${project.slug}`) })),
    ...blogs.map((blog) => ({ url: absoluteUrl(`/blog/${blog.slug}`) })),
    ...Array.from({ length: Math.max(0, blogPageCount - 1) }, (_, index) => ({ url: absoluteUrl(`/blog/page/${index + 2}`) })),
  ];
}
