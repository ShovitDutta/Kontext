import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string | null;
    onCategoryChange: (category: string | null) => void;
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {/* Desktop view */}
            <div className="hidden md:flex flex-wrap gap-2">
                <button
                    onClick={() => onCategoryChange(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === null ? "bg-blue-600 text-white" : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"}`}
                >
                    All
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category ? "bg-blue-600 text-white" : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Mobile dropdown */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-4 py-2 bg-neutral-800 rounded-lg text-left text-white flex items-center justify-between"
                >
                    <span>{selectedCategory || "All Categories"}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
                </button>

                {isOpen && (
                    <div className="absolute z-50 mt-2 w-full bg-neutral-800 rounded-lg shadow-lg py-2 border border-gray-700">
                        <button
                            onClick={() => {
                                onCategoryChange(null);
                                setIsOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-left text-sm ${selectedCategory === null ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-neutral-700"}`}
                        >
                            All
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    onCategoryChange(category);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-2 text-left text-sm ${selectedCategory === category ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-neutral-700"}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
