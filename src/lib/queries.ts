"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export interface GeneratedContent {
    id: string;
    content: string;
    length: "SHORT" | "MEDIUM" | "EXPLAINED";
}
export interface Article {
    id: string;
    url: string;
    title: string;
    category: string;
    publishedAt: Date;
    sourceName: string;
    author: string | null;
    content: string | null;
    urlToImage: string | null;
    description: string | null;
    generatedContents: GeneratedContent[];
}
export const fetchArticles = async (): Promise<Article[]> => {
    const url = typeof window === "undefined" ? `${process.env.NEXT_PUBLIC_APP_URL}/api/news?category=all` : "/api/news?category=all";
    const { data } = await axios.get(url);
    return data;
};
export const fetchArticleById = async (id: string): Promise<Article> => {
    const url = typeof window === "undefined" ? `${process.env.NEXT_PUBLIC_APP_URL}/api/news/${id}` : `/api/news/${id}`;
    const { data } = await axios.get(url);
    return data;
};
export const useArticles = () => {
    return useQuery<Article[], Error>({ queryKey: ["articles"], queryFn: fetchArticles, staleTime: 5 * 60 * 1000, refetchOnWindowFocus: false });
};
export const useArticle = (id: string) => {
    return useQuery<Article, Error>({ queryKey: ["article", id], queryFn: () => fetchArticleById(id), staleTime: 5 * 60 * 1000, refetchOnWindowFocus: false });
};
