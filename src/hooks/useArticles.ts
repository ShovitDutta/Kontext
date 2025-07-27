"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export interface Article {
    id: string;
    title: string;
    description: string;
    urlToImage: string;
    sourceName: string;
    category: string;
}
export const useArticles = (category: string = "all") => {
    return useQuery<Article[], Error>({
        queryKey: ["articles", category],
        queryFn: async () => {
            const { data } = await axios.get(`/api/news?category=${category}`);
            return data;
        },
    });
};
