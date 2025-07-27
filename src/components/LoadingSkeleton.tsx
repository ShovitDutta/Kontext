interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
    return <div className={`animate-pulse bg-neutral-700/50 rounded ${className}`} />;
}

export function CardSkeleton() {
    return (
        <div className="bg-neutral-800 rounded-lg overflow-hidden">
            <Skeleton className="w-full aspect-[16/9]" />
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-1/4" />
            </div>
        </div>
    );
}

export function TextSkeleton() {
    return (
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
        </div>
    );
}

export function ImageSkeleton() {
    return <Skeleton className="w-full h-full" />;
}

export function LoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
                <CardSkeleton key={index} />
            ))}
        </div>
    );
}
