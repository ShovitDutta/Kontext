'use client';
import Link from 'next/link';
import { useEffect } from 'react';
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);
    return (
        <div>
            <h2>Something went wrong!</h2> <p>We encountered an unexpected error. Please try again or return to the homepage.</p>
            <div>
                <button onClick={reset}>Try again</button>
                <Link href="/">
                    <button>Go home</button>
                </Link>
            </div>
        </div>
    );
}