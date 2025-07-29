'use client';
import React from 'react';
import { motion } from 'framer-motion';
const LoadingBar = () => {
	return (
		<div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden relative">
			<motion.div
				className="absolute top-0 left-0 h-full bg-white rounded-full"
				style={{ width: '30%' }}
				initial={{ x: '-100%' }}
				animate={{ x: '333%' }}
				transition={{
					repeat: Infinity,
					repeatType: 'loop',
					duration: 1.2,
					ease: 'linear',
				}}
			/>
		</div>
	);
};
export default LoadingBar;
