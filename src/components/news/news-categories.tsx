'use client';
import { motion } from 'framer-motion';
interface Category {
    id: string;
    name: string;
    icon: string;
}
interface NewsCategoriesProps {
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}
export function NewsCategories({ categories, selectedCategory, onCategoryChange }: NewsCategoriesProps) {
    return (
        <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`relative px-4 py-2 rounded-full font-medium text-sm transition-colors ${selectedCategory === category.id ? 'text-[#ebdbb2]' : 'text-[#bdae93] hover:text-[#ebdbb2]'}`}
                >
                    {selectedCategory === category.id && (
                        <motion.span
                            layoutId="category-background"
                            className="absolute inset-0 bg-[#458588] rounded-full"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10 flex items-center">
                        {category.icon} <span className="ml-2">{category.name}</span>
                    </span>
                </button>
            ))}
        </div>
    );
}
