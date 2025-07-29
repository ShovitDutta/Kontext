import 'dotenv/config';

async function runNewsCron() {
	const cronUrl = 'http://localhost:3000/api/cron/news';
	try {
		const response = await fetch(cronUrl, {
			headers: {
				Authorization: `Bearer ${process.env.CRON_SECRET}`,
			},
		});
		if (!response.ok) {
			throw new Error(`Failed to trigger news cron job: ${response.statusText}`);
		}
		console.log('Successfully triggered news cron job.');
	} catch (error) {
		console.error('Error triggering news cron job:', error);
	}
}

runNewsCron();
