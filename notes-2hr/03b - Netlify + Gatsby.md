# Netlify + Gatsby

Gatsby and Netlify work very well together, however neither requires the other.

## Gatsby + NetlifyCMS

The [top starter](https://www.gatsbyjs.org/starters/?v=2) after the official Gatsby Starter Blog is [gatsby-starter-netlify-cms](https://www.gatsbyjs.org/starters/netlify-templates/gatsby-starter-netlify-cms/), which shows how to integrate and deploy a git based CMS alongside Gatsby and edit and preview them together. You can try this yourself with a one click deploy:

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/gatsby-starter-netlify-cms&stack=cms"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

## Gatsby + Netlify Functions

Gatsby apps rehydrate into full clientside apps powered by JavaScript, and often this means needing custom APIs for proxying APIs with secrets or communicating with databases. Netlify Functions offer a trivial way to write custom APIs for exactly this purpose. A full discussion of [Turning The Static Dynamic](https://www.gatsbyjs.org/blog/2018-12-17-turning-the-static-dynamic/) is a very popular blogpost.

## Gatsby + Netlify Identity

Authentication is also a common need with Gatsby based apps and a Netlify Identity plugin is also available: http://gatsby-theme-netlify-identity.netlify.com
