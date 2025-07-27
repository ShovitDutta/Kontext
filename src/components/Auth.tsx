"use client";
import Link from "next/link";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
export default function Auth({ session }: { session: Session | null }) {
    return (
        <div className="flex items-center space-x-4">
            <Link
                href="/news"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
                News
            </Link>
            {session ? (
                <button
                    onClick={() => signOut()}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors"
                >
                    Logout
                </button>
            ) : (
                <button
                    onClick={() => signIn("google")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors"
                >
                    Login
                </button>
            )}
        </div>
    );
}
