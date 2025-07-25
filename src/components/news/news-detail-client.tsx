'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { articles } from '@/lib/db/schema';
import { ChevronsUpDown, Clock, Tag } from 'lucide-react';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, FacebookIcon, TwitterIcon, LinkedinIcon } from 'react-share';

type Article = typeof articles.$inferSelect;

interface NewsDetailClientProps {
    article: Article;
    shareUrl: string;
}

export function NewsDetailClient({ article, shareUrl }: NewsDetailClientProps) {
    return (
        <>
            <Collapsible>
                <CollapsibleTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex items-center space-x-2"
                    >
                        <ChevronsUpDown className="w-4 h-4" />
                        <span>Details</span>
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="flex flex-wrap items-center space-x-4 text-sm text-[#bdae93] mt-4">
                        <div className="flex items-center space-x-2">
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <span className="font-semibold cursor-pointer">{article.author || 'Unknown Author'}</span>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <div className="flex items-center space-x-4">
                                        <Avatar>
                                            <AvatarImage src="/placeholder-user.jpg" />
                                            <AvatarFallback>{article.author?.charAt(0) || 'A'}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{article.author || 'Unknown Author'}</p>
                                            <p className="text-sm text-[#bdae93]">Journalist</p>
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" /> <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Tag className="w-4 h-4" /> <span className="capitalize">{article.category}</span>
                        </div>
                    </div>
                </CollapsibleContent>
            </Collapsible>
            <div className="flex items-center space-x-4 mt-4">
                <FacebookShareButton url={shareUrl}>
                    <FacebookIcon
                        size={32}
                        round
                    />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl}>
                    <TwitterIcon
                        size={32}
                        round
                    />
                </TwitterShareButton>
                <LinkedinShareButton url={shareUrl}>
                    <LinkedinIcon
                        size={32}
                        round
                    />
                </LinkedinShareButton>
            </div>
        </>
    );
}
