import { db } from '@/lib/db';
import { NextRequest } from 'next/server';
import { promptBuilder } from '@/lib/prompts';
import { contentLengthEnum, generatedContents, articles } from '@/lib/db/schema';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { eq, and } from 'drizzle-orm';

const getApiKeyForLength = (length: (typeof contentLengthEnum.enumValues)[number]) => {
    switch (length) {
        case 'EXPLAINED':
            return process.env.GEMINI_API_KEY_A!;
        case 'MEDIUM':
            return process.env.GEMINI_API_KEY_B!;
        case 'SHORT':
            return process.env.GEMINI_API_KEY_C!;
        default:
            return process.env.GEMINI_API_KEY_A!;
    }
};

async function getArticleText(url: string): Promise<string> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch article: ${response.statusText}`);
        }
        return await response.text();
    } catch (error) {
        console.error(`Error fetching URL content: ${error}`);
        return '';
    }
}

export async function POST(req: NextRequest) {
    try {
        const { articleId, length } = await req.json();
        if (!articleId || !length) return new Response(JSON.stringify({ error: 'Missing articleId or length' }), { status: 400 });
        const validLengths: typeof contentLengthEnum.enumValues = ['SHORT', 'MEDIUM', 'EXPLAINED'];
        if (!validLengths.includes(length)) return new Response(JSON.stringify({ error: 'Invalid length' }), { status: 400 });

        const existingContent = await db.query.generatedContents.findFirst({
            where: and(eq(generatedContents.articleId, articleId), eq(generatedContents.length, length)),
        });

        if (existingContent) return new Response(JSON.stringify({ content: existingContent.content }), { status: 200, headers: { 'Content-Type': 'application/json' } });

        const article = await db.query.articles.findFirst({
            where: eq(articles.id, articleId),
        });

        if (!article) return new Response(JSON.stringify({ error: 'Article not found' }), { status: 404 });
        if (!article.url) return new Response(JSON.stringify({ error: 'Article URL not found' }), { status: 404 });

        const articleHtml = await getArticleText(article.url);
        if (!articleHtml) return new Response(JSON.stringify({ error: 'Failed to fetch article content' }), { status: 500 });

        const apiKey = getApiKeyForLength(length);
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' });
        const prompt = promptBuilder(article.category, length.toLowerCase() as 'short' | 'medium' | 'explained') + articleHtml;
        const streamingResult = await model.generateContentStream(prompt);

        const stream = new ReadableStream({
            async start(controller) {
                let fullContent = '';
                for await (const chunk of streamingResult.stream) {
                    const chunkText = chunk.text();
                    controller.enqueue(new TextEncoder().encode(chunkText));
                    fullContent += chunkText;
                }
                await db.insert(generatedContents).values({
                    id: crypto.randomUUID(),
                    content: fullContent,
                    length: length,
                    articleId: articleId,
                });
                controller.close();
            },
        });

        return new Response(stream, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
    } catch (error) {
        console.error('Error in POST /api/generate-blog:', error);
        return new Response(JSON.stringify({ error: 'Failed to generate content' }), { status: 500 });
    }
}
