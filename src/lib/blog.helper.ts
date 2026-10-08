"use server";
import { desc, eq, count, not, and, like, ilike } from "drizzle-orm";
import { blogForm, blogTable } from "../../db/schema";
import { db } from "@/dbConfig/dbConfig";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "./admin-auth";

async function requireBlogAdmin() {
  if (!(await isAdminAuthenticated())) throw new Error("Please sign in to the admin panel before changing blogs.");
}

function refreshBlogPages(slug?: string | null) {
  revalidatePath("/admin");
  revalidatePath("/blog");
  revalidatePath("/blog/page/[page]", "page");
  if (slug) revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");
}

function createSlug(title: string) {
  return title
    .toLowerCase() // Convert title to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/[^a-z0-9\s-]/g, "") // Remove any characters that aren't letters, numbers, spaces, or hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Remove consecutive hyphens
}

export async function insertBlog({
  title = "",
  metaDescription = "",
  blogCategory = "",
  image = "",
  tags = [],
  date = "",
  data = "",
  userImage = "",
  userName = "",
  isVisible = true,
}) {
  await requireBlogAdmin();
  var slug = createSlug(title);
  const isSlugExist = await db
    .select()
    .from(blogTable)
    .where(eq(blogTable.slug, slug));
  if (isSlugExist.length > 0) {
    slug = `${slug}-${isSlugExist.length + 1}`;
  }
  const response = await db
    .insert(blogTable)
    .values({
      title,
      metaDescription,
      blogCategory,
      image,
      tags,
      date: JSON.stringify(date),
      data,
      userImage,
      userName,
      isVisible,
      slug,
    })
    .returning();
  refreshBlogPages(slug);

  return response;
}

export async function getAllBlogsMetaDeta() {
  const data = await db.select().from(blogTable).orderBy(desc(blogTable.date));
  return data;
}

export async function getAllBlogsBySearch(value: any) {
  const data = await db
    .select()
    .from(blogTable)
    .where(like(blogTable.blogCategory, `%${value}%`));
  return data;
}

export async function getAllBlogsByPage({
  page = 1,
  limit = 7,
  selectedCategory,
  search,
}: any) {
  const offsetValue = (page - 1) * limit;

  try {
    const [blogCountResult, blogs] = await Promise.all([
      db
        .select({ count: count() })
        .from(blogTable)
        .where(
          and(
            selectedCategory
              ? eq(blogTable.blogCategory, selectedCategory)
              : undefined,
            search ? ilike(blogTable.title, `%${search}%`) : undefined,

            eq(blogTable.isVisible, true)
          )
        ),

      db
        .select({
          id: blogTable.id,
          blogCategory: blogTable.blogCategory,
          title: blogTable.title,
          metaDescription: blogTable.metaDescription,
          image: blogTable.image,
          userName: blogTable.userName,
          slug: blogTable.slug,
          date: blogTable.date,
        })
        .from(blogTable)
        .where(
          and(
            selectedCategory
              ? eq(blogTable.blogCategory, selectedCategory)
              : undefined,
            search ? ilike(blogTable.title, `%${search}%`) : undefined,

            eq(blogTable.isVisible, true)
          )
        )
        .orderBy(desc(blogTable.date))
        .limit(limit)
        .offset(offsetValue),
    ]);

    const totalBlogs = Number(blogCountResult[0].count);

    return {
      data: blogs,
      total: totalBlogs,
      page,
      totalPages: Math.ceil(totalBlogs / limit),
    };
  } catch (error: any) {
    console.log({ flag: 0, message: error.message });
  }
}

export async function getBlogBySlug(slug: any) {
  const data = await db
    .select()
    .from(blogTable)
    .where(eq(blogTable.slug, slug));
  return data;
}

export async function getRelatedBlogs(id: any) {
  const data = await db
    .select()
    .from(blogTable)
    .where(not(eq(blogTable.id, id)))
    .limit(3);
  return data;
}

export async function getAdminBlogData(blogValue: any) {
  const blogvalue = blogValue || 10;
  return await db
    .select({
      id: blogTable.id,
      title: blogTable.title,
      blogCategory: blogTable.blogCategory,
      userName: blogTable.userName,
      isVisible: blogTable.isVisible,
      date: blogTable.date,
      slug: blogTable.slug,
    })
    .from(blogTable)
    .limit(blogvalue)
    .orderBy(desc(blogTable.date));
}

export async function getAdminBlogDataCount() {
  return await db.select({ count: count() }).from(blogTable);
}

export async function updateBlogByID({
  title = "",
  metaDescription = "",
  blogCategory = "",
  image = "",
  tags = [],
  date = "",
  data = "",
  userImage = "",
  userName = "",
  slug = "",
  isVisible = true,
}) {
  await requireBlogAdmin();
  const response = await db
    .update(blogTable)
    .set({
      title,
      metaDescription,
      blogCategory,
      image,
      tags,
      date: JSON.stringify(date),
      data,
      userImage,
      userName,
      isVisible,
      slug,
    })
    .where(eq(blogTable.slug, slug))
    .returning();

  refreshBlogPages(slug);

  return response;
}

export async function toggleBlogVisibility(id: any, isVisible = true) {
  await requireBlogAdmin();
  const response = await db
    .update(blogTable)
    .set({
      isVisible: isVisible,
    })
    .where(eq(blogTable.id, id))
    .returning({ isVisible: blogTable.isVisible, slug: blogTable.slug });

  refreshBlogPages(response[0]?.slug);

  return response;
}

export async function submitBlogForm(data: any) {
  const response = await db.insert(blogForm).values(data).returning();
  revalidatePath("/admin");
  return response;
}

export async function getBlogFormData() {
  const data = await db.select().from(blogForm);
  return data;
}
