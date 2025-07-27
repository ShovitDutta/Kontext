"use client";
import ArticleCard from "@/components/ArticleCard";
import { useArticles } from "@/hooks/useArticles";
import { useSearchParams } from "next/navigation";
import React from "react";
import ArticleCardSkeleton from "@/components/ArticleCardSkeleton";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { data: articles, isLoading, error } = useArticles();

  const filteredArticles = articles?.filter((article) =>
    article.title.toLowerCase().includes(query.toLowerCase())
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Search Results for "{query}"</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))
          : filteredArticles?.map((article) => (
              <ArticleCard
                key={article.id}
                id={article.id}
                title={article.title}
                description={article.description}
                imageUrl={article.urlToImage}
                source={article.sourceName}
              />
            ))}
      </div>
    </div>
  );
};

export default SearchPage;
