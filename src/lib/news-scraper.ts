import ora from 'ora';
import { db } from '@/lib/db';
import { load } from 'cheerio';
import { v4 as uuidv4 } from 'uuid';
import { articles } from '@/lib/db/schema';
import { chromium, Page } from 'playwright';
export const countries = {
	IN: { hl: 'en-IN', gl: 'IN', ceid: 'IN:en' },
	US: { hl: 'en-US', gl: 'US', ceid: 'US:en' },
	GB: { hl: 'en-GB', gl: 'GB', ceid: 'GB:en' },
	CA: { hl: 'en-CA', gl: 'CA', ceid: 'CA:en' },
	AU: { hl: 'en-AU', gl: 'AU', ceid: 'AU:en' },
};
export const topicCategoryMapping: Record<string, string> = {
	ENTERTAINMENT: 'entertainment',
	TECHNOLOGY: 'technology',
	BUSINESS: 'business',
	SCIENCE: 'science',
	SPORTS: 'sports',
	HEALTH: 'health',
};
interface ScrapedArticle {
	link: string;
	title: string;
	source: string;
	datetime: string;
	image_link: string;
	favicon_link: string;
	published_time: string;
}
const topicCategoryMap = {
	CAAqJQgKIh9DQkFTRVFvSUwyMHZNR3QwTlRFU0JXVnVMVWRDS0FBUAE: 'Health',
	CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp1ZEdvU0JXVnVMVWRDR2dKSlRpZ0FQAQ: 'Sports',
	CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp0Y1RjU0JXVnVMVWRDR2dKSlRpZ0FQAQ: 'Science',
	CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JXVnVMVWRDR2dKSlRpZ0FQAQ: 'Business',
	CAAqKggKIiRDQkFTRlFvSUwyMHZNRGRqTVhZU0JXVnVMVWRDR2dKSlRpZ0FQAQ: 'Technology',
	CAAqKggKIiRDQkFTRlFvSUwyMHZNREpxYW5RU0JXVnVMVWRDR2dKSlRpZ0FQAQ: 'Entertainment',
};
async function scrollUntilNoNewArticles(page: Page) {
	let previousCount = 0;
	let currentCount = 0;
	let scrollAttempts = 0;
	const maxScrolls = 30;
	while (scrollAttempts < maxScrolls) {
		await page.evaluate(() => window.scrollBy({ top: window.innerHeight * 1.2, behavior: 'auto' }));
		await page.waitForTimeout(800);
		currentCount = await page.evaluate(() => document.querySelectorAll('article').length);
		if (currentCount > previousCount) {
			previousCount = currentCount;
			scrollAttempts = 0;
		} else {
			scrollAttempts++;
		}
	}
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function scrapeCategory(page: Page, countryCode: string, params: { hl: string; gl: string; ceid: string }, topicId: string, category: string): Promise<ScrapedArticle[]> {
	const url = new URL(`https://news.google.com/topics/${topicId}`);
	const searchParams = new URLSearchParams(params);
	url.search = searchParams.toString();
	await page.goto(url.toString(), { timeout: 90000, waitUntil: 'domcontentloaded' });
	await page.evaluate(() => window.scrollTo(0, 0));
	await page.waitForSelector('a.JtKRv', { timeout: 15000 });
	await scrollUntilNoNewArticles(page);
	const content = await page.content();
	const $ = load(content);
	const articlesList: ScrapedArticle[] = [];
	$('article').each((_, article) => {
		const titleElement = $(article).find('a.JtKRv');
		const href = titleElement.attr('href');
		if (!titleElement.length || !href) return;
		const title = titleElement.text();
		console.log(title);
		const link = `https://news.google.com${href.replace(/^\./, '')}`;
		const source = $(article).find('div.vr1PYe').text() || null;
		const dateElement = $(article).find('time.hvbAAd');
		const datetimeStr = dateElement.attr('datetime') || new Date().toISOString();
		const imageElement = $(article).find('img.Quavad');
		let imageLink = '';
		if (imageElement.length) {
			const rawSrc = imageElement.attr('src');
			if (rawSrc) {
				const match = rawSrc.match(/(.*?=)/);
				imageLink = `https://news.google.com${match ? match[1] : rawSrc}`;
			}
		}
		const faviconElement = $(article).find('img.qEdqNd');
		const faviconLink = faviconElement.attr('src') || '';
		if (title && link && source) {
			articlesList.push({ link, title, source, datetime: datetimeStr, published_time: datetimeStr, image_link: imageLink, favicon_link: faviconLink });
		}
	});
	return articlesList;
}
async function processCategory(page: Page, countryCode: string, params: { hl: string; gl: string; ceid: string }, topicId: string, category: string): Promise<{ country: string; category: string; articles: ScrapedArticle[] } | null> {
	try {
		const articles = await scrapeCategory(page, countryCode, params, topicId, category);
		return { country: countryCode, category, articles };
	} catch (e) {
		console.error(`${countryCode}/${category} failed: ${(e as Error).message}`);
		return null;
	}
}
function randomDelay(min = 1000, max = 3000) {
	return new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * (max - min) + min)));
}
async function retryWithBackoff<T>(fn: () => Promise<T>, retries = 3, delay = 800, factor = 2): Promise<T> {
	try {
		return await fn();
	} catch (error) {
		if (retries <= 0) throw error;
		await new Promise((res) => setTimeout(res, delay));
		return retryWithBackoff(fn, retries - 1, delay * factor, factor);
	}
}
export async function scrapeAndStore() {
	const spinner = ora('Scraping news articles...').start();
	const allResults: Record<string, Record<string, Record<string, ScrapedArticle[]>>> = {};

	try {
		for (const [countryCode, params] of Object.entries(countries)) {
			for (const [topicId, category] of Object.entries(topicCategoryMap)) {
				spinner.text = `Scraping ${countryCode}/${category}`;
				const isDevelopment = process.env.NODE_ENV === 'development';
				const browser = await chromium.launch({
					headless: isDevelopment,
					args: isDevelopment ? [] : ['--start-fullscreen'],
				});
				const context = await browser.newContext({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36', viewport: { width: 1920, height: 1080 } });
				const page = await context.newPage();
				try {
					const result = await retryWithBackoff(() => processCategory(page, countryCode, params, topicId, category), 3);
					await randomDelay();
					if (result) {
						const { country, category: resultCategory, articles } = result;
						for (const article of articles) {
							const dateKey = article.datetime.slice(0, 10);
							if (!dateKey.match(/^\d{4}-\d{2}-\d{2}$/)) continue;
							if (!allResults[country]) allResults[country] = {};
							if (!allResults[country][dateKey]) allResults[country][dateKey] = {};
							if (!allResults[country][dateKey][resultCategory]) allResults[country][dateKey][resultCategory] = [];
							allResults[country][dateKey][resultCategory].push(article);
						}
					}
				} finally {
					await page.close();
					await context.close();
					await browser.close();
				}
			}
		}

		for (const [country, dates] of Object.entries(allResults)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			for (const [date, categories] of Object.entries(dates)) {
				for (const [category, articlesList] of Object.entries(categories)) {
					const categoryId = topicCategoryMapping[category.toUpperCase()];
					if (categoryId) {
						const values = articlesList.map((article) => ({ id: uuidv4(), url: article.link, title: article.title, sourceName: article.source, imageUrl: article.image_link, publishedAt: new Date(article.datetime), country: country, category: categoryId }));
						if (values.length > 0) await db.insert(articles).values(values).onConflictDoNothing();
					}
				}
			}
		}
	} finally {
		spinner.succeed('✅ Scraping complete!');
	}
}
