'use client';
import { motion } from 'framer-motion';
import { NewsCard } from './news-card';
import { articles } from '@/lib/db/schema';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

type Article = typeof articles.$inferSelect;

interface NewsFeedProps {
    category: string;
    allArticles: Article[];
    setAllArticles: (articles: Article[]) => void;
    date?: Date;
    currentPage: number;
    articlesPerPage: number;
}

export function NewsFeed({ category, allArticles, setAllArticles, date, currentPage, articlesPerPage }: NewsFeedProps) {
    const [filteredNews, setFilteredNews] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/api/news');
                const data = await response.json();
                setAllArticles(data);
            } catch (error) {
                console.error('Failed to fetch news:', error);
            } finally {
                setLoading(false);
            }
        };
        if (allArticles.length === 0) fetchNews();
        else setLoading(false);
    }, [allArticles, setAllArticles]);

    useEffect(() => {
        let news = allArticles;
        if (category !== 'all') {
            news = news.filter((item) => item.category === category);
        }
        if (date) {
            news = news.filter((item) => new Date(item.publishedAt).toDateString() === date.toDateString());
        }
        const indexOfLastArticle = currentPage * articlesPerPage;
        const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
        setFilteredNews(news.slice(indexOfFirstArticle, indexOfLastArticle));
    }, [category, allArticles, date, currentPage, articlesPerPage]);

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center py-20">
                <p className="text-lg text-[#bdae93] animate-pulse">Fetching Latest Kontext...</p>
            </div>
        );
    }

    if (filteredNews.length === 0) {
        return (
            <div className="flex justify-center items-center py-20">
                <Card className="w-full max-w-md bg-[#3c3836] border-[#bdae93]">
                    <CardContent className="p-6">
                        <p className="text-center text-[#bdae93]">No latest blogs for this selected category.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {filteredNews.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <NewsCard news={item} />
                </motion.div>
            ))}
        </motion.div>
    );
}
