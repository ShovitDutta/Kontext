import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
	return {
		start_url: '/',
		short_name: 'Kontext',
		display: 'standalone',
		theme_color: '#3B82F6',
		background_color: '#111827',
		name: 'Kontext - AI-Powered News Blog',
		icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
		description: 'Kontext is a news blog that transforms the latest news into engaging, easy-to-read blog posts using AI.',
	};
}
