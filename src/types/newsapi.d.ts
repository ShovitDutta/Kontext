export interface GoogleNewsRSSItem {
	title: string;
	link: string;
	pubDate: string | null;
	isoDate?: string | null;
	contentSnippet?: string | null;
	snippet?: string | null;
	source?: { title?: string } | string;
}
export interface GoogleNewsRSSFeed {
	items: GoogleNewsRSSItem[];
	title?: string;
	description?: string;
	link?: string;
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
