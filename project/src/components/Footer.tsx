import React from 'react';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';
const Footer = () => {
	return (
		<footer className=" text-white py-12">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
					<div className="col-span-2 md:col-span-4 lg:col-span-2">
						<h2 className="text-2xl font-bold mb-4">Kontext</h2>
						<div className="flex space-x-4">
							<a
								href="#"
								className="text-neutral-400 hover:text-white">
								<FaInstagram />
							</a>
							<a
								href="#"
								className="text-neutral-400 hover:text-white">
								<FaTwitter />
							</a>
							<a
								href="#"
								className="text-neutral-400 hover:text-white">
								<FaFacebook />
							</a>
							<a
								href="#"
								className="text-neutral-400 hover:text-white">
								<FaYoutube />
							</a>
							<a
								href="#"
								className="text-neutral-400 hover:text-white">
								<FaGithub />
							</a>
						</div>
					</div>
					<div>
						<h3 className="font-semibold mb-4">Company</h3>
						<ul className="space-y-2 text-neutral-400">
							<li>
								<Link
									href="/about"
									className="hover:text-white">
									About us
								</Link>
							</li>
							<li>
								<Link
									href="/careers"
									className="hover:text-white">
									Careers
								</Link>
							</li>
							<li>
								<Link
									href="/press"
									className="hover:text-white">
									Press
								</Link>
							</li>
							<li>
								<Link
									href="/blog"
									className="hover:text-white">
									Blog
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold mb-4">Download</h3>
						<ul className="space-y-2 text-neutral-400">
							<li>
								<Link
									href="#"
									className="hover:text-white">
									iOS & Android
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="hover:text-white">
									Mac & Windows
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="hover:text-white">
									Web Clipper
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold mb-4">Resources</h3>
						<ul className="space-y-2 text-neutral-400">
							<li>
								<Link
									href="/help"
									className="hover:text-white">
									Help center
								</Link>
							</li>
							<li>
								<Link
									href="/api"
									className="hover:text-white">
									API
								</Link>
							</li>
							<li>
								<Link
									href="/community"
									className="hover:text-white">
									Community
								</Link>
							</li>
							<li>
								<Link
									href="/templates"
									className="hover:text-white">
									Templates
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold mb-4">Explore more</h3>
						<ul className="space-y-2 text-neutral-400">
							<li>
								<Link
									href="/enterprise"
									className="hover:text-white">
									Enterprise
								</Link>
							</li>
							<li>
								<Link
									href="/startups"
									className="hover:text-white">
									Startups
								</Link>
							</li>
							<li>
								<Link
									href="/affiliates"
									className="hover:text-white">
									Affiliates
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-12 border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
					<p>&copy; {new Date().getFullYear()} Kontext, Inc. All rights reserved.</p>
					<div className="flex space-x-4 mt-4 md:mt-0">
						<Link
							href="/privacy"
							className="hover:text-white">
							Privacy
						</Link>
						<Link
							href="/terms"
							className="hover:text-white">
							Terms
						</Link>
						<Link
							href="/sitemap"
							className="hover:text-white">
							Sitemap
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};
export default Footer;
