"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { SearchBar } from "./SearchBar";

export function SearchButton() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-gray-800"
                aria-label="Search"
            >
                <Search className="w-5 h-5" />
            </button>
            <SearchBar
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </>
    );
}
