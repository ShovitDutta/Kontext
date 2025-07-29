import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { promptBuilder } from '@/lib/prompts';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generatedContents, articles } from '@/lib/db/schema';
const geminiApiKeys = [process.env.GEMINI_API_KEY_A, process.env.GEMINI_API_KEY_B, process.env.GEMINI_API_KEY_C].filter((key): key is string => !!key);
if (geminiApiKeys.length === 0) throw new Error('No Gemini API keys found in environment variables (GEMINI_API_KEY_A, B, C)');
let currentGeminiKeyIndex = 0;
const getApiKey = () => {
	const apiKey = geminiApiKeys[currentGeminiKeyIndex];
	currentGeminiKeyIndex = (currentGeminiKeyIndex + 1) % geminiApiKeys.length;
	return apiKey;
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
export async function generateContent(articleId: string) {
	const existingContent = await db.query.generatedContents.findFirst({ where: eq(generatedContents.articleId, articleId) });
	if (existingContent) return;
	const article = await db.query.articles.findFirst({ where: eq(articles.id, articleId) });
	if (!article || !article.url) return;
	const articleHtml = await getArticleText(article.url);
	if (!articleHtml) return;
	let fullContent = '';
	const maxKeyAttempts = geminiApiKeys.length;
	let keyAttempt = 0;
	while (keyAttempt < maxKeyAttempts) {
		const apiKey = getApiKey();
		console.log(`Using Gemini API key #${currentGeminiKeyIndex === 0 ? geminiApiKeys.length : currentGeminiKeyIndex}`);
		const genAI = new GoogleGenerativeAI(apiKey);
		const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' });
		const prompt = promptBuilder(article.category) + articleHtml;
		try {
			const result = await model.generateContent(prompt);
			fullContent = result.response.text();
			console.log(`Successfully generated content for article ${articleId} with key #${currentGeminiKeyIndex === 0 ? geminiApiKeys.length : currentGeminiKeyIndex}.`);
			break;
		} catch (error) {
			console.error(`Error generating content for article ${articleId} with key #${currentGeminiKeyIndex === 0 ? geminiApiKeys.length : currentGeminiKeyIndex}:`, error);
		}
		keyAttempt++;
	}
	if (fullContent) await db.insert(generatedContents).values({ id: crypto.randomUUID(), content: fullContent, articleId: articleId });
}
