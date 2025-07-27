"use client";
import { useArticleStore } from "@/store/articleStore";
export const useArticles = (category: string = "all", searchQuery: string = "") => {
    const { articles, isLoading, error } = useArticleStore();
    const filteredArticles = articles.filter((article) => (category === "all" ? true : article.category === category)).filter((article) => (searchQuery ? article.title.toLowerCase().includes(searchQuery.toLowerCase()) : true));
    return { data: filteredArticles, isLoading, error };
};