'use client';
import { useShallow } from 'zustand/react/shallow';
import { useArticleStore } from '@/store/articleStore';
export const useArticles = () => {
	const { articles, isLoading, error, category, searchQuery, country, fetchArticles, setCategory, setSearchQuery, setCountry } = useArticleStore(
		useShallow((state) => ({
			articles: state.articles,
			isLoading: state.isLoading,
			error: state.error,
			category: state.category,
			searchQuery: state.searchQuery,
			country: state.country,
			fetchArticles: state.fetchArticles,
			setCategory: state.setCategory,
			setSearchQuery: state.setSearchQuery,
			setCountry: state.setCountry,
		})),
	);
	return { articles, isLoading, error, category, searchQuery, country, loadArticles: fetchArticles, setCategory, setSearchQuery, setCountry };
};
