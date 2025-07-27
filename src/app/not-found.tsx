/* ================================================================================== */
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
/* ================================================================================== */
export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-14rem)] text-center px-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-6xl font-bold text-blue-500">404</h1> <h2 className="mt-4 text-3xl font-bold text-white">Page Not Found</h2> <p className="mt-2 text-lg text-gray-400">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
                <div className="mt-8">
                    <Link href="/">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition-transform transform hover:scale-105 inline-flex items-center space-x-2">
                            <span>Go Home</span> <FaArrowRight className="h-5 w-5" />
                        </button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
/* ================================================================================== */