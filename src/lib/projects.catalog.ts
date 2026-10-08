import type { Project } from "@/types/project";

export function sortProjects(projects: Project[]) {
  return [...projects].sort((first, second) => first.sortOrder - second.sortOrder || first.name.localeCompare(second.name));
}

export function projectSlugTaken(projects: Project[], slug: string, id: string) {
  return projects.some((project) => project.slug === slug && project.id !== id);
}
