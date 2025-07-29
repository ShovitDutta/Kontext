import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { articles } from '@/lib/db/schema';
export const GET = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
	try {
		const { id } = await params;
		const article = await db.query.articles.findFirst({ where: eq(articles.id, id), with: { generatedContents: true } });
		if (!article) return NextResponse.json({ error: 'Article not found' }, { status: 404 });
		return NextResponse.json(article);
	} catch (error) {
		console.error('Error fetching article:', error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
};
