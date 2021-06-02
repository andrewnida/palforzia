import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import Cookies from 'js-cookie'

import { UPDATE_NEED_CONSENT, UPDATE_SHOW_MODAL } from 'src/state/actionTypes'
import { CONSENT_COOKIE_ID } from 'src/constants/site'
import { useLayoutData } from 'src/hooks/useLayoutData'
import { useCheckConsentCookie } from 'src/hooks/useCheckConsentCookie'
import { useScrollLock } from 'src/hooks/useScrollLock'
import { useStateValue } from 'src/state/provider'

import SEO from './SEO'
import Header from './header/Header'
import ISI from './isi/ISI'
import ISITray from './isi/ISITray'
import Footer from './footer/Footer'
import Modal from './modal/Modal'

import Button from 'src/components/common/Button'
import Icon from 'src/components/common/Icon'

import 'src/styles/main.scss'

const Layout = ({ children }) => {
  const [{ externalLink, showOverlay, showModal }, dispatch] = useStateValue()

  const {
    header,
    footer,
    cookieConsentModal,
    externalLinkModal,
    isi,
  } = useLayoutData()

  const {
    audience,
    mobileUtilityMenu,
    utilityMenu,
    homeNavigationElement,
    headerNav,
    mobileHeaderNav,
  } = header

  const {
    footerNav,
    questions,
    brandNavigationElement,
    copyright,
    trademark,
    footerAudience,
  } = footer

  const headerRef = useRef(null)

  useCheckConsentCookie(false)
  useScrollLock(showOverlay)

  const acceptConsent = () => {
    Cookies.set(CONSENT_COOKIE_ID, true, { expires: 365 })
    dispatch({
      type: UPDATE_NEED_CONSENT,
      needConsent: false,
    })
  }

  const cancel = () => {
    dispatch({
      type: UPDATE_SHOW_MODAL,
      showModal: false,
    })
  }

  const currentModal = externalLink ? externalLinkModal : cookieConsentModal

  useEffect(() => {
    // TODO: hook in ISI scroll trigger
    // console.dir(children[children.length - 1].ref.current?.id)
  }, [children])

  return (
    <div
      className={classNames(['container'], {
        'container-overlay': showOverlay,
      })}
    >
      <SEO title={'page title'} />
      <Header ref={headerRef}>
        <Header.Audience json={audience.content?.json} />
        <Header.MobileUtilityMenu {...mobileUtilityMenu} />
        <Header.UtilityMenu {...utilityMenu} />
        <Header.Menu {...headerNav} home={homeNavigationElement}>
          <Header.MobileMenu {...mobileHeaderNav} headerRef={headerRef} />
        </Header.Menu>
      </Header>
      {children}
      <ISI {...isi} />
      <Footer>
        <Footer.Menu {...footerNav} />
        <Footer.Questions json={questions.content?.json} />
        <Footer.Home {...brandNavigationElement} />
        <Footer.Legal copyright={copyright} trademark={trademark} />
        <Footer.Audience json={footerAudience.content?.json} />
      </Footer>
      <ISITray>
        <ISI {...isi} />
      </ISITray>
      <Modal cancel={externalLink ? cancel : undefined} show={showModal}>
        <div
          id={'modal__content'}
          className={classNames(['modal__content'], {
            'u-center-text': externalLink,
            'modal__content--big-padding': externalLink,
            'modal__content--small-text': !externalLink,
          })}
        >
          {Modal.renderRichText(currentModal.content?.content?.json)}
        </div>
        <div
          className={classNames(['modal__btn-container'], {
            'modal__btn-container--alt-pad': externalLink,
          })}
        >
          <Button
            className={'btn btn--white modal__btn'}
            action={externalLink ? cancel : currentModal.defaultAction}
          >
            {currentModal.cancelLabel}
            <Icon
              name={externalLink ? 'btn-arrow' : 'btn-external'}
              className={'btn__icon'}
            />
          </Button>
          <Button
            className={'btn modal__btn'}
            action={externalLink ? externalLink : acceptConsent}
          >
            {currentModal.confirmLabel}
            <Icon
              name={externalLink ? 'btn-external' : 'btn-arrow'}
              className={'btn__icon'}
            />
          </Button>
        </div>
      </Modal>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
