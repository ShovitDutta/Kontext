import * as React from 'react';
import { cn } from '@/lib/utils';
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn('flex h-10 w-full rounded-md border border-[#bdae93] bg-[#282828] px-3 py-2 text-sm ring-offset-[#282828] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#bdae93] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ebdbb2] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', className)}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = 'Input';
export { Input };
