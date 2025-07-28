import { db } from '@/lib/db';

import { articles } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
	try {
		const fetchedArticles = await db.query.articles.findMany({
			orderBy: [desc(articles.publishedAt)],
		});

		return new Response(JSON.stringify(fetchedArticles), { status: 200, headers: { 'Content-Type': 'application/json' } });
	} catch (error) {
		console.error('Error in GET /api/news:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch news' }), { status: 500 });
	}
}
