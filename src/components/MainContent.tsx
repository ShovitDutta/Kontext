"use client";

export default function MainContent({ children }: { children: React.ReactNode }) {
    return (
        <main
            id="main-content"
            className="flex-1"
            tabIndex={-1}
        >
            {children}
        </main>
    );
}
