import './globals.css';
import type React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Poppins } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import MainContent from '@/components/MainContent';
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-poppins', display: 'swap' });
export const metadata: Metadata = { manifest: '/manifest.ts' };
export const viewport: Viewport = { themeColor: '#111827' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang="en"
			style={{ colorScheme: 'dark' }}
			className={`${poppins.variable} dark`}>
			<body className="antialiased font-sans bg-neutral-900 text-white flex flex-col min-h-screen">
				<Header /> <MainContent>{children}</MainContent> <Footer />
			</body>
		</html>
	);
}
