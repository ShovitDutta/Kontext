import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, pgEnum, integer, primaryKey } from "drizzle-orm/pg-core";

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
    emailVerified: timestamp("emailVerified"),
    image: text("image"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
    })
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires").notNull(),
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires").notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
);

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

export const usersRelations = relations(users, ({ many }) => ({
    comments: many(comments),
    accounts: many(accounts),
    sessions: many(sessions),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const articlesRelations = relations(articles, ({ many }) => ({
    generatedContents: many(generatedContents),
    comments: many(comments),
}));

export const generatedContentsRelations = relations(generatedContents, ({ one }) => ({
    article: one(articles, {
        fields: [generatedContents.articleId],
        references: [articles.id],
    }),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
    article: one(articles, { fields: [comments.articleId], references: [articles.id] }),
    user: one(users, { fields: [comments.userId], references: [users.id] }),
}));
