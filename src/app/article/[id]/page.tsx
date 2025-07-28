'use client';
import { useArticle } from '@/hooks/useArticle';
import { useParams } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import GeneratedContentViewer from '@/components/GeneratedContentViewer';
import ArticlePageSkeleton from '@/components/ArticlePageSkeleton';
import { calculateReadTime } from '@/lib/utils';

const ArticlePage = () => {
	const params = useParams();
	const id = params.id as string;
	const { article, isLoading, error } = useArticle(id);

	if (isLoading) {
		return <ArticlePageSkeleton />;
	}

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!article) {
		return <div>Article not found</div>;
	}

	const explainedContent = article.generatedContents?.find((c) => c.length === 'EXPLAINED')?.content || '';
	const { readTime } = calculateReadTime(explainedContent);

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8">
			<div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700 mb-8">
				<h1 className="text-3xl sm:text-4xl font-bold mb-4">{article.title}</h1>
				<div className="flex items-center space-x-2 text-sm text-neutral-500 mb-4">
					{article.author && <span>{article.author}</span>}
					{article.author && article.sourceName && <span>·</span>}
					{article.sourceName && <span>{article.sourceName}</span>}
					{readTime && <span>·</span>}
					{readTime && <span>{readTime} read</span>}
				</div>
				<p className="text-gray-400 mb-4">{article.description}</p>
				{article.urlToImage && (
					<Image
						src={article.urlToImage}
						alt={article.title}
						width={800}
						height={400}
						className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg"
						priority
					/>
				)}
			</div>
			<GeneratedContentViewer generatedContents={article.generatedContents} />
		</div>
	);
};

export default ArticlePage;
