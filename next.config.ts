import type { NextConfig } from "next";
const nextConfig: NextConfig = {
    eslint: { ignoreDuringBuilds: true },
    typescript: { ignoreBuildErrors: true },
    serverExternalPackages: [],
    images: {
        remotePatterns: [
            { protocol: "http", hostname: "**" },
            { protocol: "https", hostname: "**" },
        ],
    },
    env: { NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL },
} as const;
export default nextConfig;
