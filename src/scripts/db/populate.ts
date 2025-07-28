import 'dotenv/config';
import { z } from 'zod';
import { db } from '../../lib/db';
import { articles } from '../../lib/db/schema';
import { InferInsertModel } from 'drizzle-orm';
import { newsCategories } from '../../lib/newscat';
import { generateContent } from '../../lib/generate';
type TArticle = InferInsertModel<typeof articles>;
const NEWS_API_KEY = process.env.NEWS_API_KEY;
if (!NEWS_API_KEY) throw new Error('Missing NEWS_API_KEY in .env file');
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const newsApiArticleSchema = z.object({
	source: z.object({ id: z.string().nullable(), name: z.string() }),
	author: z.string().nullable(),
	title: z.string(),
	description: z.string().nullable(),
	url: z.url(),
	urlToImage: z.url().nullable(),
	publishedAt: z.string(),
	content: z.string().nullable(),
});
type NewsApiArticle = z.infer<typeof newsApiArticleSchema>;
const newsApiResponseSchema = z.object({ status: z.string(), totalResults: z.number(), articles: z.array(newsApiArticleSchema) });
async function fetchNews(category: string): Promise<NewsApiArticle[]> {
	const url = `${NEWS_API_URL}?category=${category}&language=en&apiKey=${NEWS_API_KEY}`;
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
		console.log(`Successfully stored ${newArticles.length} articles.`);
	} catch (error) {
		console.error('Error storing articles:', error);
	}
}
async function main() {
	console.log('Starting database population script...');
	const existingArticlesCount = await db.query.articles.findMany({ limit: 1 });
	if (existingArticlesCount.length > 0) console.log('Articles already exist in the database. Skipping API fetch and proceeding to content generation.');
	else {
		console.log('No articles found in the database. Fetching news articles from API...');
		try {
			const allCategories = newsCategories.filter((c) => c.id !== 'all').map((c) => c.id);
			const promises = allCategories.map(fetchNews);
			const results = await Promise.all(promises);
			const allArticles = results.flat();
			const articlesToStore = allArticles.map((article: NewsApiArticle) => ({
				url: article.url,
				title: article.title,
				author: article.author,
				urlToImage: article.urlToImage,
				content: article.content,
				category: allCategories.find((c) => article.url.includes(c)) || 'general',
				publishedAt: article.publishedAt ? new Date(article.publishedAt) : new Date(),
				sourceName: article.source?.name,
				description: article.description,
			}));
			await storeArticles(articlesToStore);
		} catch (error) {
			console.error('Error fetching or storing news articles:', error);
		}
	}
	console.log('Generating content for articles...');
	try {
		const allDbArticles = await db.query.articles.findMany();
		console.log(`Found ${allDbArticles.length} articles to process.`);
		for (const article of allDbArticles) {
			console.log(`Processing article: ${article.title}`);
			await generateContent(article.id);
			console.log(`  - Generated content for medium length`);
			await new Promise((resolve) => setTimeout(resolve, 10000));
		}
	} catch (error) {
		console.error('Error generating content for articles:', error);
	}
	console.log('Database population script finished.');
}
main().catch((e) => {
	console.error('An unexpected error occurred:', e);
	process.exit(1);
});
