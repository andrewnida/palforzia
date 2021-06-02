import { graphql, useStaticQuery } from 'gatsby'

export const useContentfulImage = (assetUrl) => {
  const { allContentfulAsset } = useStaticQuery(
    graphql`
      query CONTENTFUL_IMAGE_QUERY {
        allContentfulAsset {
          nodes {
            file {
              url
            }
            title
            localFile {
              publicURL
            }
            fluid(maxWidth: 1440, quality: 85) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    `
  )

  return allContentfulAsset.nodes.find((n) => n.file.url === assetUrl)
}
