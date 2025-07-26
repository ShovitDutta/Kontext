import './globals.css';
import type React from 'react';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins' });

export const metadata: Metadata = {
    creator: 'Kontext',
    generator: 'Next.js',
    publisher: 'Kontext',
    authors: [{ name: 'Kontext Team' }],
    robots: { index: true, follow: true },
    keywords: ['AI', 'News', 'Technology', 'Blog', 'Intelligence', 'Daily'],
    title: { default: 'Kontext - GenAI Powered News Blog', template: '%s | Kontext' },
    description: 'Kontext Is An GenAI Powered News Blog, To Stay Updated With The Latest News, Transformed Into Engaging Blog Posts Using GenAI.',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        siteName: 'Kontext',
        title: 'Kontext - GenAI Powered News Blog',
        url: 'https://kontext-ai-news.vercel.app',
        description: 'Kontext Is An GenAI Powered News Blog, To Stay Updated With The Latest News, Transformed Into Engaging Blog Posts Using GenAI.',
    },
    twitter: {
        creator: '@kontext',
        card: 'summary_large_image',
        title: 'Kontext - GenAI Powered News Blog',
        description: 'Kontext Is An GenAI Powered News Blog, To Stay Updated With The Latest News, Transformed Into Engaging Blog Posts Using GenAI.',
    },
};

export const viewport = { width: 'device-width', initialScale: 1, maximumScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            className="dark"
            style={{ colorScheme: 'dark' }}
        >
            <body className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-gray-900 text-gray-200`}>
                <Providers>
                    <div className="relative flex min-h-screen flex-col">
                        <Navbar />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
