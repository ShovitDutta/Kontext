'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { newsCategories } from '@/lib/newscat';

interface ArticleCardProps {
	id: string;
	title: string;
	imageUrl: string | null;
	category: string;
	author?: string;
	source?: string;
	description?: string;
	publishedAt: string;
}

const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
		},
	},
};

const ArticleCard: React.FC<ArticleCardProps> = ({ id, title, imageUrl, category, author, source, publishedAt }) => {
	const categoryName = newsCategories.find((c) => c.id === category)?.name || 'General';

	return (
		<motion.div
			variants={cardVariants}
			initial="hidden"
			animate="visible"
			whileHover={{ scale: 1.03, y: -5 }}
			transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
			<Link
				href={`/article/${id}`}
				className="relative block group bg-neutral-800 rounded-lg border border-neutral-800 h-full flex flex-col">
				{imageUrl && (
						<div className="overflow-hidden rounded-t-lg">
							<Image
								src={imageUrl}
								alt={title}
								width={500}
								height={300}
								className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
							/>
						</div>
					)}
				<div className="space-y-3 flex-grow pt-4 px-4">
					<p className="text-sm text-red-400">{categoryName}</p>
					<h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-neutral-300 flex-grow">{title}</h3>
				</div>
				<div className="flex items-center justify-between text-xs sm:text-sm text-neutral-500 mt-4 pb-4 px-4">
					<div className="flex items-center space-x-2">
						{author && <span>{author}</span>}
						{author && source && <span>·</span>}
						{source && <span>{source}</span>}
					</div>
					<time dateTime={publishedAt}>{format(new Date(publishedAt), 'MMM d, yyyy')}</time>
				</div>
				<div className="absolute top-4 right-4 bg-neutral-700 text-white text-xs px-2 py-1 rounded-full">by Kontext</div>
			</Link>
		</motion.div>
	);
};

export default ArticleCard;
