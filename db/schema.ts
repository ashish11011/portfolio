import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import type { ProjectDocument } from "../src/types/project";

export const projectTable = pgTable("project", {
  id: varchar("id", { length: 150 }).primaryKey(),
  slug: varchar("slug", { length: 150 }).notNull().unique(),
  name: varchar("name", { length: 200 }).notNull(),
  description: varchar("description").notNull(),
  summary: varchar("summary").notNull().default(""),
  features: varchar("features").array().notNull().default([]),
  technologies: varchar("technologies").array().notNull().default([]),
  images: varchar("images").array().notNull().default([]),
  website: varchar("website").notNull().default(""),
  logo: varchar("logo").notNull().default(""),
  content: jsonb("content").$type<ProjectDocument>().notNull().default({ type: "doc", content: [] }),
  featuredOrder: integer("featured_order"),
  sortOrder: integer("sort_order").notNull().default(0),
  isVisible: boolean("is_visible").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const blogTable = pgTable(
  "blog",
  {
    id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
    title: varchar("title").notNull(),
    metaDescription: varchar("meta_description").notNull(),
    blogCategory: varchar("blog_category").notNull(),
    image: varchar("image").notNull(),
    tags: varchar("tags").array(),
    date: varchar("date").notNull(),
    data: varchar("data").notNull(),
    userImage: varchar("user_image"),
    userName: varchar("user_name"),
    slug: varchar("slug"),
    viewCount: integer("view_count").default(0),
    isVisible: boolean("is_visible").notNull().default(true),
  },
  (table) => ({
    slugIndex: index("slug_index").on(table.slug),
    titleIndex: index("title_index").on(table.title),
  })
);

export const blogForm = pgTable("blogForm", {
  id: integer("user_id").generatedAlwaysAsIdentity().primaryKey(),
  name: varchar("name"),
  email: varchar("email"),
  message: varchar("message"),
  number: varchar("number"),
  slug: varchar("slug"),
  blogId: integer("blog_id").references(() => blogTable.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const subscribe = pgTable("subscribe", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email"),
  createdAt: timestamp("created_at").defaultNow(),
});
