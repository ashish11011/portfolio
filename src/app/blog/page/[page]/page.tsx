import { notFound, permanentRedirect } from "next/navigation";
import { BLOG_PAGE_SIZE, getPublicBlogs } from "@/lib/blogs.repository";
import { pageMetadata } from "@/lib/seo";
import { BlogListing } from "../../blog-listing";
import { blogPageUrl } from "../../paginationblog";

export const dynamic = "force-static";
export const revalidate = 86400;
export const dynamicParams = true;
type Props = { params: Promise<{ page: string }> };

export async function generateStaticParams() {
  const totalPages = Math.ceil((await getPublicBlogs()).length / BLOG_PAGE_SIZE);
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => ({ page: String(index + 2) }));
}

async function getPage(params: Props["params"]) {
  const value = (await params).page;
  if (!/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(Number(value))) notFound();
  const page = Number(value);
  if (page === 1) permanentRedirect("/blog");
  const posts = await getPublicBlogs();
  if (page > Math.ceil(posts.length / BLOG_PAGE_SIZE)) notFound();
  return { page, posts };
}

export async function generateMetadata({ params }: Props) {
  const { page } = await getPage(params);
  return pageMetadata({ title: `Blog — Page ${page}`, description: `Page ${page} of Ashish Bishnoi’s articles about web development, technology, and software engineering.`, path: blogPageUrl(page) });
}

export default async function BlogArchivePage({ params }: Props) {
  const { posts, page } = await getPage(params);
  return <BlogListing posts={posts} page={page} />;
}
