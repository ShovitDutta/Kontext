'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Bookmark, ExternalLink, Share2, Check, Newspaper, BookOpen, BrainCircuit, Calendar, User, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { useArticle } from '@/lib/queries';

const ArticleSkeleton = () => (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-10 bg-neutral-700 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-neutral-700 rounded w-1/2 mb-8"></div>
        <div className="w-full h-96 bg-neutral-700 rounded-xl mb-8"></div>
        <div className="space-y-4">
            <div className="h-4 bg-neutral-700 rounded w-full"></div>
            <div className="h-4 bg-neutral-700 rounded w-full"></div>
            <div className="h-4 bg-neutral-700 rounded w-5/6"></div>
        </div>
    </div>
);

const contentDisplayConfig = {
    SHORT: { icon: Newspaper, title: 'Quick Summary', color: 'text-blue-400' },
    MEDIUM: { icon: BookOpen, title: 'Detailed View', color: 'text-purple-400' },
    EXPLAINED: { icon: BrainCircuit, title: 'In-Depth Explanation', color: 'text-green-400' },
};

export default function ArticleClientView() {
    const { id } = useParams();
    const { article, isLoading, error } = useArticle(id as string);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleBookmark = () => setIsBookmarked(!isBookmarked);
    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (isLoading) return <ArticleSkeleton />;
    if (error) return <div className="text-center py-20 text-red-400">Error loading article.</div>;
    if (!article) return <div className="text-center py-20 text-neutral-400">Article not found.</div>;

    // Sort generated contents once, with a fallback for safety
    const sortedContents = (article.generatedContents || []).sort((a, b) => {
        const order = ['SHORT', 'MEDIUM', 'EXPLAINED'];
        return order.indexOf(a.length) - order.indexOf(b.length);
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
            <div className="mb-8">
                <Link
                    href="/news"
                    className="flex items-center text-neutral-400 hover:text-blue-400 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to News
                </Link>
            </div>
            <article className="bg-neutral-800/50 rounded-2xl shadow-2xl overflow-hidden border border-neutral-700">
                {article.urlToImage && (
                    <motion.div
                        className="relative w-full h-64 md:h-96"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Image
                            src={article.urlToImage}
                            alt={article.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                            unoptimized
                        />
                    </motion.div>
                )}
                <div className="p-6 sm:p-8 md:p-10">
                    <header className="mb-8">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4"
                        >
                            {article.title}
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-wrap items-center text-sm text-neutral-400 gap-x-4 gap-y-2"
                        >
                            <div className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                <span>{article.author || article.sourceName}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </motion.div>
                    </header>

                    <div className="space-y-12">
                        {sortedContents.length > 0 ? (
                            sortedContents.map((content, index) => {
                                const config = contentDisplayConfig[content.length as keyof typeof contentDisplayConfig];
                                const Icon = config.icon;
                                return (
                                    <motion.section
                                        key={content.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                    >
                                        <div className="flex items-center space-x-3 mb-4">
                                            <Icon className={`w-7 h-7 ${config.color}`} />
                                            <h2 className={`text-2xl font-bold ${config.color}`}>{config.title}</h2>
                                        </div>
                                        <div className="prose prose-lg prose-invert max-w-full text-neutral-300 leading-relaxed">
                                            <ReactMarkdown
                                                components={{
                                                    p: ({ node, ...props }) => (
                                                        <p
                                                            className="mb-4"
                                                            {...props}
                                                        />
                                                    ),
                                                }}
                                            >
                                                {content.content}
                                            </ReactMarkdown>
                                        </div>
                                    </motion.section>
                                );
                            })
                        ) : (
                            <div className="prose prose-lg prose-invert max-w-full text-neutral-300 leading-relaxed">
                                <ReactMarkdown
                                    components={{
                                        p: ({ node, ...props }) => (
                                            <p
                                                className="mb-4"
                                                {...props}
                                            />
                                        ),
                                    }}
                                >
                                    {article.description}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>

                    <motion.footer
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-12 pt-6 border-t border-neutral-700/50 flex flex-col sm:flex-row items-center justify-between gap-4"
                    >
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleBookmark}
                                className={`flex items-center space-x-2 text-neutral-300 transition-colors rounded-full py-2 px-4 ${isBookmarked ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-neutral-700'}`}
                            >
                                <Bookmark className={`h-5 w-5 transition-colors ${isBookmarked ? 'text-blue-400 fill-current' : ''}`} />
                                <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                            </button>
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-neutral-300 hover:bg-neutral-700 transition-colors rounded-full py-2 px-4"
                            >
                                <ExternalLink className="h-5 w-5" />
                                <span>Read Original</span>
                            </a>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleCopy}
                                className="flex items-center space-x-2 text-neutral-300 hover:bg-neutral-700 transition-colors rounded-full py-2 px-4"
                            >
                                {copied ? <Check className="h-5 w-5 text-green-500" /> : <Share2 className="h-5 w-5" />}
                                <span>{copied ? 'Copied!' : 'Share'}</span>
                            </button>
                        </div>
                    </motion.footer>
                </div>
            </article>
        </motion.div>
    );
}
