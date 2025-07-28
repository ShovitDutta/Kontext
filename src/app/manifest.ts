import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
	return {
		start_url: '/',
		short_name: 'Kontext',
		display: 'standalone',
		theme_color: '#EF4444',
		background_color: '#111827',
		name: 'Kontext - AI-Powered News Blog',
		icons: [
			{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
			{ src: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
			{ src: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
		],
		description: 'Kontext is a news blog that transforms the latest news into engaging, easy-to-read blog posts using AI.',
	};
}
