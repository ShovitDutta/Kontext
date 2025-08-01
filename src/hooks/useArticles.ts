'use client';
import { useShallow } from 'zustand/react/shallow';
import { useArticleStore } from '@/store/articleStore';
export const useArticles = () => {
	const { articles, isLoading, error, category, searchQuery, country, fetchArticles, setCategory, setSearchQuery, setCountry } = useArticleStore(
		useShallow((state) => ({
			error: state.error,
			country: state.country,
			category: state.category,
			articles: state.articles,
			isLoading: state.isLoading,
			setCountry: state.setCountry,
			searchQuery: state.searchQuery,
			setCategory: state.setCategory,
			fetchArticles: state.fetchArticles,
			setSearchQuery: state.setSearchQuery,
		})),
	);
	return { articles, isLoading, error, category, searchQuery, country, loadArticles: fetchArticles, setCategory, setSearchQuery, setCountry };
};