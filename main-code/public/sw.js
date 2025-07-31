if (!self.define) {
	let e,
		s = {};
	const a = (a, c) => (
		(a = new URL(a + '.js', c).href),
		s[a] ||
			new Promise((s) => {
				if ('document' in self) {
					const e = document.createElement('script');
					((e.src = a), (e.onload = s), document.head.appendChild(e));
				} else ((e = a), importScripts(a), s());
			}).then(() => {
				let e = s[a];
				if (!e) throw new Error(`Module ${a} didn’t register its module`);
				return e;
			})
	);
	self.define = (c, i) => {
		const t = e || ('document' in self ? document.currentScript.src : '') || location.href;
		if (s[t]) return;
		let n = {};
		const r = (e) => a(e, t),
			f = { module: { uri: t }, exports: n, require: r };
		s[t] = Promise.all(c.map((e) => f[e] || r(e))).then((e) => (i(...e), n));
	};
}
define(['./workbox-4754cb34'], function (e) {
	'use strict';
	(importScripts(),
		self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{ url: '/_next/app-build-manifest.json', revision: 'b2fa951f01ff8e954174878a47cfbcd2' },
				{ url: '/_next/static/M48lYHWHAfhBXUzwgVSfu/_buildManifest.js', revision: '910d5a22220b244924db1af944b82ee1' },
				{ url: '/_next/static/M48lYHWHAfhBXUzwgVSfu/_ssgManifest.js', revision: 'b6652df95db52feb4daf4eca35380933' },
				{ url: '/_next/static/chunks/215.e7c1e823df3b7edc.js', revision: 'e7c1e823df3b7edc' },
				{ url: '/_next/static/chunks/284.cd406134678ae3f7.js', revision: 'cd406134678ae3f7' },
				{ url: '/_next/static/chunks/330.9673bf36f7ebe85a.js', revision: '9673bf36f7ebe85a' },
				{ url: '/_next/static/chunks/341.716d46e6e5cb6bdc.js', revision: '716d46e6e5cb6bdc' },
				{ url: '/_next/static/chunks/417-7b6cd3bc121f3fad.js', revision: '7b6cd3bc121f3fad' },
				{ url: '/_next/static/chunks/433-c83d0bed626d3a90.js', revision: 'c83d0bed626d3a90' },
				{ url: '/_next/static/chunks/443-9e2ab3ee598f1332.js', revision: '9e2ab3ee598f1332' },
				{ url: '/_next/static/chunks/472.a3826d29d6854395.js', revision: 'a3826d29d6854395' },
				{ url: '/_next/static/chunks/4bd1b696-cf72ae8a39fa05aa.js', revision: 'cf72ae8a39fa05aa' },
				{ url: '/_next/static/chunks/604-ebef7802ec1ae25e.js', revision: 'ebef7802ec1ae25e' },
				{ url: '/_next/static/chunks/8e1d74a4-8f75a74baa11a3b7.js', revision: '8f75a74baa11a3b7' },
				{ url: '/_next/static/chunks/964-d6e2a37b7965f281.js', revision: 'd6e2a37b7965f281' },
				{ url: '/_next/static/chunks/971-4e0a9542f89f8175.js', revision: '4e0a9542f89f8175' },
				{ url: '/_next/static/chunks/app/_not-found/page-9f22bca348b2b64e.js', revision: '9f22bca348b2b64e' },
				{ url: '/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-9f22bca348b2b64e.js', revision: '9f22bca348b2b64e' },
				{ url: '/_next/static/chunks/app/api/cron/blog/route-9f22bca348b2b64e.js', revision: '9f22bca348b2b64e' },
				{ url: '/_next/static/chunks/app/api/cron/news/route-9f22bca348b2b64e.js', revision: '9f22bca348b2b64e' },
				{ url: '/_next/static/chunks/app/api/gen/route-9f22bca348b2b64e.js', revision: '9f22bca348b2b64e' },
				{ url: '/_next/static/chunks/app/api/news/%5Bid%5D/route-9f22bca348b2b64e.js', revision: '9f22bca348b2b64e' },
				{ url: '/_next/static/chunks/app/api/news/route-9f22bca348b2b64e.js', revision: '9f22bca348b2b64e' },
				{ url: '/_next/static/chunks/app/article/%5Bid%5D/page-a850f09e67de941d.js', revision: 'a850f09e67de941d' },
				{ url: '/_next/static/chunks/app/category/%5Bname%5D/page-545b30df362189f2.js', revision: '545b30df362189f2' },
				{ url: '/_next/static/chunks/app/error-046e5e3274a31451.js', revision: '046e5e3274a31451' },
				{ url: '/_next/static/chunks/app/layout-e4533c5d32804466.js', revision: 'e4533c5d32804466' },
				{ url: '/_next/static/chunks/app/manifest.webmanifest/route-9f22bca348b2b64e.js', revision: '9f22bca348b2b64e' },
				{ url: '/_next/static/chunks/app/not-found-cbbd6bb45d5b943a.js', revision: 'cbbd6bb45d5b943a' },
				{ url: '/_next/static/chunks/app/offline/page-6d820d733ec69cad.js', revision: '6d820d733ec69cad' },
				{ url: '/_next/static/chunks/app/page-5f0a0cb1cf5b81e9.js', revision: '5f0a0cb1cf5b81e9' },
				{ url: '/_next/static/chunks/app/robots.txt/route-9f22bca348b2b64e.js', revision: '9f22bca348b2b64e' },
				{ url: '/_next/static/chunks/app/search/page-076004ccc1b736d2.js', revision: '076004ccc1b736d2' },
				{ url: '/_next/static/chunks/app/sitemap.xml/route-9f22bca348b2b64e.js', revision: '9f22bca348b2b64e' },
				{ url: '/_next/static/chunks/ee560e2c-44c415e002a03130.js', revision: '44c415e002a03130' },
				{ url: '/_next/static/chunks/f8025e75-6552814f88d522e4.js', revision: '6552814f88d522e4' },
				{ url: '/_next/static/chunks/framework-7c95b8e5103c9e90.js', revision: '7c95b8e5103c9e90' },
				{ url: '/_next/static/chunks/main-1fb369558fb588c5.js', revision: '1fb369558fb588c5' },
				{ url: '/_next/static/chunks/main-app-7edad55b08978c13.js', revision: '7edad55b08978c13' },
				{ url: '/_next/static/chunks/pages/_app-663ec5428c344dae.js', revision: '663ec5428c344dae' },
				{ url: '/_next/static/chunks/pages/_error-544778206352ce59.js', revision: '544778206352ce59' },
				{ url: '/_next/static/chunks/polyfills-42372ed130431b0a.js', revision: '846118c33b2c0e922d7b3a7676f81f6f' },
				{ url: '/_next/static/chunks/webpack-88692e54b7d5c982.js', revision: '88692e54b7d5c982' },
				{ url: '/_next/static/css/b4f38a66f60e1b29.css', revision: 'b4f38a66f60e1b29' },
				{ url: '/_next/static/media/034d78ad42e9620c-s.woff2', revision: 'be7c930fceb794521be0a68e113a71d8' },
				{ url: '/_next/static/media/0484562807a97172-s.p.woff2', revision: 'b550bca8934bd86812d1f5e28c9cc1de' },
				{ url: '/_next/static/media/29a4aea02fdee119-s.woff2', revision: '69d9d2cdadeab7225297d50fc8e48e8b' },
				{ url: '/_next/static/media/29e7bbdce9332268-s.woff2', revision: '9e3ecbe4bb4c6f0b71adc1cd481c2bdc' },
				{ url: '/_next/static/media/4c285fdca692ea22-s.p.woff2', revision: '42d3308e3aca8742731f63154187bdd7' },
				{ url: '/_next/static/media/6c177e25b87fd9cd-s.woff2', revision: '4f9434d4845212443bbd9d102f1f5d7d' },
				{ url: '/_next/static/media/6c9a125e97d835e1-s.woff2', revision: '889718d692d5bfc6019cbdfcb5cc106f' },
				{ url: '/_next/static/media/8888a3826f4a3af4-s.p.woff2', revision: '792477d09826b11d1e5a611162c9797a' },
				{ url: '/_next/static/media/a1386beebedccca4-s.woff2', revision: 'd3aa06d13d3cf9c0558927051f3cb948' },
				{ url: '/_next/static/media/b957ea75a84b6ea7-s.p.woff2', revision: '0bd523f6049956faaf43c254a719d06a' },
				{ url: '/_next/static/media/c3bc380753a8436c-s.woff2', revision: '5a1b7c983a9dc0a87a2ff138e07ae822' },
				{ url: '/_next/static/media/db911767852bc875-s.woff2', revision: '9516f567cd80b0f418bba2f1299ed6d1' },
				{ url: '/_next/static/media/eafabf029ad39a43-s.p.woff2', revision: '43751174b6b810eb169101a20d8c26f8' },
				{ url: '/_next/static/media/f10b8e9d91f3edcb-s.woff2', revision: '63af7d5e18e585fad8d0220e5d551da1' },
				{ url: '/_next/static/media/fe0777f1195381cb-s.woff2', revision: 'f2a04185547c36abfa589651236a9849' },
				{ url: '/default-avatar.png', revision: 'd2a466627db72e787c2f058be572e466' },
				{ url: '/file.svg', revision: 'd09f95206c3fa0bb9bd9fefabfd0ea71' },
				{ url: '/globe.svg', revision: '2aaafa6a49b6563925fe440891e32717' },
				{ url: '/icon-192x192.png', revision: 'caea8b5a94330da3b40d4c5ac207f53d' },
				{ url: '/icon-512x512.png', revision: '8328775fee7926e4d45645a85b675492' },
				{ url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
				{ url: '/placeholder.jpg', revision: 'bbbd1943f9fd7faeac1eb842e7624e2d' },
				{ url: '/vercel.svg', revision: 'c0af2f507b369b085b35ef4bbe3bcf1e' },
				{ url: '/window.svg', revision: 'a2760511c65806022ad20adf74370ff3' },
			],
			{ ignoreURLParametersMatching: [] },
		),
		e.cleanupOutdatedCaches(),
		e.registerRoute('/', new e.NetworkFirst({ cacheName: 'start-url', plugins: [{ cacheWillUpdate: async ({ request: e, response: s, event: a, state: c }) => (s && 'opaqueredirect' === s.type ? new Response(s.body, { status: 200, statusText: 'OK', headers: s.headers }) : s) }] }), 'GET'),
		e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i, new e.CacheFirst({ cacheName: 'google-fonts-webfonts', plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })] }), 'GET'),
		e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i, new e.StaleWhileRevalidate({ cacheName: 'google-fonts-stylesheets', plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })] }), 'GET'),
		e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i, new e.StaleWhileRevalidate({ cacheName: 'static-font-assets', plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })] }), 'GET'),
		e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i, new e.StaleWhileRevalidate({ cacheName: 'static-image-assets', plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })] }), 'GET'),
		e.registerRoute(/\/_next\/image\?url=.+$/i, new e.StaleWhileRevalidate({ cacheName: 'next-image', plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })] }), 'GET'),
		e.registerRoute(/\.(?:mp3|wav|ogg)$/i, new e.CacheFirst({ cacheName: 'static-audio-assets', plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }), 'GET'),
		e.registerRoute(/\.(?:mp4)$/i, new e.CacheFirst({ cacheName: 'static-video-assets', plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }), 'GET'),
		e.registerRoute(/\.(?:js)$/i, new e.StaleWhileRevalidate({ cacheName: 'static-js-assets', plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }), 'GET'),
		e.registerRoute(/\.(?:css|less)$/i, new e.StaleWhileRevalidate({ cacheName: 'static-style-assets', plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }), 'GET'),
		e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i, new e.StaleWhileRevalidate({ cacheName: 'next-data', plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }), 'GET'),
		e.registerRoute(/\.(?:json|xml|csv)$/i, new e.NetworkFirst({ cacheName: 'static-data-assets', plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }), 'GET'),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1;
				const s = e.pathname;
				return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
			},
			new e.NetworkFirst({ cacheName: 'apis', networkTimeoutSeconds: 10, plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })] }),
			'GET',
		),
		e.registerRoute(
			({ url: e }) => {
				if (!(self.origin === e.origin)) return !1;
				return !e.pathname.startsWith('/api/');
			},
			new e.NetworkFirst({ cacheName: 'others', networkTimeoutSeconds: 10, plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }),
			'GET',
		),
		e.registerRoute(({ url: e }) => !(self.origin === e.origin), new e.NetworkFirst({ cacheName: 'cross-origin', networkTimeoutSeconds: 10, plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })] }), 'GET'));
});
