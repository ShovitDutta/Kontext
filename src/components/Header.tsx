"use client";
import Link from "next/link";
import React, { useState } from "react";
import UserProfile from "./UserProfile";
import { FiSearch } from "react-icons/fi";
import { newsCategories } from "@/lib/newscat";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
const Header = () => {
    const { data: session } = useSession();
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${searchQuery}`);
        }
    };
    return (
        <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
                <Link
                    href="/"
                    className="text-2xl font-bold"
                >
                    Kontext
                </Link>
            </div>
            <div className="flex-1 mx-4">
                <form
                    onSubmit={handleSearch}
                    className="relative"
                >
                    <input
                        type="text"
                        placeholder="Search for articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-gray-800 text-white w-full p-2 rounded-lg pl-10"
                    />
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </form>
            </div>
            <div className="flex items-center">
                <nav className="hidden md:flex space-x-4">
                    <Link
                        href="/"
                        className="hover:text-gray-300"
                    >
                        Home
                    </Link>
                    {newsCategories
                        .filter((c) => c.id !== "all")
                        .map((category) => (
                            <Link
                                key={category.id}
                                href={`/category/${category.id}`}
                                className="hover:text-gray-300"
                            >
                                {category.name}
                            </Link>
                        ))}
                </nav>
                <div className="ml-4">
                    {session ? (
                        <UserProfile />
                    ) : (
                        <button
                            onClick={() => signIn("google")}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                        >
                            Sign In
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};
export default Header;
