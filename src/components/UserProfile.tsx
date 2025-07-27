"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
const UserProfile = () => {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    if (!session) return null;
    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center"
            >
                <Image
                    src={session.user?.image || "/default-avatar.png"}
                    alt={session.user?.name || "User"}
                    width={40}
                    height={40}
                    className="rounded-full"
                />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2">
                    <div className="px-4 py-2">
                        <p className="text-white font-bold">{session.user?.name}</p> <p className="text-gray-400 text-sm">{session.user?.email}</p>
                    </div>
                    <div className="border-t border-gray-700 my-2"></div>
                    <Link
                        href="/profile"
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                    >
                        Profile
                    </Link>
                    <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-700"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};
export default UserProfile;
