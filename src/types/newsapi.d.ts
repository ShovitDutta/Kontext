export interface NewsAPIResponse {
    status: "ok" | "error";
    totalResults: number;
    articles: NewsAPIOriginalArticle[];
    code?: string;
    message?: string;
}
export interface NewsAPIOriginalArticle {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}
export interface NewsAPIAppArticle extends NewsAPIOriginalArticle {
    id: string;
    category: string;
}
