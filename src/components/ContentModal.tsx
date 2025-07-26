"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, Share2, Check } from "lucide-react"; // Import Share2 and Check icons
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react"; // Import useState and useEffect
import { BrainCircuit } from "lucide-react"; // Import BrainCircuit for default icon

interface ContentModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
    icon: React.ElementType; // Add icon prop
    color: string; // Add color prop
}

export default function ContentModal({ isOpen, onClose, title, content, icon: Icon, color }: ContentModalProps) {
    const [copied, setCopied] = useState(false); // State for copy feedback

    useEffect(() => {
        if (isOpen) {
            document.documentElement.classList.add("overflow-hidden"); // Disable scrolling on html element
        } else {
            document.documentElement.classList.remove("overflow-hidden"); // Re-enable scrolling
        }

        // Cleanup function to re-enable scrolling when component unmounts
        return () => {
            document.documentElement.classList.remove("overflow-hidden");
        };
    }, [isOpen]);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href); // Copies the current page URL
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-neutral-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4" // Changed background to neutral-900/80 and kept backdrop-blur-md
                    onClick={onClose} // Close when clicking outside the modal content
                >
                    <motion.div
                        initial={{ y: "-100vh", opacity: 0 }}
                        animate={{ y: "0", opacity: 1 }}
                        exit={{ y: "100vh", opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="bg-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative border border-neutral-700"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
                    >
                        <div className="absolute top-4 right-4 flex space-x-2"> {/* Container for buttons */}
                            <button
                                onClick={handleCopy}
                                className="flex items-center space-x-1 text-neutral-400 hover:text-white transition-colors"
                            >
                                {copied ? <Check className="h-5 w-5 text-green-500" /> : <Share2 className="h-5 w-5" />}
                                <span>{copied ? "Copied!" : "Share"}</span>
                            </button>
                            <button
                                onClick={onClose}
                                className="text-neutral-400 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex flex-col items-center justify-center space-y-2 mb-6">
                            {Icon && <Icon className={`w-10 h-10 ${color}`} />} {/* Display icon */}
                            <h2 className={`text-3xl font-bold ${color} text-center`}>{title}</h2> {/* Apply color to title */}
                        </div>
                        <div className="prose prose-lg prose-invert max-w-full text-neutral-300 leading-relaxed">
                            <ReactMarkdown
                                components={{
                                    p: ({ ...props }) => (
                                        <p
                                            className="mb-4"
                                            {...props}
                                        />
                                    ),
                                }}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
