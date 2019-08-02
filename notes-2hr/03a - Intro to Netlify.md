# Intro to Netlify

## Brief History

Netlify was founded in 2014 as BitBalloon, a drag-and-drop static site host. As [static site generators grew in popularity](https://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/), the company started adding build services and built in increasingly more CDN-like features like configurable redirects and headers. It also added Continuous Deployment, Deploy Previews, and Split Testing, all based on Git workflow.

Other built-in services have also been added over time. [Form handling](https://www.netlify.com/docs/form-handling/) was added almost from the start.

In 2017 it introduced [Netlify Identity](https://www.netlify.com/blog/2017/09/07/introducing-built-in-identity-service-to-streamline-user-management/) for user authentication.

In 2018 it added the ability to [serve AWS Lambda functions](https://www.netlify.com/docs/functions/) with the same minimal config developer experience as the rest of Netlify.

In 2019 to date it has added local development and testing tools with [Netlify Dev](https://github.com/netlify/netlify-dev-plugin/), as well as [server-side analytics](https://www.netlify.com/blog/2019/07/10/netlify-analytics---accurate-insights-without-performance-impacts/).

## Where are we now?

Netlify now exists entirely to serve the growing JAMstack category. A core principle of the platform is simplicity arising from the static asset serving model, but also technology agnosticism with regards to static site generator technologies. Therefore, sites based on Go to Ruby to Python to JS are all supported, as long as they build to static artefacts.

Netlify heavily dogfoods. `app.netlify.com` is run on Netlify and we will see an example of how to make changes and preview them.

## NetlifyCMS vs Netlify

There is also an open source project called [NetlifyCMS](http://netlifycms.org), supported by but independently operated from Netlify, which offers a git-based, markdown based CMS solution that doesn't require a running/third party server. It doesn't require Netlify, nor does Netlify require it.
