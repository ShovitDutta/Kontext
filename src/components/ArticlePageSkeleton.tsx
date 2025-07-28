import React from 'react';
import Skeleton from './Skeleton';

const ArticlePageSkeleton = () => {
	return (
		<div className="container mx-auto p-4">
			<Skeleton className="h-10 w-3/4 mb-4" />
			<Skeleton className="h-6 w-1/2 mb-4" />
			<Skeleton className="w-full h-64 sm:h-80 md:h-96 rounded-lg mb-4" />
			<div className="prose prose-invert max-w-none">
				<Skeleton className="h-8 w-1/4 mb-2" />
				<Skeleton className="h-4 w-full mb-2" />
				<Skeleton className="h-4 w-full mb-2" />
				<Skeleton className="h-4 w-5/6 mb-2" />
			</div>
		</div>
	);
};

export default ArticlePageSkeleton;
