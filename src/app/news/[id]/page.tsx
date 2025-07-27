/* ================================================================================== */
import { fetchArticleById } from "@/lib/queries";
import getQueryClient from "@/lib/get-query-client";
import ArticleClientView from "./ArticleClientView";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
/* ================================================================================== */
export default async function ArticlePage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id: string = params.id;
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({ queryKey: ["article", id], queryFn: () => fetchArticleById(id) });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ArticleClientView />
        </HydrationBoundary>
    );
}
/* ================================================================================== */
