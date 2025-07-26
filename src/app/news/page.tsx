import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/lib/get-query-client';
import NewsFeed from './NewsFeed';
import { fetchArticles } from '@/lib/queries'; // Assuming you extract the fetcher

export default async function NewsPage() {
    const queryClient = getQueryClient();

    // Prefetch the data on the server
    await queryClient.prefetchQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const res = await fetch('http://localhost:3000/api/news?category=all', { cache: 'no-store' });
            if (!res.ok) {
                throw new Error('Failed to fetch articles');
            }
            return res.json();
        },
    });

    return (
        // Pass the dehydrated state to the client
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NewsFeed />
        </HydrationBoundary>
    );
}
