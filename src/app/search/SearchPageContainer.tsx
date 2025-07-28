'use client';
import dynamic from 'next/dynamic';
import React from 'react';

const SearchPageClient = dynamic(() => import('./SearchPageClient'), { ssr: false });

const SearchPageContainer = () => {
	return <SearchPageClient />;
};

export default SearchPageContainer;
