import fs from 'fs';
import ora from 'ora';
import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
interface Article {
	link: string;
	blog?: string;
	title: string;
	source: string;
	pubDate: string | null;
	isoDate?: string | null;
	snippet?: string | null;
}
const geminiApiKeys = [process.env.GEMINI_API_KEY_A, process.env.GEMINI_API_KEY_B, process.env.GEMINI_API_KEY_C, process.env.GEMINI_API_KEY_D, process.env.GEMINI_API_KEY_E, process.env.GEMINI_API_KEY_F, process.env.GEMINI_API_KEY_G, process.env.GEMINI_API_KEY_H].filter((key): key is string => !!key);
if (geminiApiKeys.length === 0) throw new Error('No Gemini API keys found in environment variables (GEMINI_API_KEY_A, B, C, D, E, F, G, H)');
let currentGeminiKeyIndex = 0;
const getApiKey = () => {
	const apiKey = geminiApiKeys[currentGeminiKeyIndex];
	currentGeminiKeyIndex = (currentGeminiKeyIndex + 1) % geminiApiKeys.length;
	return apiKey;
};
function promptBuilder(category: string) {
	const basePrompt =
		`You are an expert ${category} analyst and a skilled blog writer. Your task is to transform a raw news article into a well-structured, engaging, and easy-to-digest blog post.\n\n` +
		`The final output must be accurate, strictly based on the provided source text, and formatted in Markdown.\n\n` +
		`**CRITICAL RULES:**\n` +
		`- ONLY output the final blog post. DO NOT include any introduction, commentary, or explanation like "Here is your blog post" or "As requested".\n` +
		`- DO NOT add any information that is not explicitly present in the source article.\n` +
		`- Output ONLY the blog content, structured in Markdown.\n\n` +
		`**Task:** Write a "Detailed View" blog post (150–250 words) that summarizes and expands on the news article.\n\n` +
		`**Format & Style Guide:**\n` +
		`- **Structure:**\n` +
		`  1. ## 📘 Introduction\n` +
		`     *A brief paragraph to set the scene.*\n` +
		`  2. ## 📰 What's Happening?\n` +
		`     *Explain the core news: what, why, and how in 2–3 paragraphs.*\n` +
		`  3. ## 💬 Key Quote or Stat\n` +
		`     *Highlight a powerful quote or fact using Markdown blockquote (>) format.*\n` +
		`  4. ## 📌 Key Takeaways\n` +
		`     *Summarize the story in a bullet-point list (use \`* \` for bullets).* \n\n` +
		`- **Tone:** Informative yet conversational — like explaining it to a colleague.\n` +
		`- **Styling:** Use **bold** and *italics* for emphasis. Use the designated emojis consistently in section headings.\n\n` +
		`---\n\n` +
		`**IMPORTANT:** Only return the final blog post in Markdown format. Do not include any explanations or headings outside the blog.\n\n` +
		`**Source Content:**\n`;
	return basePrompt;
}
const generateBlogPost = async (article: Article, category: string): Promise<string> => {
	const prompt = promptBuilder(category) + `**Title:** ${article.title}\n**Source:** ${article.source}\n**Snippet:** ${article.snippet ?? ''}`;
	let fullContent = '';
	const maxKeyAttempts = geminiApiKeys.length;
	let keyAttempt = 0;
	while (keyAttempt < maxKeyAttempts) {
		const apiKey = getApiKey();
		console.log(`Using Gemini API key #${currentGeminiKeyIndex === 0 ? geminiApiKeys.length : currentGeminiKeyIndex}`);
		const genAI = new GoogleGenerativeAI(apiKey);
		const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-05-20' });
		try {
			const result = await model.generateContent(prompt);
			fullContent = result.response.text();
			console.log(`Successfully generated content for article "${article.title}" with key #${currentGeminiKeyIndex === 0 ? geminiApiKeys.length : currentGeminiKeyIndex}.`);
			return fullContent;
		} catch (error) {
			console.error(`Error generating content for article "${article.title}" with key #${currentGeminiKeyIndex === 0 ? geminiApiKeys.length : currentGeminiKeyIndex}:`, error);
			keyAttempt++;
		}
	}
	console.error(`\n❌ Failed to generate blog post for "${article.title}" after trying all API keys.`);
	return '';
};
(async () => {
	const spinner = ora('Initializing...').start();
	let groupedNews: Record<string, Record<string, Record<string, Article[]>>>;
	try {
		spinner.text = 'Reading output.json...';
		const newsData = fs.readFileSync('output.json', 'utf-8');
		groupedNews = JSON.parse(newsData);
		spinner.succeed('✅ Successfully read and parsed output.json.');
	} catch (err) {
		spinner.fail(`Error reading or parsing output.json: ${(err as Error).message}`);
		process.exit(1);
	}
	let articlesProcessed = 0;
	let articlesSkipped = 0;
	console.log('\n🚀 Starting blog generation process...');
	try {
		for (const country in groupedNews) {
			for (const date in groupedNews[country]) {
				for (const category in groupedNews[country][date]) {
					const articles = groupedNews[country][date][category];
					for (let i = 0; i < articles.length; i++) {
						const article = articles[i];
						if (article.blog && article.blog.trim() !== '') {
							articlesSkipped++;
							continue;
						}

						const delaySpinner = ora('Waiting for 10 seconds to avoid rate limits...').start();
						for (let j = 10; j > 0; j--) {
							delaySpinner.text = `Waiting for ${j} seconds to avoid rate limits...`;
							await new Promise((resolve) => setTimeout(resolve, 1000));
						}
						delaySpinner.succeed('✅ Delay complete. Starting generation.');

						console.log(`\n================================================================================`);
						console.log(`📄 Processing [${country}/${date}/${category}]: "${article.title}"`);
						const blogContent = await generateBlogPost(article, category);
						if (blogContent) {
							groupedNews[country][date][category][i].blog = blogContent;
							fs.writeFileSync('output.json', JSON.stringify(groupedNews, null, 2), 'utf-8');
							articlesProcessed++;
						} else {
							console.log(`❌ Generation failed. Skipping.`);
						}
					}
				}
			}
		}
		console.log(`\n================================================================================`);
		console.log(`🎯 Done. Processed: ${articlesProcessed}, Skipped: ${articlesSkipped}`);
		process.exit(0);
	} catch (err) {
		console.error(`\n💥 An unexpected error occurred during generation: ${(err as Error).message}`);
		process.exit(1);
	}
})();
