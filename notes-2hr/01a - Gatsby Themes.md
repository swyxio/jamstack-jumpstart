# Gatsby Themes

## Plugins on Steroids

Gatsby Configuration can be a pain, especially for the less technical. Gatsby Themes aim to bundle up configurations and make them installable and reusable. We'll try some Gatsby themes and see how simple it is.

> Note: Themes are [a recent addition](https://www.gatsbyjs.org/docs/themes/introduction/) to Gatsby, but backwards compatible, so Themes are exactly interchangeable with Plugins and have the same exact usage syntax. They just have extra abilities to ship UI components.

## How to install a theme

We'll try with a simple example:

```bash
npm i gatsby-theme-tyra
```

Add it as a plugin inside `gatsby-config.js`. If there are no options to pass, it is a simple string:

```js
module.exports = {
  // make sure siteMetadata has the data that your theme expects

  siteMetadata: {
    anything: 'I want',
    title: `JAMstack Jumpstart`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@swyx`,
    menuLinks: [
      {
        name: 'Home',
        slug: '/',
      },
      {
        name: 'About',
        slug: '/about/',
      },
    ],
    footerLinks: [
      {
        name: 'Gatsby',
        url: 'https://www.twitter.com/gatsbyjs',
      },
      {
        name: 'Netlify',
        url: 'https://www.twitter.com/netlify',
      },
    ],
  },
  // here is the theme
  plugins: ['gatsby-theme-amsterdam'],
}
```

However, if there are options to pass, you have to use the object syntax:

```js
// just for illustration, we won't do this right now
module.exports = {
  // ...
  plugins: [
    {
      resolve: `gatsby-theme-netlify-identity`,
      options: {
        url: `https://gatsby-theme-netlify-identity.netlify.com/`,
      },
    },
  ],
}
```

## Required Data and Content

It is left up to themes to design their developer experience, and so you will get a very widely varied experience. Many themes require `siteMetadata` in a specific format. Most themes also require you to supply content, in a configurable folder usually named `content`, and may also require you to put some sample images in the right places before they start working correctly.

This is because the community is still figuring out the right conventions for what should be provided out of the box and how to gracefully fail over. Please have patience. Look at provided demos and/or look at the theme source code to see what is going on.

For example, `gatsby-theme-amsterdam` requires `menuLinks` and `footerLinks` like we demonstrated above.

It also requires markdown and images:

[`/content/groceries`](https://github.com/ryanwiemer/gatsby-theme-amsterdam/tree/master/site/content/groceries-on-the-move):

```md
---
title: Groceries On The Move
date: '2019-07-05'
cover: 'cover.jpg'
tags: ['photography', 'cycling']
---

Vestibulum quis est iaculis, euismod lacus sit amet, tincidunt ante. Duis convallis urna tincidunt, venenatis augue ut, tincidunt est. Duis eget ornare dui. Nunc imperdiet eu nisl vel aliquet. Sed venenatis eleifend libero a pharetra. Fusce tincidunt est nunc, eget vulputate magna luctus in. Quisque id eros mollis, ullamcorper sem in, accumsan ex. Suspendisse non sollicitudin mauris. Vivamus ac arcu non lectus auctor dapibus. Phasellus nec sapien in felis aliquam hendrerit quis id erat. Aliquam tempus, magna nec viverra consectetur, leo enim mollis neque, a consectetur orci justo in magna. Nulla ullamcorper sed sem a tempus. Vivamus ut dui nec orci vestibulum maximus vitae at libero.
```

with a corresponding colocated image for `cover.jpg` (pull one from https://unsplash.com/)

## Themes to try

- `gatsby-theme-amsterdam`
  - Source: https://github.com/ryanwiemer/gatsby-starter-amsterdam
  - Demo: https://gatsby-starter-amsterdam.netlify.com/
- `emulsify-gatsby-theme-jam`
  - Source: https://github.com/fourkitchens/emulsify-gatsby-theme-jam
  - Demo: https://my-design-system-emulsify.netlify.com
- (advanced) `gatsby-theme-waves`
  - Source: https://github.com/pomber/gatsby-theme-waves
  - Demo: https://gatsby-theme-waves.netlify.com/

More themes: https://www.gatsbyjs.org/plugins/?=gatsby-theme (note: some may require more work to set up!)

## Further Reading

- [Docs](https://www.gatsbyjs.org/docs/themes/introduction/)
- [Getting Started Instructions](https://www.gatsbyjs.org/blog/2019-02-26-getting-started-with-gatsby-themes/)
- [Why Themes?](https://www.gatsbyjs.org/blog/2019-01-31-why-themes/#reach-skip-nav) ([Video](https://www.youtube.com/watch?v=wX84vXBpMR8&feature=youtu.be))
- Creating a Gatby Theme - [Egghead.io video (paid)](https://egghead.io/lessons/gatsby-creating-a-gatsby-theme-with-john-otander)
- Make your own theme: https://www.youtube.com/watch?v=1zuLpkV0jK0
