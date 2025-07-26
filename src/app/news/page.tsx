import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/lib/get-query-client';
import NewsFeed from './NewsFeed';
export default async function NewsPage() {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const res = await fetch('http://localhost:3000/api/news?category=all', { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to fetch articles');
            return res.json();
        },
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NewsFeed />
        </HydrationBoundary>
    );
}
