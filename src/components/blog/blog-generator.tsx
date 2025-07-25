'use client';
import { toast } from 'sonner';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { contentLengthEnum } from '@/lib/db/schema';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

interface BlogGeneratorProps {
    articleId: string;
}

type ContentLength = (typeof contentLengthEnum.enumValues)[number];
type GeneratedContent = { [key in ContentLength]?: string };

export function BlogGenerator({ articleId }: BlogGeneratorProps) {
    const [generatedContent, setGeneratedContent] = useState<GeneratedContent>({});
    const [generating, setGenerating] = useState<Record<ContentLength, boolean>>({ SHORT: false, MEDIUM: false, EXPLAINED: false });
    const [error, setError] = useState<string | null>(null);

    const generateContent = async (length: ContentLength) => {
        if (!length) return;
        setGenerating((prev) => ({ ...prev, [length]: true }));
        setError(null);
        try {
            const response = await fetch('/api/generate-blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ articleId, length }) });
            if (!response.ok) throw new Error('Failed to generate content');
            const data = await response.json();
            setGeneratedContent((prev) => ({ ...prev, [length]: data.blogPost }));
            toast.success('Blog post generated successfully!');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            toast.error(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
            setGenerating((prev) => ({ ...prev, [length]: false }));
        }
    };

    return (
        <div className="space-y-8">
            <ToggleGroup
                type="single"
                onValueChange={(value: ContentLength) => generateContent(value)}
                className="flex-wrap"
            >
                {(Object.keys(contentLengthEnum.enumValues) as Array<ContentLength>).map((key) => (
                    <ToggleGroupItem
                        key={key}
                        value={key}
                        disabled={generating[key]}
                        className="flex items-center space-x-2"
                    >
                        {generating[key] ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" /> <span>Generating...</span>
                            </>
                        ) : (
                            <span>{key.toLowerCase()}</span>
                        )}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-6">
                {(Object.keys(contentLengthEnum.enumValues) as Array<ContentLength>).map((key) => (
                    <div key={key}>
                        {generatedContent[contentLengthEnum.enumValues[key]] && (
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <Button variant="outline">View {key.toLowerCase()} version</Button>
                                </DrawerTrigger>
                                <DrawerContent>
                                    <DrawerHeader>
                                        <DrawerTitle>{key.charAt(0) + key.slice(1).toLowerCase()} Version</DrawerTitle> <DrawerDescription>Generated blog post.</DrawerDescription>
                                    </DrawerHeader>
                                    <div className="prose prose-invert p-4">
                                        <ReactMarkdown>{generatedContent[contentLengthEnum.enumValues[key]]!}</ReactMarkdown>
                                    </div>
                                </DrawerContent>
                            </Drawer>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
