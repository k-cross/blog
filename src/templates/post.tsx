import { format } from 'date-fns';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getSrc } from 'gatsby-plugin-image';
import * as _ from 'lodash';
import { lighten, setLightness } from 'polished';
import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Footer } from '../components/Footer';
import SiteNav, { SiteNavMain } from '../components/header/SiteNav';
import PostContent from '../components/PostContent';
import { ReadNext } from '../components/ReadNext';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import { colors } from '../styles/colors';
import { inner, outer, SiteMain } from '../styles/shared';
import config from '../website-config';
import { AuthorList } from '../components/AuthorList';

import 'katex/dist/katex.min.css';

export interface Author {
  yamlId: string;
  bio: string;
  avatar: {
    children: Array<{ gatsbyImageData: any }>;
  };
}

interface PageTemplateProps {
  pageContext: {
    prev: PageContext;
    next: PageContext;
    slug: string;
  };
  data: {
    markdownRemark: {
      html: string;
      htmlAst: any;
      excerpt: string;
      timeToRead: string;
      frontmatter: {
        title: string;
        date: string;
        userDate: string;
        modified: string;
        picture: {
          childImageSharp: {
            gatsbyImageData: any;
          };
        };
        excerpt: string;
        tags: string[];
        author: Author[];
      };
    };
    relatedPosts: {
      totalCount: number;
      edges: Array<{
        node: {
          timeToRead: number;
          frontmatter: {
            title: string;
            date: string;
            modified: string;
          };
          fields: {
            slug: string;
          };
        };
      }>;
    };
  };
}

export interface PageContext {
  excerpt: string;
  timeToRead: number;
  fields: {
    slug: string;
  };
  frontmatter: {
    picture: {
      childImageSharp: {
        gatsbyImageData: any;
      };
    };
    excerpt: string;
    title: string;
    date: string;
    modified: string;
    draft?: boolean;
    tags: string[];
    author: Author[];
  };
}

const PageTemplate: React.FC<PageTemplateProps> = props => {
  const post = props.data.markdownRemark;
  let width = '';
  let height = '';
  if (post.frontmatter.picture?.childImageSharp) {
    width = post.frontmatter.picture.childImageSharp.gatsbyImageData.width;
    height = String(
      Number(width) / post.frontmatter.picture.childImageSharp.gatsbyImageData.aspectRatio,
    );
  }

  const date = new Date(post.frontmatter.date);
  const modifiedDate = new Date(post.frontmatter.modified);
  // 2018-08-20
  const datetime = format(date, 'yyyy-MM-dd');
  const modDatetime = format(date, 'yyyy-MM-dd');
  // 20 AUG 2018
  const displayDatetime = format(date, 'dd LLL yyyy');
  const displayModifiedDT = format(modifiedDate, 'dd LLL yyyy');

  return (
    <IndexLayout className="post-template">
      <Helmet>
        <html lang={config.lang} />
        <title>{post.frontmatter.title}</title>

        <meta name="description" content={post.frontmatter.excerpt || post.excerpt} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content={post.frontmatter.excerpt || post.excerpt} />
        <meta property="og:url" content={config.siteUrl + props.pageContext.slug} />
        {post.frontmatter.picture?.childImageSharp && (
          <meta
            property="og:image"
            content={`${config.siteUrl}{getSrc(post.frontmatter.picture)}`}
          />
        )}
        <meta property="article:published_time" content={post.frontmatter.date} />
        {/* not sure if modified time possible */}
        {/* <meta property="article:modified_time" content="2018-08-20T15:12:00.000Z" /> */}
        {post.frontmatter.tags && (
          <meta property="article:tag" content={post.frontmatter.tags[0]} />
        )}

        <meta name="bsky:card" content="summary_large_image" />
        <meta name="bsky:title" content={post.frontmatter.title} />
        <meta name="bsky:description" content={post.frontmatter.excerpt || post.excerpt} />
        <meta name="bsky:url" content={config.siteUrl + props.pageContext.slug} />
        {post.frontmatter.picture?.childImageSharp && (
          <meta name="bsky:image" content={`${config.siteUrl}{getSrc(post.frontmatter.picture)}`} />
        )}
        <meta name="bsky:label1" content="Written by" />
        <meta name="bsky:data1" content={post.frontmatter.author[0].yamlId} />
        <meta name="bsky:label2" content="Filed under" />
        {post.frontmatter.tags && <meta name="bsky:data2" content={post.frontmatter.tags[0]} />}
        {config.bsky && (
          <meta name="bsky:site" content={`@${config.bsky.split('https://bsky.app/')[1]}`} />
        )}
        {config.bsky && (
          <meta name="bsky:creator" content={`@${config.bsky.split('https://bsky.app/')[1]}`} />
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
                <PostFullTags className="post-full-tags">
                  {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                    <Link to={`/tags/${_.kebabCase(post.frontmatter.tags[0])}/`}>
                      {post.frontmatter.tags[0]}
                    </Link>
                  )}
                </PostFullTags>
                <PostFullTitle className="post-full-title">{post.frontmatter.title}</PostFullTitle>
                <PostFullCustomExcerpt className="post-full-custom-excerpt">
                  {post.frontmatter.excerpt}
                </PostFullCustomExcerpt>
                <PostFullByline className="post-full-byline">
                  <section className="post-full-byline-content">
                    <AuthorList authors={post.frontmatter.author} tooltip="large" />
                    <section className="post-full-byline-meta">
                      <h4 className="author-name">
                        {post.frontmatter.author.map(author => author.yamlId)}
                      </h4>
                      <div className="byline-meta-content">
                        <time className="byline-meta-date" dateTime={datetime}>
                          published {displayDatetime}
                        </time>
                        <time className="byline-meta-modified-date" dateTime={modDatetime}>
                          <span className="bull">&bull;</span> last modified {displayModifiedDT}
                        </time>
                        <span className="byline-reading-time">
                          <span className="bull">&bull;</span> {post.timeToRead} min read
                        </span>
                      </div>
                    </section>
                  </section>
                </PostFullByline>
              </PostFullHeader>

              {post.frontmatter.picture?.childImageSharp && (
                <PostFullImage>
                  <GatsbyImage
                    image={post.frontmatter.picture.childImageSharp.gatsbyImageData}
                    style={{ height: '100%' }}
                    alt={post.frontmatter.title}
                  />
                </PostFullImage>
              )}
              <PostContent htmlAst={post.htmlAst} />
            </article>
          </div>
        </main>

        <ReadNext
          currentPageSlug={props.pageContext.slug}
          tags={post.frontmatter.tags}
          relatedPosts={props.data.relatedPosts}
          pageContext={props.pageContext}
        />

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

export const PostFullTags = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* color: var(--midgrey); */
  color: ${colors.midgrey};
  font-size: 1.3rem;
  line-height: 1.4em;
  font-weight: 600;
  text-transform: uppercase;
`;

export const PostFullCustomExcerpt = styled.p`
  margin: 20px 0 0;
  color: var(--midgrey);
  font-family: Georgia, serif;
  font-size: 2.3rem;
  line-height: 1.4em;
  font-weight: 300;

  @media (max-width: 500px) {
    font-size: 1.9rem;
    line-height: 1.5em;
  }

  @media (prefers-color-scheme: dark) {
    /* color: color(var(--midgrey) l(+10%)); */
    color: ${lighten('0.1', colors.midgrey)};
  }
`;

export const PostFullByline = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 35px 0 0;
  padding-top: 15px;
  /* border-top: 1px solid color(var(--lightgrey) l(+10%)); */
  border-top: 1px solid ${lighten('0.1', colors.lightgrey)};

  .post-full-byline-content {
    flex-grow: 1;
    display: flex;
    align-items: flex-start;
  }

  .post-full-byline-content .author-list {
    justify-content: flex-start;
    padding: 0 12px 0 0;
  }

  .post-full-byline-meta {
    margin: 2px 0 0;
    /* color: color(var(--midgrey) l(+10%)); */
    color: ${lighten('0.1', colors.midgrey)};
    font-size: 1.2rem;
    line-height: 1.2em;
    letter-spacing: 0.2px;
    text-transform: uppercase;
  }

  .post-full-byline-meta h4 {
    margin: 0 0 3px;
    font-size: 1.3rem;
    line-height: 1.4em;
    font-weight: 500;
  }

  .post-full-byline-meta h4 a {
    /* color: color(var(--darkgrey) l(+10%)); */
    color: ${lighten('0.1', colors.darkgrey)};
  }

  .post-full-byline-meta h4 a:hover {
    /* color: var(--darkgrey); */
    color: ${colors.darkgrey};
  }

  .post-full-byline-meta .bull {
    display: inline-block;
    margin: 0 4px;
    opacity: 0.6;
  }

  @media (prefers-color-scheme: dark) {
    /* border-top-color: color(var(--darkmode) l(+15%)); */
    border-top-color: ${lighten('0.15', colors.darkmode)};

    .post-full-byline-meta h4 a {
      color: rgba(255, 255, 255, 0.75);
    }

    .post-full-byline-meta h4 a:hover {
      color: #fff;
    }
  }
`;

export const PostFullTitle = styled.h1`
  margin: 0 0 0.2em;
  color: ${setLightness('0.05', colors.darkgrey)};
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
  height: 800px;
  background: ${colors.lightgrey} center center;
  background-size: cover;
  border-radius: 5px;

  @media (max-width: 1170px) {
    margin: 25px -6vw 50px;
    border-radius: 0;
    img {
      max-width: 1170px;
    }
  }

  @media (max-width: 800px) {
    height: 400px;
  }
  @media (max-width: 500px) {
    margin-bottom: 4vw;
    height: 350px;
  }
`;

export const query = graphql`
  query ($slug: String, $primaryTag: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      htmlAst
      excerpt
      timeToRead
      frontmatter {
        title
        userDate: date(formatString: "D MMMM YYYY")
        date
        modified
        tags
        excerpt
        picture {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH)
          }
        }
        author {
          yamlId
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
    }
    relatedPosts: allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$primaryTag] }, draft: { ne: true } } }
      limit: 5
      sort: { frontmatter: { date: DESC } }
    ) {
      totalCount
      edges {
        node {
          id
          timeToRead
          excerpt
          frontmatter {
            title
            date
            modified
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default PageTemplate;
