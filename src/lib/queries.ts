'use client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { NewsAPIOriginalArticle } from '@/types/newsapi';
export interface GeneratedContent {
    id: string;
    type: string;
    content: string;
}
export interface Article extends NewsAPIOriginalArticle {
    id: string;
    category: string;
    sourceName: string;
    generatedContents: GeneratedContent[];
}
export const fetchArticles = async (): Promise<Article[]> => {
    const url = typeof window === 'undefined' ? `${process.env.NEXT_PUBLIC_APP_URL}/api/news?category=all` : '/api/news?category=all';
    const { data } = await axios.get(url);
    return data;
};
export const fetchArticleById = async (id: string): Promise<Article> => {
    const url = typeof window === 'undefined' ? `${process.env.NEXT_PUBLIC_APP_URL}/api/news/${id}` : `/api/news/${id}`;
    const { data } = await axios.get(url);
    return data;
};
export const useArticles = () => {
    return useQuery<Article[], Error>({ queryKey: ['articles'], queryFn: fetchArticles, staleTime: 5 * 60 * 1000, refetchOnWindowFocus: false });
};
export const useArticle = (id: string) => {
    return useQuery<Article, Error>({ queryKey: ['article', id], queryFn: () => fetchArticleById(id), staleTime: 5 * 60 * 1000, refetchOnWindowFocus: false });
};