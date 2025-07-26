"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black opacity-80"></div>
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute -top-1/2 -left-1/2 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div> <div className="absolute -bottom-1/2 -right-1/2 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>
                    </div>
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                                Get the <span className="text-blue-400">Kontext</span> on Tech News
                            </h1>
                            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 mb-10">Kontext uses GenAI to transform complex technology news into clear, concise, and engaging blog posts. Stay informed, effortlessly.</p>
                            <Link href="/news">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 inline-flex items-center space-x-2">
                                    <span>Explore News</span> <ArrowRight className="h-5 w-5" />
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </section>
                <section className="py-20 bg-gray-900/50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-white mb-12">Why Choose Kontext?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {featureCard("Multiple Formats", "From quick summaries to in-depth explanations, choose the format that fits your needs.")} {featureCard("Real-time Updates", "Our cron jobs fetch the latest news every hour, so you never miss a beat.")} {featureCard("Personalized Experience", "Bookmark articles and tailor your feed to your interests (coming soon!).")}
                            {featureCard("AI-Powered Content", "Leveraging the power of Generative AI to deliver high-quality, easy-to-understand content.")}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
function featureCard(title: string, description: string) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800/40 p-6 rounded-xl shadow-lg border border-gray-700/50"
        >
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3> <p className="text-gray-400">{description}</p>
        </motion.div>
    );
}
