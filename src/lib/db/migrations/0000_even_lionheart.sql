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
CREATE TABLE "comments" (
	"id" text PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"articleId" text NOT NULL,
	"userId" text NOT NULL
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
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"image" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_articleId_articles_id_fk" FOREIGN KEY ("articleId") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "generated_contents" ADD CONSTRAINT "generated_contents_articleId_articles_id_fk" FOREIGN KEY ("articleId") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;