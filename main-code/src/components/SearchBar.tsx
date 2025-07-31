'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
const SearchBar = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const router = useRouter();
	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchQuery.trim()) router.push(`/search?q=${searchQuery}`);
	};
	return (
		<motion.form
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			onSubmit={handleSearch}
			className="relative w-full max-w-md mx-auto">
			<input
				type="text"
				placeholder="Search for articles..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className="bg-neutral-800 text-white w-full p-3 rounded-full pl-12 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow shadow-md"
			/>
			<FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
		</motion.form>
	);
};
export default SearchBar;
