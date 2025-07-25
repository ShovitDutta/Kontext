import { db } from '@/lib/db';
import { articles } from '@/lib/db/schema';
import { newsCategories } from '@/lib/news-api';
import { eq, gte, desc, and } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';
interface NewsApiArticle {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}
const VALID_FRONTEND_CATEGORIES = newsCategories.map((c) => c.id).filter((id) => id !== 'all');
async function fetchAndSaveArticles(category: { id: string }) {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
        console.error('NEWS_API_KEY is not set.');
        return;
    }
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category.id}&apiKey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'ok' && data.articles.length > 0) {
            const articlesToInsert = data.articles.filter((article: NewsApiArticle) => article.title && article.url).map((article: NewsApiArticle) => ({ id: crypto.randomUUID(), title: article.title!, url: article.url!, description: article.description, urlToImage: article.urlToImage, publishedAt: new Date(article.publishedAt!), category: category.id, sourceName: article.source.name! }));
            if (articlesToInsert.length > 0) await db.insert(articles).values(articlesToInsert).onConflictDoNothing();
        } else if (data.status !== 'ok') console.error(`NewsAPI error for category "${category.id}":`, data.message);
    } catch (error) {
        console.error(`Failed to fetch/save articles for category "${category.id}":`, error);
    }
}
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const categoryParam = searchParams.get('category') || 'all';
    if (categoryParam !== 'all' && !VALID_FRONTEND_CATEGORIES.includes(categoryParam)) return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    try {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        if (categoryParam === 'all') {
            const recentArticle = await db.query.articles.findFirst({ where: and(eq(articles.category, 'general'), gte(articles.createdAt, oneHourAgo)) });
            if (!recentArticle) {
                const categoriesToFetch = newsCategories.filter((c) => c.id !== 'all');
                await Promise.all(categoriesToFetch.map((category) => fetchAndSaveArticles(category)));
            }
        } else {
            const recentArticle = await db.query.articles.findFirst({ where: and(eq(articles.category, categoryParam), gte(articles.createdAt, oneHourAgo)) });
            if (!recentArticle) {
                const categoryObject = newsCategories.find((c) => c.id === categoryParam);
                if (categoryObject) await fetchAndSaveArticles(categoryObject);
            }
        }
        const whereClause = categoryParam === 'all' ? undefined : eq(articles.category, categoryParam);
        const result = await db.select().from(articles).where(whereClause).orderBy(desc(articles.publishedAt)).limit(50);
        return NextResponse.json(result, { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error in GET /api/news:', error);
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}