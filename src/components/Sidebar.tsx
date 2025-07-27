"use client";
import React from "react";
import { newsCategories } from "@/lib/newscat";

interface SidebarProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onSelectCategory }) => {
    return (
        <div className="w-64 space-y-4">
            <h1 className="text-2xl font-bold">Tools & Craft</h1>
            <p className="text-neutral-400">News, interviews, and thoughts from the people and teams who work at Notion.</p>
            <nav className="space-y-2">
                {newsCategories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onSelectCategory(category.id)}
                        className={`block w-full text-left px-4 py-2 rounded-lg ${selectedCategory === category.id ? "bg-neutral-700 text-white" : "text-neutral-400 hover:bg-neutral-800 hover:text-white"}`}
                    >
                        {category.name}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
