import { useStaticQuery, graphql } from 'gatsby'

export const useLayoutData = () => {
  const {
    headerAssembly,
    footerAssembly,
    cookieConsentModal,
    externalLinkModal,
    isi,
  } = useStaticQuery(graphql`
    query {
      headerAssembly: contentfulEvergreenAssembly(client_id: { eq: "Header" }) {
        ...EvergreenFragment
      }
      footerAssembly: contentfulEvergreenAssembly(client_id: { eq: "Footer" }) {
        ...EvergreenFragment
      }
      cookieConsentModal: contentfulModalAssembly(
        client_id: { eq: "Consent Gate" }
      ) {
        ...ModalFragment
      }
      externalLinkModal: contentfulModalAssembly(
        client_id: { eq: "External Link Gate" }
      ) {
        ...ModalFragment
      }
      isi: contentfulIsiAssembly(client_id: { eq: "ISI" }) {
        client_id
        header
        content {
          ...RichTopicFragment
        }
      }
    }
  `)

  // Header
  const audience = headerAssembly.content?.find(
    ({ client_id }) => client_id === 'Audience'
  )

  const utilityMenu = headerAssembly.content?.find(
    ({ client_id }) => client_id === 'Utility'
  )

  const mobileUtilityMenu = headerAssembly.content?.find(
    ({ client_id }) => client_id === 'Mobile Utility'
  )

  const homeNavigationElement = headerAssembly.content?.find(
    ({ client_id }) => client_id === 'Home'
  )

  const headerNav = headerAssembly.content?.find(
    ({ client_id }) => client_id === 'Header'
  )

  const mobileHeaderNav = headerAssembly.content?.find(
    ({ client_id }) => client_id === 'Mobile Header'
  )

  // Footer
  const footerNav = footerAssembly.content?.find(
    ({ client_id }) => client_id === 'Footer'
  )

  const questions = footerAssembly.content?.find(
    ({ client_id }) => client_id === 'Footer > Questions'
  )

  const brandNavigationElement = footerAssembly.content?.find(
    ({ client_id }) => client_id === 'Aimmune Logo'
  )

  const copyright = footerAssembly.content?.find(
    ({ client_id }) => client_id === 'Footer > Copyright'
  )

  const trademark = footerAssembly.content?.find(
    ({ client_id }) => client_id === 'Footer > Trademark'
  )

  const footerAudience = footerAssembly.content?.find(
    ({ client_id }) => client_id === 'Audience'
  )

  return {
    header: {
      audience,
      utilityMenu,
      mobileUtilityMenu,
      homeNavigationElement,
      headerNav,
      mobileHeaderNav,
    },
    footer: {
      footerNav,
      questions,
      brandNavigationElement,
      copyright,
      trademark,
      footerAudience,
    },
    cookieConsentModal,
    externalLinkModal,
    isi,
  }
}
