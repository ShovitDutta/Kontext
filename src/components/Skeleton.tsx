import React from 'react';
const Skeleton = ({ className }: { className?: string }) => {
	return <div className={`animate-pulse bg-neutral-800 rounded-md ${className}`}></div>;
};
export default Skeleton;