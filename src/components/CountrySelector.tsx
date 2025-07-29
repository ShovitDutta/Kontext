'use client';
import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { useArticleStore } from '@/store/articleStore';
import { supportedCountries } from '@/lib/countries';
import { motion, AnimatePresence } from 'framer-motion';

export default function CountrySelector() {
	const { country, setCountry } = useArticleStore();
	const [isOpen, setIsOpen] = useState(false);
	const selectedCountryName = supportedCountries.find((c) => c.code === country)?.name || 'None';

	return (
		<div className="relative w-full">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full flex items-center justify-between px-4 py-2 text-left bg-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-600"
			>
				<span>{selectedCountryName}</span>
				<FiChevronDown size={20} className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
			</button>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						className="mt-2 origin-top absolute w-full z-10"
						style={{ overflow: 'hidden' }}
					>
						<div className="bg-neutral-800 rounded-lg p-2 max-h-60 overflow-y-auto">
							{supportedCountries.map((c) => (
								<button
									key={c.code}
									onClick={() => {
										setCountry(c.code);
										setIsOpen(false);
									}}
									className={`block w-full text-left px-4 py-2 rounded-md transition-colors duration-200 text-sm ${
										country === c.code ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:bg-neutral-600 hover:text-white'
									}`}
								>
									{c.name}
								</button>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
