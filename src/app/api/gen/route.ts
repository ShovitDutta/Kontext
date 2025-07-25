import { z } from 'zod';
import { db } from '@/lib/db';
import { eq, and } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { generateContent } from '@/lib/generate';
import { contentLengthEnum, generatedContents } from '@/lib/db/schema';
const generateRequestSchema = z.object({ articleId: z.string(), length: z.enum(contentLengthEnum.enumValues) });
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = generateRequestSchema.safeParse(body);
        if (!parsed.success) return new Response(JSON.stringify({ error: 'Invalid request body', issues: parsed.error.issues }), { status: 400 });
        const { articleId, length } = parsed.data;
        await generateContent(articleId, length);
        const newContent = await db.query.generatedContents.findFirst({ where: and(eq(generatedContents.articleId, articleId), eq(generatedContents.length, length)) });
        return new Response(JSON.stringify({ content: newContent?.content }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error in POST /api/generate-blog:', error);
        return new Response(JSON.stringify({ error: 'Failed to generate content' }), { status: 500 });
    }
}
