'use client';
import { useState, useMemo, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { newsCategories } from '@/lib/newscat';
import { motion, AnimatePresence } from 'framer-motion';
import { useArticles } from '@/lib/queries';
import { Newspaper, Calendar, Tag } from 'lucide-react';

const SkeletonCard = () => (
    <div className="bg-neutral-800 rounded-lg shadow-md p-4 animate-pulse">
        <div className="w-full h-40 bg-neutral-700 rounded-md mb-4"></div>
        <div className="h-5 bg-neutral-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-neutral-700 rounded w-full mb-1"></div>
        <div className="h-4 bg-neutral-700 rounded w-5/6"></div>
    </div>
);

const ArticleCard = memo(({ article }: { article: any }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="w-full"
    >
        <Link href={`/news/${article.id}`}>
            <motion.div
                whileHover={{ y: -5, boxShadow: '0px 10px 20px rgba(0,0,0,0.2)' }}
                className="bg-neutral-800 rounded-lg shadow-lg overflow-hidden h-full flex flex-col group border border-transparent hover:border-blue-500 transition-all duration-300"
            >
                <div className="relative w-full h-48">
                    <Image
                        src={article.urlToImage || '/placeholder.svg'}
                        alt={article.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                    />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-md font-bold text-neutral-100 mb-2 flex-grow group-hover:text-blue-400 transition-colors">{article.title}</h3>
                    <div className="flex items-center text-xs text-neutral-400 mt-2">
                        <Newspaper className="w-4 h-4 mr-2" />
                        <span>{article.sourceName}</span>
                    </div>
                    <div className="flex items-center text-xs text-neutral-400 mt-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>
            </motion.div>
        </Link>
    </motion.div>
));

ArticleCard.displayName = 'ArticleCard';

export default function NewsFeed() {
    const { data: allArticles, isLoading, error } = useArticles();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredArticles = useMemo(() => {
        if (!allArticles) return [];
        if (selectedCategory === 'all') {
            return allArticles;
        }
        return allArticles.filter((article) => article.category === selectedCategory);
    }, [selectedCategory, allArticles]);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <aside className="lg:col-span-3">
                    <div className="sticky top-24">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 shadow-inner"
                        >
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                                <Tag className="w-5 h-5 mr-2 text-blue-400" />
                                Categories
                            </h2>
                            <ul className="space-y-2">
                                {newsCategories.map((category) => (
                                    <motion.li
                                        key={category.id}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <button
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`w-full text-left px-4 py-2 rounded-md text-sm transition-all duration-200 flex items-center ${selectedCategory === category.id ? 'bg-blue-600 text-white font-semibold shadow-md' : 'hover:bg-neutral-700 text-neutral-300'}`}
                                        >
                                            <span className="w-5 h-5 mr-3">{category.icon}</span>
                                            {category.name}
                                        </button>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </aside>

                <main className="lg:col-span-9">
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {Array.from({ length: 9 }).map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-400">Failed to load articles.</div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                        >
                            <AnimatePresence>
                                {filteredArticles.map((article) => (
                                    <ArticleCard
                                        key={article.id}
                                        article={article}
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </main>
            </div>
        </div>
    );
}
