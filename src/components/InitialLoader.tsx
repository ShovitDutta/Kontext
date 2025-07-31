import React from 'react';
import LoadingBar from './LoadingBar';
const InitialLoader = () => {
	return (
		<div className="flex flex-col items-center justify-center space-y-4">
			<h1 className="text-4xl sm:text-6xl font-bold animate-pulse">Kontext</h1>
			<div className="w-48">
				<LoadingBar />
			</div>
		</div>
	);
};
export default InitialLoader;
