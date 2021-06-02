import React from 'react'
import { graphql } from 'gatsby'

import { StateProvider } from 'src/state/provider'
import { reducer, initialState } from 'src/state/reducer'
import { BASIC_SECTION } from 'src/constants/contentfulTypes'

import Layout from 'src/components/layout/Layout'
import PageHeader from 'src/components/common/PageHeader'
import ServerMessage from 'src/components/common/ServerMessage'

import 'src/styles/pages/404.scss'

const NotFound = ({ data }) => {
  const { page } = data
  const { header, content } = page

  const serverMessage = content.find(
    ({ __typename }) => __typename === BASIC_SECTION
  )

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Layout>
        {header && <PageHeader {...header} />}
        {serverMessage && (
          <ServerMessage
            className={'server-message--wide'}
            {...serverMessage}
          />
        )}
      </Layout>
    </StateProvider>
  )
}

export default NotFound

export const query = graphql`
  query {
    page: contentfulPage(client_id: { eq: "404" }) {
      client_id
      slug
      header {
        ...TopicFragment
      }
      content {
        ...BasicSectionFragment
      }
    }
  }
`
