import { db } from '@/lib/db';
import { eq, and } from 'drizzle-orm';
import { promptBuilder } from '@/lib/prompts';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { contentLengthEnum, generatedContents, articles } from '@/lib/db/schema';
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
    let retries = 0;
    let delay = 1000;
    const maxRetries = 3;
    while (retries < maxRetries) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch article: ${response.statusText} (Status: ${response.status})`);
            return await response.text();
        } catch (error) {
            console.error(`Error fetching URL content for ${url} (Attempt ${retries + 1}/${maxRetries}):`, error);
            retries++;
            if (retries < maxRetries) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                delay *= 2;
            } else {
                console.error(`Max retries reached for URL: ${url}. Skipping.`);
                return '';
            }
        }
    }
    return '';
}
export async function generateContent(articleId: string, length: (typeof contentLengthEnum.enumValues)[number]) {
    const existingContent = await db.query.generatedContents.findFirst({ where: and(eq(generatedContents.articleId, articleId), eq(generatedContents.length, length)) });
    if (existingContent) return;
    const article = await db.query.articles.findFirst({ where: eq(articles.id, articleId) });
    if (!article || !article.url) return;
    const articleHtml = await getArticleText(article.url);
    if (!articleHtml) return;
    const apiKey = getApiKeyForLength(length);
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' });
    const prompt = promptBuilder(article.category, length.toLowerCase() as 'short' | 'medium' | 'explained') + articleHtml;
    let fullContent = '';
    let retries = 0;
    const maxRetries = 5;
    let delay = 2000;
    while (retries < maxRetries) {
        try {
            const result = await model.generateContent(prompt);
            fullContent = result.response.text();
            break;
        } catch (error) {
            console.error(`Error generating content for article ${articleId}, length ${length}. Retrying in ${delay / 1000}s...`, error);
            retries++;
            if (retries < maxRetries) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                delay *= 2;
            } else {
                console.error(`Max retries reached for article ${articleId}, length ${length}. Skipping.`);
                return;
            }
        }
    }
    if (fullContent) {
        await db.insert(generatedContents).values({ id: crypto.randomUUID(), content: fullContent, length: length, articleId: articleId });
    }
}