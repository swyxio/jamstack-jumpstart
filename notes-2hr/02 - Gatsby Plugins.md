# Gatsby Plugins

> This is the hardest part of Gatsby - It is OK to feel lost! Just be patient and ask a lot of questions.

> First, we will do some reading and theory, and then practice in a couple of exercises. Have patience.

You will set up Gatsby Plugins in the plugins field in `gatsby-config.js`:

```js
// gatsby-config.js
module.exports = {
  siteMetadata: {
    // you already know this part
  },
  plugins: [
    // your list of plugins here!
    //
    // plugin without options looks like:
    // "gatsby-plugin-here"
    //
    // plugin with options looks like:
    //
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: path.join(__dirname, `src`, `images`),
    //   },
    // },
    // yes it looks ugly but it gives plugin authors and users a lot of power
  ]
}
```

You can search the almost 1000 available plugins in [the Gatsby Plugin Library](https://www.gatsbyjs.org/plugins/) and [read the Plugin docs here](https://www.gatsbyjs.org/docs/plugins/).

## Styling

All forms of styling methods are supported (regular CSS, CSS modules, SASS/LESS, etc) but we will just focus on `styled-components` here.

```js
import styled from "styled-components"

const CardStyles = styled.div`
  padding: 10px;
  background: green;
  h2 {
    font-size: 20px;
  }
  p {
    font-style: italic;
  }
  img {
    float: left;
  }
`
```

When we run this we get a Flash of Unstyled Content, because we are waiting for the JS to parse before we can display the styles. To address this, we need to add [`gatsby-plugin-styled-components`](https://www.gatsbyjs.org/packages/gatsby-plugin-styled-components/?=styled).

## Source plugins

At its base, you could just have a Gatsby site that has static pages. But, you likely have data that needs to be pulled in to populate the site.

Data can come from anywhere:

- Raw Data: _REST APIs, CSV, etc_...
- Headless CMS: _WordPress, Netlify CMS, Contentful, Sanity, Prismic_...
- Files: _Markdown, txt. etc_...

Since Gatsby is generated at build time, the data isn't loaded _when the user loads the page_. The data is loaded _when you generate the page_. The benefit is that it's super fast for users, but the downside is that you need to have all your data at build time.

So&mdash;once you have your data&mdash;how do you get it into Gatsby? Answer: via _Source plugins_. There are dozens of source plugins available for your data type.

Once this data is available from sources, you can also _transform_ it: _e.g. transforming markdown to HTML, compressing images, generating offline views, making an RSS feed..., you name it_!

Finally all this data is made available to your website via a single GraphQL API. We can write queries to pull this data into our site, which will then turn static during the build.

> The first and most important source plugin to know is `gatsby-source-filesystem`. You'll use it to tell Gatsby to parse an entire folder of source files.

## Exercise: Add the `/content` folder

> Big picture: we are going to generate new pages in Gatsby by adding Markdown files, instead of adding JS files!

[Read the docs for `gatsby-source-filesystem`](https://www.gatsbyjs.org/docs/sourcing-from-the-filesystem/).

```js
// gatsby-config.js
module.exports = {
  // ...
  plugins: [
    {
      resolve: `gatsby-source-filesystem`, // make sure it is installed!
      options: {
        name: `content`,
        path: `${__dirname}/content`
      }
    }
  ]
}
```

Now you can see your markdown files in GraphiQL! http://localhost:8000/__graphql

## Transformer plugins

However, how do you teach Gatsby to _read_ your markdown files? With `gatsby-transformer-remark`!

```js
// gatsby-config.js
module.exports = {
  // ...
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`
      }
    },
    `gatsby-transformer-remark` // new
  ]
}
```

Now rerun GraphiQL. See the new Markdown nodes?

> Tip: gatsby-transformer-remark is a HUGE plugin, it even has it's own plugins! [Check out the remark ecosystem in the Plugin Library.](https://www.gatsbyjs.org/plugins/?=remark)

## Programmatically creating pages

This has two steps:

- first, define a template to render your markdown data with.
- second, pass the data through the template with the `createPages` API!

Here's a sample template you can use:

```js
// src/templates/pageTemplate.js
import React from "react"
import { graphql } from "gatsby"

export default function Template({
  data // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
```

Now head to `gatsby-node.js` to connect the data with your templates!

> Note: this is the hardest part - be careful and [study the Gatsby Node docs](https://www.gatsbyjs.org/docs/node-apis/) if you get stuck! Using [the helpers](https://www.gatsbyjs.org/docs/node-api-helpers/) can be very.. helpful for repetitive stuff.

```js
// gatsby-node.js
const path = require(`path`)

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const pageTemplate = path.resolve(`src/templates/pageTemplate.js`)

  return graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.slug,
        component: pageTemplate,
        context: {}
      })
    })
  })
}
```

## Exercises

1. Try adding `gatsby-remark-oembed` and embedding Tweets in your markdown! https://www.gatsbyjs.org/packages/@raae/gatsby-remark-oembed/?=oembed See [instructions](https://paper.dropbox.com/doc/7-Plugging-In-Third-Party-Services--AfA2muEZfpSlGd3LiB62zyIQAg-4m0smdgjiMo2ds4HleEFR) if you get stuck.
