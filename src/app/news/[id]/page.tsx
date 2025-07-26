'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';
import { Bookmark, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type GeneratedContent = {
  id: string;
  content: string;
  length: 'SHORT' | 'MEDIUM' | 'EXPLAINED';
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
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        </div>
    </div>
);

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        setLoading(true);
        const response = await fetch(`/api/news/${id}`);
        if (response.ok) {
            const data = await response.json();
            setArticle(data);
        }
        setLoading(false);
      };
      fetchArticle();
    }
  }, [id]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, you'd persist this state.
  };

  if (loading) {
    return <ArticleSkeleton />;
  }

  if (!article) {
    return <div className="text-center py-20 text-gray-400">Article not found.</div>;
  }

  const shareUrl = article.url;
  const selectedContent = article.generatedContents.find(c => c.length === 'MEDIUM') || article.generatedContents[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <article>
        <header className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3"
          >
            {article.title}
          </motion.h1>
          <div className="flex flex-wrap items-center text-sm text-gray-400">
            <span>By {article.author || article.sourceName}</span>
            <span className="mx-2">&bull;</span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
        </header>

        {article.urlToImage && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden shadow-lg"
          >
            <Image src={article.urlToImage} alt={article.title} fill style={{objectFit: 'cover'}} priority />
          </motion.div>
        )}

        <div className="prose prose-lg prose-invert max-w-full text-gray-300 leading-relaxed">
          {selectedContent ? (
            <p>{selectedContent.content}</p>
          ) : (
            <p>{article.description}</p>
          )}
        </div>

        <footer className="mt-10 pt-6 border-t border-gray-700/50 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <button 
              onClick={handleBookmark} 
              className={`flex items-center space-x-2 text-gray-400 hover:text-white transition-colors rounded-full py-2 px-4 ${isBookmarked ? 'bg-blue-600/20 text-blue-400' : 'hover:bg-gray-700/50'}`}
            >
              <Bookmark className={`h-5 w-5 transition-colors ${isBookmarked ? 'text-blue-400 fill-current' : ''}`} />
              <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
            <Link href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors rounded-full py-2 px-4 hover:bg-gray-700/50">
                <ExternalLink className="h-5 w-5" />
                <span>Read Original</span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400 mr-2">Share:</span>
            <TwitterShareButton url={shareUrl} title={article.title}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>
            <FacebookShareButton url={shareUrl} quote={article.title}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </div>
        </footer>
      </article>
    </motion.div>
  );
}