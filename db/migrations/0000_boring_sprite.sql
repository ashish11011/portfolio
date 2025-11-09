CREATE TABLE "blogForm" (
	"user_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "blogForm_user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar,
	"email" varchar,
	"message" varchar,
	"number" varchar,
	"slug" varchar,
	"blog_id" integer,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "blog" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "blog_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar NOT NULL,
	"meta_description" varchar NOT NULL,
	"blog_category" varchar NOT NULL,
	"image" varchar NOT NULL,
	"tags" varchar[],
	"date" varchar NOT NULL,
	"data" varchar NOT NULL,
	"user_image" varchar,
	"user_name" varchar,
	"slug" varchar,
	"view_count" integer DEFAULT 0,
	"is_visible" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscribe" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "blogForm" ADD CONSTRAINT "blogForm_blog_id_blog_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "slug_index" ON "blog" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "title_index" ON "blog" USING btree ("title");