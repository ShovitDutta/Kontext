'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { newsCategories } from '@/lib/newscat';
import Image from 'next/image';
import { supportedCountries } from '@/lib/countries';

interface ArticleCardProps {
	id: string;
	title: string;
	category: string;
	country: string;
	author?: string;
	source?: string;
	description?: string;
	publishedAt: string;
	imageUrl?: string;
}

const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ArticleCard: React.FC<ArticleCardProps> = ({ id, title, category, country, author, source, publishedAt, imageUrl }) => {
	const categoryName = newsCategories.find((c) => c.id === category)?.name || 'General';
	const countryName = supportedCountries.find((c) => c.code === country)?.name || country;

	return (
		<motion.div
			variants={cardVariants}
			initial="hidden"
			animate="visible"
			whileHover={{ scale: 1.03, y: -5 }}
			transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
			<Link
				href={`/article/${id}`}
				className="relative group bg-neutral-800 rounded-lg border border-neutral-800 h-full flex flex-col shadow-lg">
				{imageUrl && (
					<div className="relative w-full h-40">
						<Image
							src={imageUrl}
							alt={title}
							layout="fill"
							objectFit="cover"
							className="rounded-t-lg"
						/>
					</div>
				)}
				<div className="space-y-3 flex-grow pt-4 px-4">
					<p className="text-sm text-red-400">
						{categoryName} {countryName && `· ${countryName}`}
					</p>
					<h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-neutral-300 flex-grow">
						{title}
					</h3>
				</div>
				<div className="flex items-center justify-between text-xs sm:text-sm text-neutral-500 mt-4 pb-4 px-4">
					<div className="flex items-center space-x-2">
						{author && <span>{author}</span>}
						{author && source && <span>·</span>}
						{source && <span>{source}</span>}
					</div>
					<time dateTime={publishedAt}>{format(new Date(publishedAt), 'MMM d, yyyy')}</time>
				</div>
				<div className="absolute top-4 right-4 bg-neutral-700 text-white text-xs px-2 py-1 rounded-full">
					by Kontext
				</div>
			</Link>
		</motion.div>
	);
};

export default ArticleCard;
