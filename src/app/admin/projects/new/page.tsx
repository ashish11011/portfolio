import { randomUUID } from "node:crypto";
import { ProjectEditor } from "@/components/project-editor";
import { getProjectCatalog } from "@/lib/projects.repository";
import type { Project } from "@/types/project";

export default async function NewProjectPage() {
  const { projects, storageReady } = await getProjectCatalog();
  const project: Project = { id: randomUUID(), slug: "", name: "", description: "", summary: "", features: [], technologies: [], images: [], website: "", logo: "", content: { type: "doc", content: [] }, featuredOrder: null, sortOrder: Math.max(-1, ...projects.map((item) => item.sortOrder)) + 1, isVisible: true };
  return <main><ProjectEditor initialProject={project} storageReady={storageReady} isNew /></main>;
}
