import { Skeleton } from '@/components/ui/skeleton';
export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <Skeleton className="h-12 w-1/2 mx-auto mb-2" /> <Skeleton className="h-6 w-3/4 mx-auto" />
            </div>
            <div className="flex justify-center space-x-4 mb-8">
                {[...Array(5)].map((_, i) => (
                    <Skeleton
                        key={i}
                        className="h-10 w-24"
                    />
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-[#3c3836] rounded-xl border border-[#bdae93] overflow-hidden"
                    >
                        <Skeleton className="h-48 w-full" />
                        <div className="p-6 space-y-4">
                            <Skeleton className="h-6 w-3/4" /> <Skeleton className="h-4 w-full" /> <Skeleton className="h-4 w-5/6" />
                            <div className="flex justify-between items-center pt-4">
                                <Skeleton className="h-6 w-1/3" /> <Skeleton className="h-8 w-8 rounded-full" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
