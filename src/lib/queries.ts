'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Define the Article type matching the backend schema
type Article = {
    id: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    sourceName: string;
    author: string | null;
    publishedAt: string;
    category: string;
    generatedContents: any[]; // Define more strictly if needed
};

// Standalone fetch function for all articles
export const fetchArticles = async (): Promise<Article[]> => {
    const url = typeof window === 'undefined' ? `${process.env.NEXT_PUBLIC_APP_URL}/api/news?category=all` : '/api/news?category=all';
    const { data } = await axios.get(url);
    return data;
};

// Standalone fetch function for a single article
export const fetchArticleById = async (id: string): Promise<Article> => {
    const url = typeof window === 'undefined' ? `${process.env.NEXT_PUBLIC_APP_URL}/api/news/${id}` : `/api/news/${id}`;
    const { data } = await axios.get(url);
    return data;
};

// Custom hook to fetch all articles and handle caching
export const useArticles = () => {
    return useQuery<Article[], Error>({
        queryKey: ['articles'],
        queryFn: fetchArticles,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });
};

// Custom hook to get a single article, now with its own data fetching
export const useArticle = (id: string) => {
    return useQuery<Article, Error>({
        queryKey: ['article', id],
        queryFn: () => fetchArticleById(id),
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
    });
};
