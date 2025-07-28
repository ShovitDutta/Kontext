import { z } from 'zod';
import { db } from '@/lib/db';
import { eq, like, and } from 'drizzle-orm';
import { auth } from '@/../auth';
import { articles } from '@/lib/db/schema';
import { newsCategories } from '@/lib/newscat';
import { NextRequest, NextResponse } from 'next/server';

const categoryIds = newsCategories.map((c) => c.id) as [string, ...string[]];

const newsRequestSchema = z.object({
	category: z.enum(categoryIds).default('all'),
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(20),
	q: z.string().optional(),
});

export async function GET(req: NextRequest) {
	const session = await auth();
	if (!session) return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

	const { searchParams } = new URL(req.url);
	const parsed = newsRequestSchema.safeParse({
		category: searchParams.get('category') || 'all',
		page: searchParams.get('page'),
		limit: searchParams.get('limit'),
		q: searchParams.get('q'),
	});

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
			orderBy: (articles, { desc }) => [desc(articles.publishedAt)],
			limit: limit,
			offset: (page - 1) * limit,
		});

		return new Response(JSON.stringify(fetchedArticles), { status: 200, headers: { 'Content-Type': 'application/json' } });
	} catch (error) {
		console.error('Error in GET /api/news:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch news' }), { status: 500 });
	}
}
