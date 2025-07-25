import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
const buttonVariants = cva('inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-[#282828] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ebdbb2] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', {
    variants: {
        variant: {
            default: 'bg-[#458588] text-[#ebdbb2] hover:bg-[#458588]/90',
            destructive: 'bg-[#cc241d] text-[#ebdbb2] hover:bg-[#cc241d]/90',
            outline: 'border border-[#bdae93] bg-transparent hover:bg-[#3c3836] hover:text-[#ebdbb2]',
            secondary: 'bg-[#3c3836] text-[#ebdbb2] hover:bg-[#3c3836]/80',
            ghost: 'hover:bg-[#3c3836] hover:text-[#ebdbb2]',
            link: 'text-[#ebdbb2] underline-offset-4 hover:underline',
        },
        size: { default: 'h-10 px-4 py-2', sm: 'h-9 rounded-md px-3', lg: 'h-11 rounded-md px-8', icon: 'h-10 w-10' },
    },
    defaultVariants: { variant: 'default', size: 'default' },
});
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
    return (
        <button
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
        />
    );
});
Button.displayName = 'Button';
export { Button, buttonVariants };
