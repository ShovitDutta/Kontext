'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { articles } from '@/lib/db/schema';
import { Clock, ExternalLink, ArrowRight, Share2, Bookmark } from 'lucide-react';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';

type Article = typeof articles.$inferSelect;

interface NewsCardProps {
    news: Article;
}
export function NewsCard({ news }: NewsCardProps) {
    const timeAgo = new Date(news.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-[#3c3836] rounded-xl border border-[#bdae93] overflow-hidden h-full flex flex-col group"
                >
                    <div className="aspect-video relative overflow-hidden">
                        <Image
                            src={news.urlToImage || '/placeholder.svg'}
                            alt={news.title || 'Article Image'}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 bg-[#458588] text-[#ebdbb2] text-xs font-semibold rounded-full capitalize"> {news.category} </span>
                        </div>
                    </div>
                    <div className="p-4 sm:p-6 flex flex-col flex-grow">
                        <h3 className="text-lg sm:text-xl font-heading font-semibold mb-2 line-clamp-2 text-[#ebdbb2]"> {news.title} </h3>
                        <p className="text-[#bdae93] text-xs sm:text-sm mb-4 line-clamp-3 flex-grow"> {news.description} </p>
                        <div className="flex items-center justify-between text-xs text-[#bdae93] mb-4">
                            <span className="font-medium">{news.sourceName}</span>
                            <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" /> <span>{timeAgo}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-[#bdae93]">
                            <Link
                                href={`/news/${news.id}`}
                                className="flex items-center text-sm font-semibold text-[#ebdbb2] hover:underline"
                            >
                                Read & Generate <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                href={news.url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-[#3c3836] hover:bg-[#504945] rounded-full transition-colors"
                                aria-label="Read original article"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                </ContextMenuItem>
                <ContextMenuItem>
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save for later
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}
