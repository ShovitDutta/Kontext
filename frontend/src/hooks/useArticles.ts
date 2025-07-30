'use client';
import { useShallow } from 'zustand/react/shallow';
import { useArticleStore } from '@/store/articleStore';
export const useArticles = () => {
	const { articles, isLoading, error, category, searchQuery, country } = useArticleStore(
		useShallow((state) => ({
			articles: state.articles,
			isLoading: state.isLoading,
			error: state.error,
			category: state.category,
			searchQuery: state.searchQuery,
			country: state.country,
		})),
	);
	const { fetchArticles, setCategory, setSearchQuery, setCountry } = useArticleStore.getState();
	return { articles, isLoading, error, category, searchQuery, country, loadArticles: fetchArticles, setCategory, setSearchQuery, setCountry };
};
