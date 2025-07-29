import React from 'react';
import Skeleton from './Skeleton';

const ProfilePageSkeleton = () => {
	return (
		<div className="container mx-auto p-4">
			<div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center">
				<Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
				<Skeleton className="h-8 w-48 mx-auto mb-2" />
				<Skeleton className="h-6 w-64 mx-auto" />
			</div>
		</div>
	);
};

export default ProfilePageSkeleton;
