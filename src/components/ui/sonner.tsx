'use client';
import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';
type ToasterProps = React.ComponentProps<typeof Sonner>;
const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = 'system' } = useTheme();
    return (
        <Sonner
            theme={theme as ToasterProps['theme']}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: 'group toast group-[.toaster]:bg-[#282828] group-[.toaster]:text-[#ebdbb2] group-[.toaster]:border-[#bdae93] group-[.toaster]:shadow-lg',
                    description: 'group-[.toast]:text-[#bdae93]',
                    actionButton: 'group-[.toast]:bg-[#458588] group-[.toast]:text-[#ebdbb2]',
                    cancelButton: 'group-[.toast]:bg-[#3c3836] group-[.toast]:text-[#ebdbb2]',
                },
            }}
            {...props}
        />
    );
};
export { Toaster };
