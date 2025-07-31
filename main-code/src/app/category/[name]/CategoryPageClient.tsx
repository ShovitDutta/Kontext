'use client';
import React, { useEffect } from 'react';
import { redirect } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useArticles } from '@/hooks/useArticles';
import ArticleCard from '@/components/ArticleCard';
import ArticleCardSkeleton from '@/components/ArticleCardSkeleton';
import { motion } from 'framer-motion';

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

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
			<h1 className="text-2xl sm:text-3xl font-bold mb-4 capitalize shadow-lg">{category}</h1>
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{isLoading || status === 'loading'
					? Array.from({ length: 6 }).map((_, i) => <ArticleCardSkeleton key={i} />)
					: articles?.map((article) => (
							<ArticleCard
								id={article.id}
								key={article.id}
								title={article.title}
								source={article.sourceName}
								description={article.description}
								category={article.category}
								country={article.country}
								publishedAt={article.publishedAt}
								imageUrl={article.imageUrl}
							/>
						))}
			</motion.div>
		</div>
	);
};
export default CategoryPageClient;
