import axios from 'axios';
import { create } from 'zustand';

export interface Article {
	id: string;
	title: string;
	description: string;
	urlToImage: string | null;
	sourceName: string;
	category: string;
	author: string | null;
	publishedAt: string;
	generatedContents: GeneratedContent[];
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
	fetchArticles: () => Promise<void>;
	fetchArticleById: (id: string) => Promise<void>;
	setCategory: (category: string) => void;
	setSearchQuery: (query: string) => void;
}

const applyFilters = (articles: Article[], category: string, searchQuery: string): Article[] => {
	let filteredArticles = articles;

	if (category !== 'all') {
		filteredArticles = filteredArticles.filter((article) => article.category === category);
	}

	if (searchQuery) {
		filteredArticles = filteredArticles.filter((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase()));
	}

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

	setCategory: (category: string) => {
		const { allArticles, searchQuery } = get();
		const filtered = applyFilters(allArticles, category, searchQuery);
		set({ category, articles: filtered });
	},

	setSearchQuery: (query: string) => {
		const { allArticles, category } = get();
		const filtered = applyFilters(allArticles, category, query);
		set({ searchQuery: query, articles: filtered });
	},

	fetchArticles: async () => {
		if (get().allArticles.length > 0) {
			// Data is already cached
			return;
		}

		set({ isLoading: true, error: null });

		try {
			const { data } = await axios.get('/api/news');
			const filtered = applyFilters(data, get().category, get().searchQuery);
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
