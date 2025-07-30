import axios from 'axios';
import { create } from 'zustand';

export interface Article {
	id: string;
	title: string;
	description: string;
	sourceName: string;
	category: string;
	author: string | null;
	publishedAt: string;
	generatedContents: GeneratedContent[];
	country: string;
}

export interface GeneratedContent {
	id: string;
	content: string;
	articleId: string;
}

interface ArticleState {
	allArticles: Article[];
	articles: Article[];
	currentArticle: Article | null;
	isLoading: boolean;
	error: Error | null;
	category: string;
	searchQuery: string;
	country: string;
	fetchArticles: () => Promise<void>;
	fetchArticleById: (id: string) => Promise<void>;
	setCategory: (category: string) => void;
	setSearchQuery: (query: string) => void;
	setCountry: (country: string) => void;
}

const applyFilters = (articles: Article[], category: string, searchQuery: string, country: string): Article[] => {
	let filteredArticles = articles;
	if (country && country !== 'none') filteredArticles = filteredArticles.filter((article) => article.country === country);
	if (category !== 'all') filteredArticles = filteredArticles.filter((article) => article.category === category);
	if (searchQuery) filteredArticles = filteredArticles.filter((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase()));
	return filteredArticles;
};

export const useArticleStore = create<ArticleState>((set, get) => ({
	allArticles: [],
	articles: [],
	currentArticle: null,
	isLoading: false,
	error: null,
	category: 'all',
	searchQuery: '',
	country: 'none',
	setCategory: (category: string) => {
		const { allArticles, searchQuery, country } = get();
		const filtered = applyFilters(allArticles, category, searchQuery, country);
		set({ category, articles: filtered });
	},
	setSearchQuery: (query: string) => {
		const { allArticles, category, country } = get();
		const filtered = applyFilters(allArticles, category, query, country);
		set({ searchQuery: query, articles: filtered });
	},
	setCountry: (country: string) => {
		const { allArticles, category, searchQuery } = get();
		const filtered = applyFilters(allArticles, category, searchQuery, country);
		set({ country, articles: filtered });
	},
	fetchArticles: async () => {
		if (get().allArticles.length > 0) return;
		set({ isLoading: true, error: null });
		try {
			const { data } = await axios.get('/api/news');
			const filtered = applyFilters(data, get().category, get().searchQuery, get().country);
			set({ allArticles: data, articles: filtered, isLoading: false });
		} catch (error) {
			set({ error: error as Error, isLoading: false });
		}
	},
	fetchArticleById: async (id: string) => {
		set({ isLoading: true, error: null });
		try {
			const { data } = await axios.get(`/api/news/${id}`);
			set({ currentArticle: data });
		} catch (error) {
			set({ error: error as Error });
		} finally {
			set({ isLoading: false });
		}
	},
}));
