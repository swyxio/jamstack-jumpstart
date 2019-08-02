# Intro to Gatsby

## Gatsby 101

So, what is Gatsby? It's a framework for creating websites with `React`. Gatsby is considered a "_static site generator_" which means that before you put your website up online, you run a build command that will compile your website into a set of HTML, CSS and JS (React) files.

This makes your website extremely fast. But Gatsby isn't _just_ another static site gen; it's much more than that.

Gatsby makes it easy to build a website with all of today's best practices at the forefront, _not_ an after thought. This includes code splitting, pre-loaded routes, image loading and compression, offline ready and so much more. Along with amazing user experiences, the Gatsby developer experience is fast, hot-reloaded and easily deployable.

## What are examples of Gatsby Sites?

- https://www.gatsbyjs.org/showcase/
- Blog: https://overreacted.io
- Open Source: https://reactjs.org
- Ecommerce: https://www.shopflamingo.com/
- Marketing: https://2018.stateofeuropeantech.com/
- Brand: https://impossiblefoods.com
- Docs: https://docs.ghost.org

### From Scratch

```bash
mkdir mynewblog
cd mynewblog
npm init -y # creates a package.json with default settings
npm i gatsby react react-dom
```

We now have all we need to set up a very basic statically rendered site. We'll want to run this in local development though, so let's add some npm scripts:

```js
// package.json
"scripts": {
  "start": "gatsby develop",
  "build": "gatsby build"
},
```

and we can now add our first page: `src/pages/index.js`:

```js
// src/pages/index.js
import React from 'react'

export default function() {
  return (
    <div>
      <h1>My New Blog | About</h1>
      <p>Hello Gatsby</p>
    </div>
  )
}
```

Run `yarn start` and you'll see your first Gatsby page on `http://localhost:8000`! 🎉

We'll discuss what `src/pages/index.js` means next.

### Pages + Routing

At its core, Gatsby has pages. You know what pages are, right? Want a page called `/about`? Make an `about.js` and export a React component.

Gatsby also includes a Router, which by using their `<Link to="/about">About</Link>` component, will allow you to both pre-load that page as well as use HTML5 pushstate to change the page without a browser reload.

Gatsby also includes a set of APIs for dynamically creating pages; more soon.

## Exercise: Creating Pages

So, let's make sure we have things up and running!

Let's make a new page called `about.js`. This just needs to default export a React component (any type will do)!

```js
// about.js
import React from 'react'
import { Link } from 'gatsby'

export default function AboutPage(props) {
  return (
    <div>
      <h1>My New Blog | About</h1>
      <p>I am the about page.</p>
      <Link to="/">To Home Page</Link>
    </div>
  )
}
```

Now you can see your page at `localhost:8000/about`.

> Tip: What if someone typo's your url? In development, Gatsby provides you a default 404 page, but you can also make a `src/pages/404.js` custom 404 page.

## GraphiQL and Site Metadata

In the root of your project, add a `gatsby-config.js` file. We will use this for configuring all our data sources and plugins in the future, but for now, we can also store site metadata.

```js
// gatsby-config.js

module.exports = {
  siteMetadata: {
    anything: 'I want',
    title: `JAMstack Jumpstart`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@swyx`,
  },
  plugins: [], // not technically required, but every site will probably have a few
}
```

On most sites, we would just import this config and be done with it. But because Gatsby is a static site generator, Gatsby needs to be aware of the the data.

Restart your application (`Ctrl + C` && `npm start`) and then open up the Graphiql interface at http://localhost:8000/__graphql

We can run queries in this playground to see this data:

```graphql
query {
  site {
    siteMetadata {
      title
      anything
    }
  }
}
```

Now how do we get this data into our pages?

Queries!

There are two types of queries in Gatsby

1. **Page queries**: can be _dynamic_ but can _only be done inside a page_
2. **Static Queries**: can be _done anywhere_, but have the limitation of _not being dynamic_. More on this when we hit images!

To perform a query inside a component, first import a few things inside of `index.js`:

```js
// index.js

import { graphql, useStaticQuery } from 'gatsby'
```

and then inside our component, just before the return, we can run the query:

```js
const data = useStaticQuery(graphql`
  query SiteData {
    site {
      siteMetadata {
        title
      }
    }
  }
`)
```

We can then swap out that hard coded h1 with this:

```js
<h1>{data.site.siteMetadata.title}</h1>
```

> Tip: For older version of React and Gatsby, there is also a <StaticQuery> render prop component to do the same thing. But there's no reason to use it if you can `useStaticQuery` 😎

## <Link> and Static Routing

Next, we have Routing.

We have two pages: `/` and `/about`.

We won't do it today, but know that you can make a reusable Nav component which we can inject into our pages:

```js
// src/components/layout.js

import React from 'react'
import { Link } from 'gatsby'

export default function Layout({ children }) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  )
}
```

Import this into both your pages and wrap the Layout around them:

```js
// index.js

import Layout from '../components/layout'
// ...
export default function HomePage() {
  return (
    <Layout>
      <h1>My New Blog | About</h1>
      <p>Hello Gatsby</p>
    </Layout>
  )
}
```

Now you can click around your nav like a regular single page app.

Gatsby Link component is the most common way to move from one page to another. It accepts a few props including `to`, `activeClassName` and `activeStyle`.

[Take a look at the docs](https://www.gatsbyjs.org/docs/linking-between-pages/) and answer a few questions:

- How to I programmatically change pages?
- how do I style the active page?
- How do I pass state from one page to another?

## Exercise

1. Make two more pages: a 404 page, and one other page
1. Make a footer component with your name and the current year in it.
1. Style the current page to be coloured differently
1. Extract your Nav to be a reusable component
1. Figure out how to do animated page transitions
1. (Advanced) [Learn more about dynamic routing](https://www.gatsbyjs.org/blog/2018-12-17-turning-the-static-dynamic/)

## Bonus: SEO

Great SEO is a fantastic reason to adopt Gatsby. Nothing is friendlier to search engines than fast, pregenerated HTML. To give the right metadata for each page, we use [`react-helmet`](https://npm.im/react-helmet).

The default Gatsby template provides an `SEO` element you can use, so just go ahead and import it (see below for code) and specify your page title:

```js
// index.js
import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
```

Feel free to read the docs of `react-helmet` and study the source code of `SEO` to see how it works:

```js
/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

export default SEO({ description = '', lang = 'en', meta = [], title = '' }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}
```
