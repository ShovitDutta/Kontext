'use client';
import React from 'react';
import { FiWifiOff } from 'react-icons/fi';

const OfflinePage = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen text-center">
			<FiWifiOff
				size={64}
				className="text-neutral-500 mb-4"
			/>
			<h1 className="text-3xl font-bold text-white">You are offline</h1>
			<p className="text-neutral-400 mt-2">
				Please check your internet connection. The content will be available once you are back online.
			</p>
		</div>
	);
};

export default OfflinePage;
