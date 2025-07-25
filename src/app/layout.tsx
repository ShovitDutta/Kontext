import './globals.css';
import type React from 'react';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins' });
export const metadata: Metadata = {
    creator: 'Kontext',
    generator: 'v0.dev',
    publisher: 'Kontext',
    authors: [{ name: 'Kontext Team' }],
    robots: { index: true, follow: true },
    title: { default: 'Kontext - GenAI Powered News Blog', template: '%s | Kontext' },
    keywords: ['AI', 'news', 'technology', 'blog', 'artificial intelligence', 'tech news'],
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
        >
            <body className={`${inter.variable} ${poppins.variable}`}>{children}</body>
        </html>
    );
}
