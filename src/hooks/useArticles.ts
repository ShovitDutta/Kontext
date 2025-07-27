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
    author: string;
}

export const useArticles = (category: string = "all", searchQuery: string = "") => {
    return useQuery<Article[], Error>({
        queryKey: ["articles", category, searchQuery],
        queryFn: async () => {
            const { data } = await axios.get(`/api/news?category=${category}&q=${searchQuery}`);
            return data;
        },
    });
};
