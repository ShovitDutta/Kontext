'use client';

import { useArticleStore } from '@/store/articleStore';
import { supportedCountries } from '@/lib/countries';

export default function CountrySelector() {
	const { country, setCountry } = useArticleStore();

	return (
		<div className="relative">
			<select
				value={country}
				onChange={(e) => setCountry(e.target.value)}
				className="appearance-none bg-transparent border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
				{supportedCountries.map((c) => (
					<option
						key={c.code}
						value={c.code}>
						{c.name}
					</option>
				))}
			</select>
			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
				<svg
					className="fill-current h-4 w-4"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20">
					<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
				</svg>
			</div>
		</div>
	);
}
