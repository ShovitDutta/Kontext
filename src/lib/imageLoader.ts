import { ImageLoaderProps } from 'next/image';
const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
	if (src.startsWith('data:') || src.startsWith('/')) return src;
	const url = new URL(src);
	url.searchParams.set('w', width.toString());
	if (quality) url.searchParams.set('q', quality.toString());
	return url.href;
};
export default imageLoader;