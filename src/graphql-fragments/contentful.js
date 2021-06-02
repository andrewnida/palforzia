import { graphql } from 'gatsby'

export const topic = graphql`
  fragment TopicFragment on ContentfulTopic {
    id
    client_id
    text: content
  }
`
export const richTopic = graphql`
  fragment RichTopicFragment on ContentfulRichTopic {
    id
    client_id
    content {
      json
    }
  }
`

export const menu = graphql`
  fragment MenuFragment on ContentfulMenu {
    id
    client_id
    elements {
      ...NavigationElementFragment
      ...SubmenuElementFragment
      ...SubmenuFragment
    }
    defaultLabel
    activeLabel
  }
`

export const submenu = graphql`
  fragment SubmenuFragment on ContentfulMenu {
    id
    client_id
    elements {
      ...NavigationElementFragment
    }
  }
`

export const navigationElement = graphql`
  fragment NavigationElementFragment on ContentfulNavigationElement {
    id
    client_id
    useExternal
    showIcon
    label
    target {
      ...ActionFragment
      ...PageFragment
    }
    section {
      id
    }
    image {
      localFile {
        publicURL
      }
    }
  }
`

export const submenuElement = graphql`
  fragment SubmenuElementFragment on ContentfulSubmenuElement {
    label
    elements {
      ...NavigationElementFragment
    }
  }
`

export const action = graphql`
  fragment ActionFragment on ContentfulAction {
    id
    client_id
    label
    url
    telephone
    email
  }
`

export const page = graphql`
  fragment PageFragment on ContentfulPage {
    id
    client_id
    slug
  }
`

export const basicSection = graphql`
  fragment BasicSectionFragment on ContentfulBasicSection {
    id
    client_id
    header {
      ...TopicFragment
    }
    content {
      ...TopicFragment
      ...NavigationElementFragment
    }
  }
`

export const modal = graphql`
  fragment ModalFragment on ContentfulModalAssembly {
    id
    client_id
    content {
      ...RichTopicFragment
    }
    confirmLabel
    cancelLabel
    defaultAction {
      ...ActionFragment
    }
  }
`

export const evergreen = graphql`
  fragment EvergreenFragment on ContentfulEvergreenAssembly {
    id
    client_id
    content {
      ...MenuFragment
      ...RichTopicFragment
      ...NavigationElementFragment
      ...TopicFragment
    }
  }
`
