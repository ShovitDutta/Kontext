import { JSDOM } from 'jsdom';
import { chromium } from 'playwright';
import { Readability } from '@mozilla/readability';
export async function getArticleText(url: string): Promise<string> {
	let retries = 0;
	let delay = 5000;
	const maxRetries = 5;
	while (retries < maxRetries) {
		const browser = await chromium.launch();
		const context = await browser.newContext({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36', viewport: { width: 1920, height: 1080 } });
		const page = await context.newPage();
		try {
			await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
			const html = await page.content();
			const doc = new JSDOM(html, { url });
			const reader = new Readability(doc.window.document);
			const article = reader.parse();
			if (!article || !article.textContent) throw new Error('Failed to parse article content.');
			return article.textContent;
		} catch (error) {
			console.error(`Error fetching or parsing URL content for ${url} (Attempt ${retries + 1}/${maxRetries}):`, error);
			retries++;
			if (retries < maxRetries) {
				await new Promise((resolve) => setTimeout(resolve, delay));
				delay *= 2;
			} else {
				console.error(`Max retries reached for URL: ${url}. Skipping.`);
				return '';
			}
		} finally {
			await browser.close();
		}
	}
	return '';
}
