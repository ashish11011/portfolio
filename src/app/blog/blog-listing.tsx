import { Reveal } from "@/components/reveal";
import NavBar from "@/components/navBar";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import ContactForm from "@/app/contact-me/contactForm";
import { BLOG_PAGE_SIZE, type PublicBlog } from "@/lib/blogs.repository";
import { absoluteUrl } from "@/lib/seo";
import ShowBlogs from "./showBlogs";
import { BlogPagination, blogPageUrl } from "./paginationblog";

export function BlogListing({ posts, page }: { posts: PublicBlog[]; page: number }) {
  const totalPages = Math.ceil(posts.length / BLOG_PAGE_SIZE);
  const pagePosts = posts.slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE);
  return (
    <div className="page-stack">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Writing by Ashish Bishnoi", url: absoluteUrl(blogPageUrl(page)), mainEntity: { "@type": "ItemList", itemListElement: pagePosts.map((post, index) => ({ "@type": "ListItem", position: (page - 1) * BLOG_PAGE_SIZE + index + 1, name: post.title, url: absoluteUrl(`/blog/${post.slug}`) })) } }} />
      <NavBar />
      <main className="site-shell flex flex-col gap-20">
        <section aria-labelledby="blog-heading" className="flex flex-col gap-10">
          <Reveal onMount className="flex flex-col gap-3">
            <p className="eyebrow">Notes & ideas</p>
            <h1 id="blog-heading">Writing</h1>
            <p className="font-light text-muted-foreground">Thoughts on building for the web, technology, and things I’m learning along the way.</p>
            {totalPages > 1 && <p className="eyebrow">Page {page} of {totalPages}</p>}
          </Reveal>
          <ShowBlogs blogData={pagePosts} />
          <BlogPagination page={page} totalPages={totalPages} />
        </section>
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
