import { db } from '@/lib/db';
import { load } from 'cheerio';
import { countries } from './countries';
import { articles } from '@/lib/db/schema';
import puppeteer, { Browser } from 'puppeteer';
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
	url.search = new URLSearchParams(params).toString();
	const page = await browser.newPage();
	await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36');
	try {
		await page.goto(url.toString(), { timeout: 15000 });
		await page.waitForSelector('a.JtKRv', { timeout: 10000 });
		let previousCount = await page.evaluate(() => document.querySelectorAll('article').length);
		while (true) {
			await page.evaluate(() => window.scrollBy(0, 1000));
			await new Promise((resolve) => setTimeout(resolve, 1500));
			const currentCount = await page.evaluate(() => document.querySelectorAll('article').length);
			if (currentCount === previousCount) {
				await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
				await new Promise((resolve) => setTimeout(resolve, 1500));
				const finalCount = await page.evaluate(() => document.querySelectorAll('article').length);
				if (finalCount === currentCount) break;
				previousCount = finalCount;
			} else previousCount = currentCount;
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
			const datetimeStr = dateElement.attr('datetime') || null;
			const imageElement = $(article).find('img.Quavad');
			let imageLink = null;
			if (imageElement.length) {
				const rawSrc = imageElement.attr('src');
				if (rawSrc) {
					const match = rawSrc.match(/(.*?=)/);
					if (match) imageLink = `https://news.google.com${match[1]}`;
					else imageLink = `https://news.google.com${rawSrc}`;
				}
			}
			const faviconElement = $(article).find('img.qEdqNd');
			const faviconLink = faviconElement.attr('src') || null;
			if (title && link && source && datetimeStr && imageLink && faviconLink) articlesList.push({ link, title, source, published_time: datetimeStr, datetime: datetimeStr, image_link: imageLink, favicon_link: faviconLink });
		});
		return [countryCode, category, articlesList];
	} finally {
		await page.close();
	}
}
async function processCategoryWrapper(browser: Browser, countryCode: string, params: { hl: string; gl: string; ceid: string }, topicId: string, category: string): Promise<[string, ScrapedArticle[] | null]> {
	try {
		const [, , articles] = await scrapeCategory(browser, countryCode, params, topicId, category);
		console.log(`${countryCode}/${category}: ${articles.length} articles`);
		return [category, articles];
	} catch (e) {
		const error = e as Error;
		console.error(`${countryCode}/${category} failed: ${error.message}`);
		return [category, null];
	}
}
export async function scrapeAndStore() {
	const browser = await puppeteer.launch({ headless: process.env.NODE_ENV !== 'development' });
	try {
		for (const [countryCode, params] of Object.entries(countries)) {
			const results: [string, ScrapedArticle[] | null][] = [];
			for (const [topicId, category] of Object.entries(topicCategoryMap)) {
				const result = await processCategoryWrapper(browser, countryCode, params, topicId, category);
				results.push(result);
			}
			const countryDataByDate: { [date: string]: { [category: string]: ScrapedArticle[] } } = {};
			for (const [category, articles] of results) {
				if (articles) {
					for (const article of articles) {
						const dateKey = article.datetime.slice(0, 10);
						if (!dateKey.match(/^\d{4}-\d{2}-\d{2}$/)) continue;
						if (!countryDataByDate[dateKey]) countryDataByDate[dateKey] = {};
						if (!countryDataByDate[dateKey][category]) countryDataByDate[dateKey][category] = [];
						countryDataByDate[dateKey][category].push(article);
					}
				}
			}
			if (Object.keys(countryDataByDate).length) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				for (const [date, categories] of Object.entries(countryDataByDate)) {
					for (const [category, articlesList] of Object.entries(categories)) {
						for (const article of articlesList) {
							const categoryId = topicCategoryMapping[category.toUpperCase()];
							if (categoryId) await db.insert(articles).values({ id: article.link, title: article.title, sourceName: article.source, publishedAt: new Date(article.datetime), country: countryCode, category: categoryId });
						}
					}
				}
				console.log(`Data for ${countryCode} saved to database`);
			}
		}
	} finally {
		await browser.close();
	}
	console.log('\nData scraped successfully and saved to database!');
}
scrapeAndStore();
