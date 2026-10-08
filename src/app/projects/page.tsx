import { Reveal } from "@/components/reveal";
import { Footer } from "@/components/footer";
import NavBar from "@/components/navBar";
import type { Metadata } from "next";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import Link from "next/link";
import { ProjectGallery } from "@/components/project-gallery";
import { getPublicProjects } from "@/lib/projects.repository";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description: "Explore web apps, e-commerce platforms, and websites built by Ashish Bishnoi with Next.js, TypeScript, and AWS.",
  path: "/projects",
});

export const dynamic = "force-static";
export const revalidate = 86400;

export default async function Page() {
  const projects = await getPublicProjects();
  return (
    <div className="page-stack">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Projects by Ashish Bishnoi", url: absoluteUrl("/projects"), mainEntity: { "@type": "ItemList", itemListElement: projects.map((project, index) => ({ "@type": "ListItem", position: index + 1, name: project.name, url: absoluteUrl(`/projects/${project.slug}`) })) } }} />
      <NavBar />
      <main className="site-shell flex flex-col gap-10">
        <Reveal onMount className="flex flex-col gap-3">
          <p className="eyebrow">Selected work</p>
          <h1>Projects</h1>
          <p className="max-w-xl font-light text-muted-foreground">A collection of products and websites I’ve built for people and businesses.</p>
        </Reveal>
        <section aria-label="All projects" className="flex flex-col gap-10">
          {projects.map((project, index) => (
            <Reveal as="article" key={project.id} className="flex flex-col gap-6 border-b pb-10 last:border-0 last:pb-0">
              <ProjectGallery projectName={project.name} images={project.images} priority={index === 0} />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="eyebrow">{String(index + 1).padStart(2, "0")}</span>
                  <h2><Link href={`/projects/${project.slug}`} className="hover:underline underline-offset-4">{project.name}</Link></h2>
                </div>
                {project.website && <Link href={project.website} target="_blank" rel="noreferrer" className="text-link text-muted-foreground">Visit website <ArrowUpRight size={16} /></Link>}
              </div>
              <p className="text-sm text-muted-foreground">{project.summary || project.description}</p>
              <Link href={`/projects/${project.slug}`} className="text-link w-fit">About the project <ArrowUpRight size={16} /></Link>
              <ul aria-label="Tech stack" className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => <li key={tech} className="rounded-sm border px-3 py-1.5 font-mono text-xs text-muted-foreground">{tech}</li>)}
              </ul>
            </Reveal>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
