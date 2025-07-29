import 'dotenv/config';
import { db } from '../../lib/db';
async function main() {
	try {
		const allDbArticles = await db.query.articles.findMany();
		const allGeneratedContents = await db.query.generatedContents.findMany();
		console.log(`Found ${allDbArticles.length} articles in the database.`);
		console.log(`Found ${allGeneratedContents.length} generated contents in the database.`);
		for (let i = 0; i < allDbArticles.length; i++) {
			const article = allDbArticles[i];
			console.log(`Article ${i + 1}:`);
			console.log(`  Title: ${article.title}`);
			console.log(`  Source: ${article.sourceName}`);
			console.log(`  URL: ${article.url}`);
			console.log(`  Published At: ${article.publishedAt}`);
			const articleContents = allGeneratedContents.filter((content) => content.articleId === article.id);
			if (articleContents.length > 0) {
				console.log('  Generated Content (Blogs):');
				articleContents.forEach((content) => {
					console.log(`    - Length: ${content.content.length}`);
					console.log(`      Content: ${content.content}...`);
				});
			} else console.log('  No generated content found for this article.');
		}
	} catch (error) {
		console.error('Error fetching data from database for preview:', error);
	}
	console.log('News preview script finished.');
}
main().catch((e) => {
	console.error('An unexpected error occurred:', e);
	process.exit(1);
});
