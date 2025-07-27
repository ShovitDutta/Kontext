import axios from "axios";
import { create } from "zustand";
export interface Article {
    id: string;
    title: string;
    description: string;
    urlToImage: string | null;
    sourceName: string;
    category: string;
    author: string | null;
    content: string | null;
    publishedAt: Date;
    generatedContents: GeneratedContent[];
}
export interface GeneratedContent {
    id: string;
    content: string;
    length: "SHORT" | "MEDIUM" | "EXPLAINED";
}
interface ArticleState {
    articles: Article[];
    currentArticle: Article | null;
    isLoading: boolean;
    error: Error | null;
    fetchAllArticles: () => Promise<void>;
    fetchArticleById: (id: string) => Promise<void>;
}

export const useArticleStore = create<ArticleState>((set) => ({
    articles: [],
    currentArticle: null,
    isLoading: true,
    error: null,
    fetchAllArticles: async () => {
        try {
            set({ isLoading: true, error: null });
            const { data } = await axios.get("/api/news?category=all");
            set({ articles: data, isLoading: false });
        } catch (error) {
            set({ error: error as Error, isLoading: false });
        }
    },
    fetchArticleById: async (id: string) => {
        try {
            set({ isLoading: true, error: null });
            const { data } = await axios.get(`/api/news/${id}`);
            set({ currentArticle: data, isLoading: false });
        } catch (error) {
            set({ error: error as Error, isLoading: false });
        }
    },
}));
