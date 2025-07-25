'use client';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { articles as articlesSchema } from '@/lib/db/schema';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { newsCategories } from '@/lib/news-api';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { NewsFeed } from '@/components/news/news-feed';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar as CalendarIcon, Search } from 'lucide-react';
import { NewsCategories } from '@/components/news/news-categories';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

type Article = typeof articlesSchema.$inferSelect;

export default function Dashboard() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [allArticles, setAllArticles] = useState<Article[]>([]);
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 6;
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);
    const handleSearchResultClick = (id: string) => {
        router.push(`/news/${id}`);
        setOpen(false);
    };
    const filteredArticles = allArticles.filter((article) => (article.title?.toLowerCase() ?? '').includes(searchQuery.toLowerCase()) || (article.description?.toLowerCase() ?? '').includes(searchQuery.toLowerCase()));
    return (
        <SidebarProvider>
            <div className="min-h-screen bg-[#282828] text-[#ebdbb2] p-4 sm:p-6 lg:p-8">
                <ResizablePanelGroup
                    direction="horizontal"
                    className="max-w-7xl mx-auto"
                >
                    <Sidebar>
                        <SidebarContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>Home</SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>Categories</SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarContent>
                    </Sidebar>
                    <ResizablePanel defaultSize={70}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center mb-12"
                            >
                                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">Today&apos;s Tech Headlines</h1>
                                <p className="text-lg text-[#bdae93]">Explore the latest news and generate AI-powered insights.</p>
                                <Button
                                    variant="outline"
                                    onClick={() => setOpen(true)}
                                    className="mt-4"
                                >
                                    <Search className="mr-2 h-4 w-4" /> <span>Search...</span>
                                    <kbd className="ml-4 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                        <span className="text-xs">⌘</span>K
                                    </kbd>
                                </Button>
                            </motion.div>
                            <div className="sticky top-16 bg-[#282828]/80 backdrop-blur-lg z-40 py-4 mb-8 flex justify-center">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className="w-[280px] justify-start text-left font-normal"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" /> {date ? format(date, 'PPP') : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="sticky top-32 bg-[#282828]/80 backdrop-blur-lg z-40 py-4 mb-8">
                                <NewsCategories
                                    categories={newsCategories}
                                    selectedCategory={selectedCategory}
                                    onCategoryChange={setSelectedCategory}
                                />
                            </div>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <NewsFeed
                                    category={selectedCategory}
                                    allArticles={allArticles}
                                    setAllArticles={setAllArticles}
                                    date={date}
                                    currentPage={currentPage}
                                    articlesPerPage={articlesPerPage}
                                />
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                                                }}
                                            />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#">{currentPage}</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationNext
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setCurrentPage((prev) => prev + 1);
                                                }}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                            <CommandDialog
                                open={open}
                                onOpenChange={setOpen}
                            >
                                <CommandInput
                                    placeholder="Type a command or search..."
                                    value={searchQuery}
                                    onValueChange={setSearchQuery}
                                />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    {searchQuery && (
                                        <CommandGroup heading="Articles">
                                            {filteredArticles.map((article) => (
                                                <CommandItem
                                                    key={article.id}
                                                    onSelect={() => handleSearchResultClick(article.id)}
                                                >
                                                    {article.title}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    )}
                                    <CommandSeparator />
                                    <CommandGroup heading="Suggestions">
                                        <CommandItem>
                                            <CalendarIcon className="mr-2 h-4 w-4" /> <span>Calendar</span>
                                        </CommandItem>
                                        <CommandItem>
                                            <Search className="mr-2 h-4 w-4" /> <span>Search Emoji</span>
                                        </CommandItem>
                                    </CommandGroup>
                                </CommandList>
                            </CommandDialog>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={30}>
                        <ScrollArea className="h-full p-6">
                            <span className="font-semibold">Details Panel</span>
                        </ScrollArea>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </SidebarProvider>
    );
}
