'use client';
import { useArticleStore } from '@/store/articleStore';
import { useShallow } from 'zustand/react/shallow';

export const useArticles = () => {
	const { articles, isLoading, isLoadingMore, error, hasMore, category, searchQuery } = useArticleStore(
		useShallow((state) => ({
			articles: state.articles,
			isLoading: state.isLoading,
			isLoadingMore: state.isLoadingMore,
			error: state.error,
			hasMore: state.hasMore,
			category: state.category,
			searchQuery: state.searchQuery,
		})),
	);
	const { fetchArticles, setCategory, setSearchQuery } = useArticleStore.getState();

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
