'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { newsCategories } from '@/lib/newscat';
import { motion } from 'framer-motion';

type Article = {
  id: string;
  title: string;
  description: string;
  urlToImage: string | null;
  sourceName: string;
  author: string | null;
  publishedAt: string;
  category: string;
};

const SkeletonCard = () => (
  <div className="bg-gray-800/40 rounded-xl shadow-lg border border-gray-700/50 p-4 animate-pulse">
    <div className="w-full h-48 bg-gray-700 rounded-lg mb-4"></div>
    <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-700 rounded w-full mb-1"></div>
    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
  </div>
);

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const response = await fetch(`/api/news?category=${selectedCategory}`);
      const data = await response.json();
      setArticles(data);
      setLoading(false);
    };

    fetchArticles();
  }, [selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <div className="sticky top-24">
            <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-4">
              <h2 className="text-lg font-bold text-white mb-4">Categories</h2>
              <ul>
                {newsCategories.map((category) => (
                  <li key={category.id} className="mb-2">
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white font-semibold'
                          : 'hover:bg-gray-700/50 text-gray-300'
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <main className="md:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {articles.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Link href={`/news/${article.id}`}>
                    <div className="bg-gray-800/40 rounded-xl shadow-lg border border-gray-700/50 overflow-hidden h-full flex flex-col group">
                      <div className="relative w-full h-48">
                        <Image 
                          src={article.urlToImage || '/placeholder.svg'} 
                          alt={article.title} 
                          fill
                          style={{ objectFit: 'cover' }}
                          className="group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="text-md font-bold text-white mb-2 flex-grow">{article.title}</h3>
                        <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                          <span>{article.sourceName}</span>
                          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}
