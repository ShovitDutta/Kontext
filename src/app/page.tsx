import React from "react";
import Link from "next/link";
import Image from "next/image";

export default async function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/20 via-neutral-900/50 to-neutral-900" />
                <Image
                    src="/placeholder.jpg"
                    alt="Featured News"
                    fill
                    className="object-cover"
                    priority
                />

                <div className="relative container mx-auto px-4 h-full flex items-center">
                    <div className="max-w-2xl">
                        <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-blue-500 text-white rounded-full">Featured</span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Discover AI-Powered News Insights</h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-6">Stay informed with our AI-transformed news articles, bringing you the most relevant updates in an engaging format.</p>
                        <Link
                            href="#latest"
                            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Read Latest News
                        </Link>
                    </div>
                </div>
            </section>

            {/* Category Quick Access */}
            <section className="py-12 bg-neutral-800">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {["Technology", "Business", "Science", "Health", "Entertainment"].map((category) => (
                            <Link
                                key={category}
                                href={`/category/${category.toLowerCase()}`}
                                className="group relative overflow-hidden rounded-lg bg-neutral-700 aspect-[4/3] hover:bg-neutral-600 transition-colors"
                            >
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-lg font-medium text-white">{category}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest News Section */}
            <section
                id="latest"
                className="py-16"
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-white mb-8">Latest Updates</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* News Grid Placeholder - Will be replaced with NewsGrid component */}
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div
                                key={item}
                                className="bg-neutral-800 rounded-lg overflow-hidden hover:bg-neutral-700 transition-colors"
                            >
                                <div className="relative aspect-[16/9]">
                                    <Image
                                        src="/placeholder.jpg"
                                        alt="News Thumbnail"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <span className="text-sm text-blue-400">Technology</span>
                                    <h3 className="text-xl font-semibold text-white mt-2">Loading News Title...</h3>
                                    <p className="text-gray-400 mt-2">Loading news description...</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
