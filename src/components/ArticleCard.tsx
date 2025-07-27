import React from "react";
import Link from "next/link";
import Image from "next/image";
interface ArticleCardProps {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    source: string;
}
const ArticleCard: React.FC<ArticleCardProps> = ({ id, title, description, imageUrl, source }) => {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <Image
                src={imageUrl}
                alt={title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{title}</h3> <p className="text-gray-400 mb-4">{description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{source}</span>
                    <Link
                        href={`/article/${id}`}
                        className="text-blue-500 hover:underline"
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default ArticleCard;
