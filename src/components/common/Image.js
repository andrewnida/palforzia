import React from 'react'
import GatsbyImage from 'gatsby-image'

import { useContentfulImage } from 'src/hooks/useContentfulImage'

export default ({ node, ...props }) => {
  let publicURL = node.localFile?.publicURL

  if (node.data.target.fields.file.url) {
    const contentfulImage = useContentfulImage(node.data.target.fields.file.url)

    return contentfulImage.fluid ? (
      <GatsbyImage
        alt={contentfulImage.title}
        fluid={contentfulImage.fluid}
        {...props}
      />
    ) : (
      <img
        alt={contentfulImage.title}
        src={contentfulImage.localFile?.publicURL}
        {...props}
      />
    )
  }

  if (node.childImageSharp && node.childImageSharp.fluid) {
    return <GatsbyImage fluid={node.childImageSharp.fluid} {...props} />
  }

  if (node.childImageSharp && node.childImageSharp.fixed) {
    return <GatsbyImage fixed={node.childImageSharp.fixed} {...props} />
  }

  return <img alt={node.title} src={publicURL} {...props} />
}
