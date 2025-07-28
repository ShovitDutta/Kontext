import axios from 'axios';
import { create } from 'zustand';

// Interfaces remain the same
export interface Article {
	id: string;
	title: string;
	description: string;
	urlToImage: string | null;
	sourceName: string;
	category: string;
	author: string | null;
	publishedAt: string; // Dates are serialized as strings
	generatedContents: GeneratedContent[];
}

export interface GeneratedContent {
	id: string;
	content: string;
	length: 'SHORT' | 'MEDIUM' | 'EXPLAINED';
	articleId: string;
}

interface ArticleState {
	articles: Article[];
	currentArticle: Article | null;
	isLoading: boolean;
	isLoadingMore: boolean;
	error: Error | null;
	page: number;
	hasMore: boolean;
	category: string;
	searchQuery: string;
	fetchArticles: () => Promise<void>;
	fetchArticleById: (id: string) => Promise<void>;
	setCategory: (category: string) => void;
	setSearchQuery: (query: string) => void;
	clearArticles: () => void;
}

const ARTICLE_LIMIT = 20;

export const useArticleStore = create<ArticleState>((set, get) => ({
	articles: [],
	currentArticle: null,
	isLoading: false,
	isLoadingMore: false,
	error: null,
	page: 1,
	hasMore: true,
	category: 'all',
	searchQuery: '',

	setCategory: (category: string) => {
		set({ category, articles: [], page: 1, hasMore: true });
		get().fetchArticles();
	},

	setSearchQuery: (query: string) => {
		set({ searchQuery: query, articles: [], page: 1, hasMore: true });
		get().fetchArticles();
	},

	clearArticles: () => {
		set({ articles: [], page: 1, hasMore: true });
	},

	fetchArticles: async () => {
		const { page, category, searchQuery, hasMore, isLoadingMore } = get();

		if (!hasMore || isLoadingMore) return;

		// Use isLoading for the first page load, and isLoadingMore for subsequent loads
		if (page === 1) {
			set({ isLoading: true });
		} else {
			set({ isLoadingMore: true });
		}
		set({ error: null });

		try {
			const { data } = await axios.get('/api/news', {
				params: {
					category,
					q: searchQuery,
					page,
					limit: ARTICLE_LIMIT,
				},
			});

			set((state) => ({
				articles: page === 1 ? data : [...state.articles, ...data],
				page: state.page + 1,
				hasMore: data.length === ARTICLE_LIMIT,
			}));
		} catch (error) {
			set({ error: error as Error });
		} finally {
			set({ isLoading: false, isLoadingMore: false });
		}
	},

	fetchArticleById: async (id: string) => {
		// Always fetch the article from the API to ensure we have the generated contents
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
