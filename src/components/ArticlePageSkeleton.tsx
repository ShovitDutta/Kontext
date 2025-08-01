import React from 'react';
import Skeleton from './Skeleton';
const ArticlePageSkeleton = () => {
	return (
		<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="bg-neutral-900 rounded-lg shadow-xl overflow-hidden p-6 md:p-8">
				<Skeleton className="h-10 w-3/4 mb-4" />
				<div className="flex items-center space-x-4 text-sm text-neutral-400 mb-6">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-4 w-32" />
				</div>
				<div className="space-y-4">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-3/4" />
				</div>
			</div>
		</div>
	);
};
export default ArticlePageSkeleton;