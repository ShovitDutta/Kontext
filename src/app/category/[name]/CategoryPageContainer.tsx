'use client';
import React from 'react';
import dynamic from 'next/dynamic';
const CategoryPageClient = dynamic(() => import('./CategoryPageClient'), { ssr: false });
const CategoryPageContainer = () => {
	return <CategoryPageClient />;
};
export default CategoryPageContainer;