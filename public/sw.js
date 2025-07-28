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
	self.define = (c, t) => {
		const i = e || ('document' in self ? document.currentScript.src : '') || location.href;
		if (s[i]) return;
		let n = {};
		const d = (e) => a(e, i),
			r = { module: { uri: i }, exports: n, require: d };
		s[i] = Promise.all(c.map((e) => r[e] || d(e))).then((e) => (t(...e), n));
	};
}
define(['./workbox-4754cb34'], function (e) {
	'use strict';
	(importScripts(),
		self.skipWaiting(),
		e.clientsClaim(),
		e.precacheAndRoute(
			[
				{ url: '/_next/app-build-manifest.json', revision: '7b10edf42ca70a68e7bfc8012097bb37' },
				{ url: '/_next/static/chunks/161-ddc5e5ca362bfffd.js', revision: 'ddc5e5ca362bfffd' },
				{ url: '/_next/static/chunks/215.e7c1e823df3b7edc.js', revision: 'e7c1e823df3b7edc' },
				{ url: '/_next/static/chunks/284.f7a24e3e2df5db08.js', revision: 'f7a24e3e2df5db08' },
				{ url: '/_next/static/chunks/319-6fdcaff1b7a2f632.js', revision: '6fdcaff1b7a2f632' },
				{ url: '/_next/static/chunks/330.1253133b24d10ddf.js', revision: '1253133b24d10ddf' },
				{ url: '/_next/static/chunks/341.716d46e6e5cb6bdc.js', revision: '716d46e6e5cb6bdc' },
				{ url: '/_next/static/chunks/472.a3826d29d6854395.js', revision: 'a3826d29d6854395' },
				{ url: '/_next/static/chunks/487-e6ecac685cc28245.js', revision: 'e6ecac685cc28245' },
				{ url: '/_next/static/chunks/4bd1b696-cf72ae8a39fa05aa.js', revision: 'cf72ae8a39fa05aa' },
				{ url: '/_next/static/chunks/538-b644240524cdfe56.js', revision: 'b644240524cdfe56' },
				{ url: '/_next/static/chunks/8e1d74a4-42f8bba744cc6459.js', revision: '42f8bba744cc6459' },
				{ url: '/_next/static/chunks/964-d6e2a37b7965f281.js', revision: 'd6e2a37b7965f281' },
				{ url: '/_next/static/chunks/app/_not-found/page-96dc1d331136f967.js', revision: '96dc1d331136f967' },
				{ url: '/_next/static/chunks/app/api/auth/%5B...nextauth%5D/route-96dc1d331136f967.js', revision: '96dc1d331136f967' },
				{ url: '/_next/static/chunks/app/api/cron/news/route-96dc1d331136f967.js', revision: '96dc1d331136f967' },
				{ url: '/_next/static/chunks/app/api/cron/route-96dc1d331136f967.js', revision: '96dc1d331136f967' },
				{ url: '/_next/static/chunks/app/api/gen/route-96dc1d331136f967.js', revision: '96dc1d331136f967' },
				{ url: '/_next/static/chunks/app/api/news/%5Bid%5D/route-96dc1d331136f967.js', revision: '96dc1d331136f967' },
				{ url: '/_next/static/chunks/app/api/news/route-96dc1d331136f967.js', revision: '96dc1d331136f967' },
				{ url: '/_next/static/chunks/app/article/%5Bid%5D/page-7294a77a726b4f63.js', revision: '7294a77a726b4f63' },
				{ url: '/_next/static/chunks/app/category/%5Bname%5D/page-ff801a71b0c58bd0.js', revision: 'ff801a71b0c58bd0' },
				{ url: '/_next/static/chunks/app/error-1beeb8c105c697ee.js', revision: '1beeb8c105c697ee' },
				{ url: '/_next/static/chunks/app/layout-e9fce845fef5265f.js', revision: 'e9fce845fef5265f' },
				{ url: '/_next/static/chunks/app/manifest.webmanifest/route-96dc1d331136f967.js', revision: '96dc1d331136f967' },
				{ url: '/_next/static/chunks/app/not-found-40de5438946c798e.js', revision: '40de5438946c798e' },
				{ url: '/_next/static/chunks/app/offline/page-4804cb3c4360b37d.js', revision: '4804cb3c4360b37d' },
				{ url: '/_next/static/chunks/app/page-299606b0e4bd7ab2.js', revision: '299606b0e4bd7ab2' },
				{ url: '/_next/static/chunks/app/robots.txt/route-96dc1d331136f967.js', revision: '96dc1d331136f967' },
				{ url: '/_next/static/chunks/app/search/page-239ab698fd89a990.js', revision: '239ab698fd89a990' },
				{ url: '/_next/static/chunks/app/sitemap.xml/route-96dc1d331136f967.js', revision: '96dc1d331136f967' },
				{ url: '/_next/static/chunks/ee560e2c-44c415e002a03130.js', revision: '44c415e002a03130' },
				{ url: '/_next/static/chunks/framework-7c95b8e5103c9e90.js', revision: '7c95b8e5103c9e90' },
				{ url: '/_next/static/chunks/main-1fb369558fb588c5.js', revision: '1fb369558fb588c5' },
				{ url: '/_next/static/chunks/main-app-0e5424266e62c1b8.js', revision: '0e5424266e62c1b8' },
				{ url: '/_next/static/chunks/pages/_app-663ec5428c344dae.js', revision: '663ec5428c344dae' },
				{ url: '/_next/static/chunks/pages/_error-544778206352ce59.js', revision: '544778206352ce59' },
				{ url: '/_next/static/chunks/polyfills-42372ed130431b0a.js', revision: '846118c33b2c0e922d7b3a7676f81f6f' },
				{ url: '/_next/static/chunks/webpack-448cd3a5d228f9da.js', revision: '448cd3a5d228f9da' },
				{ url: '/_next/static/css/ee4e9d6e799abba7.css', revision: 'ee4e9d6e799abba7' },
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
				{ url: '/_next/static/tlEGxfXB3um7NMbowiqCJ/_buildManifest.js', revision: 'ba324944164dc6b54fe814b18b1464d0' },
				{ url: '/_next/static/tlEGxfXB3um7NMbowiqCJ/_ssgManifest.js', revision: 'b6652df95db52feb4daf4eca35380933' },
				{ url: '/default-avatar.png', revision: 'd2a466627db72e787c2f058be572e466' },
				{ url: '/file.svg', revision: 'd09f95206c3fa0bb9bd9fefabfd0ea71' },
				{ url: '/globe.svg', revision: '2aaafa6a49b6563925fe440891e32717' },
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
