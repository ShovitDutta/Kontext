export function formatDate(date: string | Date) {
    return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
export function formatTimeAgo(date: string | Date) {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return formatDate(date);
}
export function calculateReadTime(text: string) {
    if (!text) return { readTime: "0 min", wordCount: "0 words" };
    const wordsPerMinute = 80;
    const wordCount = text.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return { readTime: `${readTime} min`, wordCount: `${wordCount} words` };
}
