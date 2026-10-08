import { Reveal } from "@/components/reveal";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { TableOfContents } from "./tableOfContext";
import { getPublicBlogBySlug, getPublicBlogs } from "@/lib/blogs.repository";
import { absoluteUrl, pageMetadata, siteName } from "@/lib/seo";
import { blogDateISO, formatBlogDate } from "@/lib/blog-date";
import { JsonLd } from "@/components/json-ld";
import NavBar from "@/components/navBar";
import { Footer } from "@/components/footer";
import ContactForm from "@/app/contact-me/contactForm";
import { blogCategories } from "@/app/admin/blogs/selectblogcategory";

export const dynamic = "force-static";
export const revalidate = 86400;
export const dynamicParams = true;

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return (await getPublicBlogs()).map((post) => ({ id: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).id;
  const post = await getPublicBlogBySlug(slug);
  if (!post) notFound();
  const metadata = pageMetadata({ title: post.title, description: post.metaDescription, path: `/blog/${slug}`, image: post.image || undefined });
  return {
    ...metadata,
    keywords: post.tags || undefined,
    authors: [{ name: post.userName || siteName }],
    openGraph: { ...metadata.openGraph, type: "article", publishedTime: blogDateISO(post.date), authors: [post.userName || siteName], tags: post.tags || undefined },
  };
}

export default async function Page({ params }: Props) {
  const slug = (await params).id;
  const post = await getPublicBlogBySlug(slug);
  if (!post) notFound();

  return (
    <div className="page-stack">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.metaDescription, mainEntityOfPage: absoluteUrl(`/blog/${slug}`), ...(post.image ? { image: absoluteUrl(post.image) } : {}), datePublished: blogDateISO(post.date), author: { "@type": "Person", name: post.userName || siteName }, publisher: { "@type": "Person", name: siteName }, keywords: post.tags?.join(", ") }} />
      <NavBar />
      <main className="flex flex-col gap-20">
        <article className="site-shell flex flex-col gap-8">
          <Link href="/blog" className="text-link w-fit text-muted-foreground"><ArrowLeft size={16} /> All writing</Link>
          <Reveal as="header" onMount className="flex flex-col gap-6">
            <p className="eyebrow">{getBlogCategory(post.blogCategory)}</p>
            <h1>{post.title}</h1>
            <p className="font-light text-muted-foreground">{post.metaDescription}</p>
            <div className="flex items-center gap-3 text-sm">
              <Image src={post.userImage || "/ashish-img.jpg"} width={40} height={40} alt={post.userName || "Ashish Bishnoi"} className="rounded-md" />
              <div>
                <p>{post.userName || "Ashish Bishnoi"}</p>
                <p className="eyebrow"><time dateTime={blogDateISO(post.date)}>{formatBlogDate(post.date)}</time></p>
              </div>
            </div>
          </Reveal>
          {post.image && <Image src={post.image} width={800} height={450} alt={post.title} className="h-auto w-full rounded-lg border" sizes="(max-width: 768px) 100vw, 704px" priority />}
          <TableOfContents slug={slug} />
          <div className="tiptap break-words" dangerouslySetInnerHTML={{ __html: post.data }} />
        </article>
        <div className="site-shell"><ContactForm /></div>
      </main>
      <Footer />
    </div>
  );
}

function getBlogCategory(slug: string) {
  return blogCategories.find((item) => item.value === slug)?.label;
}
