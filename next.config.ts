import withPWA from 'next-pwa';
import type { NextConfig } from 'next';
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = { images: { deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], remotePatterns: [{ protocol: 'https', hostname: '**' }], imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], formats: ['image/webp'] }, reactStrictMode: true, compress: true };
const withPWAConfig = withPWA({ dest: 'public', register: true, skipWaiting: true, disable: process.env.NODE_ENV === 'development' });
export default withPWAConfig(nextConfig);