import React from "react";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
import { getSrc } from "gatsby-plugin-image";
import * as _ from "lodash";

import SiteNav from "../components/header/SiteNav";
import PostContent from "../components/PostContent";
import { Wrapper } from "../components/Wrapper";
import { Footer } from "../components/Footer";
import IndexLayout from "../layouts";
import {
	PostFull,
	PostFullHeader,
	PostFullTags,
	PostFullTitle,
} from "../templates/post";
import {
	inner,
	outer,
	Posts,
	PostFeed,
	SiteMain,
	SiteTitle,
	SiteDescription,
	SiteHeader,
	SiteHeaderContent,
	SiteHeaderStyles,
} from "../styles/shared";
import config from "../website-config";

import "katex/dist/katex.min.css";

const MainPage: React.FC<IndexTemplateProps> = (props) => {
	const { width, height } = props.data.header.childImageSharp.gatsbyImageData;
	const imgPath = getSrc(props.data.header);

	return (
		<IndexLayout>
			<Helmet>
				<html lang={config.lang} />
				<title>{config.title}</title>
				<meta name="description" content={config.description} />
				<meta property="og:site_name" content={config.title} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={config.title} />
				<meta property="og:description" content={config.description} />
				<meta property="og:url" content={config.siteUrl} />
				<meta property="og:image" content={imgPath} />
				{config.googleSiteVerification && (
					<meta
						name="google-site-verification"
						content={config.googleSiteVerification}
					/>
				)}
				<meta name="bsky:card" content="summary_large_image" />
				<meta name="bsky:title" content={config.title} />
				<meta name="bsky:description" content={config.description} />
				<meta name="bsky:url" content={config.siteUrl} />
				<meta name="bsky:image" content={imgPath} />
				{config.bsky && (
					<meta
						name="bsky:site"
						content={`@${config.bsky.split("https://bsky.app/")[1]}`}
					/>
				)}
				<meta property="og:image:width" content={width.toString()} />
				<meta property="og:image:height" content={height.toString()} />
			</Helmet>
			<Wrapper>
				<div
					css={[outer, SiteHeader, SiteHeaderStyles]}
					className="site-header-background"
					style={{
						backgroundImage: `url('${imgPath}')`,
					}}
				>
					<div css={inner}>
						<SiteNav isHome />
						<SiteHeaderContent className="site-header-conent">
							<SiteTitle className="site-title">{config.title}</SiteTitle>
							<SiteDescription>{config.description}</SiteDescription>
						</SiteHeaderContent>
					</div>
				</div>
				<main id="site-main" css={[SiteMain, outer]}>
					<div css={[inner, Posts]}>
						<div css={[PostFeed]}>
							{props.data.allMarkdownRemark.edges.map((post, index) => {
								return (
									<article key={post.node.fields.slug} css={[PostFull]}>
										<PostFullHeader className="post-full-header">
											<PostFullTags className="post-full-tags">
												{post.node.frontmatter.tags &&
													post.node.frontmatter.tags.length > 0 && (
														<Link
															to={`/tags/${_.kebabCase(post.node.frontmatter.tags[0])}/`}
														>
															{post.node.frontmatter.tags[0]}
														</Link>
													)}
											</PostFullTags>
											<PostFullTitle className="post-full-title">
												{post.node.frontmatter.title}
											</PostFullTitle>
										</PostFullHeader>
										<PostContent htmlAst={post.node.htmlAst} />
									</article>
								);
							})}
						</div>
					</div>
				</main>
				<Footer />
			</Wrapper>
		</IndexLayout>
	);
};

export const pageQuery = graphql`{
  header: file(relativePath: {eq: "img/moma/diffuse.jpg"}) {
    childImageSharp {
      gatsbyImageData(width: 2000, quality: 100, layout: FIXED)
    }
  }
  allMarkdownRemark(
    limit: 1
    sort: {frontmatter: {date: DESC}}
    filter: {frontmatter: {draft: {ne: true}, layout: {eq: "post"}}}
  ) {
    edges {
      node {
        timeToRead
        frontmatter {
          title
          date
          tags
        }
        excerpt
        html
        htmlAst
        fields {
          layout
          slug
        }
      }
    }
  }
}`;

export default MainPage;
