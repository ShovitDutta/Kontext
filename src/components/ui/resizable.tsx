'use client';
import * as React from 'react';
import { GripVertical } from 'lucide-react';
import { Panel as ResizablePanel, PanelGroup as ResizablePanelGroup, PanelResizeHandle as ResizableHandle } from 'react-resizable-panels';

import { cn } from '@/lib/utils';

const ResizableHandleComponent = ({
    withHandle,
    className,
    ...props
}: React.ComponentProps<typeof ResizableHandle> & {
    withHandle?: boolean;
}) => (
    <ResizableHandle
        className={cn(
            'relative flex w-px items-center justify-center bg-[#bdae93] after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ebdbb2] focus-visible:ring-offset-1 focus-visible:ring-offset-[#282828] data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90',
            className,
        )}
        {...props}
    >
        {withHandle && (
            <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-[#bdae93] bg-[#282828]">
                <GripVertical className="h-2.5 w-2.5" />
            </div>
        )}
    </ResizableHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandleComponent as ResizableHandle };
