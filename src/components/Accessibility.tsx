"use client";

import { useEffect, useRef, useState } from "react";

interface FocusTrapProps {
    children: React.ReactNode;
    isActive: boolean;
    onEscape?: () => void;
}

export function FocusTrap({ children, isActive, onEscape }: FocusTrapProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isActive) return;

        const container = containerRef.current;
        if (!container) return;

        // Get all focusable elements
        const focusableElements = container.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Focus the first element when trap is activated
        firstElement?.focus();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && onEscape) {
                onEscape();
                return;
            }

            if (e.key !== "Tab") return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isActive, onEscape]);

    return <div ref={containerRef}>{children}</div>;
}

interface SkipToMainProps {
    mainId?: string;
}

export function SkipToMain({ mainId = "main-content" }: SkipToMainProps) {
    return (
        <a
            href={`#${mainId}`}
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 
                     focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
        >
            Skip to main content
        </a>
    );
}

interface LiveRegionProps {
    message: string;
    isPolite?: boolean;
}

export function LiveRegion({ message, isPolite = true }: LiveRegionProps) {
    return (
        <div
            className="sr-only"
            role="status"
            aria-live={isPolite ? "polite" : "assertive"}
            aria-atomic="true"
        >
            {message}
        </div>
    );
}

export function useAriaLiveRegion(initialMessage = "") {
    const [message, setMessage] = useState(initialMessage);
    const [isPolite, setIsPolite] = useState(true);

    const announce = (newMessage: string, polite = true) => {
        setIsPolite(polite);
        setMessage(newMessage);
    };

    return {
        announce,
        LiveRegionComponent: () => (
            <LiveRegion
                message={message}
                isPolite={isPolite}
            />
        ),
    };
}
