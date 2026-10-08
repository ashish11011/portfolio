import { notFound } from "next/navigation";
import { ProjectEditor } from "@/components/project-editor";
import { getProjectCatalog } from "@/lib/projects.repository";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { projects, storageReady } = await getProjectCatalog();
  const id = (await params).id;
  const initialProject = projects.find((item) => item.id === id);
  if (!initialProject) notFound();
  return <main><ProjectEditor key={id} initialProject={initialProject} storageReady={storageReady} /></main>;
}
