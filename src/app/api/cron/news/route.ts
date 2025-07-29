import { z } from 'zod';
import { db } from '@/lib/db';
import { NextRequest } from 'next/server';
import { articles } from '@/lib/db/schema';
import { InferInsertModel } from 'drizzle-orm';
import { newsCategories } from '@/lib/newscat';
import { getArticleText } from '@/lib/articleUtils';
import { supportedCountries } from '@/lib/countries';

type TArticle = InferInsertModel<typeof articles>;
const newsApiKeys = [process.env.NEWS_API_KEY_A, process.env.NEWS_API_KEY_B, process.env.NEWS_API_KEY_C, process.env.NEWS_API_KEY_D].filter((key): key is string => !!key);
if (newsApiKeys.length === 0) throw new Error('No News API keys found in environment variables (NEWS_API_KEY_A, B, C, D)');
let currentNewsKeyIndex = 0;
const getApiKey = () => {
	const apiKey = newsApiKeys[currentNewsKeyIndex];
	currentNewsKeyIndex = (currentNewsKeyIndex + 1) % newsApiKeys.length;
	return apiKey;
};

const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';
const newsApiArticleSchema = z.object({
	url: z.string(),
	title: z.string(),
	publishedAt: z.string(),
	content: z.string().nullable(),
	author: z.string({}).nullable(),
	description: z.string().nullable(),
	source: z.object({ id: z.string().nullable(), name: z.string() }),
});
type NewsApiArticle = z.infer<typeof newsApiArticleSchema>;
const newsApiResponseSchema = z.object({ status: z.string(), totalResults: z.number(), articles: z.array(newsApiArticleSchema) });

async function fetchNews(category: string, country: string, retries = 3, delay = 1000): Promise<{ articles: NewsApiArticle[]; country: string }> {
	const apiKey = getApiKey();
	console.log(`Using News API key #${currentNewsKeyIndex === 0 ? newsApiKeys.length : currentNewsKeyIndex}`);
	const url = `${NEWS_API_URL}?category=${category}&country=${country}&apiKey=${apiKey}`;
	try {
		const response = await fetch(url);
		if (!response.ok) throw new Error(`Failed to fetch news: ${response.statusText}`);
		const data = await response.json();
		const parsed = newsApiResponseSchema.safeParse(data);
		if (!parsed.success) {
			console.error(`Error parsing news API response for category ${category} in ${country}:`, parsed.error);
			return { articles: [], country };
		}
		return { articles: parsed.data.articles || [], country };
	} catch (error) {
		if (retries > 0) {
			console.log(`Retrying request for category ${category} in ${country}. Retries left: ${retries - 1}`);
			await new Promise((resolve) => setTimeout(resolve, delay));
			return fetchNews(category, country, retries - 1, delay * 2);
		} else {
			console.error(`Error fetching news for category ${category} in ${country}:`, error);
			return { articles: [], country };
		}
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

async function promisePool<T>(promiseFns: (() => Promise<T>)[], concurrency: number): Promise<T[]> {
	const results: T[] = [];
	const queue = [...promiseFns];
	const workers = new Array(concurrency).fill(null).map(() =>
		(async () => {
			while (queue.length > 0) {
				const promiseFn = queue.shift();
				if (promiseFn) {
					const result = await promiseFn();
					results.push(result);
				}
			}
		})(),
	);
	await Promise.all(workers);
	return results;
}

async function validateArticle(article: NewsApiArticle & { country: string }): Promise<(NewsApiArticle & { country: string }) | null> {
	const { title, description, content, url } = article;
	const hasTitle = title && title.trim() !== '';
	const hasDescription = description && description.trim() !== '';
	const hasContent = content && content.trim() !== '';

	if (!hasTitle || (!hasDescription && !hasContent)) {
		return null;
	}

	const articleText = await getArticleText(url);
	if (!articleText) {
		return null;
	}

	return article;
}

export async function GET(req: NextRequest) {
	if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) return new Response('Unauthorized', { status: 401 });
	try {
		console.log('Starting news cron job...');
		const allCategories = newsCategories.filter((c) => c.id !== 'all').map((c) => c.id);
		const allCountries = supportedCountries.map((c) => c.code);
		console.log(`Fetching news for ${allCountries.length} countries and ${allCategories.length} categories.`);

		const existingUrls = await db
			.select({ url: articles.url })
			.from(articles)
			.then((res) => res.map((r) => r.url));

		const fetchPromises = [];
		for (const country of allCountries) {
			for (const category of allCategories) {
				fetchPromises.push(() => fetchNews(category, country));
			}
		}

		const fetchResults = await promisePool(fetchPromises, 5);
		const allArticles = fetchResults.flatMap((result) => result.articles.map((article) => ({ ...article, country: result.country })));

		console.log(`Fetched a total of ${allArticles.length} articles.`);
		const newArticles = allArticles.filter((article) => !existingUrls.includes(article.url));
		console.log(`Found ${newArticles.length} new articles to validate.`);

		const validationPromises = newArticles.map((article) => () => validateArticle(article));
		const validationResults = await promisePool(validationPromises, 5);
		const highQualityArticles = validationResults.filter((result): result is NewsApiArticle & { country: string } => result !== null);

		console.log(`Found ${highQualityArticles.length} high-quality new articles to store.`);

		const articlesToStore = highQualityArticles.map((article) => ({
			url: article.url,
			title: article.title,
			author: article.author,
			content: article.content,
			category: allCategories.find((c) => article.url.includes(c)) || 'general',
			publishedAt: article.publishedAt ? new Date(article.publishedAt) : new Date(),
			sourceName: article.source?.name,
			description: article.description,
			country: article.country,
		}));

		await storeArticles(articlesToStore);
		console.log('News cron job finished successfully.');
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Error in news cron job:', error);
		return new Response(JSON.stringify({ success: false }), { status: 500 });
	}
}
