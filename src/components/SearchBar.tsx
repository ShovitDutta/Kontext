"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${searchQuery}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative w-full max-w-md mx-auto">
            <input
                type="text"
                placeholder="Search for articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-neutral-800 text-white w-full p-3 rounded-full pl-12"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
        </form>
    );
};

export default SearchBar;
