"use client";
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
const ProfilePage = () => {
    const { data: session } = useSession();
    if (!session) return <div>You are not signed in.</div>;
    return (
        <div className="container mx-auto p-4">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                <Image
                    src={session.user?.image || "/default-avatar.png"}
                    alt={session.user?.name || "User"}
                    width={100}
                    height={100}
                    className="rounded-full mx-auto mb-4"
                />
                <h1 className="text-2xl font-bold mb-2">{session.user?.name}</h1> <p className="text-gray-400">{session.user?.email}</p>
            </div>
        </div>
    );
};
export default ProfilePage;
