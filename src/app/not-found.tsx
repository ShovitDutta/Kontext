'use client';
import Link from 'next/link';
export default function NotFound() {
    return (
        <div>
            <div>
                <h1>404</h1> <h2>Page Not Found</h2> <p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
                <div>
                    <Link href="/">
                        <button>Go Home</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}