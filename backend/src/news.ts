import fs from 'fs';
import ora from 'ora';
import Parser from 'rss-parser';
const parser = new Parser();
const categoryTopics: Record<string, string> = { World: 'WORLD', National: 'NATION', Business: 'BUSINESS', Technology: 'TECHNOLOGY', Entertainment: 'ENTERTAINMENT', Science: 'SCIENCE', Sports: 'SPORTS', Health: 'HEALTH' };
interface Article {
link: string;
title: string;
source: string;
pubDate: string | null;
isoDate?: string | null;
snippet?: string | null;
}
const getDateKey = (dateStr: string | null): string | null => {
if (!dateStr) return null;
const date = new Date(dateStr);
return isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
};
const getArticlesFromRSS = async (country: string, topicName: string): Promise<Article[]> => {
const url = `https://news.google.com/rss/headlines/section/topic/${topicName}?hl=en-${country}&gl=${country}&ceid=${country}:en`;
try {
const feed = await parser.parseURL(url);
const seen = new Set<string>();
const articles: Article[] = [];
for (const item of feed.items) {
const link = item.link || '';
const title = item.title || '';
const pubDate = item.pubDate || null;
const dateKey = getDateKey(pubDate);
if (!dateKey) continue;
const source = item.source?.title || (link ? new URL(link).hostname : 'Unknown');
const uniqueKey = `${title}-${source}`.toLowerCase().trim();
if (seen.has(uniqueKey)) continue;
seen.add(uniqueKey);
articles.push({ title, link, source, pubDate, snippet: item.contentSnippet || null, isoDate: (item as any).isoDate || null });
}
return articles;
} catch (error) {
console.error(`Failed to fetch RSS for ${country}/${topicName}:`, (error as Error).message);
return [];
}
};
(async () => {
const spinner = ora('Fetching Google News RSS...').start();
const groupedNews: Record<string, Record<string, Record<string, Article[]>>> = {};
const countries = ['IN', 'UK'];
try {
for (const country of countries) {
groupedNews[country] = {};
for (const [category, topicName] of Object.entries(categoryTopics)) {
spinner.text = `Fetching ${category} news for ${country}...`;
const articles = await getArticlesFromRSS(country, topicName);
for (const article of articles) {
const dateKey = getDateKey(article.pubDate);
if (!dateKey) continue;
if (!groupedNews[country][dateKey]) groupedNews[country][dateKey] = {};
if (!groupedNews[country][dateKey][category]) groupedNews[country][dateKey][category] = [];
groupedNews[country][dateKey][category].push(article);
}
}
}
fs.writeFileSync('output.json', JSON.stringify(groupedNews, null, 2), 'utf-8');
spinner.succeed('News successfully fetched and saved to output.json');
process.exit(0);
} catch (err) {
spinner.fail(`Error: ${(err as Error).message}`);
process.exit(1);
}
})();