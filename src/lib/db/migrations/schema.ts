import { pgTable, foreignKey, text, timestamp, unique, primaryKey, integer, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const contentLength = pgEnum("content_length", ['SHORT', 'MEDIUM', 'EXPLAINED'])


export const session = pgTable("session", {
	sessionToken: text().primaryKey().notNull(),
	userId: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "session_userId_users_id_fk"
		}).onDelete("cascade"),
]);

export const users = pgTable("users", {
	id: text().primaryKey().notNull(),
	name: text(),
	email: text(),
	image: text(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	emailVerified: timestamp({ mode: 'string' }),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const articles = pgTable("articles", {
	author: text(),
	url: text(),
	id: text().primaryKey().notNull(),
	title: text(),
	urlToImage: text(),
	description: text(),
	category: text().notNull(),
	sourceName: text().notNull(),
	publishedAt: timestamp({ mode: 'string' }).notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("articles_url_unique").on(table.url),
	unique("articles_title_unique").on(table.title),
]);

export const comments = pgTable("comments", {
	id: text().primaryKey().notNull(),
	text: text().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	articleId: text().notNull(),
	userId: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.articleId],
			foreignColumns: [articles.id],
			name: "comments_articleId_articles_id_fk"
		}).onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "comments_userId_users_id_fk"
		}).onDelete("cascade"),
]);

export const generatedContents = pgTable("generated_contents", {
	id: text().primaryKey().notNull(),
	content: text().notNull(),
	length: contentLength().notNull(),
	createdAt: timestamp({ mode: 'string' }).defaultNow().notNull(),
	articleId: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.articleId],
			foreignColumns: [articles.id],
			name: "generated_contents_articleId_articles_id_fk"
		}).onDelete("cascade"),
]);

export const verificationToken = pgTable("verificationToken", {
	identifier: text().notNull(),
	token: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
}, (table) => [
	primaryKey({ columns: [table.identifier, table.token], name: "verificationToken_identifier_token_pk"}),
]);

export const account = pgTable("account", {
	userId: text().notNull(),
	type: text().notNull(),
	provider: text().notNull(),
	providerAccountId: text().notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text(),
	idToken: text("id_token"),
	sessionState: text("session_state"),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "account_userId_users_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.provider, table.providerAccountId], name: "account_provider_providerAccountId_pk"}),
]);
