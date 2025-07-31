export const newsCategories = [
	{ id: 'all', name: 'Everything', icon: '🌐' },
	{ id: 'health', name: 'Health', icon: '❤️' },
	{ id: 'sports', name: 'Sports', icon: '🏅' },
	{ id: 'technology', name: 'Technology', icon: '💻' },
	{ id: 'science', name: 'Science', icon: '🔬' },
	{ id: 'general', name: 'General', icon: '📰' },
	{ id: 'business', name: 'Business', icon: '💼' },
	{ id: 'entertainment', name: 'Entertainment', icon: '🎬' },
	{ id: 'world', name: 'World', icon: '🌍' },
	{ id: 'nation', name: 'National', icon: '🏛️' },
];
export const categoryTopicMapping: Record<string, string> = {
	world: 'WORLD',
	nation: 'NATION',
	business: 'BUSINESS',
	technology: 'TECHNOLOGY',
	entertainment: 'ENTERTAINMENT',
	science: 'SCIENCE',
	sports: 'SPORTS',
	health: 'HEALTH',
	general: 'WORLD',
};
export const topicCategoryMapping: Record<string, string> = {
	WORLD: 'world',
	NATION: 'nation',
	BUSINESS: 'business',
	TECHNOLOGY: 'technology',
	ENTERTAINMENT: 'entertainment',
	SCIENCE: 'science',
	SPORTS: 'sports',
	HEALTH: 'health',
};
