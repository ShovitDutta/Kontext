"use client";
import axios from "axios";
import React, { useState } from "react";
import { GeneratedContent } from "@/hooks/useArticle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
interface GeneratedContentViewerProps {
    articleId: string;
    generatedContents: GeneratedContent[];
}
const GeneratedContentViewer: React.FC<GeneratedContentViewerProps> = ({ articleId, generatedContents }) => {
    const [selectedLength, setSelectedLength] = useState<"SHORT" | "MEDIUM" | "EXPLAINED">("SHORT");
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (length: "SHORT" | "MEDIUM" | "EXPLAINED") => {
            return axios.post("/api/gen", { articleId, length });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["article", articleId] });
        },
    });
    const selectedContent = generatedContents.find((c) => c.length === selectedLength);
    const handleGenerate = (length: "SHORT" | "MEDIUM" | "EXPLAINED") => {
        setSelectedLength(length);
        if (!generatedContents.some((c) => c.length === length)) {
            mutation.mutate(length);
        }
    };
    return (
        <div>
            <div className="flex space-x-4 mb-4">
                <button onClick={() => handleGenerate("SHORT")}>Short</button> <button onClick={() => handleGenerate("MEDIUM")}>Medium</button> <button onClick={() => handleGenerate("EXPLAINED")}>Explained</button>
            </div>
            <div>
                {mutation.isPending && <p>Generating...</p>} {mutation.isError && <p>Error generating content</p>} {selectedContent && <p>{selectedContent.content}</p>}
            </div>
        </div>
    );
};
export default GeneratedContentViewer;
