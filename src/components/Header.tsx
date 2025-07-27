"use client";
import React from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-neutral-900/50 backdrop-blur-lg">
            <div className="container mx-auto px-4 flex justify-between items-center p-4">
                <div className="flex items-center space-x-4">
                    <Link
                        href="/"
                        className="text-2xl font-bold"
                    >
                        Kontext
                    </Link>
                </div>
                <div className="flex-1 flex justify-center px-8">
                    <SearchBar />
                </div>
            </div>
        </header>
    );
};

export default Header;
