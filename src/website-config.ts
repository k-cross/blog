export interface WebsiteConfig {
  title: string;
  description: string;
  coverImage?: string;
  /**
   * Specifying a valid BCP 47 language helps screen readers announce text properly.
   * See: https://dequeuniversity.com/rules/axe/2.2/valid-lang
   */
  lang: string;
  /**
   * blog full path, no ending slash!
   */
  siteUrl: string;
  /**
   * full url, no username
   */
  twitter?: string;
  /**
   * Meta tag for Google Webmaster Tools
   */
  googleSiteVerification?: string;
}

const config: WebsiteConfig = {
  title: 'Ken Cross',
  coverImage: 'img/blog-cover.png',
  lang: 'en',
  siteUrl: 'https://k-cross.github.io',
  twitter: 'https://twitter.com/quasarken',
  googleSiteVerification: 'GoogleCode',
};

export default config;
