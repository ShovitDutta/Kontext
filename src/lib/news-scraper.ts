import { v4 as uuidv4 } from 'uuid';
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
	const searchParams = new URLSearchParams(params);
	searchParams.set('hl', 'en');
	url.search = searchParams.toString();
	const page = await browser.newPage();
	await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36');
	try {
		await page.goto(url.toString(), { timeout: 15000 });
		await page.waitForSelector('a.JtKRv', { timeout: 10000 });
		let previousHeight = -1;
		let currentHeight = await page.evaluate(() => document.body.scrollHeight);
		while (previousHeight !== currentHeight) {
			previousHeight = currentHeight;
			await page.evaluate(async () => {
				await new Promise<void>((resolve) => {
					let totalHeight = 0;
					const distance = 100;
					const timer = setInterval(() => {
						const scrollHeight = document.body.scrollHeight;
						window.scrollBy(0, distance);
						totalHeight += distance;
						if (totalHeight >= scrollHeight) {
							clearInterval(timer);
							resolve();
						}
					}, 50);
				});
			});
			await new Promise((resolve) => setTimeout(resolve, 2000));
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
			const countryDataByDate: { [date: string]: { [category: string]: ScrapedArticle[] } } = {};
			for (const [topicId, category] of Object.entries(topicCategoryMap)) {
				const [, articles] = await processCategoryWrapper(browser, countryCode, params, topicId, category);
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
						const categoryId = topicCategoryMapping[category.toUpperCase()];
						if (categoryId) {
							const values = articlesList.map((article) => ({
								id: uuidv4(),
								url: article.link,
								title: article.title,
								sourceName: article.source,
								imageUrl: article.image_link,
								publishedAt: new Date(article.datetime),
								country: countryCode,
								category: categoryId,
							}));
							if (values.length > 0) await db.insert(articles).values(values).onConflictDoNothing();
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
