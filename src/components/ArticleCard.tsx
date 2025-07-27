import React from "react";
import Link from "next/link";
import Image from "next/image";
import { newsCategories } from "@/lib/newscat";

interface ArticleCardProps {
    id: string;
    title: string;
    imageUrl: string | null;
    category: string;
    author?: string;
    source?: string;
    description?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ id, title, imageUrl, category, author, source }) => {
    const categoryName = newsCategories.find((c) => c.id === category)?.name || "General";

    return (
        <Link
            href={`/article/${id}`}
            className="block group bg-neutral-900 p-4 rounded-lg border border-transparent hover:border-neutral-800 transition-colors duration-300"
        >
            <div className="space-y-2">
                {imageUrl && (
                    <div className="overflow-hidden rounded-lg">
                        <Image
                            src={imageUrl}
                            alt={title}
                            width={500}
                            height={300}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                )}
                <p className="text-sm text-neutral-400">{categoryName}</p>
                <h3 className="text-lg font-semibold text-white group-hover:text-neutral-300">{title}</h3>
                <div className="flex items-center space-x-2 text-sm text-neutral-500">
                    {author && <span>{author}</span>}
                    {author && source && <span>·</span>}
                    {source && <span>{source}</span>}
                </div>
            </div>
        </Link>
    );
};

export default ArticleCard;
