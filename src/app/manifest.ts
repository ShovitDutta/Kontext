import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest {
	return {
		start_url: '/',
		short_name: 'Kontext',
		display: 'standalone',
		theme_color: '#3B82F6',
		background_color: '#111827',
		name: 'Kontext - GenAI Powered News Blog',
		icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
		description: 'Kontext Is An GenAI Powered News Blog, To Stay Updated With The Latest News, Transformed Into Engaging Blog Posts Using GenAI.',
	};
}
