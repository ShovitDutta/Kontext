export interface GoogleNewsRSSItem {
	link: string;
	title: string;
	pubDate: string | null;
	isoDate?: string | null;
	snippet?: string | null;
	contentSnippet?: string | null;
	source?: { title?: string } | string;
}
export interface GoogleNewsRSSFeed {
	link?: string;
	title?: string;
	description?: string;
	items: GoogleNewsRSSItem[];
}
export interface GoogleNewsArticle {
	title: string;
	link: string;
	source: string;
	pubDate: string | null;
	isoDate?: string | null;
	snippet?: string | null;
}
export interface GoogleNewsAppArticle extends GoogleNewsArticle {
	id: string;
	category: string;
	country: string;
	author?: string | null;
	description?: string | null;
}
