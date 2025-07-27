"use client";
import React from "react";
import { newsCategories } from "@/lib/newscat";
interface CategoryFilterProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}
const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onSelectCategory }) => {
    return (
        <div className="flex space-x-4 mb-4">
            {newsCategories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onSelectCategory(category.id)}
                    className={`px-4 py-2 rounded-lg ${selectedCategory === category.id ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
};
export default CategoryFilter;
