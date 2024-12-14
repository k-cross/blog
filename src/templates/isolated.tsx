import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { setLightness } from "polished";
import React from "react";
import { Helmet } from "react-helmet";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { Footer } from "../components/Footer";
import SiteNav, { SiteNavMain } from "../components/header/SiteNav";
import PostContent from "../components/PostContent";
import { Wrapper } from "../components/Wrapper";
import IndexLayout from "../layouts";
import { colors } from "../styles/colors";
import { inner, outer, SiteMain } from "../styles/shared";
import config from "../website-config";

interface PageTemplateProps {
	pageContext: {
		slug: string;
	};
	data: {
		markdownRemark: {
			html: string;
			htmlAst: any;
			timeToRead: string;
			frontmatter: {
				title: string;
				picture: {
					childImageSharp: {
						gatsbyImageData: any;
					};
				};
			};
		};
	};
}

export interface PageContext {
	timeToRead: number;
	fields: {
		slug: string;
	};
	frontmatter: {
		picture: {
			childImageSharp: {
				gatsbyImageData(layout: CONSTRAINED);
			};
		};
		title: string;
	};
}

const PageTemplate: React.FC<PageTemplateProps> = (props) => {
	const post = props.data.markdownRemark;
	let width = "";
	let height = "";
	if (post.frontmatter.picture?.childImageSharp) {
		width = post.frontmatter.picture.childImageSharp.gatsbyImageData.width;
		height = String(
			Number(width) /
				post.frontmatter.picture.childImageSharp.gatsbyImageData.aspectRatio,
		);
	}

	return (
		<IndexLayout>
			<Helmet>
				<html lang={config.lang} />
				<title>{post.frontmatter.title}</title>

				<meta property="og:site_name" content={config.title} />
				<meta property="og:type" content="article" />
				<meta property="og:title" content={post.frontmatter.title} />
				<meta
					property="og:url"
					content={config.siteUrl + props.pageContext.slug}
				/>
				{post.frontmatter.picture?.childImageSharp && (
					<meta
						property="og:image"
						content={`${config.siteUrl}${post.frontmatter.picture.childImageSharp.gatsbyImageData.src}`}
					/>
				)}

				<meta name="bsky:card" content="summary_large_image" />
				<meta name="bsky:title" content={post.frontmatter.title} />
				<meta
					name="bsky:url"
					content={config.siteUrl + props.pageContext.slug}
				/>
				{post.frontmatter.picture?.childImageSharp && (
					<meta
						name="bsky:image"
						content={`${config.siteUrl}${post.frontmatter.picture.childImageSharp.gatsbyImageData.src}`}
					/>
				)}
				{config.bsky && (
					<meta
						name="bsky:site"
						content={`@${config.bsky.split("https://bsky.app/")[1]}`}
					/>
				)}
				{config.bsky && (
					<meta
						name="bsky:creator"
						content={`@${config.bsky.split("https://bsky.app/")[1]}`}
					/>
				)}
				{width && <meta property="og:image:width" content={width} />}
				{height && <meta property="og:image:height" content={height} />}
			</Helmet>
			<Wrapper css={PostTemplate}>
				<header className="site-header">
					<div css={[outer, SiteNavMain]}>
						<div css={inner}>
							<SiteNav isPost post={post.frontmatter} />
						</div>
					</div>
				</header>
				<main id="site-main" className="site-main" css={[SiteMain, outer]}>
					<div css={inner}>
						<article css={[PostFull, !post.frontmatter.picture && NoImage]}>
							<PostFullHeader className="post-full-header">
								<PostFullTitle className="post-full-title">
									{post.frontmatter.title}
								</PostFullTitle>
							</PostFullHeader>

							{post.frontmatter.picture?.childImageSharp && (
								<PostFullImage>
									<GatsbyImage
										image={
											post.frontmatter.picture.childImageSharp.gatsbyImageData
										}
										style={{ height: "100%" }}
										alt={post.frontmatter.title}
									/>
								</PostFullImage>
							)}
							<PostContent htmlAst={post.htmlAst} />
						</article>
					</div>
				</main>

				<Footer />
			</Wrapper>
		</IndexLayout>
	);
};

const PostTemplate = css`
  .site-main {
    margin-top: 64px;
    background: #fff;
    padding-bottom: 4vw;
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      /* background: var(--darkmode); */
      background: ${colors.darkmode};
    }
  }
`;

export const PostFull = css`
  position: relative;
  z-index: 50;
`;

export const NoImage = css`
  .post-full-content {
    padding-top: 0;
  }

  .post-full-content:before,
  .post-full-content:after {
    display: none;
  }
`;

export const PostFullHeader = styled.header`
  position: relative;
  margin: 0 auto;
  padding: 70px 170px 50px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  @media (max-width: 1170px) {
    padding: 60px 11vw 50px;
  }

  @media (max-width: 800px) {
    padding-right: 5vw;
    padding-left: 5vw;
  }

  @media (max-width: 500px) {
    padding: 20px 0 35px;
  }
`;

export const PostFullTitle = styled.h1`
  margin: 0 0 0.2em;
  color: ${setLightness("0.05", colors.darkgrey)};
  @media (max-width: 500px) {
    margin-top: 0.2em;
    font-size: 3.3rem;
  }

  @media (prefers-color-scheme: dark) {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const PostFullImage = styled.figure`
  margin: 25px 0 50px;
  height: 500px;
  background: ${colors.lightgrey} center center;
  background-size: cover;
  border-radius: 5px;

  @media (max-width: 500px) {
    margin: 25px -6vw 50px;
    border-radius: 0;
    img {
      max-width: 500px;
    }
  }
`;

export const query = graphql`query ($slug: String) {
  markdownRemark(fields: {slug: {eq: $slug}}) {
    html
    htmlAst
    timeToRead
    frontmatter {
      title
      picture {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  }
}
`;

export default PageTemplate;
