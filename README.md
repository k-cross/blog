# Blog

A blog built with gatsby originally based on the casper theme.

## How to configure Google Analytics

Edit `gatsby-config.js` and add your tracking ID

```javascript
{
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [
          'UA-XXXXXXX',
        ],
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
          exclude: ['/preview/**'],
        },
      },
},
```

## How to configure mermaid graphs

Edit `gatsby-config.js` and add `gatsby-remark-mermaid` to the `plugins` array in `gatsby-transformer-remark`.

```javascript
{
  resolve: 'gatsby-remark-mermaid',
  options: /** @type {import('gatsby-remark-mermaid').Options} */ ({
    mermaidConfig: {
      theme: 'neutral',
      themeCSS: '.node rect { fill: #fff; }'
    }
  })
}
```

## How to adjust pagination

In `gatsby-node.js`, edit the `postsPerPage` constant. The default value is
six posts per page.

## WIP

[ ] make a11y friendly
  + color themes should be modified for higher contrast
  + images should have alt text
