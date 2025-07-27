"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useArticles } from "@/hooks/useArticles";
import ArticleCard from "@/components/ArticleCard";
import CategoryFilter from "@/components/CategoryFilter";
import ArticleCardSkeleton from "@/components/ArticleCardSkeleton";
const Page = () => {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/auth/signin");
        },
    });
    const [selectedCategory, setSelectedCategory] = useState("all");
    const { data: articles, isLoading, error } = useArticles(selectedCategory);
    if (status === "loading" || isLoading) {
        return (
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <ArticleCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }
    if (error) return <div>Error fetching articles: {error.message}</div>;
    return (
        <div className="container mx-auto p-4">
            <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles?.map((article) => (
                    <ArticleCard
                        id={article.id}
                        key={article.id}
                        title={article.title}
                        source={article.sourceName}
                        imageUrl={article.urlToImage}
                        description={article.description}
                    />
                ))}
            </div>
        </div>
    );
};
export default Page;
