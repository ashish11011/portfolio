import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import NavBar from "@/components/navBar";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectContent } from "@/components/project-content";
import { getProjectBySlug, getPublicProjects } from "@/lib/projects.repository";
import { absoluteUrl, pageMetadata, siteName, siteUrl } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const dynamic = "force-static";
export const revalidate = 86400;
export const dynamicParams = true;
type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPublicProjects()).map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug((await params).slug);
  if (!project) notFound();
  return pageMetadata({ title: project.name, description: project.summary || project.description, path: `/projects/${project.slug}`, image: project.images[0] });
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProjectBySlug((await params).slug);
  if (!project) notFound();
  return (
    <div className="page-stack">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CreativeWork", name: project.name, description: project.summary || project.description, url: absoluteUrl(`/projects/${project.slug}`), image: project.images.map(absoluteUrl), creator: { "@type": "Person", name: siteName, url: siteUrl }, keywords: project.technologies.join(", ") }} />
      <NavBar />
      <main className="site-shell flex flex-col gap-10">
        <Reveal onMount className="flex flex-col gap-6">
          <Link href="/projects" className="text-link w-fit text-muted-foreground"><ArrowLeft size={16} /> All projects</Link>
          <p className="eyebrow">Project overview</p>
          <div className="flex items-center gap-4">
            {project.logo && <Image src={project.logo} width={40} height={40} alt={`${project.name} logo`} unoptimized className="rounded-md" />}
            <h1>{project.name}</h1>
          </div>
          <p className="font-light text-muted-foreground">{project.summary || project.description}</p>
          {project.website && <Link href={project.website} target="_blank" rel="noreferrer" className="text-link w-fit">Visit website <ArrowUpRight size={16} /></Link>}
        </Reveal>
        {project.images.length > 0 && <Reveal><ProjectGallery projectName={project.name} images={project.images} priority /></Reveal>}
        <Reveal as="section" aria-labelledby="about-project" className="flex flex-col gap-6">
          <h2 id="about-project">About this project</h2>
          <p className="whitespace-pre-line text-muted-foreground">{project.description}</p>
          <ProjectContent content={project.content} />
        </Reveal>
        {project.features.length > 0 && <Reveal as="section" aria-labelledby="project-features">
          <h2 id="project-features" className="section-heading">Highlights</h2>
          <ul className="flex flex-col gap-3">
            {project.features.map((feature) => <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground"><Check size={16} className="mt-1 shrink-0" aria-hidden="true" /><span>{feature}</span></li>)}
          </ul>
        </Reveal>}
        {project.technologies.length > 0 && <Reveal as="section" aria-labelledby="project-stack">
          <h2 id="project-stack" className="section-heading">Built with</h2>
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => <li key={tech} className="rounded-sm border px-3 py-1.5 font-mono text-xs text-muted-foreground">{tech}</li>)}
          </ul>
        </Reveal>}
        <Reveal className="flex flex-wrap items-center justify-between gap-6 border-t pt-8">
          <p className="text-sm text-muted-foreground">Have something similar in mind?</p>
          <Link href="/contact-me" className="text-link">Let’s talk <ArrowUpRight size={16} /></Link>
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
