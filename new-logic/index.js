import ora from 'ora';
import { URL } from 'url';
import fs from 'fs/promises';
import { load } from 'cheerio';
import retry from 'async-retry';
import puppeteer from 'puppeteer';
const topicCategoryMap = {
	CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp1ZEdvU0JXVnVMVWRDR2dKSlRpZ0FQAQ: 'Sports',
	CAAqKggKIiRDQkFTRlFvSUwyMHZNRFp0Y1RjU0JXVnVMVWRDR2dKSlRpZ0FQAQ: 'Health',
	CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx6TVdZU0JXVnVMVWRDR2dKSlRpZ0FQAQ: 'Science',
	CAAqKggKIiRDQkFTRlFvSUwyMHZNRGRqTVhZU0JXVnVMVWRDR2dKSlRpZ0FQAQ: 'Business',
	CAAqKggKIiRDQkFTRlFvSUwyMHZNRGx1YlY4U0JXVnVMVWRDR2dKSlRpZ0FQAQ: 'Technology',
	CAAqKggKIiRDQkFTRlFvSUwyMHZNREpxYW5RU0JXVnVMVWRDR2dKSlRpZ0FQAQ: 'Entertainment',
};
const countries = {
	IN: { hl: 'en-IN', gl: 'IN', ceid: 'IN:en' },
	US: { hl: 'en-US', gl: 'US', ceid: 'US:en' },
	GB: { hl: 'en-GB', gl: 'GB', ceid: 'GB:en' },
	CA: { hl: 'en-CA', gl: 'CA', ceid: 'CA:en' },
	AU: { hl: 'en-AU', gl: 'AU', ceid: 'AU:en' },
	DE: { hl: 'de-DE', gl: 'DE', ceid: 'DE:de' },
	FR: { hl: 'fr-FR', gl: 'FR', ceid: 'FR:fr' },
	JP: { hl: 'ja-JP', gl: 'JP', ceid: 'JP:ja' },
	BR: { hl: 'pt-BR', gl: 'BR', ceid: 'BR:pt' },
	CN: { hl: 'zh-CN', gl: 'CN', ceid: 'CN:zh' },
};
async function scrapeCategory(browser, countryCode, params, topicId, category) {
	const url = new URL(`https://news.google.com/topics/${topicId}`);
	url.search = new URLSearchParams(params).toString();
	const page = await browser.newPage();
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
			} else {
				previousCount = currentCount;
			}
		}
		const content = await page.content();
		const $ = load(content);
		const articlesList = [];
		$('article').each((_, article) => {
			const titleElement = $(article).find('a.JtKRv');
			if (!titleElement.length) return;
			const title = titleElement.text();
			const link = `https://news.google.com${titleElement.attr('href').replace(/^\./, '')}`;
			const source = $(article).find('div.vr1PYe').text() || null;
			const dateElement = $(article).find('time.hvbAAd');
			const date = dateElement.text() || null;
			const datetimeStr = dateElement.attr('datetime') || null;
			const imageElement = $(article).find('img.Quavad');
			let imageLink = null;
			if (imageElement.length) {
				const rawSrc = imageElement.attr('src');
				const match = rawSrc.match(/(.*?=)/);
				if (match) imageLink = `https://news.google.com${match[1]}`;
				else imageLink = `https://news.google.com${rawSrc}`;
			}
			const faviconElement = $(article).find('img.qEdqNd');
			const faviconLink = faviconElement.attr('src') || null;
			if (title && link && source && date && datetimeStr && imageLink && faviconLink) articlesList.push({ link, title, source, published_time: date, datetime: datetimeStr, image_link: imageLink, favicon_link: faviconLink });
		});
		return [countryCode, category, articlesList];
	} finally {
		await page.close();
	}
}
async function processCategoryWrapper(browser, countryCode, params, topicId, category, spinner) {
	try {
		const [_, __, articles] = await retry(
			async () => {
				return await scrapeCategory(browser, countryCode, params, topicId, category);
			},
			{ retries: 3, minTimeout: 2000, factor: 2 },
		);
		spinner.succeed(`${countryCode}/${category}: ${articles.length} articles`);
		return [category, articles];
	} catch (e) {
		spinner.fail(`${countryCode}/${category} failed after 3 attempts: ${e.message}`);
		return [category, null];
	}
}
async function main() {
	let newsData = {};
	try {
		const data = await fs.readFile('news.json', 'utf8');
		newsData = JSON.parse(data);
	} catch (e) {}
	const totalCountries = Object.keys(countries).length;
	let countriesDone = 0;
	const browser = await puppeteer.launch({ headless: false });
	try {
		const spinner = ora('Scraping news...').start();
		for (const [countryCode, params] of Object.entries(countries)) {
			countriesDone += 1;
			spinner.text = `Scraping ${countryCode} (${countriesDone}/${totalCountries})...`;
			const tasks = Object.entries(topicCategoryMap).map(([topicId, category]) => {
				return processCategoryWrapper(browser, countryCode, params, topicId, category, spinner);
			});
			const results = await Promise.all(tasks);
			const countryCategoryData = {};
			for (const [category, articles] of results) if (articles) countryCategoryData[category] = articles;
			if (Object.keys(countryCategoryData).length) newsData[countryCode] = countryCategoryData;
			await fs.writeFile('news.json', JSON.stringify(newsData, null, 2));
			spinner.succeed(`Data for ${countryCode} saved to news.json`);
		}
	} finally {
		await browser.close();
	}
	console.log('\nData scraped successfully and saved to news.json!');
}
main().catch(console.error);
