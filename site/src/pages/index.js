import React from "react"

import { graphql, useStaticQuery } from "gatsby"

export default function() {
  const data = useStaticQuery(graphql`
    query SiteData {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <div>
      page one <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
