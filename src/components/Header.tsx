"use client";
import Link from "next/link";
import React from "react";
import UserProfile from "./UserProfile";
import { useSession, signIn } from "next-auth/react";

const Header = () => {
    const { data: session } = useSession();

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
                    <nav className="hidden md:flex items-center space-x-4">
                        <Link
                            href="/about"
                            className="text-neutral-400 hover:text-white"
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="text-neutral-400 hover:text-white"
                        >
                            Contact
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center">
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
            </div>
        </header>
    );
};

export default Header;
