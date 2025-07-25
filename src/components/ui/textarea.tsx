import * as React from 'react';
import { cn } from '@/lib/utils';
const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn('flex min-h-[80px] w-full rounded-md border border-[#bdae93] bg-[#282828] px-3 py-2 text-base ring-offset-[#282828] placeholder:text-[#bdae93] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ebdbb2] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', className)}
            ref={ref}
            {...props}
        />
    );
});
Textarea.displayName = 'Textarea';
export { Textarea };
