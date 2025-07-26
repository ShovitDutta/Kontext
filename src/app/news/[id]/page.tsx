'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Bookmark, ExternalLink, Share2, Check, Newspaper, BookOpen, BrainCircuit, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

type ContentLength = 'SHORT' | 'MEDIUM' | 'EXPLAINED';

type GeneratedContent = {
  id: string;
  content: string;
  length: ContentLength;
};

type Article = {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  sourceName: string;
  author: string | null;
  publishedAt: string;
  generatedContents: GeneratedContent[];
};

const ArticleSkeleton = () => (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-10 bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-700 rounded w-1/2 mb-8"></div>
        <div className="w-full h-96 bg-gray-700 rounded-xl mb-8"></div>
        <div className="space-y-4">
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        </div>
    </div>
);

const contentDisplayConfig = {
    SHORT: {
        icon: Newspaper,
        title: "Quick Summary",
        color: "text-blue-400"
    },
    MEDIUM: {
        icon: BookOpen,
        title: "Detailed View",
        color: "text-purple-400"
    },
    EXPLAINED: {
        icon: BrainCircuit,
        title: "In-Depth Explanation",
        color: "text-green-400"
    }
};

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        setLoading(true);
        const response = await fetch(`/api/news/${id}`);
        if (response.ok) {
            const data = await response.json();
            data.generatedContents.sort((a: GeneratedContent, b: GeneratedContent) => {
                const order: ContentLength[] = ['SHORT', 'MEDIUM', 'EXPLAINED'];
                return order.indexOf(a.length) - order.indexOf(b.length);
            });
            setArticle(data);
        }
        setLoading(false);
      };
      fetchArticle();
    }
  }, [id]);

  const handleBookmark = () => setIsBookmarked(!isBookmarked);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <ArticleSkeleton />;
  if (!article) return <div className="text-center py-20 text-gray-400">Article not found.</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="max-w-4xl mx-auto px-4 py-8">
      <article>
        <header className="mb-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            {article.title}
          </motion.h1>
          <div className="flex flex-wrap items-center text-sm text-gray-400 space-x-4">
            <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{article.author || article.sourceName}</span>
            </div>
            <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
        </header>

        {article.urlToImage && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden shadow-lg">
            <Image src={article.urlToImage} alt={article.title} fill style={{objectFit: 'cover'}} priority unoptimized />
          </motion.div>
        )}

        <div className="space-y-12">
            {article.generatedContents.length > 0 ? (
                article.generatedContents.map(content => {
                    const config = contentDisplayConfig[content.length];
                    const Icon = config.icon;
                    return (
                        <section key={content.id}>
                            <div className="flex items-center space-x-3 mb-4">
                                <Icon className={`w-7 h-7 ${config.color}`} />
                                <h2 className={`text-2xl font-bold ${config.color}`}>{config.title}</h2>
                            </div>
                            <div className="prose prose-lg prose-invert max-w-full text-gray-300 leading-relaxed">
                                <ReactMarkdown components={{ p: ({node, ...props}) => <p className="mb-4" {...props} /> }}>{content.content}</ReactMarkdown>
                            </div>
                        </section>
                    );
                })
            ) : (
                <div className="prose prose-lg prose-invert max-w-full text-gray-300 leading-relaxed">
                    <ReactMarkdown components={{ p: ({node, ...props}) => <p className="mb-4" {...props} /> }}>{article.description}</ReactMarkdown>
                </div>
            )}
        </div>

        <footer className="mt-12 pt-6 border-t border-gray-700/50 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <button onClick={handleBookmark} className={`flex items-center space-x-2 text-gray-400 hover:text-white transition-colors rounded-full py-2 px-4 ${isBookmarked ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-gray-700/50'}`}>
              <Bookmark className={`h-5 w-5 transition-colors ${isBookmarked ? 'text-blue-400 fill-current' : ''}`} />
              <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
            <Link href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors rounded-full py-2 px-4 hover:bg-gray-700/50">
                <ExternalLink className="h-5 w-5" />
                <span>Read Original</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handleCopy} className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors rounded-full py-2 px-4 hover:bg-gray-700/50">
                {copied ? <Check className="h-5 w-5 text-green-500" /> : <Share2 className="h-5 w-5" />}
                <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </footer>
      </article>
    </motion.div>
  );
}