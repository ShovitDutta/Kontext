'use client';
import { motion } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import EmptyState from '@/components/EmptyState';
import { useArticles } from '@/hooks/useArticles';
import { TbTriangleFilled } from 'react-icons/tb';
import ArticleCard from '@/components/ArticleCard';
import InitialLoader from '@/components/InitialLoader';
import React, { useEffect, useState, useCallback } from 'react';
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const Page = () => {
	const { articles, isLoading, error, category, setCategory, loadArticles } = useArticles();
	const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
	const handleScroll = useCallback(() => {
		if (window.scrollY > 200) setShowScrollToTopButton(true);
		else setShowScrollToTopButton(false);
	}, []);
	const scrollToTop = useCallback(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, []);
	useEffect(() => {
		loadArticles();
		window.addEventListener('scroll', handleScroll);
		handleScroll();
		return () => window.removeEventListener('scroll', handleScroll);
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
		<div className="container mx-auto px-4 flex flex-col flex-grow my-8">
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
			{showScrollToTopButton && (
				<motion.button
					onClick={scrollToTop}
					initial={{ opacity: 0, y: 50, scaleX: 0.5 }}
					animate={{ opacity: 1, y: 0, scaleX: 1 }}
					exit={{ opacity: 0, y: 50, scaleX: 0.5 }}
					transition={{ type: 'spring', damping: 20, stiffness: 100 }}
					className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-neutral-950/70 text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 focus:ring-offset-neutral-900 z-50 border-2 border-white flex items-center space-x-2 backdrop-blur-md">
					<TbTriangleFilled
						size={24}
						className="animate-pulse"
					/>
					<span>Go to Top</span>
				</motion.button>
			)}
		</div>
	);
};
export default Page;
