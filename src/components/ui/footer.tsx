'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
const Footer = () => {
    return (
        <motion.footer
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full border-t border-[#bdae93]/10 bg-[#282828]/50 backdrop-blur-lg"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center h-24 sm:h-16">
                    <p className="text-[#bdae93] text-sm"> &copy; {new Date().getFullYear()} Kontext. All rights reserved. </p>
                    <Link
                        href="/"
                        className="flex items-center space-x-2"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                        >
                            Kontext
                        </motion.div>
                    </Link>
                </div>
            </div>
        </motion.footer>
    );
};
export default Footer;
