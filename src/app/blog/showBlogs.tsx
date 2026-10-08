import { Reveal } from "@/components/reveal";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { blogCategories } from "../admin/blogs/selectblogcategory";
import { blogDateISO, formatBlogDate } from "@/lib/blog-date";
import type { PublicBlog } from "@/lib/blogs.repository";

export default function ShowBlogs({ blogData }: { blogData?: PublicBlog[] }) {
  if (!blogData?.length) return <p className="rounded-lg border p-6 text-sm text-muted-foreground">{blogData ? "No posts found. Check back soon." : "Posts are unavailable right now. Please check back soon."}</p>;
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {blogData.map((post, index) => (
        <Reveal as="article" key={post.id} delay={(index % 2) * 0.08} className="flex flex-col gap-4">
          {post.image && <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-lg border">
            <Image src={post.image} alt={post.title} width={800} height={450} sizes="(max-width: 640px) 100vw, 336px" className="motion-image aspect-video w-full object-cover" />
          </Link>}
          <p className="eyebrow">{blogCategories.find((category) => category.value === post.blogCategory)?.label}</p>
          <h2 className="text-base">
            <Link href={`/blog/${post.slug}`} className="flex items-start justify-between gap-3 hover:underline underline-offset-4">{post.title}<ArrowUpRight size={16} className="mt-1 shrink-0 text-muted-foreground" /></Link>
          </h2>
          <p className="line-clamp-3 text-sm text-muted-foreground">{post.metaDescription}</p>
          <p className="eyebrow mt-auto">{post.userName || "Ashish Bishnoi"} · <time dateTime={blogDateISO(post.date)}>{formatBlogDate(post.date)}</time></p>
        </Reveal>
      ))}
    </div>
  );
}
