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
	imageUrl?: string;
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
	console.log('🔍 applyFilters called with:', { articlesCount: articles?.length, category, searchQuery, country, sampleCountries: articles?.slice(0, 5)?.map((a) => a.country) });
	let filteredArticles = articles;
	if (country && country !== 'none') {
		console.log('🌍 Applying country filter:', country);
		filteredArticles = filteredArticles.filter((article) => article.country === country);
		console.log('🌍 After country filter:', filteredArticles.length);
	} else console.log('🌍 Skipping country filter (country is none or empty)');
	if (category !== 'all') {
		console.log('📂 Applying category filter:', category);
		filteredArticles = filteredArticles.filter((article) => article.category === category);
		console.log('📂 After category filter:', filteredArticles.length);
	} else console.log('📂 Skipping category filter (category is all)');
	if (searchQuery) {
		console.log('🔎 Applying search filter:', searchQuery);
		filteredArticles = filteredArticles.filter((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase()));
		console.log('🔎 After search filter:', filteredArticles.length);
	} else console.log('🔎 Skipping search filter (no search query)');
	console.log('✅ Final filtered result:', filteredArticles.length);
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
			console.log('📦 API Response:', { dataLength: data?.length, firstFewArticles: data?.slice(0, 3)?.map((a: Article) => ({ title: a.title?.substring(0, 50), country: a.country, category: a.category })) });
			const currentState = get();
			console.log('🎛️ Current filter state:', { category: currentState.category, searchQuery: currentState.searchQuery, country: currentState.country });
			const filtered = applyFilters(data, currentState.category, currentState.searchQuery, currentState.country);
			console.log('✅ Filtered result:', { originalCount: data?.length, filteredCount: filtered?.length });
			set({ allArticles: data, articles: filtered, isLoading: false });
		} catch (error) {
			console.error('❌ Error fetching articles:', error);
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
