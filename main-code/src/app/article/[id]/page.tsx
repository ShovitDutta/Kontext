'use client';
import React from 'react';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { calculateReadTime } from '@/lib/utils';
import { useArticle } from '@/hooks/useArticle';
import { FaShareAlt, FaCopy } from 'react-icons/fa';
import ArticlePageSkeleton from '@/components/ArticlePageSkeleton';
import GeneratedContentViewer from '@/components/GeneratedContentViewer';
import Image from 'next/image';

const ArticlePage = () => {
	const params = useParams();
	const id = params.id as string;
	const { article, isLoading, error } = useArticle(id);

	if (isLoading) return <ArticlePageSkeleton />;
	if (error) return <div>Error: {error.message}</div>;
	if (!article) return <div>Article not found</div>;

	const content = article.generatedContents?.[0]?.content || '';
	const { readTime } = calculateReadTime(content);

	const handleShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: article.title,
					text: article.description || '',
					url: window.location.href,
				});
			} catch (error) {
				console.error('Error sharing:', error);
				toast.error('Failed to share article.');
			}
		} else {
			await navigator.clipboard.writeText(window.location.href);
			toast.success('Article link copied to clipboard!');
		}
	};

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(content);
			toast.success('Article content copied to clipboard!');
		} catch (error) {
			console.error('Error copying content:', error);
			toast.error('Failed to copy article content.');
		}
	};

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8 my-8">
			{article.imageUrl && (
				<div className="relative w-full h-96 mb-8">
					<Image
						src={article.imageUrl}
						alt={article.title}
						layout="fill"
						objectFit="cover"
						className="rounded-lg"
					/>
				</div>
			)}
			<div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700 mb-8 relative">
				<h1 className="text-3xl sm:text-4xl font-bold mb-4">{article.title}</h1>
				<div className="flex items-center space-x-2 text-sm text-neutral-500 mb-4">
					{article.author && <span>{article.author}</span>}
					{article.author && article.sourceName && <span>·</span>}
					{article.sourceName && <span>{article.sourceName}</span>}
					{readTime && <span>·</span>}
					{readTime && <span>{readTime} read</span>}
				</div>
				<p className="text-gray-400 mb-4">{article.description}</p>
				<div className="flex space-x-4 mb-6">
					<button
						onClick={handleShare}
						className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
						<FaShareAlt className="mr-2" /> Share
					</button>
				</div>
			</div>
			<GeneratedContentViewer generatedContents={article.generatedContents} />
			<div className="relative mt-4">
				<button
					onClick={handleCopy}
					className="absolute top-0 right-0 flex items-center px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition-colors duration-200">
					<FaCopy className="mr-2" /> Copy Blog
				</button>
			</div>
		</div>
	);
};

export default ArticlePage;
