'use client';

import Link from 'next/link';

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-700/50 bg-gray-900/80 backdrop-blur">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center space-x-2"
                >
                    <span className="font-bold text-xl text-white">Kontext</span>
                </Link>
                <div className="flex items-center space-x-4">
                    <Link
                        href="/news"
                        className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                    >
                        News
                    </Link>
                    <Link href="/login">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors">Login</button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
