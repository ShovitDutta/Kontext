import Image from "next/image";
import Link from "next/link";
import { Share2, Clock } from "lucide-react";

interface NewsCardProps {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    readTime: number;
    publishedAt: string;
    slug: string;
}

export function NewsCard({ title, description, category, imageUrl, readTime, publishedAt, slug }: NewsCardProps) {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text: description,
                    url: `/news/${slug}`,
                });
            } catch (error) {
                console.error("Error sharing:", error);
            }
        }
    };

    return (
        <article className="bg-neutral-800 rounded-lg overflow-hidden hover:bg-neutral-700 transition-all duration-300 group">
            <Link
                href={`/news/${slug}`}
                className="block"
            >
                <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                        src={imageUrl || "/placeholder.jpg"}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
                    <span className="absolute bottom-3 left-3 px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">{category}</span>
                </div>
            </Link>

            <div className="p-4">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{readTime} min read</span>
                    </div>
                    <button
                        onClick={handleShare}
                        className="p-2 hover:bg-neutral-600 rounded-full transition-colors"
                        aria-label="Share article"
                    >
                        <Share2 className="w-4 h-4" />
                    </button>
                </div>

                <Link href={`/news/${slug}`}>
                    <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2 hover:text-blue-400 transition-colors">{title}</h3>
                </Link>

                <p className="text-gray-400 line-clamp-3 text-sm">{description}</p>

                <time className="block mt-3 text-sm text-gray-500">
                    {new Date(publishedAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </time>
            </div>
        </article>
    );
}
