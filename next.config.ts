import withPWA from 'next-pwa';
import type { NextConfig } from 'next';
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
	reactStrictMode: true,
	compress: true,
	images: {
		remotePatterns: [{ protocol: 'https', hostname: '**' }],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		formats: ['image/webp'],
	},
};
const withPWAConfig = withPWA({ dest: 'public', register: true, skipWaiting: true });
export default withPWAConfig(nextConfig as any);