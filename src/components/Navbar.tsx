'use client';

import Link from 'next/link';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-white">Kontext</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/news" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            News
          </Link>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <Sun className="h-5 w-5 text-gray-300 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 text-gray-300 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </button>
          <Link href="/login">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors">
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
