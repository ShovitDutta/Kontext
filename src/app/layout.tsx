import "./globals.css";
import type React from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Providers from "@/components/Providers";
import PageTransition from "@/components/PageTransition";
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-poppins", display: "swap" });
export const metadata: Metadata = {
    creator: "Kontext",
    generator: "Next.js",
    publisher: "Kontext",
    authors: [{ name: "Kontext Team" }],
    robots: { index: true, follow: true },
    keywords: ["AI", "News", "Technology", "Blog", "Intelligence", "Daily"],
    title: { default: "Kontext - GenAI Powered News Blog", template: "%s | Kontext" },
    description: "Kontext Is A GenAI Powered News Blog, To Stay Updated With The Latest News, Transformed Into Engaging Blog Posts Using GenAI.",
};
export const viewport = { width: "device-width", initialScale: 1, maximumScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="en"
            style={{ colorScheme: "dark" }}
            className={`${poppins.variable} dark`}
        >
            <body className="antialiased font-sans bg-neutral-900 text-gray-200">
                <Providers>
                    <div className="relative flex min-h-screen flex-col">
                        <Navbar />
                        <main className="flex-1">
                            <PageTransition>{children}</PageTransition>
                        </main>
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
