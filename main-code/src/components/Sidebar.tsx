'use client';
import React, { useState } from 'react';
import { newsCategories } from '@/lib/newscat';
import { FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
interface SidebarProps {
	selectedCategory: string;
	onSelectCategory: (category: string) => void;
}
const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory }) => {
	const [isCategoryOpen, setIsCategoryOpen] = useState(false);
	const selectedCategoryName = newsCategories.find((c) => c.id === selectedCategory)?.name || 'Everything';
	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="space-y-4 p-4 rounded-lg shadow-lg">
			<h1 className="text-2xl font-bold">News & Insights</h1> <p className="text-neutral-400">Transforming the latest news into engaging, easy-to-read blog posts using AI.</p>
			<div className="lg:hidden">
				<div className="relative w-full">
					<button
						onClick={() => setIsCategoryOpen(!isCategoryOpen)}
						className="w-full flex items-center justify-between px-4 py-2 text-left bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-600 shadow-md">
						<span>{selectedCategoryName}</span>
						<FiChevronDown
							size={20}
							className={`transform transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`}
						/>
					</button>
					<AnimatePresence>
						{isCategoryOpen && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								className="mt-2 origin-top absolute w-full z-10"
								style={{ overflow: 'hidden' }}>
								<div className="bg-neutral-800 rounded-lg p-2 shadow-xl">
									{newsCategories.map((category) => (
										<button
											key={category.id}
											onClick={() => {
												onSelectCategory(category.id);
												setIsCategoryOpen(false);
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
			</div>
			<div className="hidden lg:block">
				<nav className="space-y-2">
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
			</div>
		</motion.div>
	);
};
export default Sidebar;
