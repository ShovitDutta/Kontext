import { fetchArticleById } from "@/lib/queries";
import getQueryClient from "@/lib/get-query-client";
import ArticleClientView from "./ArticleClientView";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
export default async function ArticlePage({ params }: { params: { id: string } }) {
    const id: string = params.id;
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({ queryKey: ["article", id], queryFn: () => fetchArticleById(id) });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ArticleClientView />
        </HydrationBoundary>
    );
}
