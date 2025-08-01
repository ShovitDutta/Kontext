import { NextRequest } from 'next/server';
import { scrapeAndStore } from '@/lib/news-scraper';
export async function GET(req: NextRequest) {
	if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) return new Response('Unauthorized', { status: 401 });
	try {
		console.log('Starting news scraping cron job...');
		await scrapeAndStore();
		console.log('News scraping cron job finished successfully.');
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Error in news scraping cron job:', error);
		return new Response(JSON.stringify({ success: false }), { status: 500 });
	}
}
