import Link from "next/link";
import { auth } from "../../auth";
import Auth from "./Auth";

export async function Navbar() {
    const session = await auth();
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-700/50 bg-neutral-900/80 backdrop-blur">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center space-x-2"
                >
                    <span className="font-bold text-xl text-white">Kontext</span>
                </Link>
                <Auth session={session} />
            </div>
        </nav>
    );
}
