import { db } from '@/lib/db';
import { NextRequest } from 'next/server';
import { generateContent } from '@/lib/generate';
import { articles, generatedContents } from '@/lib/db/schema';
import { eq, isNull } from 'drizzle-orm';
export async function GET(req: NextRequest) {
	if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) return new Response('Unauthorized', { status: 401 });
	try {
		console.log('Starting blog generation cron job...');
		const articlesToGenerate = await db
			.select({
				id: articles.id,
				title: articles.title,
			})
			.from(articles)
			.leftJoin(generatedContents, eq(articles.id, generatedContents.articleId))
			.where(isNull(generatedContents.id));
		console.log(`Found ${articlesToGenerate.length} articles to generate content for.`);
		for (const article of articlesToGenerate) {
			console.log(`Generating content for article: ${article.title}`);
			await generateContent(article.id);
			console.log(`Finished generating content for article: ${article.title}`);
			await new Promise((resolve) => setTimeout(resolve, 15000));
		}
		console.log('Blog generation cron job finished successfully.');
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Error in cron job:', error);
		return new Response(JSON.stringify({ success: false }), { status: 500 });
	}
}
