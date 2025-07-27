"use client";
import { useArticle } from "@/hooks/useArticle";
import { useParams } from "next/navigation";
import React from "react";
import Image from "next/image";
import GeneratedContentViewer from "@/components/GeneratedContentViewer";
import ArticlePageSkeleton from "@/components/ArticlePageSkeleton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const ArticlePage = () => {
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/auth/signin");
        },
    });
    const params = useParams();
    const id = params.id as string;
    const { data: article, isLoading, error } = useArticle(id);

    if (isLoading || status === "loading") {
        return <ArticlePageSkeleton />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!article) {
        return <div>Article not found</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <p className="text-gray-400 mb-4">{article.description}</p>
            <Image
                src={article.urlToImage}
                alt={article.title}
                width={800}
                height={400}
                className="w-full h-96 object-cover rounded-lg mb-4"
            />
            <GeneratedContentViewer
                articleId={article.id}
                generatedContents={article.generatedContents}
            />
        </div>
    );
};

export default ArticlePage;
