'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FiInbox } from 'react-icons/fi';
const EmptyState = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="col-span-full flex flex-col items-center justify-center py-16 text-center bg-neutral-800 rounded-lg shadow-lg">
			<FiInbox
				size={48}
				className="text-neutral-500 mb-4"
			/>
			<h3 className="text-xl font-semibold text-white">No articles found</h3>
			<p className="text-neutral-400 mt-2">Try adjusting your filters or search query.</p>
		</motion.div>
	);
};
export default EmptyState;