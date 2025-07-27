"use client";
import axios from "axios";
import { Article } from "./useArticles";
import { useQuery } from "@tanstack/react-query";
export interface GeneratedContent {
    id: string;
    content: string;
    length: "SHORT" | "MEDIUM" | "EXPLAINED";
}
export interface ArticleWithContent extends Article {
    generatedContents: GeneratedContent[];
}
export const useArticle = (id: string) => {
    return useQuery<ArticleWithContent, Error>({
        queryKey: ["article", id],
        queryFn: async () => {
            const { data } = await axios.get(`/api/news/${id}`);
            return data;
        },
    });
};
