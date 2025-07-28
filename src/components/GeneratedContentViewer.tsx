'use client';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { GeneratedContent } from '@/store/articleStore';

interface GeneratedContentViewerProps {
	generatedContents: GeneratedContent[];
}

const GeneratedContentViewer: React.FC<GeneratedContentViewerProps> = ({ generatedContents = [] }) => {
	const [selectedLength, setSelectedLength] = useState<'SHORT' | 'MEDIUM' | 'EXPLAINED'>('SHORT');

	const selectedContent = generatedContents.find((c) => c.length?.toUpperCase() === selectedLength.toUpperCase());

	const tabs = ['SHORT', 'MEDIUM', 'EXPLAINED'] as const;

	return (
		<div className="mt-8">
			<div className="relative flex border-b border-neutral-800">
				{tabs.map((length) => (
					<button
						key={length}
						onClick={() => setSelectedLength(length)}
						className={`relative z-10 px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm font-medium transition-colors duration-300 ${selectedLength === length ? 'text-white' : 'text-neutral-400 hover:text-white'}`}>
						{selectedLength === length && (
							<motion.div
								layoutId="selected-tab-background"
								className="absolute inset-0 bg-neutral-700/50 rounded-md"
								transition={{ type: 'spring', stiffness: 300, damping: 30 }}
							/>
						)}
						<span className="relative z-20">{length.charAt(0) + length.slice(1).toLowerCase()}</span>
					</button>
				))}
			</div>
			<AnimatePresence mode="wait">
				<motion.div
					key={selectedLength}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.3 }}
					className="mt-4 p-4 sm:p-6 bg-neutral-800 rounded-lg border border-neutral-700">
					{selectedContent ? (
						<div className="prose prose-sm sm:prose-base max-w-none">
							<ReactMarkdown>{selectedContent.content}</ReactMarkdown>
						</div>
					) : (
						<p className="text-neutral-500">No content available for this length.</p>
					)}
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default GeneratedContentViewer;
