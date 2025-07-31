import { db } from '@/lib/db';
import Parser from 'rss-parser';
import { NextRequest } from 'next/server';
import { articles } from '@/lib/db/schema';
import { InferInsertModel } from 'drizzle-orm';
import { newsCategories, categoryTopicMapping } from '@/lib/newscat';
import { supportedCountries, countryCodeMapping } from '@/lib/countries';

type TArticle = InferInsertModel<typeof articles>;
const parser = new Parser();

// Interface for processed articles from Google News RSS

interface ProcessedArticle {
	title: string;
	link: string;
	source: string;
	pubDate: string | null;
	isoDate?: string | null;
	snippet?: string | null;
	country: string;
	category: string;
}

const getDateKey = (dateStr: string | null): string | null => {
	if (!dateStr) return null;
	const date = new Date(dateStr);
	return isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
};

async function fetchGoogleNewsRSS(category: string, country: string, retries = 3, delay = 1000): Promise<ProcessedArticle[]> {
	// Convert internal category to Google News topic
	const topicName = categoryTopicMapping[category] || 'WORLD';
	// Convert internal country code to Google News country code
	const googleCountryCode = countryCodeMapping[country] || 'IN';

	const url = `https://news.google.com/rss/headlines/section/topic/${topicName}?hl=en-${googleCountryCode}&gl=${googleCountryCode}&ceid=${googleCountryCode}:en`;

	try {
		console.log(`Fetching Google News RSS for ${category}/${country}: ${url}`);
		const feed = await parser.parseURL(url);
		const seen = new Set<string>();
		const articles: ProcessedArticle[] = [];

		for (const item of feed.items) {
			const link = item.link || '';
			const title = item.title || '';
			const pubDate = item.pubDate || null;
			const dateKey = getDateKey(pubDate);

			if (!dateKey || !title || !link) continue;

			// Extract source from item
			let source = 'Unknown';
			if (typeof item.source === 'string') {
				source = item.source;
			} else if (item.source?.title) {
				source = item.source.title;
			} else if (link) {
				try {
					source = new URL(link).hostname;
				} catch {
					source = 'Unknown';
				}
			}

			// Create unique key to avoid duplicates
			const uniqueKey = `${title}-${source}`.toLowerCase().trim();
			if (seen.has(uniqueKey)) continue;
			seen.add(uniqueKey);

			articles.push({
				title,
				link,
				source,
				pubDate,
				snippet: item.contentSnippet || null,
				isoDate: (item as { isoDate?: string }).isoDate || null,
				country,
				category,
			});
		}

		console.log(`Fetched ${articles.length} articles for ${category}/${country}`);
		return articles;
	} catch (error) {
		if (retries > 0) {
			console.log(`Retrying RSS request for ${category}/${country}. Retries left: ${retries - 1}`);
			await new Promise((resolve) => setTimeout(resolve, delay));
			return fetchGoogleNewsRSS(category, country, retries - 1, delay * 2);
		} else {
			console.error(`Error fetching RSS for ${category}/${country}:`, (error as Error).message);
			return [];
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

async function validateArticle(article: ProcessedArticle): Promise<ProcessedArticle | null> {
	const { title, link } = article;
	const hasTitle = title && title.trim() !== '';
	const hasLink = link && link.trim() !== '';

	if (!hasTitle || !hasLink) {
		return null;
	}

	// Skip content validation - just check basic required fields
	return article;
}

export async function GET(req: NextRequest) {
	if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) return new Response('Unauthorized', { status: 401 });
	try {
		console.log('Starting Google News RSS cron job...');
		const allCategories = newsCategories.filter((c) => c.id !== 'all' && categoryTopicMapping[c.id]).map((c) => c.id);
		const allCountries = supportedCountries.filter((c) => c.code !== 'none' && countryCodeMapping[c.code]).map((c) => c.code);
		console.log(`Fetching news for ${allCountries.length} countries and ${allCategories.length} categories.`);

		const existingUrls = await db
			.select({ url: articles.url })
			.from(articles)
			.then((res) => res.map((r) => r.url));

		const fetchPromises = [];
		for (const country of allCountries) {
			for (const category of allCategories) {
				fetchPromises.push(() => fetchGoogleNewsRSS(category, country));
			}
		}

		const fetchResults = await promisePool(fetchPromises, 3); // Reduced concurrency for RSS
		const allArticles = fetchResults.flat();

		console.log(`Fetched a total of ${allArticles.length} articles.`);
		const newArticles = allArticles.filter((article) => !existingUrls.includes(article.link));
		console.log(`Found ${newArticles.length} new articles to validate.`);

		const validationPromises = newArticles.map((article) => () => validateArticle(article));
		const validationResults = await promisePool(validationPromises, 3);
		const highQualityArticles = validationResults.filter((result): result is ProcessedArticle => result !== null);

		console.log(`Found ${highQualityArticles.length} high-quality new articles to store.`);

		const articlesToStore = highQualityArticles.map((article) => ({
			url: article.link,
			title: article.title,
			author: null, // Google News RSS doesn't typically provide author info
			category: article.category,
			publishedAt: article.pubDate ? new Date(article.pubDate) : new Date(),
			sourceName: article.source,
			description: article.snippet,
			country: article.country,
		}));

		await storeArticles(articlesToStore);
		console.log('Google News RSS cron job finished successfully.');
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Error in Google News RSS cron job:', error);
		return new Response(JSON.stringify({ success: false }), { status: 500 });
	}
}
