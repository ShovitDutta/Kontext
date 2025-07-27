"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useArticles } from "@/hooks/useArticles";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import InitialLoader from "@/components/InitialLoader";
import ArticleCardSkeleton from "@/components/ArticleCardSkeleton";
import SearchBar from "@/components/SearchBar";

const Page = () => {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/auth/signin");
        },
    });
    const [selectedCategory, setSelectedCategory] = useState("all");
    const { data: articles, isLoading, error } = useArticles(selectedCategory);

    if (status === "loading") {
        return <InitialLoader />;
    }

    if (error) return <div>Error fetching articles: {error.message}</div>;

    return (
        <div className="flex space-x-8 flex-grow">
            <aside className="w-64 flex-shrink-0">
                <div className="sticky top-28">
                    <Sidebar
                        selectedCategory={selectedCategory}
                        onSelectCategory={setSelectedCategory}
                    />
                </div>
            </aside>
            <main className="flex-1">
                <div className="mb-8">
                    <SearchBar />
                </div>
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <ArticleCardSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {articles?.map((article) => (
                            <ArticleCard
                                id={article.id}
                                key={article.id}
                                title={article.title}
                                source={article.sourceName}
                                imageUrl={article.urlToImage}
                                category={article.category}
                                author={article.author}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Page;
