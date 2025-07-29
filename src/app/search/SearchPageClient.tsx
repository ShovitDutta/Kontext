'use client';
import React, { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useArticles } from '@/hooks/useArticles';
import { useSearchParams } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import ArticleCardSkeleton from '@/components/ArticleCardSkeleton';
const SearchPageClient = () => {
	const { status } = useSession({
		required: true,
		onUnauthenticated() {
			redirect('/auth/signin');
		},
	});
	const searchParams = useSearchParams();
	const query = searchParams.get('q') || '';
	const { articles, isLoading, error, setSearchQuery } = useArticles();
	useEffect(() => {
		setSearchQuery(query);
	}, [query, setSearchQuery]);
	if (error) return <div>Error: {error.message}</div>;
	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl sm:text-3xl font-bold mb-4">Search Results for &quot;{query}&quot;</h1>
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
export default SearchPageClient;
