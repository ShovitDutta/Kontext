import Image from 'next/image';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import { NewsCard } from '@/components/news/news-card';
import { BlogGenerator } from '@/components/blog/blog-generator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { NewsDetailClient } from '@/components/news/news-detail-client';
import { articles } from '@/lib/db/schema';
import { eq, and, not } from 'drizzle-orm';

interface NewsDetailPageProps {
    params: { id: string };
}
export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
    const article = await db.query.articles.findFirst({ where: eq(articles.id, params.id) });
    if (!article) notFound();
    const relatedArticles = await db
        .select()
        .from(articles)
        .where(and(eq(articles.category, article.category), not(eq(articles.id, article.id))))
        .limit(5);

    const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/news/${article.id}`;
    return (
        <div className="min-h-screen bg-[#282828] text-[#ebdbb2]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{article.title}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <article className="space-y-8 mt-8">
                    <header className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold text-[#ebdbb2]">{article.title}</h1>
                        <NewsDetailClient
                            article={article}
                            shareUrl={shareUrl}
                        />
                    </header>
                    <div className="aspect-video relative overflow-hidden rounded-lg border border-[#bdae93]">
                        <Image
                            src={article.urlToImage || '/placeholder.svg'}
                            alt={article.title || 'Article Image'}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="prose prose-invert max-w-none text-[#ebdbb2]">
                        <p className="text-base sm:text-lg leading-relaxed">{article.description}</p>
                    </div>
                    <a
                        href={article.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#bdae93] hover:underline mt-4 inline-block font-semibold"
                    >
                        Read Full Article &rarr;
                    </a>
                    <section className="py-8 border-t border-[#bdae93]">
                        <BlogGenerator articleId={article.id} />
                    </section>
                </article>
                <section className="py-8 border-t border-[#bdae93] mt-8">
                    <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
                    <Carousel
                        opts={{
                            align: 'start',
                        }}
                        className="w-full"
                    >
                        <CarouselContent>
                            {relatedArticles.map((relatedArticle) => (
                                <CarouselItem
                                    key={relatedArticle.id}
                                    className="md:basis-1/2 lg:basis-1/3"
                                >
                                    <div className="p-1">
                                        <NewsCard news={relatedArticle} />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </section>
            </div>
        </div>
    );
}
