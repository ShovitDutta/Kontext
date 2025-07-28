'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useArticles } from '@/hooks/useArticles';
import { FiChevronDown } from 'react-icons/fi';

const SortDropdown = () => {
	const { sortOrder, setSortOrder } = useArticles();
	const [isOpen, setIsOpen] = useState(false);

	const sortOptions = [
		{ id: 'desc', name: 'Newest First' },
		{ id: 'asc', name: 'Oldest First' },
	];

	const selectedSortName = sortOptions.find((o) => o.id === sortOrder)?.name;

	return (
		<div className="relative w-full">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full flex items-center justify-between px-4 py-2 text-left bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-600">
				<span>{selectedSortName}</span>
				<FiChevronDown
					size={20}
					className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
				/>
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						className="mt-2 origin-top absolute w-full z-10"
						style={{ overflow: 'hidden' }}>
						<div className="bg-neutral-800 rounded-lg p-2">
							{sortOptions.map((option) => (
								<button
									key={option.id}
									onClick={() => {
										setSortOrder(option.id as 'desc' | 'asc');
										setIsOpen(false);
									}}
									className={`block w-full text-left px-4 py-2 rounded-md transition-colors duration-200 text-sm ${sortOrder === option.id ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:bg-neutral-600 hover:text-white'}`}>
									{option.name}
								</button>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default SortDropdown;
