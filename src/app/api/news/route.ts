import { z } from 'zod';
import { db } from '@/lib/db';
import { NextRequest } from 'next/server';
import { articles } from '@/lib/db/schema';
import { eq, like, and, desc, asc } from 'drizzle-orm';
import { newsCategories } from '@/lib/newscat';

const categoryIds = newsCategories.map((c) => c.id) as [string, ...string[]];

const newsRequestSchema = z.object({
	category: z.enum(categoryIds).default('all'),
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
	q: z.string().optional(),
	sort: z.enum(['desc', 'asc']).default('desc'),
});

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const parsed = newsRequestSchema.safeParse({
		category: searchParams.get('category') || 'all',
		page: searchParams.get('page'),
		limit: searchParams.get('limit'),
		q: searchParams.get('q'),
		sort: searchParams.get('sort'),
	});

	if (!parsed.success) {
		return new Response(JSON.stringify({ error: 'Invalid query parameters', issues: parsed.error.issues }), { status: 400 });
	}

	const { category, page, limit, q, sort } = parsed.data;

	try {
		const categoryCondition = category === 'all' ? undefined : eq(articles.category, category);
		const searchCondition = q ? like(articles.title, `%${q}%`) : undefined;
		const whereCondition = and(categoryCondition, searchCondition);

		const orderBy = sort === 'asc' ? asc(articles.publishedAt) : desc(articles.publishedAt);

		const fetchedArticles = await db.query.articles.findMany({
			where: whereCondition,
			orderBy: [orderBy],
			limit: limit,
			offset: (page - 1) * limit,
		});

		return new Response(JSON.stringify(fetchedArticles), { status: 200, headers: { 'Content-Type': 'application/json' } });
	} catch (error) {
		console.error('Error in GET /api/news:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch news' }), { status: 500 });
	}
}
