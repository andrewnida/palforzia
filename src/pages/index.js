import React, {useRef} from 'react'

import { StateProvider } from 'src/state/provider'
import { reducer, initialState } from 'src/state/reducer'

import Layout from 'src/components/layout/Layout'
import PageHeader from 'src/components/common/PageHeader'
import Icon from 'src/components/common/Icon'

import 'src/styles/pages/index.scss'

const Index = () => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Layout>
        <PageHeader text={'Page Header'} />
        <section ref={useRef(null)} id="content" className={'section-container'}>
          <br></br>
          <br></br>
          <br></br>
          <aside className={'blockquote'}>
            <h3 className={'blockquote__heading'}>
              An Aimmune Practice Account Manager can help provide in-service
              education and information to safely implement{' '}
              <a href="#start">PALFORZIA REMS Website</a> into your practice.
            </h3>
          </aside>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <a href="#test" className={'btn btn--white'}>
            Get in Touch
            <Icon name={'btn-download'} className={'btn__icon'} />
          </a>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <section className={'cta-callout u-full-bleed'}>
            <h3 className={'cta-callout__heading'}>
              An Aimmune Practice Account Manager can help provide in-service
              education and information to safely implement PALFORZIA into your
              practice.
            </h3>
            <a href="/about/#test" className={'btn cta-callout__cta'}>
              Get in Touch
              <Icon
                name={'btn-arrow'}
                className={'btn__icon btn__icon--arrow'}
              />
            </a>
          </section>
        </section>
          
      </Layout>
    </StateProvider>
  )
}

export default Index
