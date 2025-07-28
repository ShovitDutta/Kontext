'use client';
import { useArticleStore } from '@/store/articleStore';
import { useShallow } from 'zustand/react/shallow';

export const useArticles = () => {
	const { articles, isLoading, isLoadingMore, error, hasMore, category, searchQuery, sortOrder } = useArticleStore(
		useShallow((state) => ({
			articles: state.articles,
			isLoading: state.isLoading,
			isLoadingMore: state.isLoadingMore,
			error: state.error,
			hasMore: state.hasMore,
			category: state.category,
			searchQuery: state.searchQuery,
			sortOrder: state.sortOrder,
		})),
	);
	const { fetchArticles, setCategory, setSearchQuery, setSortOrder } = useArticleStore.getState();

	return {
		articles,
		isLoading,
		isLoadingMore,
		error,
		hasMore,
		category,
		searchQuery,
		sortOrder,
		loadMore: fetchArticles,
		setCategory,
		setSearchQuery,
		setSortOrder,
	};
};
