import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
export const contentLengthEnum = pgEnum("content_length", ["SHORT", "MEDIUM", "EXPLAINED"]);
export const articles = pgTable("articles", {
    author: text("author"),
    url: text("url").unique(),
    id: text("id").primaryKey(),
    title: text("title").unique(),
    urlToImage: text("urlToImage"),
    description: text("description"),
    category: text("category").notNull(),
    sourceName: text("sourceName").notNull(),
    publishedAt: timestamp("publishedAt").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export const generatedContents = pgTable("generated_contents", {
    id: text("id").primaryKey(),
    content: text("content").notNull(),
    length: contentLengthEnum("length").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    articleId: text("articleId")
        .notNull()
        .references(() => articles.id, { onDelete: "cascade" }),
});
export const users = pgTable("users", {
    id: text("id").primaryKey(),
    name: text("name"),
    email: text("email").unique(),
    image: text("image"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export const comments = pgTable("comments", {
    id: text("id").primaryKey(),
    text: text("text").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    articleId: text("articleId")
        .notNull()
        .references(() => articles.id, { onDelete: "cascade" }),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
});
export const usersRelations = relations(users, ({ many }) => ({ comments: many(comments) }));
export const articlesRelations = relations(articles, ({ many }) => ({ generatedContents: many(generatedContents), comments: many(comments) }));
export const generatedContentsRelations = relations(generatedContents, ({ one }) => ({ article: one(articles, { fields: [generatedContents.articleId], references: [articles.id] }) }));
export const commentsRelations = relations(comments, ({ one }) => ({
    article: one(articles, { fields: [comments.articleId], references: [articles.id] }),
    user: one(users, { fields: [comments.userId], references: [users.id] }),
}));
