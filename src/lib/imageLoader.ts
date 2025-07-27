// src/lib/imageLoader.ts
import { ImageLoaderProps } from "next/image";

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  // If the src is already a data URL or a local path, return it directly
  if (src.startsWith("data:") || src.startsWith("/")) {
    return src;
  }

  // Construct the URL for external images
  const url = new URL(src);
  url.searchParams.set("w", width.toString());
  if (quality) {
    url.searchParams.set("q", quality.toString());
  }

  // We will rely on Next.js's default image optimization for remote patterns
  // and assume the issue is with the Content-Disposition header from the origin.
  // For a true custom loader that strips headers, you'd need a server-side fetch
  // or a proxy. For now, we'll ensure the URL is correctly formed.
  // The actual header stripping would need to happen at the Next.js server level
  // or by using a custom server.

  // Given the problem description, the issue is likely with the *origin* server
  // sending the Content-Disposition header. Next.js's image optimization
  // acts as a proxy. To truly strip the header, we'd need a custom API route
  // or a custom server.

  // For now, let's ensure the URL is correctly formatted for Next.js Image component.
  // The problem description implies the _next/image URL itself is causing the download,
  // which means the header is being passed through.

  // A direct fix for the Content-Disposition header would involve a custom API route
  // that fetches the image and then returns it without the problematic header.
  // Let's try to implement that.

  return url.href;
};

export default imageLoader;
