import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getProjectCatalog } from "@/lib/projects.repository";

export default async function AdminProjectsPage() {
  const { projects, storageReady } = await getProjectCatalog();
  return <main className="flex flex-col gap-6">
    <div className="flex flex-wrap items-center justify-between gap-4"><h1>Manage projects</h1><Button asChild><Link href="/admin/projects/new">Add project</Link></Button></div>
    <p className="text-sm text-muted-foreground">{projects.length} projects. Edit their details, images, content, and homepage placement.</p>
    {!storageReady && <p role="status" className="rounded-lg border bg-muted p-4 text-sm">Project storage is unavailable. Check the database connection and project table to load or save projects.</p>}
    <ul className="flex flex-col gap-4">
      {projects.map((project) => <li key={project.id} className="surface flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0"><h2 className="text-base">{project.name}</h2><p className="eyebrow break-all">/projects/{project.slug} · {project.isVisible ? "Visible" : "Hidden"}</p></div>
        <div className="flex shrink-0 gap-4"><Link href={`/projects/${project.slug}`} className="text-link text-muted-foreground">View</Link><Link href={`/admin/projects/${project.id}`} className="text-link">Edit</Link></div>
      </li>)}
    </ul>
  </main>;
}
