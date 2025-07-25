import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
const badgeVariants = cva('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#ebdbb2] focus:ring-offset-2', {
    variants: {
        variant: {
            outline: 'text-[#ebdbb2]',
            default: 'border-transparent bg-[#458588] text-[#ebdbb2] hover:bg-[#458588]/80',
            secondary: 'border-transparent bg-[#3c3836] text-[#ebdbb2] hover:bg-[#3c3836]/80',
            destructive: 'border-transparent bg-[#cc241d] text-[#ebdbb2] hover:bg-[#cc241d]/80',
        },
    },
    defaultVariants: { variant: 'default' },
});
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}
function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div
            className={cn(badgeVariants({ variant }), className)}
            {...props}
        />
    );
}
export { Badge, badgeVariants };
