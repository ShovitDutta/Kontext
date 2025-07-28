'use client';
import { useArticleStore } from '@/store/articleStore';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';

export const useArticle = (id: string) => {
	const { currentArticle, isLoading, error } = useArticleStore(
		useShallow((state) => ({
			currentArticle: state.currentArticle,
			isLoading: state.isLoading,
			error: state.error,
		})),
	);
	const { fetchArticleById } = useArticleStore.getState();

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
