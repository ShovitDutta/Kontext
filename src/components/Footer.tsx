import Link from 'next/link';
import { Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-gray-800/20 border-t border-border/40">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Kontext. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-4">
                        <Link
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <Twitter className="h-5 w-5" />
                        </Link>
                        <Link
                            href="https://github.com/ShovitDutta/kontext"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <Github className="h-5 w-5" />
                        </Link>
                        <Link
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <Linkedin className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
