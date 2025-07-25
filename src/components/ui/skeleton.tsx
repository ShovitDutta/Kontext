import { cn } from '@/lib/utils';
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('animate-pulse rounded-md bg-[#3c3836]', className)}
            {...props}
        />
    );
}
export { Skeleton };
