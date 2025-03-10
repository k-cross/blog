import { graphql } from "gatsby";
import React from "react";
import { getSrc } from "gatsby-plugin-image";
import { Helmet } from "react-helmet";

import { css } from "@emotion/react";

import { Footer } from "../components/Footer";
import SiteNav from "../components/header/SiteNav";
import { PostCard } from "../components/PostCard";
import { Wrapper } from "../components/Wrapper";
import IndexLayout from "../layouts";
import {
	inner,
	outer,
	PostFeed,
	Posts,
	SiteDescription,
	SiteHeader,
	SiteHeaderContent,
	SiteMain,
	SiteTitle,
	SiteHeaderStyles,
} from "../styles/shared";
import config from "../website-config";
import { PageContext } from "./post";

export interface IndexProps {
	pageContext: {
		currentPage: number;
		numPages: number;
	};
	data: {
		header: {
			childImageSharp: {
				gatsbyImageData: any;
			};
		};
		allMarkdownRemark: {
			edges: Array<{
				node: PageContext;
			}>;
		};
	};
}

const IndexPage: React.FC<IndexProps> = (props) => {
	const { width, height } = props.data.header.childImageSharp.gatsbyImageData;
	const imgPath = getSrc(props.data.header);

	return (
		<IndexLayout css={HomePosts}>
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
								// filter out drafts in production
								return (
									(post.node.frontmatter.draft !== true ||
										process.env.NODE_ENV !== "production") && (
										<PostCard
											key={post.node.fields.slug}
											post={post.node}
											large={index === 0}
										/>
									)
								);
							})}
						</div>
					</div>
				</main>
				{props.children}
				<Footer />
			</Wrapper>
		</IndexLayout>
	);
};

export const pageQuery = graphql`query blogPageQuery($skip: Int!, $limit: Int!) {
  header: file(relativePath: {eq: "img/moma/diffuse.jpg"}) {
    childImageSharp {
      gatsbyImageData(width: 2000, quality: 100, layout: FIXED)
    }
  }
  allMarkdownRemark(
    sort: {frontmatter: {date: DESC}}
    filter: {frontmatter: {draft: {ne: true}, layout: {eq: "post"}}}
    limit: $limit
    skip: $skip
  ) {
    edges {
      node {
        timeToRead
        frontmatter {
          title
          date
          tags
          draft
          excerpt
          picture {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
          author {
            id
            bio
            avatar {
              children {
                ... on ImageSharp {
                  gatsbyImageData(layout: CONSTRAINED)
                }
              }
            }
          }
        }
        excerpt
        fields {
          slug
        }
      }
    }
  }
}`;

const HomePosts = css`
  @media (min-width: 795px) {
    .post-card-large {
      flex: 1 1 100%;
      flex-direction: row;
      padding-bottom: 40px;
      min-height: 280px;
      border-top: 0;
    }

    .post-card-large .post-card-title {
      margin-top: 0;
      font-size: 3.2rem;
    }

    .post-card-large:not(.no-image) .post-card-header {
      margin-top: 0;
    }

    .post-card-large .post-card-image-link {
      position: relative;
      flex: 1 1 auto;
      margin-bottom: 0;
      min-height: 380px;
    }

    .post-card-large .post-card-image {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .post-card-large .post-card-content {
      flex: 0 1 361px;
      justify-content: center;
    }

    .post-card-large .post-card-title {
      margin-top: 0;
      font-size: 3.2rem;
    }

    .post-card-large .post-card-content-link {
      padding: 0 0 0 40px;
    }

    .post-card-large .post-card-meta {
      padding: 0 0 0 40px;
    }

    .post-card-large .post-card-excerpt p {
      margin-bottom: 1.5em;
      font-size: 1.8rem;
      line-height: 1.5em;
    }
  }
`;

export default IndexPage;
