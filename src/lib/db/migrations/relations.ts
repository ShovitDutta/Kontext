import { relations } from "drizzle-orm/relations";
import { users, session, articles, comments, generatedContents, account } from "./schema";

export const sessionRelations = relations(session, ({one}) => ({
	user: one(users, {
		fields: [session.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	sessions: many(session),
	comments: many(comments),
	accounts: many(account),
}));

export const commentsRelations = relations(comments, ({one}) => ({
	article: one(articles, {
		fields: [comments.articleId],
		references: [articles.id]
	}),
	user: one(users, {
		fields: [comments.userId],
		references: [users.id]
	}),
}));

export const articlesRelations = relations(articles, ({many}) => ({
	comments: many(comments),
	generatedContents: many(generatedContents),
}));

export const generatedContentsRelations = relations(generatedContents, ({one}) => ({
	article: one(articles, {
		fields: [generatedContents.articleId],
		references: [articles.id]
	}),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(users, {
		fields: [account.userId],
		references: [users.id]
	}),
}));