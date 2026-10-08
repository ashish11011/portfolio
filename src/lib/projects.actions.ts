"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/dbConfig/dbConfig";
import { projectTable } from "../../db/schema";
import { isAdminAuthenticated } from "./admin-auth";
import { getProjectCatalog } from "./projects.repository";
import { projectSlugTaken } from "./projects.catalog";
import { validateProject } from "./projects.validation";
import type { ProjectSaveResult } from "@/types/project";

export async function saveProject(input: unknown): Promise<ProjectSaveResult> {
  if (!(await isAdminAuthenticated())) return { success: false, message: "Please sign in to the admin panel before saving." };
  let project;
  try { project = validateProject(input); } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : "Please check the project fields." };
  }
  const catalog = await getProjectCatalog();
  if (!catalog.storageReady) return { success: false, message: "Project storage is unavailable. Configure the project database before saving changes." };
  if (projectSlugTaken(catalog.projects, project.slug, project.id)) return { success: false, message: "Another project already uses this URL. Choose a different slug." };
  const oldSlug = catalog.projects.find((item) => item.id === project.id)?.slug;
  try {
    await db.insert(projectTable).values(project).onConflictDoUpdate({
      target: projectTable.id,
      set: { ...project, updatedAt: new Date() },
    });
  } catch (error) {
    const code = (error as { cause?: { code?: string }; code?: string }).cause?.code || (error as { code?: string }).code;
    return { success: false, message: code === "23505" ? "Another project already uses this URL." : "Couldn’t save this project. Check the database connection and try again." };
  }
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);
  if (oldSlug && oldSlug !== project.slug) revalidatePath(`/projects/${oldSlug}`);
  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${project.id}`);
  revalidatePath("/sitemap.xml");
  return { success: true, project };
}
