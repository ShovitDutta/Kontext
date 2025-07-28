import { z } from 'zod';
import { db } from '@/lib/db';
import { NextRequest } from 'next/server';
import { articles } from '@/lib/db/schema';
import { InferInsertModel } from 'drizzle-orm';
import { newsCategories } from '@/lib/newscat';
type TArticle = InferInsertModel<typeof articles>;
const apiKey = process.env.NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const newsApiArticleSchema = z.object({
	url: z.url(),
	title: z.string(),
	publishedAt: z.string(),
	content: z.string().nullable(),
	urlToImage: z.url().nullable(),
	author: z.string({}).nullable(),
	description: z.string().nullable(),
	source: z.object({ id: z.string().nullable(), name: z.string() }),
});
type NewsApiArticle = z.infer<typeof newsApiArticleSchema>;
const newsApiResponseSchema = z.object({ status: z.string(), totalResults: z.number(), articles: z.array(newsApiArticleSchema) });
async function fetchNews(category: string): Promise<NewsApiArticle[]> {
	const url = `${NEWS_API_URL}?category=${category}&language=en&apiKey=${apiKey}`;
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`Failed to fetch news: ${response.statusText}`);
		const data = await response.json();
		const parsed = newsApiResponseSchema.safeParse(data);
		if (!parsed.success) {
			console.error(`Error parsing news API response for category ${category}:`, parsed.error);
			return [];
		}
		return parsed.data.articles || [];
	} catch (error) {
		console.error(`Error fetching news for category ${category}:`, error);
		return [];
	}
}
async function storeArticles(articlesToStore: Omit<TArticle, 'id'>[]) {
	if (articlesToStore.length === 0) return;
	const newArticles = articlesToStore.map((article) => ({ ...article, id: crypto.randomUUID() }));
	try {
		await db.insert(articles).values(newArticles).onConflictDoNothing();
	} catch (error) {
		console.error('Error storing articles:', error);
	}
}
export async function GET(req: NextRequest) {
	if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
		return new Response('Unauthorized', { status: 401 });
	}
	try {
		const allCategories = newsCategories.filter((c) => c.id !== 'all').map((c) => c.id);
		const promises = allCategories.map(fetchNews);
		const results = await Promise.all(promises);
		const allArticles = results.flat();
		const articlesToStore = allArticles.map((article: NewsApiArticle) => ({
			url: article.url,
			title: article.title,
			author: article.author,
			image: article.urlToImage,
			content: article.content,
			category: allCategories.find((c) => article.url.includes(c)) || 'general',
			publishedAt: article.publishedAt ? new Date(article.publishedAt) : new Date(),
			sourceName: article.source?.name,
			description: article.description,
		}));
		await storeArticles(articlesToStore);
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Error in news cron job:', error);
		return new Response(JSON.stringify({ success: false }), { status: 500 });
	}
}
