'use client';
import { useArticleStore } from '@/store/articleStore';
import { useEffect } from 'react';

export const useArticles = () => {
	const { articles, isLoading, isLoadingMore, error, hasMore, category, searchQuery, fetchArticles, setCategory, setSearchQuery } = useArticleStore((state) => ({
		articles: state.articles,
		isLoading: state.isLoading,
		isLoadingMore: state.isLoadingMore,
		error: state.error,
		hasMore: state.hasMore,
		category: state.category,
		searchQuery: state.searchQuery,
		fetchArticles: state.fetchArticles,
		setCategory: state.setCategory,
		setSearchQuery: state.setSearchQuery,
	}));

	// Initial fetch when component mounts or category/search changes
	useEffect(() => {
		// This logic is now handled in the store's setCategory and setSearchQuery methods
		// to ensure data is fetched after state is updated.
	}, [category, searchQuery]);

	return {
		articles,
		isLoading,
		isLoadingMore,
		error,
		hasMore,
		category,
		searchQuery,
		loadMore: fetchArticles,
		setCategory,
		setSearchQuery,
	};
};
