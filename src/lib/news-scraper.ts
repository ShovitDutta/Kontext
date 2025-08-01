import { db } from '@/lib/db';
import { load } from 'cheerio';
import { v4 as uuidv4 } from 'uuid';
import { countries } from './countries';
import { articles } from '@/lib/db/schema';
import { chromium, Browser } from 'playwright';
import { topicCategoryMapping } from './newscat';
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
	CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp1ZEdvU0JXVnVMVWRDR2dKSlRpZ0FQAQ: 'Sports',
	CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp0Y1RjU0JXVnVMVWRDR2dKSlRpZ0FQAQ: 'Health',
	CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JXVnVMVWRDR2dKSlRpZ0FQAQ: 'Science',
	CAAqKggKIiRDQkFTRlFvSUwyMHZNRGRqTVhZU0JXVnVMVWRDR2dKSlRpZ0FQAQ: 'Business',
	CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx1YlY4U0JXVnVMVWRDR2dKSlRpZ0FQAQ: 'Technology',
	CAAqKggKIiRDQkFTRlFvSUwyMHZNREpxYW5RU0JXVnVMVWRDR2dKSlRpZ0FQAQ: 'Entertainment',
};
async function scrapeCategory(browser: Browser, countryCode: string, params: { hl: string; gl: string; ceid: string }, topicId: string, category: string): Promise<[string, string, ScrapedArticle[]]> {
	const url = new URL(`https://news.google.com/topics/${topicId}`);
	const searchParams = new URLSearchParams(params);
	searchParams.set('hl', 'en');
	url.search = searchParams.toString();
	const context = await browser.newContext({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36' });
	const page = await context.newPage();
	try {
		await page.goto(url.toString(), { timeout: 15000, waitUntil: 'networkidle' });
		let previousHeight = -1;
		let currentHeight = await page.evaluate(() => document.body.scrollHeight);
		while (previousHeight !== currentHeight) {
			previousHeight = currentHeight;
			await page.evaluate(() => window.scrollBy(0, document.body.scrollHeight));
			await page.waitForTimeout(2000);
			currentHeight = await page.evaluate(() => document.body.scrollHeight);
		}
		const content = await page.content();
		const $ = load(content);
		const articlesList: ScrapedArticle[] = [];
		$('article').each((_, article) => {
			const titleElement = $(article).find('a.JtKRv');
			const href = titleElement.attr('href');
			if (!titleElement.length || !href) return;
			const title = titleElement.text();
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
			if (title && link && source) articlesList.push({ link, title, source, datetime: datetimeStr, published_time: datetimeStr, image_link: imageLink, favicon_link: faviconLink });
		});
		return [countryCode, category, articlesList];
	} finally {
		await page.close();
		await context.close();
	}
}
async function processCategoryWrapper(browser: Browser, countryCode: string, params: { hl: string; gl: string; ceid: string }, topicId: string, category: string, retries = 3): Promise<[string, ScrapedArticle[] | null]> {
	try {
		const [, , articles] = await scrapeCategory(browser, countryCode, params, topicId, category);
		console.log(`${countryCode}/${category}: ${articles.length} articles`);
		return [category, articles];
	} catch (e) {
		if (retries > 0) {
			console.warn(`${countryCode}/${category} failed, retrying... (${retries} left)`);
			await new Promise((resolve) => setTimeout(resolve, 2000));
			return processCategoryWrapper(browser, countryCode, params, topicId, category, retries - 1);
		}
		console.error(`${countryCode}/${category} failed after retries: ${(e as Error).message}`);
		return [category, null];
	}
}
function randomDelay(min = 1000, max = 5000) {
	return new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * (max - min) + min)));
}
export async function scrapeAndStore() {
	const browser = await chromium.launch({ headless: false });
	try {
		for (const [countryCode, params] of Object.entries(countries)) {
			const countryDataByDate: { [date: string]: { [category: string]: ScrapedArticle[] } } = {};
			const categoryPromises = Object.entries(topicCategoryMap).map(([topicId, category]) => processCategoryWrapper(browser, countryCode, params, topicId, category));
			const categoryResults = await Promise.allSettled(categoryPromises);
			for (const result of categoryResults) {
				if (result.status === 'fulfilled' && result.value[1]) {
					const [category, articles] = result.value;
					for (const article of articles) {
						const dateKey = article.datetime.slice(0, 10);
						if (!dateKey.match(/^\d{4}-\d{2}-\d{2}$/)) continue;
						if (!countryDataByDate[dateKey]) countryDataByDate[dateKey] = {};
						if (!countryDataByDate[dateKey][category]) countryDataByDate[dateKey][category] = [];
						countryDataByDate[dateKey][category].push(article);
					}
				}
			}
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			for (const [date, categories] of Object.entries(countryDataByDate)) {
				for (const [category, articlesList] of Object.entries(categories)) {
					const categoryId = topicCategoryMapping[category.toUpperCase()];
					if (categoryId) {
						const values = articlesList.map((article) => ({ id: uuidv4(), url: article.link, title: article.title, sourceName: article.source, imageUrl: article.image_link, publishedAt: new Date(article.datetime), country: countryCode, category: categoryId }));
						if (values.length > 0) await db.insert(articles).values(values).onConflictDoNothing();
					}
				}
			}
			console.log(`Data for ${countryCode} saved to database`);
			await randomDelay();
		}
	} finally {
		await browser.close();
	}
	console.log('\nData scraped successfully and saved to database!');
}
