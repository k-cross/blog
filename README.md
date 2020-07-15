# Blog

A blog built with gatsby using a modified casper theme.

## Getting Started

Clone this repo.

```
git clone https://github.com/scttcper/gatsby-casper.git --depth=1
```

Edit website-config.ts with your website settings.

## How to configure Google Analytics

Edit `gatsby-config.js` and add your tracking ID

```javascript
{
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      // Here goes your tracking ID
      trackingId: 'UA-XXXX-Y',
      // Puts tracking script in the head instead of the body
      head: true,
      // IP anonymization for GDPR compliance
      anonymize: true,
      // Disable analytics for users with `Do Not Track` enabled
      respectDNT: true,
      // Avoids sending pageview hits from custom paths
      exclude: ['/preview/**'],
      // Specifies what percentage of users should be tracked
      sampleRate: 100,
      // Determines how often site speed tracking beacons will be sent
      siteSpeedSampleRate: 10,
    },
},
```

## How to adjust pagination

In `gatsby-node.js`, edit the `postsPerPage` constant. The default value is
six posts per page.
