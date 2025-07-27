import Auth from "./Auth";
import Link from "next/link";
import Image from "next/image";
import { auth } from "../../auth";
import { SearchButton } from "./SearchButton";

const categories = [
    { name: "Technology", href: "/category/technology" },
    { name: "Business", href: "/category/business" },
    { name: "Science", href: "/category/science" },
    { name: "Health", href: "/category/health" },
    { name: "Entertainment", href: "/category/entertainment" },
];

export async function Navbar() {
    const session = await auth();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-700/50 bg-neutral-900/80 backdrop-blur">
            <div className="container mx-auto px-4 flex flex-col">
                {/* Main navbar */}
                <div className="h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <Link
                            href="/"
                            className="flex items-center space-x-2"
                        >
                            <Image
                                src="/globe.svg"
                                alt="Kontext Logo"
                                width={32}
                                height={32}
                                className="w-8 h-8"
                            />
                            <span className="font-bold text-xl text-white">Kontext</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-6">
                            {categories.map((category) => (
                                <Link
                                    key={category.href}
                                    href={category.href}
                                    className="text-sm text-gray-300 hover:text-white transition-colors"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Search button */}
                        <SearchButton />
                        {/* Auth component */}
                        <Auth session={session} />
                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                            aria-label="Menu"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden py-4 hidden">
                    {categories.map((category) => (
                        <Link
                            key={category.href}
                            href={category.href}
                            className="block py-2 text-gray-300 hover:text-white transition-colors"
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
