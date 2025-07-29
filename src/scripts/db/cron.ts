import 'dotenv/config';
import axios from 'axios';
const CRON_SECRET = process.env.CRON_SECRET;
const API_BASE_URL = process.env.API_BASE_URL + '/api';
if (!CRON_SECRET) {
	console.error('CRON_SECRET is not defined. Please create a .env.local file and add it.');
	process.exit(1);
}
const headers = { Authorization: `Bearer ${CRON_SECRET}` };
async function runCron(endpoint: string) {
	try {
		console.log(`Triggering ${endpoint}...`);
		const response = await axios.get(`${API_BASE_URL}/${endpoint}`, { headers });
		if (response.status !== 200) throw new Error(`Failed to trigger ${endpoint}: ${response.statusText}`);
		console.log(`${endpoint} triggered successfully.`);
	} catch (error) {
		if (axios.isAxiosError(error)) console.error(`Error triggering ${endpoint}:`, error.response?.data || error.message);
		else console.error(`An unexpected error occurred while triggering ${endpoint}:`, error);
	}
}
async function main() {
	const endpoint = process.argv[2];
	if (endpoint) {
		if (endpoint === 'cron/blog' || endpoint === 'cron/news') await runCron(endpoint);
		else console.error(`Invalid endpoint: ${endpoint}. Please use 'cron/blog' or 'cron/news'.`);
	} else {
		console.log('No endpoint specified, running all cron jobs.');
		await runCron('cron/news');
		await runCron('cron/blog');
	}
}
main();
