/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
	siteMetadata: {
		title: "Ken Cross",
		description: "A blog about mostly technical things",
		siteUrl: "https://k-cross.github.io", // full path to blog - no ending slash
	},
	mapping: {
		"MarkdownRemark.frontmatter.author": "AuthorYaml.yamlId",
	},
	plugins: [
		"gatsby-plugin-sitemap",
		{
			resolve: "gatsby-plugin-sharp",
			options: {
				defaultQuality: 75,
				stripMetadata: true,
				defaults: {
					formats: ["auto", "webp"],
					quality: 75,
					breakpoints: [750, 1080, 1366, 1920],
				},
			},
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "content",
				path: path.join(__dirname, "src", "content"),
			},
		},
		{
			resolve: "gatsby-transformer-remark",
			options: {
				plugins: [
					{
						resolve: "gatsby-remark-katex",
						options: {
							// Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
							strict: "ignore",
						},
					},
					{
						resolve: "gatsby-remark-mermaid",
						options: /** @type {import('gatsby-remark-mermaid').Options} */ ({
							mermaidConfig: {
								theme: "neutral",
								themeCSS: ".node rect { fill: #fff; }",
							},
						}),
					},
					{
						resolve: "gatsby-remark-responsive-iframe",
						options: {
							wrapperStyle: "margin-bottom: 1rem",
						},
					},
					"gatsby-remark-prismjs",
					"gatsby-remark-copy-linked-files",

					{
						resolve: "gatsby-remark-smartypants",
						options: {
							dashes: "oldschool",
						},
					},
					{
						resolve: "gatsby-remark-images",
						options: {
							maxWidth: 2000,
							quality: 100,
						},
					},
				],
			},
		},
		"gatsby-transformer-json",
		{
			resolve: "gatsby-plugin-canonical-urls",
			options: {
				siteUrl: "https://k-cross.github.io",
				stripQueryString: true,
			},
		},
		"gatsby-plugin-emotion",
		"gatsby-plugin-image",
		"gatsby-plugin-typescript",
		"gatsby-transformer-sharp",
		"gatsby-plugin-react-helmet",
		"gatsby-transformer-yaml",
		{
			resolve: "gatsby-plugin-feed",
			options: {
				query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
				feeds: [
					{
						serialize: ({ query: { site, allMarkdownRemark } }) => {
							return allMarkdownRemark.nodes.map((node) => {
								return Object.assign({}, node.frontmatter, {
									description: node.excerpt,
									date: node.frontmatter.date,
									url: site.siteMetadata.siteUrl + node.fields.slug,
									guid: site.siteMetadata.siteUrl + node.fields.slug,
									custom_elements: [{ "content:encoded": node.html }],
								});
							});
						},
						query: `{
  allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
    nodes {
      excerpt
      html
      fields {
        slug
      }
      frontmatter {
        title
        date
      }
    }
  }
}`,
						output: "/rss.xml",
						title: "Ken's RSS feed",
						// optional configuration to insert feed reference in pages:
						// if `string` is used, it will be used to create RegExp and then test if pathname of
						// current page satisfied this regular expression;
						// if not provided or `undefined`, all pages will have feed reference inserted
						match: "^/posts/",
					},
				],
			},
		},
		{
			resolve: "gatsby-plugin-postcss",
			options: {
				postCssPlugins: [
					require("postcss-color-function"),
					require("cssnano")(),
				],
			},
		},
		{
			resolve: "gatsby-plugin-google-gtag",
			options: {
				trackingIds: ["UA-171511946-1", "G-3CHBH260MV", "G-TZ2RFG3SJ7"],
				gtagConfig: {
					// IP anonymization for GDPR compliance
					anonymize_ip: true,
				},
				pluginConfig: {
					// Puts tracking script in the head instead of the body
					head: false,
					// Disable analytics for users with `Do Not Track` enabled
					respectDNT: true,
					// Avoids sending pageview hits from custom paths
					exclude: ["/preview/**"],
				},
			},
		},
	],
};
