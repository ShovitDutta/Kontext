'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { DayPicker } from 'react-day-picker';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
export type CalendarProps = React.ComponentProps<typeof DayPicker>;
function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn('p-3', className)}
            classNames={{
                months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                month: 'space-y-4',
                caption: 'flex justify-center pt-1 relative items-center',
                caption_label: 'text-sm font-medium',
                nav: 'space-x-1 flex items-center',
                nav_button: cn(buttonVariants({ variant: 'outline' }), 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'),
                nav_button_previous: 'absolute left-1',
                nav_button_next: 'absolute right-1',
                table: 'w-full border-collapse space-y-1',
                head_row: 'flex',
                head_cell: 'text-[#bdae93] rounded-md w-9 font-normal text-[0.8rem]',
                row: 'flex w-full mt-2',
                cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-[#3c3836]/50 [&:has([aria-selected])]:bg-[#3c3836] first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                day: cn(buttonVariants({ variant: 'ghost' }), 'h-9 w-9 p-0 font-normal aria-selected:opacity-100'),
                day_range_end: 'day-range-end',
                day_selected: 'bg-[#458588] text-[#ebdbb2] hover:bg-[#458588] hover:text-[#ebdbb2] focus:bg-[#458588] focus:text-[#ebdbb2]',
                day_today: 'bg-[#3c3836] text-[#ebdbb2]',
                day_outside: 'day-outside text-[#bdae93] aria-selected:bg-[#3c3836]/50 aria-selected:text-[#bdae93]',
                day_disabled: 'text-[#bdae93] opacity-50',
                day_range_middle: 'aria-selected:bg-[#3c3836] aria-selected:text-[#ebdbb2]',
                day_hidden: 'invisible',
                ...classNames,
            }}
            components={{ IconLeft: () => <ChevronLeft className="h-4 w-4" />, IconRight: () => <ChevronRight className="h-4 w-4" /> }}
            {...props}
        />
    );
}
Calendar.displayName = 'Calendar';
export { Calendar };
