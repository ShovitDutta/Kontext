/* ================================================================================== */
"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/legacy/image";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useParams } from "next/navigation";
import { calculateReadTime } from "@/lib/utils";
import ContentModal from "@/components/ContentModal";
import { useArticle, GeneratedContent } from "@/lib/queries";
import { FaRegBookmark, FaExternalLinkAlt, FaShareAlt, FaCheck, FaNewspaper, FaBookOpen, FaBrain, FaCalendarAlt, FaUser, FaArrowLeft } from "react-icons/fa";
/* ================================================================================== */
const ArticleSkeleton = () => (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-10 bg-neutral-700 rounded w-3/4 mb-4"></div> <div className="h-6 bg-neutral-700 rounded w-1/2 mb-8"></div> <div className="w-full h-96 bg-neutral-700 rounded-xl mb-8"></div>
        <div className="space-y-4">
            <div className="h-4 bg-neutral-700 rounded w-full"></div> <div className="h-4 bg-neutral-700 rounded w-full"></div> <div className="h-4 bg-neutral-700 rounded w-5/6"></div>
        </div>
    </div>
);
/* ================================================================================== */
const contentDisplayConfig = {
    SHORT: { icon: FaNewspaper, title: "The Gist", color: "text-blue-400" },
    MEDIUM: { icon: FaBookOpen, title: "Full Story", color: "text-purple-400" },
    EXPLAINED: { icon: FaBrain, title: "Deep Dive", color: "text-green-400" },
};
/* ================================================================================== */
export default function ArticleClientView() {
    const { id } = useParams();
    const [copied, setCopied] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [modalColor, setModalColor] = useState("text-neutral-400");
    const { data: article, isLoading, error } = useArticle(id as string);
    const [modalIcon, setModalIcon] = useState<React.ElementType>(FaBrain);
    const handleBookmark = () => setIsBookmarked(!isBookmarked);
    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    const truncateContent = (text: string, maxLength: number = 300) => {
        if (!text) return "";
        if (text.length <= maxLength) return text;
        return text.substring(0, text.lastIndexOf(" ", maxLength)) + "...";
    };
    const openModal = (title: string, content: string, icon: React.ElementType, color: string) => {
        setModalTitle(title);
        setModalColor(color);
        setIsModalOpen(true);
        setModalContent(content);
        setModalIcon(() => icon);
    };
    const closeModal = () => {
        setModalTitle("");
        setModalContent("");
        setIsModalOpen(false);
    };
    if (isLoading) return <ArticleSkeleton />;
    if (error) return <div className="text-center py-20 text-red-400">Error loading article.</div>;
    if (!article) return <div className="text-center py-20 text-neutral-400">Article not found.</div>;
    const sortedContents = (article.generatedContents || []).sort((a: GeneratedContent, b: GeneratedContent) => {
        const order = ["SHORT", "MEDIUM", "EXPLAINED"];
        return order.indexOf(a.length) - order.indexOf(b.length);
    });
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
            <motion.div
                variants={itemVariants}
                className="mb-8"
            >
                <Link
                    href="/news"
                    className="flex items-center text-neutral-400 hover:text-blue-400 transition-colors"
                >
                    <FaArrowLeft className="w-5 h-5 mr-2" /> Back to News
                </Link>
            </motion.div>
            <motion.article
                variants={itemVariants}
                className="bg-neutral-800/50 rounded-2xl shadow-2xl overflow-hidden border border-neutral-700"
            >
                {article.urlToImage && (
                    <motion.div
                        className="relative w-full h-64 md:h-96"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Image
                            priority
                            layout="fill"
                            alt={article.title}
                            src={article.urlToImage}
                            style={{ objectFit: "cover" }}
                        />
                    </motion.div>
                )}
                <div className="p-6 sm:p-8 md:p-10">
                    <header className="mb-8">
                        <motion.h1
                            variants={itemVariants}
                            className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4"
                        >
                            {article.title}
                        </motion.h1>
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap items-center text-sm text-neutral-400 gap-x-4 gap-y-2"
                        >
                            <div className="flex items-center">
                                <FaUser className="w-4 h-4 mr-2" /> <span>{article.author || article.sourceName}</span>
                            </div>
                            <div className="flex items-center">
                                <FaCalendarAlt className="w-4 h-4 mr-2" /> <span>{new Date(article.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                            </div>
                        </motion.div>
                    </header>
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {sortedContents.length > 0 ? (
                            sortedContents.map((content: GeneratedContent) => {
                                const config = contentDisplayConfig[content.length as keyof typeof contentDisplayConfig];
                                if (!config) return null;
                                const Icon = config.icon;
                                return (
                                    <section
                                        key={content.id}
                                        className="bg-neutral-900/70 p-6 rounded-xl shadow-lg border border-neutral-700/60 cursor-pointer hover:bg-neutral-800 transition-colors flex flex-col"
                                        onClick={() => openModal(config.title, content.content, Icon, config.color)}
                                    >
                                        <div className="flex flex-col items-center justify-center space-y-2 mb-6">
                                            <Icon className={`w-9 h-9 ${config.color}`} /> <h2 className={`text-4xl font-bold ${config.color} text-center`}>{config.title}</h2>
                                        </div>
                                        <div className="text-neutral-300 leading-relaxed flex-grow">
                                            <ReactMarkdown>{truncateContent(content.content)}</ReactMarkdown>
                                        </div>
                                        <div className={`mt-4 text-right text-sm text-neutral-300 px-3 py-1 rounded-full inline-block ${config.color.replace("text-", "bg-")}/20`}>
                                            {(() => {
                                                const { readTime, wordCount } = calculateReadTime(content.content);
                                                return `${readTime} | ${wordCount}`;
                                            })()}
                                        </div>
                                    </section>
                                );
                            })
                        ) : (
                            <section
                                className="bg-neutral-900/70 p-6 rounded-xl shadow-lg border border-neutral-700/60 cursor-pointer hover:bg-neutral-800 transition-colors flex flex-col"
                                onClick={() => openModal("Article Description", article.description || "", FaBrain, "text-neutral-400")}
                            >
                                <div className="flex flex-col items-center justify-center space-y-2 mb-6">
                                    <h2 className="text-4xl font-bold text-neutral-400 text-center">Article Description</h2>
                                </div>
                                <div className="text-neutral-300 leading-relaxed flex-grow">
                                    <ReactMarkdown>{truncateContent(article.description || "")}</ReactMarkdown>
                                </div>
                                <div className="mt-4 text-right text-sm text-neutral-300 px-3 py-1 rounded-full inline-block bg-neutral-700/20">
                                    {(() => {
                                        const { readTime, wordCount } = calculateReadTime(article.description || "");
                                        return `${readTime} | ${wordCount}`;
                                    })()}
                                </div>
                            </section>
                        )}
                    </motion.div>
                    <motion.footer
                        variants={itemVariants}
                        className="mt-12 pt-6 border-t border-neutral-700/50 flex flex-col sm:flex-row items-center justify-between gap-4"
                    >
                        <div className="flex items-center space-x-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleBookmark}
                                className={`flex items-center space-x-2 text-neutral-300 transition-colors rounded-full py-2 px-4 ${isBookmarked ? "bg-blue-600/20 text-blue-400" : "hover:bg-neutral-700"}`}
                            >
                                <FaRegBookmark className={`h-5 w-5 transition-colors ${isBookmarked ? "text-blue-400 fill-current" : ""}`} /> <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
                            </motion.button>
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 text-neutral-300 hover:bg-neutral-700 transition-colors rounded-full py-2 px-4"
                            >
                                <FaExternalLinkAlt className="h-5 w-5" /> <span>Read Original</span>
                            </motion.a>
                        </div>
                        <div className="flex items-center space-x-2">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleCopy}
                                className="flex items-center space-x-2 text-neutral-300 hover:bg-neutral-700 transition-colors rounded-full py-2 px-4"
                            >
                                {copied ? <FaCheck className="h-5 w-5 text-green-500" /> : <FaShareAlt className="h-5 w-5" />} <span>{copied ? "Copied!" : "Share"}</span>
                            </motion.button>
                        </div>
                    </motion.footer>
                </div>
            </motion.article>
            <ContentModal
                icon={modalIcon}
                title={modalTitle}
                color={modalColor}
                onClose={closeModal}
                isOpen={isModalOpen}
                content={modalContent}
            />
        </motion.div>
    );
}
/* ================================================================================== */