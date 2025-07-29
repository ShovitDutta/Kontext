'use client';
import { useShallow } from 'zustand/react/shallow';
import { useArticleStore } from '@/store/articleStore';
export const useArticles = () => {
	const { articles, isLoading, error, category, searchQuery } = useArticleStore(useShallow((state) => ({ articles: state.articles, isLoading: state.isLoading, error: state.error, category: state.category, searchQuery: state.searchQuery })));
	const { fetchArticles, setCategory, setSearchQuery } = useArticleStore.getState();
	return { articles, isLoading, error, category, searchQuery, loadArticles: fetchArticles, setCategory, setSearchQuery };
};
