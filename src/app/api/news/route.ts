import { z } from 'zod';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { articles } from '@/lib/db/schema';
import { newsCategories } from '@/lib/newscat';
const categoryIds = newsCategories.map((c) => c.id) as [string, ...string[]];
const newsRequestSchema = z.object({ category: z.enum(categoryIds).default('all') });
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const parsed = newsRequestSchema.safeParse({ category: category || 'all' });
    if (!parsed.success) return new Response(JSON.stringify({ error: 'Invalid category', issues: parsed.error.issues }), { status: 400 });
    const validatedCategory = parsed.data.category;
    try {
        const fetchedArticles = await db.query.articles.findMany({ where: validatedCategory === 'all' ? undefined : eq(articles.category, validatedCategory), orderBy: (articles, { desc }) => [desc(articles.publishedAt)], limit: 20 });
        return new Response(JSON.stringify(fetchedArticles), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error in GET /api/news:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch news' }), { status: 500 });
    }
}
