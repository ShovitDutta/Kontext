import { relations } from "drizzle-orm/relations";
import { articles, generatedContents, comments, users } from "./schema";

export const generatedContentsRelations = relations(generatedContents, ({ one }) => ({
    article: one(articles, {
        fields: [generatedContents.articleId],
        references: [articles.id],
    }),
}));

export const articlesRelations = relations(articles, ({ many }) => ({
    generatedContents: many(generatedContents),
    comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
    article: one(articles, {
        fields: [comments.articleId],
        references: [articles.id],
    }),
    user: one(users, {
        fields: [comments.userId],
        references: [users.id],
    }),
}));

export const usersRelations = relations(users, ({ many }) => ({
    comments: many(comments),
}));
