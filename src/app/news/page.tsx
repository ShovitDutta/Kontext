/* ================================================================================== */
import NewsFeed from "./NewsFeed";
import getQueryClient from "@/lib/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
/* ================================================================================== */
export default async function NewsPage() {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL!}/api/news?category=all`, { cache: "no-store" });
            if (!res.ok) throw new Error("Failed to fetch articles");
            return res.json();
        },
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NewsFeed />
        </HydrationBoundary>
    );
}
/* ================================================================================== */