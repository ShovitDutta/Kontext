import { db } from '@/lib/db';
import { desc } from 'drizzle-orm';
import { articles } from '@/lib/db/schema';
export async function GET() {
	try {
		const fetchedArticles = await db.query.articles.findMany({
			orderBy: [desc(articles.publishedAt)],
			with: {
				generatedContents: true,
			},
		});
		const uniqueArticles = [];
		const seenIds = new Set();
		for (const article of fetchedArticles) {
			if (!seenIds.has(article.id)) {
				uniqueArticles.push(article);
				seenIds.add(article.id);
			}
		}
		console.log(`📊 API returning ${uniqueArticles.length} articles`);
		return new Response(JSON.stringify(uniqueArticles), { status: 200, headers: { 'Content-Type': 'application/json' } });
	} catch (error) {
		console.error('Error in GET /api/news:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch news' }), { status: 500 });
	}
}
