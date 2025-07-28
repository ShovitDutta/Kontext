'use client';
import './globals.css';
import type React from 'react';
import { motion } from 'framer-motion';
import type {} from 'next';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Poppins } from 'next/font/google';
const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-poppins', display: 'swap' });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang="en"
			style={{ colorScheme: 'dark' }}
			className={`${poppins.variable} dark`}>
			<body className="antialiased font-sans bg-neutral-900 text-white flex flex-col min-h-screen">
				<Header />
				<motion.main
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="flex-grow">
					<div className="relative flex flex-col h-full">{children}</div>
				</motion.main>
				<Footer />
			</body>
		</html>
	);
}
