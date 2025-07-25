'use client';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
interface Comment {
    id: string;
    text: string;
    createdAt: string;
    user: { name: string | null; image: string | null };
}
interface CommentSectionProps {
    articleId: string;
}
export function CommentSection({ articleId }: CommentSectionProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [userName, setUserName] = useState('');
    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch(`/api/comments?articleId=${articleId}`);
            const data = await response.json();
            setComments(data.comments);
        };
        fetchComments();
    }, [articleId]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/comments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ articleId, text: newComment, userName }) });
        if (response.ok) {
            const createdComment = await response.json();
            setComments([...comments, createdComment]);
            setNewComment('');
            setUserName('');
        }
    };
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold">Comments</h2>
            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <Input
                    placeholder="Your name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <Textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                />
                <Button type="submit">Post Comment</Button>
            </form>
            <Separator />
            <div className="space-y-6">
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="flex items-start space-x-4"
                    >
                        <Avatar>
                            <AvatarImage src={comment.user.image || '/placeholder-user.jpg'} /> <AvatarFallback>{comment.user.name?.charAt(0) || 'A'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold">{comment.user.name}</p> <p className="text-xs text-[#bdae93]">{new Date(comment.createdAt).toLocaleDateString()}</p>
                            </div>
                            <p className="text-[#ebdbb2]">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
