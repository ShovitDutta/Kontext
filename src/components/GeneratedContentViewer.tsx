"use client";
import React, { useState } from "react";
import { GeneratedContent } from "@/hooks/useArticle";

interface GeneratedContentViewerProps {
    generatedContents: GeneratedContent[];
}

const GeneratedContentViewer: React.FC<GeneratedContentViewerProps> = ({ generatedContents }) => {
    const [selectedLength, setSelectedLength] = useState<"SHORT" | "MEDIUM" | "EXPLAINED">("SHORT");

    const selectedContent = generatedContents.find((c) => c.length === selectedLength);

    return (
        <div className="mt-8">
            <div className="flex border-b border-neutral-800">
                {(["SHORT", "MEDIUM", "EXPLAINED"] as const).map((length) => (
                    <button
                        key={length}
                        onClick={() => setSelectedLength(length)}
                        className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${selectedLength === length ? "border-b-2 border-blue-500 text-white" : "text-neutral-400 hover:text-white"}`}
                    >
                        {length.charAt(0) + length.slice(1).toLowerCase()}
                    </button>
                ))}
            </div>
            <div className="mt-4 p-6 bg-neutral-900 rounded-lg">{selectedContent ? <p className="text-neutral-300 whitespace-pre-line">{selectedContent.content}</p> : <p className="text-neutral-500">No content available for this length.</p>}</div>
        </div>
    );
};

export default GeneratedContentViewer;
