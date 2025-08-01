import ollama from 'ollama';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { getArticleText } from '@/lib/articleUtils';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generatedContents, articles } from '@/lib/db/schema';
const geminiApiKeys = [process.env.GEMINI_API_KEY_A, process.env.GEMINI_API_KEY_B, process.env.GEMINI_API_KEY_C, process.env.GEMINI_API_KEY_D, process.env.GEMINI_API_KEY_E, process.env.GEMINI_API_KEY_F, process.env.GEMINI_API_KEY_G, process.env.GEMINI_API_KEY_H].filter((key): key is string => !!key);
if (geminiApiKeys.length === 0) console.warn('No Gemini API keys found in environment variables (GEMINI_API_KEY_A, B, C, D, E, F, G, H)');
let currentGeminiKeyIndex = 0;
const getApiKey = () => {
	const apiKey = geminiApiKeys[currentGeminiKeyIndex];
	currentGeminiKeyIndex = (currentGeminiKeyIndex + 1) % geminiApiKeys.length;
	return apiKey;
};
function promptBuilder(category: string) {
	const basePrompt =
		'You are an expert ' +
		category +
		' analyst and a skilled blog writer. Your task is to transform a raw news article into a well-structured, engaging, and easy-to-digest blog post. The final output must be accurate, strictly based on the provided source text, and formatted for maximum readability using Markdown.\n\n' +
		'**Critical Rule:** You MUST NOT include any information, speculation, or external context that is not explicitly present in the source article. Stick to the facts provided.\n';
	return (
		basePrompt +
		'\n**Task:** Write a "Detailed View" blog post (150-250 words). This should expand on the summary, providing more context and explaining the significance of the news.\n\n' +
		'**Format & Style Guide:**\n' +
		'- **Structure:**\n' +
		'  1.  **Introduction:** A brief paragraph to set the scene.\n' +
		'  2.  **Body:** 2-3 paragraphs explaining the "what," "why," and "how" of the story. Use H2 subheadings (e.g., `## 🚀 What\'s Happening?`) to organize these sections.\n' +
		'  3.  **Key Quote/Stat:** Use a Markdown blockquote (`> `) to highlight a single, impactful quote or statistic from the article.\n' +
		'  4.  **Conclusion:** End with a "Key Takeaways" section using a bulleted list (`* `) to summarize the main points.\n' +
		"- **Tone:** Informative yet conversational. Imagine you're explaining it to an interested colleague.\n" +
		'- **Formatting:**\n' +
		'  - Use **bold** and *italics* to emphasize important details.\n' +
		'  - Use emojis in subheadings to improve visual appeal.\n\n' +
		'**Example Output:**\n' +
		'Researchers just announced a groundbreaking new AI model that masters tasks from just a single example. This "one-shot learning" approach marks a significant departure from traditional models that require massive datasets.\n\n' +
		"## 🚀 What's Happening?\n" +
		'The new technique, developed at the **AI Institute**, allows the model to generalize patterns from a single piece of data, rather than needing thousands of examples.\n\n' +
		'> "This changes the economics of AI development entirely," said the lead researcher.\n\n' +
		'## Key Takeaways\n' +
		'*   New AI model enables "one-shot learning."\n' +
		'*   Drastically reduces the need for large training datasets.\n' +
		'*   Could accelerate AI adoption in new fields.\n\n' +
		'---\n\n' +
		'**Source Content:**\n'
	);
}
export async function generateContent(articleId: string, provider: 'gemini' | 'ollama' = 'gemini') {
	const existingContent = await db.query.generatedContents.findFirst({ where: eq(generatedContents.articleId, articleId) });
	if (existingContent) return;
	const article = await db.query.articles.findFirst({ where: eq(articles.id, articleId) });
	if (!article || !article.url) return;
	const articleHtml = await getArticleText(article.url);
	if (!articleHtml) return;
	let fullContent = '';
	const prompt = promptBuilder(article.category) + articleHtml;
	if (provider === 'gemini') {
		if (geminiApiKeys.length === 0) {
			console.error('No Gemini API keys found, cannot generate content.');
			return;
		}
		const apiKey = getApiKey();
		console.log(`Using Gemini API key #${currentGeminiKeyIndex === 0 ? geminiApiKeys.length : currentGeminiKeyIndex}`);
		const genAI = new GoogleGenerativeAI(apiKey);
		const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' });
		try {
			const result = await model.generateContent(prompt);
			fullContent = result.response.text();
			console.log(`Successfully generated content for article ${articleId} with Gemini.`);
		} catch (error) {
			console.error(`Error generating content for article ${articleId} with Gemini:`, error);
		}
	} else if (provider === 'ollama') {
		try {
			const response = await ollama.chat({ model: 'gemma3:4b-it-q4_K_M', messages: [{ role: 'user', content: prompt }], stream: true });
			let content = '';
			for await (const chunk of response) {
				process.stdout.write(chunk.message.content);
				content += chunk.message.content;
			}
			fullContent = content;
			process.stdout.write('\n');
			console.log(`\nSuccessfully generated content for article ${articleId} with Ollama.`);
		} catch (error) {
			console.error(`Error generating content for article ${articleId} with Ollama:`, error);
		}
	}
	if (fullContent) await db.insert(generatedContents).values({ id: crypto.randomUUID(), content: fullContent, articleId: articleId });
}
