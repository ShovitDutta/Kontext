'use client';
import dynamic from 'next/dynamic';
import React from 'react';

const CategoryPageClient = dynamic(() => import('./CategoryPageClient'), { ssr: false });

const CategoryPageContainer = () => {
	return <CategoryPageClient />;
};

export default CategoryPageContainer;
