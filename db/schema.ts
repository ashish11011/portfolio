import {
  boolean,
  index,
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

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
