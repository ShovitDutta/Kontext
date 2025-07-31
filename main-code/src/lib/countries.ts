export const supportedCountries = [
	{ name: 'None', code: 'none' },
	{ name: 'India', code: 'in' },
	{ name: 'United Kingdom', code: 'uk' },
	{ name: 'United States', code: 'us' },
	{ name: 'Australia', code: 'au' },
	{ name: 'Canada', code: 'ca' },
	{ name: 'Germany', code: 'de' },
	{ name: 'France', code: 'fr' },
	{ name: 'Japan', code: 'jp' },
	{ name: 'Brazil', code: 'br' },
];
export const countryCodeMapping: Record<string, string> = {
	in: 'IN',
	uk: 'UK',
	us: 'US',
	au: 'AU',
	ca: 'CA',
	de: 'DE',
	fr: 'FR',
	jp: 'JP',
	br: 'BR',
	none: 'IN',
};
export const googleNewsCountryMapping: Record<string, string> = {
	IN: 'in',
	UK: 'uk',
	US: 'us',
	AU: 'au',
	CA: 'ca',
	DE: 'de',
	FR: 'fr',
	JP: 'jp',
	BR: 'br',
};

export const countries = {
	IN: { hl: 'en-IN', gl: 'IN', ceid: 'IN:en' },
	US: { hl: 'en-US', gl: 'US', ceid: 'US:en' },
	GB: { hl: 'en-GB', gl: 'GB', ceid: 'GB:en' },
	CA: { hl: 'en-CA', gl: 'CA', ceid: 'CA:en' },
	AU: { hl: 'en-AU', gl: 'AU', ceid: 'AU:en' },
	DE: { hl: 'de-DE', gl: 'DE', ceid: 'DE:de' },
	FR: { hl: 'fr-FR', gl: 'FR', ceid: 'FR:fr' },
	JP: { hl: 'ja-JP', gl: 'JP', ceid: 'JP:ja' },
	BR: { hl: 'pt-BR', gl: 'BR', ceid: 'BR:pt' },
	CN: { hl: 'zh-CN', gl: 'CN', ceid: 'CN:zh' },
};
