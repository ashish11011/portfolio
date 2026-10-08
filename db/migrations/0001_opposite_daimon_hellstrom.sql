CREATE TABLE "project" (
	"id" varchar(150) PRIMARY KEY NOT NULL,
	"slug" varchar(150) NOT NULL,
	"name" varchar(200) NOT NULL,
	"description" varchar NOT NULL,
	"summary" varchar DEFAULT '' NOT NULL,
	"features" varchar[] DEFAULT '{}' NOT NULL,
	"technologies" varchar[] DEFAULT '{}' NOT NULL,
	"images" varchar[] DEFAULT '{}' NOT NULL,
	"website" varchar DEFAULT '' NOT NULL,
	"logo" varchar DEFAULT '' NOT NULL,
	"content" jsonb DEFAULT '{"type":"doc","content":[]}'::jsonb NOT NULL,
	"featured_order" integer,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_visible" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "project_slug_unique" UNIQUE("slug")
);
