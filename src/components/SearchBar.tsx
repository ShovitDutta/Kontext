import { useState, useEffect, useRef } from "react";
import { Search, X, Clock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchResult {
    id: string;
    title: string;
    category: string;
}

interface SearchBarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchBar({ isOpen, onClose }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        // Load recent searches from localStorage
        const saved = localStorage.getItem("recentSearches");
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleSearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        // Add to recent searches
        const newRecentSearches = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5);
        setRecentSearches(newRecentSearches);
        localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches));

        try {
            // TODO: Implement actual search API call
            // Mock results for now
            const mockResults: SearchResult[] = [
                { id: "1", title: "Search Result 1", category: "Technology" },
                { id: "2", title: "Search Result 2", category: "Business" },
            ];
            setResults(mockResults);
        } catch (error) {
            console.error("Search error:", error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-neutral-900/90 backdrop-blur-sm z-50">
            <div
                ref={searchRef}
                className="container mx-auto px-4 pt-24 md:pt-32"
            >
                <div className="max-w-2xl mx-auto bg-neutral-800 rounded-lg shadow-xl">
                    <div className="p-4 flex items-center border-b border-gray-700">
                        <Search className="w-5 h-5 text-gray-400" />
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search articles..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch(query);
                                }
                            }}
                            className="flex-1 bg-transparent border-0 outline-none text-white px-4 py-2"
                        />
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-neutral-700 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    <div className="max-h-[60vh] overflow-y-auto">
                        {query ? (
                            <div className="p-2">
                                {isLoading ? (
                                    <div className="text-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                                    </div>
                                ) : results.length > 0 ? (
                                    <div className="space-y-2">
                                        {results.map((result) => (
                                            <button
                                                key={result.id}
                                                onClick={() => {
                                                    router.push(`/news/${result.id}`);
                                                    onClose();
                                                }}
                                                className="w-full p-3 flex items-center justify-between rounded-lg hover:bg-neutral-700 transition-colors"
                                            >
                                                <div>
                                                    <h4 className="text-white text-left">{result.title}</h4>
                                                    <span className="text-sm text-gray-400">{result.category}</span>
                                                </div>
                                                <ArrowRight className="w-5 h-5 text-gray-400" />
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-center py-8">No results found</p>
                                )}
                            </div>
                        ) : recentSearches.length > 0 ? (
                            <div className="p-2">
                                <h3 className="text-sm font-medium text-gray-400 px-3 py-2">Recent Searches</h3>
                                <div className="space-y-1">
                                    {recentSearches.map((search, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setQuery(search);
                                                handleSearch(search);
                                            }}
                                            className="w-full p-3 flex items-center space-x-3 rounded-lg hover:bg-neutral-700 transition-colors"
                                        >
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <span className="text-gray-300">{search}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
