"use client";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
export default function LoginPage() {
    const { data: session, status } = useSession();
    if (status === "loading") return <div>Loading...</div>;
    if (session) redirect("/home");
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-14rem)]">
            <motion.div
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                initial={{ opacity: 0, y: 20 }}
                className="w-full max-w-md p-8 space-y-6 bg-gray-800/40 border border-gray-700/50 rounded-xl shadow-lg"
            >
                <h1 className="text-2xl font-bold text-center text-white">Welcome to Kontext</h1>
                <p className="text-center text-gray-400">Sign in with your Google account to continue.</p>
                <button
                    onClick={() => signIn("google", { callbackUrl: "/home" })}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-md transition-colors"
                >
                    Sign in with Google
                </button>
            </motion.div>
        </div>
    );
}
