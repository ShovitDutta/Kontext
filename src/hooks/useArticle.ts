"use client";
import { useArticleStore } from "@/store/articleStore";
import { useEffect } from "react";

export const useArticle = (id: string) => {
    const { currentArticle, fetchArticleById, isLoading, error } = useArticleStore();

    useEffect(() => {
        if (id) {
            fetchArticleById(id);
        }
    }, [id, fetchArticleById]);

    return { data: currentArticle, isLoading, error };
};