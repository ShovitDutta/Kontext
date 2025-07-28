import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, integer, primaryKey } from 'drizzle-orm/pg-core';
export const articles = pgTable('articles', {
	author: text('author'),
	url: text('url').unique(),
	id: text('id').primaryKey(),
	title: text('title').unique(),
	urlToImage: text('urlToImage'),
	description: text('description'),
	category: text('category').notNull(),
	sourceName: text('sourceName').notNull(),
	publishedAt: timestamp('publishedAt').notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
});
export const generatedContents = pgTable('generated_contents', {
	id: text('id').primaryKey(),
	content: text('content').notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	articleId: text('articleId')
		.notNull()
		.references(() => articles.id, { onDelete: 'cascade' }),
});
export const articlesRelations = relations(articles, ({ many }) => ({ generatedContents: many(generatedContents) }));
export const generatedContentsRelations = relations(generatedContents, ({ one }) => ({ article: one(articles, { fields: [generatedContents.articleId], references: [articles.id] }) }));
export const users = pgTable('user', { id: text('id').primaryKey(), name: text('name'), email: text('email'), emailVerified: timestamp('emailVerified', { mode: 'date' }), image: text('image') });
export const accounts = pgTable(
	'account',
	{ userId: text('userId').notNull(), type: text('type').notNull(), provider: text('provider').notNull(), providerAccountId: text('providerAccountId').notNull(), refresh_token: text('refresh_token'), access_token: text('access_token'), expires_at: integer('expires_at'), token_type: text('token_type'), scope: text('scope'), id_token: text('id_token'), session_state: text('session_state') },
	(account) => ({ compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }) }),
);
export const sessions = pgTable('session', { sessionToken: text('sessionToken').primaryKey(), userId: text('userId').notNull(), expires: timestamp('expires', { mode: 'date' }).notNull() });
export const verificationTokens = pgTable('verificationToken', { identifier: text('identifier').notNull(), token: text('token').notNull(), expires: timestamp('expires', { mode: 'date' }).notNull() }, (vt) => ({ compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }) }));