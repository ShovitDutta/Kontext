"use client";
import React from "react";
import ArticleCard from "@/components/ArticleCard";
import { useArticles } from "@/hooks/useArticles";
import { useParams } from "next/navigation";
import ArticleCardSkeleton from "@/components/ArticleCardSkeleton";

const CategoryPage = () => {
  const params = useParams();
  const category = params.name as string;
  const { data: articles, isLoading, error } = useArticles(category);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 capitalize">{category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))
          : articles?.map((article) => (
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

export default CategoryPage;
