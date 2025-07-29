export async function getArticleText(url: string): Promise<string> {
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
