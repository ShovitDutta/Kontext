import 'dotenv/config';
import { db } from '@/lib/db';
import { eq, isNull } from 'drizzle-orm';
import { generateContent } from '@/lib/generate';
import { scrapeAndStore } from '@/lib/news-scraper';
import { articles, generatedContents } from '@/lib/db/schema';
async function runNewsCron() {
	try {
		console.log('Starting news scraping cron job...');
		await scrapeAndStore();
		console.log('News scraping cron job finished successfully.');
	} catch (error) {
		console.error('Error in news scraping cron job:', error);
	}
}
async function runBlogCron(provider: 'gemini' | 'ollama' = 'gemini') {
	try {
		console.log('Starting blog generation cron job...');
		const articlesToGenerate = await db.select({ id: articles.id, title: articles.title }).from(articles).leftJoin(generatedContents, eq(articles.id, generatedContents.articleId)).where(isNull(generatedContents.id));

		console.log(`Found ${articlesToGenerate.length} articles to generate content for.`);

		for (const article of articlesToGenerate) {
			try {
				console.log(`Generating content for article: ${article.title}`);
				await generateContent(article.id, provider);
				console.log(`Finished generating content for article: ${article.title}`);
			} catch (error) {
				console.error(`Failed to generate content for article: ${article.title}`, error);
			}
		}

		console.log('Blog generation cron job finished successfully.');
	} catch (error) {
		console.error('Error in blog generation cron job:', error);
	}
}

async function main() {
	const endpoint = process.argv[2];
	const providerArg = process.argv[3] as 'gemini' | 'ollama' | undefined;

	if (endpoint) {
		if (endpoint === 'cron/news') {
			await runNewsCron();
		} else if (endpoint === 'cron/blog') {
			await runBlogCron(providerArg);
		} else {
			console.error(`Invalid endpoint: ${endpoint}. Please use 'cron/blog' or 'cron/news'.`);
		}
	} else {
		console.log('No endpoint specified, running all cron jobs.');
		await runNewsCron();
		await runBlogCron(providerArg);
	}
}
main();
