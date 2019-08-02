# Intro to JAMstack

The JAMstack is a modern web architecture: helping people create fast and secure sites and dynamic apps with JavaScript, APIs, and prerendered Markup, served without web servers.

## First things first

Kick off a build while we talk

- Click to deploy [Dimension Starter](https://console.aws.amazon.com/amplify/home?region=us-east-1#/deploy?repo=https://github.com/codebushi/gatsby-starter-dimension)
- Click to deploy [Overreacted.io](https://console.aws.amazon.com/amplify/home?region=us-east-1#/deploy?repo=https://github.com/gaearon/overreacted.io)
- Click to deploy [lengstorf.com](https://console.aws.amazon.com/amplify/home?region=us-east-1#/deploy?repo=https://github.com/jlengstorf/lengstorf.com)
- Click to deploy [React docs](https://console.aws.amazon.com/amplify/home?region=us-east-1#/deploy?repo=https://github.com/reactjs/reactjs.org)
- Fork and Deploy [Hero Blog Starter](https://github.com/greglobinski/gatsby-starter-hero-blog)

## Why now?

JAMstack combines several trends and best practices:

- Git based workflow
- Build Tools (e.g. Webpack, Babel, TypeScript) in JS
- Serverless Functions
- API Economy
- Next Generation Static Site Generators

JAMstack has a strong opinion on static assets, but uses modern JavaScript and API's to achieve dynamic behavior, the same as mobile apps. No one thinks of mobile apps as "static" but they are indeed static assets! Indeed these are good usecases for JAMstack:

- Blogs like [Smashing Magazine](https://www.netlify.com/blog/2017/03/16/smashing-magazine-just-got-10x-faster/)
- Marketing sites like [Netlify.com](http://netlify.com)
- Ecommerce sites like https://store.gatsbyjs.org/
- Authenticated apps with serverless functions and databases like https://app.netlify.com

These usecases are more difficult with JAMstack:

- Rapidly updating prerendered content
- Server Session based authenticated apps

Projects made with these are JAMstack:

- `create-react-app`
- Gatsby
- React-Static
- Next/Nuxt (static export mode)
- Vue CLI
- Hugo
- Jekyll
- Eleventy
- (and many more)

Projects made with these are _not_ JAMstack:

- Squarespace
- Wordpress
- Drupal (unless used headlessly)
- other server-run web apps

We'll explain more in the workshop live, but you can get more information here:

- http://jamstack.org
- Mathias (Netlify Founder)'s talk: [The New Front End Stack](https://vimeo.com/163522126)
- Swyx's talk: [JAMStack - The Total Victory of JavaScript](https://www.youtube.com/watch?v=vOUcPI2mljU)
- Chris Coyier's talk: [The All Powerful Frontend Developer](https://www.youtube.com/watch?v=grSxHfGoaeg)
- Chris Coyier on CSS Tricks: [JAMstack? More like SHAMstack](https://css-tricks.com/jamstack-more-like-shamstack/)
- [a16z on Netlify and JAMstack](https://www.netlify.com/blog/2017/08/09/netlify-raises-12m-from-a16z/)
- [CRV's JAMstack Landscape](https://medium.com/crv-insights/the-jamstack-startup-landscape-c06cc3cdb917)

## Homework

- Fork and Deploy [Ecommerce example](https://console.aws.amazon.com/amplify/home?region=us-east-1#/deploy?repo=https://github.com/parmsang/gatsby-starter-ecommerce) (currently has some bugs, beware/figure it out!)
- Fork and deploy [Gatsby Contentful Starter](https://github.com/contentful-userland/gatsby-contentful-starter)
- Click to deploy [Gatsby Shopify Starter](https://app.netlify.com/start/deploy?repository=https://github.com/AlexanderProd/gatsby-shopify-starter)
