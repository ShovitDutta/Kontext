'use client';
import { useArticleStore } from '@/store/articleStore';
import { useShallow } from 'zustand/react/shallow';

export const useArticles = () => {
	const { articles, isLoading, isLoadingMore, error, hasMore, category, searchQuery, sortOrder, selectedDate } = useArticleStore(
		useShallow((state) => ({
			articles: state.articles,
			isLoading: state.isLoading,
			isLoadingMore: state.isLoadingMore,
			error: state.error,
			hasMore: state.hasMore,
			category: state.category,
			searchQuery: state.searchQuery,
			sortOrder: state.sortOrder,
			selectedDate: state.selectedDate,
		})),
	);
	const { fetchArticles, setCategory, setSearchQuery, setSortOrder, setSelectedDate } = useArticleStore.getState();

	return {
		articles,
		isLoading,
		isLoadingMore,
		error,
		hasMore,
		category,
		searchQuery,
		sortOrder,
		selectedDate,
		loadMore: fetchArticles,
		setCategory,
		setSearchQuery,
		setSortOrder,
		setSelectedDate,
	};
};
