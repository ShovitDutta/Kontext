'use client';
import React from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
const Header = () => {
	return (
		<header className="sticky top-0 z-50 bg-neutral-900/50 backdrop-blur-lg">
			<div className="container mx-auto px-4 flex items-center justify-between p-4 space-x-4">
				<div className="flex-shrink-0">
					<Link
						href="/"
						className="text-2xl font-bold">
						Kontext
					</Link>
				</div>
				<div className="w-full">
					<SearchBar />
				</div>
			</div>
		</header>
	);
};
export default Header;
