import { z } from 'zod';
import { db } from '@/lib/db';
import { NextRequest } from 'next/server';
import { articles } from '@/lib/db/schema';
import { eq, like, and, desc } from 'drizzle-orm';
import { newsCategories } from '@/lib/newscat';

const categoryIds = newsCategories.map((c) => c.id) as [string, ...string[]];

const newsRequestSchema = z.object({
	category: z.enum(categoryIds).default('all'),
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
	q: z.string().optional(),
});

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const queryParams = Object.fromEntries(searchParams.entries());
	const parsed = newsRequestSchema.safeParse(queryParams);

	if (!parsed.success) {
		return new Response(JSON.stringify({ error: 'Invalid query parameters', issues: parsed.error.issues }), { status: 400 });
	}

	const { category, page, limit, q } = parsed.data;

	try {
		const categoryCondition = category === 'all' ? undefined : eq(articles.category, category);
		const searchCondition = q ? like(articles.title, `%${q}%`) : undefined;

		const whereCondition = and(categoryCondition, searchCondition);

		const fetchedArticles = await db.query.articles.findMany({
			where: whereCondition,
			orderBy: [desc(articles.publishedAt)],
			limit: limit,
			offset: (page - 1) * limit,
		});

		return new Response(JSON.stringify(fetchedArticles), { status: 200, headers: { 'Content-Type': 'application/json' } });
	} catch (error) {
		console.error('Error in GET /api/news:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch news' }), { status: 500 });
	}
}
