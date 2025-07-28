'use client';
import { useArticleStore } from '@/store/articleStore';
import { useEffect } from 'react';

export const useArticle = (id: string) => {
	const { currentArticle, fetchArticleById, isLoading, error } = useArticleStore((state) => ({
		currentArticle: state.currentArticle,
		fetchArticleById: state.fetchArticleById,
		isLoading: state.isLoading,
		error: state.error,
	}));

	useEffect(() => {
		if (id) {
			// Only fetch if the article is not already the current one
			if (currentArticle?.id !== id) {
				fetchArticleById(id);
			}
		}
	}, [id, fetchArticleById, currentArticle?.id]);

	return { article: currentArticle, isLoading, error };
};
