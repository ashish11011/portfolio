import { pageMetadata } from "@/lib/seo";
import { getPublicBlogs } from "@/lib/blogs.repository";
import { BlogListing } from "./blog-listing";

export const dynamic = "force-static";
export const revalidate = 86400;
export const metadata = pageMetadata({
  title: "Blog",
  description: "Articles by Ashish Bishnoi on web development, Next.js, TypeScript, AWS, and building better software.",
  path: "/blog",
});

export default async function Blog() {
  return <BlogListing posts={await getPublicBlogs()} page={1} />;
}
