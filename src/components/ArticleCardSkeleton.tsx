import React from 'react';
import Skeleton from './Skeleton';
const ArticleCardSkeleton = () => {
	return (
		<div className="bg-neutral-900 rounded-lg overflow-hidden shadow-lg p-4 border border-transparent">
			<Skeleton className="w-full h-48 sm:h-56 md:h-64" />
			<div className="p-4">
				<Skeleton className="h-6 w-3/4 mb-2" />
				<Skeleton className="h-4 w-full mb-4" />
				<div className="flex justify-between items-center">
					<Skeleton className="h-4 w-1/4" />
					<Skeleton className="h-4 w-1/4" />
				</div>
			</div>
		</div>
	);
};
export default ArticleCardSkeleton;
