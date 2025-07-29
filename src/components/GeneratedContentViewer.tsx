'use client';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { GeneratedContent } from '@/store/articleStore';
interface GeneratedContentViewerProps {
	generatedContents: GeneratedContent[];
}
const GeneratedContentViewer: React.FC<GeneratedContentViewerProps> = ({ generatedContents = [] }) => {
	const content = generatedContents[0];
	return (
		<div className="mt-8">
			<div className="p-4 sm:p-6 bg-neutral-800 rounded-lg border border-neutral-700">
				{content ? (
					<div className="prose prose-invert prose-sm sm:prose-base max-w-none">
						<ReactMarkdown>{content.content}</ReactMarkdown>
					</div>
				) : (
					<p className="text-neutral-500">No content available.</p>
				)}
			</div>
		</div>
	);
};
export default GeneratedContentViewer;
