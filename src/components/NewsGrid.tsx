import { useInView } from "react-intersection-observer";
import { NewsCard } from "./NewsCard";
import { Loader2 } from "lucide-react";

interface NewsItem {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    readTime: number;
    publishedAt: string;
    slug: string;
}

interface NewsGridProps {
    news: NewsItem[];
    isLoading: boolean;
    isError: boolean;
    hasMore: boolean;
    onLoadMore: () => void;
}

export function NewsGrid({ news, isLoading, isError, hasMore, onLoadMore }: NewsGridProps) {
    const { ref } = useInView({
        threshold: 0,
        onChange: (inView) => {
            if (inView && hasMore && !isLoading) {
                onLoadMore();
            }
        },
    });

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-4">
                <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
                <p className="text-gray-400 mb-4">Failed to load news articles</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Try again
                </button>
            </div>
        );
    }

    if (!isLoading && news.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-4">
                <h3 className="text-xl font-semibold text-white mb-2">No articles found</h3>
                <p className="text-gray-400">Check back later for new content</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
                <NewsCard
                    key={item.id}
                    {...item}
                />
            ))}

            {/* Loading indicator */}
            {isLoading && (
                <div className="col-span-full flex justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </div>
            )}

            {/* Infinite scroll trigger */}
            {hasMore && (
                <div
                    ref={ref}
                    className="h-10 col-span-full"
                />
            )}
        </div>
    );
}
