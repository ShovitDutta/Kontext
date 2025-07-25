'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield, Globe } from 'lucide-react';
const features = [
    { icon: <Globe className="w-8 h-8 text-[#bdae93]" />, title: 'Multiple Formats', description: 'Choose from short summaries, detailed analysis, or explained versions for any news.' },
    { icon: <Zap className="w-8 h-8 text-[#bdae93]" />, title: 'Real-time Updates', description: 'Stay ahead with the latest technology news from trusted sources, updated in real-time.' },
    { icon: <Shield className="w-8 h-8 text-[#bdae93]" />, title: 'Personalized Experience', description: 'Get personalized news recommendations based on your interests and reading history.' },
    { icon: <Sparkles className="w-8 h-8 text-[#bdae93]" />, title: 'AI-Powered Content', description: 'Transform complex tech news into engaging, easy-to-understand blog posts using advanced AI.' },
];
export default function LandingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#282828] text-[#ebdbb2]">
            <section className="w-full py-20 md:py-32">
                <div className="container mx-auto text-center px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">AI-Powered</span> News, Simplified.
                        </h1>
                        <p className="max-w-3xl mx-auto text-lg md:text-xl text-[#bdae93] mb-8">Kontext transforms complex technology news into engaging, personalized blog posts. Stay informed with AI-generated content tailored to your understanding.</p>
                        <Link href="/dashboard">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center justify-center px-8 py-4 bg-[#458588] text-[#ebdbb2] rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
                            >
                                Get Started <ArrowRight className="w-5 h-5 ml-2" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>
            <section className="w-full py-20 md:py-32 bg-[#3c3836]">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold">Why Choose Kontext?</h2>
                        <p className="max-w-2xl mx-auto mt-4 text-[#bdae93]">Everything you need to stay informed about the latest technology trends, without the noise.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-[#282828] p-8 rounded-xl shadow-md text-center"
                            >
                                <div className="mb-4 inline-block">{feature.icon}</div> <h3 className="text-xl font-heading font-semibold mb-2">{feature.title}</h3>
                                <p className="text-[#bdae93]">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
