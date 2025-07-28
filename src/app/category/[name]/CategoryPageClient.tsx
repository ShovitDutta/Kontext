'use client';
import React, { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useArticles } from '@/hooks/useArticles';
import ArticleCard from '@/components/ArticleCard';
import ArticleCardSkeleton from '@/components/ArticleCardSkeleton';

const CategoryPageClient = () => {
	const { status } = useSession({
		required: true,
		onUnauthenticated() {
			redirect('/auth/signin');
		},
	});
	const params = useParams();
	const category = params.name as string;
	const { articles, isLoading, error, setCategory } = useArticles();

	useEffect(() => {
		setCategory(category);
	}, [category, setCategory]);

	if (error) return <div>Error: {error.message}</div>;
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl sm:text-3xl font-bold mb-4 capitalize">{category}</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{isLoading || status === 'loading'
					? Array.from({ length: 6 }).map((_, i) => <ArticleCardSkeleton key={i} />)
					: articles?.map((article) => (
							<ArticleCard
								id={article.id}
								key={article.id}
								title={article.title}
								source={article.sourceName}
								imageUrl={article.urlToImage}
								description={article.description}
								category={article.category}
								publishedAt={article.publishedAt}
							/>
						))}
			</div>
		</div>
	);
};
export default CategoryPageClient;
