import { Skeleton } from '@/components/ui/skeleton';
export default function Loading() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="space-y-8">
                <div className="space-y-4">
                    <Skeleton className="h-12 w-full" /> <Skeleton className="h-10 w-3/4" />
                    <div className="flex space-x-4">
                        <Skeleton className="h-6 w-24" /> <Skeleton className="h-6 w-24" /> <Skeleton className="h-6 w-24" />
                    </div>
                </div>
                <Skeleton className="h-96 w-full rounded-lg" />
                <div className="space-y-4">
                    <Skeleton className="h-6 w-full" /> <Skeleton className="h-6 w-5/6" /> <Skeleton className="h-6 w-full" />
                </div>
                <Skeleton className="h-24 w-full" />
            </div>
        </div>
    );
}
