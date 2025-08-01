import { scrapeAndStore } from './news';
async function main() {
	console.log('Starting news scraping...');
	await scrapeAndStore();
	console.log('News scraping finished.');
}
main();