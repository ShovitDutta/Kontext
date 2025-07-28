'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useArticles } from '@/hooks/useArticles';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import InitialLoader from '@/components/InitialLoader';
import EmptyState from '@/components/EmptyState';

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const Page = () => {
	const { articles, isLoading, error, category, setCategory, loadArticles } = useArticles();

	useEffect(() => {
		loadArticles();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isLoading) {
		return (
			<div className="flex-grow flex items-center justify-center">
				<InitialLoader />
			</div>
		);
	}

	if (error) return <div>Error fetching articles: {error.message}</div>;

	return (
		<div className="container mx-auto px-4 flex flex-col flex-grow">
			<div className="flex flex-col lg:flex-row lg:space-x-8 flex-grow">
				<aside className="w-full lg:w-64 lg:flex-shrink-0">
					<div className="lg:sticky top-28">
						<Sidebar
							selectedCategory={category}
							onSelectCategory={setCategory}
						/>
					</div>
				</aside>
				<main className="flex-1">
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
						{articles.length > 0 ? (
							articles.map((article) => (
								<ArticleCard
									id={article.id}
									key={article.id}
									title={article.title}
									source={article.sourceName}
									imageUrl={article.urlToImage}
									category={article.category}
									author={article.author ?? undefined}
									publishedAt={article.publishedAt}
								/>
							))
						) : (
							<EmptyState />
						)}
					</motion.div>
				</main>
			</div>
		</div>
	);
};

export default Page;
