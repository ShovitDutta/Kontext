import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/lib/get-query-client';
import ArticleClientView from './ArticleClientView';
import { fetchArticleById } from '@/lib/queries';

export default async function ArticlePage({ params }: { params: { id: string } }) {
    const queryClient = getQueryClient();

    // Prefetch the specific article on the server
    await queryClient.prefetchQuery({
        queryKey: ['article', params.id],
        queryFn: () => fetchArticleById(params.id),
    });

    return (
        // Pass the dehydrated state to the client
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ArticleClientView />
        </HydrationBoundary>
    );
}
