export const newsCategories = [
	{ id: 'all', name: 'Everything', icon: '🌐' },
	{ id: 'health', name: 'Health', icon: '❤️' },
	{ id: 'sports', name: 'Sports', icon: '🏅' },
	{ id: 'science', name: 'Science', icon: '🔬' },
	{ id: 'general', name: 'General', icon: '📰' },
	{ id: 'business', name: 'Business', icon: '💼' },
	{ id: 'technology', name: 'Technology', icon: '💻' },
	{ id: 'entertainment', name: 'Entertainment', icon: '🎬' },
];
export const categoryTopicMapping: Record<string, string> = {
	entertainment: 'ENTERTAINMENT',
	technology: 'TECHNOLOGY',
	business: 'BUSINESS',
	science: 'SCIENCE',
	sports: 'SPORTS',
	health: 'HEALTH',
	general: 'WORLD',
};
