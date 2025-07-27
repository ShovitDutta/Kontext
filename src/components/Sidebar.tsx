"use client";
import React from "react";
import { motion } from "framer-motion";
import { newsCategories } from "@/lib/newscat";

interface SidebarProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-64 space-y-4"
        >
            <h1 className="text-2xl font-bold">Tools & Craft</h1>
            <p className="text-neutral-400">News, interviews, and thoughts from the people and teams who work at Notion.</p>
            <nav className="space-y-2">
                {newsCategories.map((category) => (
                    <motion.button
                        key={category.id}
                        onClick={() => onSelectCategory(category.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${selectedCategory === category.id ? "bg-neutral-700 text-white" : "text-neutral-400 hover:bg-neutral-800 hover:text-white"}`}
                    >
                        {category.name}
                    </motion.button>
                ))}
            </nav>
        </motion.div>
    );
};

export default Sidebar;
