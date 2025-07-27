CREATE TYPE "public"."content_length" AS ENUM('SHORT', 'MEDIUM', 'EXPLAINED');--> statement-breakpoint
CREATE TABLE "articles" (
	"author" text,
	"url" text,
	"id" text PRIMARY KEY NOT NULL,
	"title" text,
	"urlToImage" text,
	"description" text,
	"category" text NOT NULL,
	"sourceName" text NOT NULL,
	"publishedAt" timestamp NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "articles_url_unique" UNIQUE("url"),
	CONSTRAINT "articles_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "generated_contents" (
	"id" text PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"length" "content_length" NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"articleId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "generated_contents" ADD CONSTRAINT "generated_contents_articleId_articles_id_fk" FOREIGN KEY ("articleId") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;