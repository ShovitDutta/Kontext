import "./globals.css";
import type React from "react";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Poppins } from "next/font/google";
import StoreInitializer from "@/components/StoreInitializer";
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
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            style={{ colorScheme: "dark" }}
            className={`${poppins.variable} dark`}
        >
            <body className="antialiased font-sans bg-neutral-900 text-white flex flex-col min-h-screen">
                <StoreInitializer />
                <Header />
                <main className="flex-grow">
                    <div className="relative flex flex-col h-full">{children}</div>
                </main>
                <Footer />
            </body>
        </html>
    );
}
