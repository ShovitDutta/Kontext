import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        domains: ["via.placeholder.com", "source.unsplash.com"],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        formats: ["image/webp"],
    },
    experimental: {
        optimizeCss: true,
        workerThreads: true,
        optimisticClientCache: true,
    },
    compress: true,
    reactStrictMode: true,
    poweredByHeader: false,
};
export default nextConfig;
