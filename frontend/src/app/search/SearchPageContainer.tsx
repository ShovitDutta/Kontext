'use client';
import React from 'react';
import dynamic from 'next/dynamic';
const SearchPageClient = dynamic(() => import('./SearchPageClient'), { ssr: false });
const SearchPageContainer = () => {
	return <SearchPageClient />;
};
export default SearchPageContainer;
