export interface WebsiteConfig {
	title: string;
	coverImage?: string;
	lang: string;
	siteUrl: string;
	bsky?: string;
	googleSiteVerification?: string;
	description?: string;
}

const config: WebsiteConfig = {
	title: 'Ken Cross',
	description: "Observations of Progress from Plato's Cave",
	coverImage: 'img/blog-cover.png',
	lang: 'en',
	siteUrl: 'https://k-cross.github.io',
	bsky: 'https://bsky.app/profile/k-cross.github.io',
	googleSiteVerification: 'GoogleCode',
};

export default config;
