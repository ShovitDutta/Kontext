"use client";
import React from "react";
import { redirect } from "next/navigation";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useArticles } from "@/hooks/useArticles";
import ArticleCard from "@/components/ArticleCard";
import ArticleCardSkeleton from "@/components/ArticleCardSkeleton";
const CategoryPage = () => {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/auth/signin");
        },
    });
    const params = useParams();
    const category = params.name as string;
    const { data: articles, isLoading, error } = useArticles(category);
    if (error) return <div>Error: {error.message}</div>;
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 capitalize">{category}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading || status === "loading"
                    ? Array.from({ length: 6 }).map((_, i) => <ArticleCardSkeleton key={i} />)
                    : articles?.map((article) => (
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
export default CategoryPage;
