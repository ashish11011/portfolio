import "server-only";
import { cache } from "react";
import { db } from "@/dbConfig/dbConfig";
import { projectTable } from "../../db/schema";
import { sortProjects } from "./projects.catalog";

export const getProjectCatalog = cache(async () => {
  if (!process.env.DATABASE_URL) return { projects: [], storageReady: false };
  try {
    const rows = await db.select().from(projectTable);
    const projects = rows.map(({ createdAt, updatedAt, ...project }) => project);
    return { projects: sortProjects(projects), storageReady: true };
  } catch {
    return { projects: [], storageReady: false };
  }
});

export async function getPublicProjects() {
  const catalog = await getProjectCatalog();
  // Failed reads must not publish an empty static page or restore old file content.
  if (!catalog.storageReady) throw new Error("Project storage is unavailable. Check DATABASE_URL and the project table.");
  return catalog.projects.filter((project) => project.isVisible);
}

export async function getProjectBySlug(slug: string) {
  return (await getPublicProjects()).find((project) => project.slug === slug);
}
