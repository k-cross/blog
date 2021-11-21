# Blog

A blog built with gatsby originally based on the casper theme.

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

## WIP

[*] update to gatsby 4
[ ] make a11y friendly
  + color themes should be modified for higher contrast for color blind
  + tab indexs should be included for all actionable content
  + aria fields and the accessibility tree modified for better navigation
  + images should have alt text
