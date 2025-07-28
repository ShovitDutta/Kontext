'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { newsCategories } from '@/lib/newscat';
import { FiChevronDown } from 'react-icons/fi';

interface SidebarProps {
	selectedCategory: string;
	onSelectCategory: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory }) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectedCategoryName = newsCategories.find((c) => c.id === selectedCategory)?.name || 'Everything';

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="space-y-4">
			<h1 className="text-2xl font-bold">Tools & Craft</h1>
			<p className="text-neutral-400">News, interviews, and thoughts from the people and teams who work at Notion.</p>

			{/* Dropdown for mobile */}
			<div className="lg:hidden">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="w-full flex items-center justify-between px-4 py-2 text-left bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-600">
					<span>{selectedCategoryName}</span>
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
							className="mt-2 origin-top"
							style={{ overflow: 'hidden' }}>
							<div className="bg-neutral-800 rounded-lg p-2">
								{newsCategories.map((category) => (
									<button
										key={category.id}
										onClick={() => {
											onSelectCategory(category.id);
											setIsOpen(false);
										}}
										className={`block w-full text-left px-4 py-2 rounded-md transition-colors duration-200 text-sm ${selectedCategory === category.id ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:bg-neutral-600 hover:text-white'}`}>
										{category.name}
									</button>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* Regular nav for larger screens */}
			<nav className="hidden lg:block space-y-2">
				{newsCategories.map((category) => (
					<motion.button
						key={category.id}
						onClick={() => onSelectCategory(category.id)}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className={`block w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${selectedCategory === category.id ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'}`}>
						{category.name}
					</motion.button>
				))}
			</nav>
		</motion.div>
	);
};

export default Sidebar;
