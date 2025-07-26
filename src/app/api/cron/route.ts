import { db } from '@/lib/db';
import { NextRequest } from 'next/server';
import { generateContent } from '@/lib/generate';
export async function GET(req: NextRequest) {
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) return new Response('Unauthorized', { status: 401 });
    try {
        const articles = await db.query.articles.findMany();
        for (const article of articles) {
            const lengths: ('SHORT' | 'MEDIUM' | 'EXPLAINED')[] = ['SHORT', 'MEDIUM', 'EXPLAINED'];
            for (const length of lengths) await generateContent(article.id, length);
            await new Promise((resolve) => setTimeout(resolve, 15000));
        }
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error in cron job:', error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
}
