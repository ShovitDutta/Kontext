import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },
    serverExternalPackages: [],
    images: {
        remotePatterns: [
            { protocol: 'http', hostname: '**' },
            { protocol: 'https', hostname: '**' },
        ],
    },
} as const;
export default nextConfig;
