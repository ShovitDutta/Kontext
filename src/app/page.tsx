'use client';
import Link from 'next/link';
export default function LandingPage() {
    return (
        <div>
            <section>
                <div>
                    <h1>AI-Powered News</h1> <p>Kontext transforms complex technology news into simplified blog posts.</p>
                    <Link href="/">
                        <button>Get Started</button>
                    </Link>
                </div>
            </section>
            <section>
                <div>
                    <h2>Why Choose Kontext?</h2>
                    <ul>
                        <li>Multiple Formats</li> <li>Real-time Updates</li> <li>Personalized Experience</li> <li>AI-Powered Content</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}