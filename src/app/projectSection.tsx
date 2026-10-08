import { Reveal } from "@/components/reveal";
import { getPublicProjects } from "@/lib/projects.repository";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default async function ProjectSection() {
  const projects = await getPublicProjects();
  const featuredProjects = projects
    .filter((project) => project.featuredOrder !== null)
    .sort((first, second) => first.featuredOrder! - second.featuredOrder!);
  return (
    <section id="projects" aria-labelledby="projects-heading">
      <Reveal className="mb-6 flex items-center justify-between gap-4">
        <h2 id="projects-heading">Selected work</h2>
        <Link href="/projects" className="text-link text-muted-foreground">
          All projects <ArrowUpRight size={16} />
        </Link>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <Reveal as="article" key={project.id} delay={(index % 2) * 0.08}
            className="surface motion-card flex flex-col gap-4 hover:border-neutral-400">
            <div className="flex items-start justify-between gap-3">
              <h3>
                <Link href={`/projects/${project.slug}`} className="hover:underline underline-offset-4">
                  {project.name}
                </Link>
              </h3>
              <ArrowUpRight size={16} className="mt-1 shrink-0 text-muted-foreground" aria-hidden="true" />
            </div>
            <p className="text-sm text-muted-foreground">{project.summary || project.description}</p>
            <ul aria-label="Technologies" className="mt-auto flex flex-wrap gap-x-3 gap-y-1.5 pt-2">
              {project.technologies.map((tech) => <li key={tech} className="eyebrow">{tech}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
