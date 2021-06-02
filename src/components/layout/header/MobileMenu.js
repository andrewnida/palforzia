import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import classNames from 'classnames'

import {
  NAVIGATION_ELEMENT,
  SUBMENU_ELEMENT,
  MENU,
} from 'src/constants/contentfulTypes'
import { useScrollLock } from 'src/hooks/useScrollLock'
import { useWindowResize } from 'src/hooks/useWindowResize'
import { formatHref } from 'src/utils/formatHref'

import ExternalLink from 'src/components/common/ExternalLink'
import Icon from 'src/components/common/Icon'

const HamburgerButton = ({ expanded, label, setExpanded }) => (
  <button
    aria-controls={`mobile-menu__container`}
    aria-expanded={expanded}
    aria-haspopup={true}
    className={classNames(['mobile-menu__btn'], {
      'mobile-menu__btn--expanded': expanded,
    })}
    onClick={() => setExpanded(!expanded)}
  >
    <span className="mobile-menu__btn__srOnly">{'Toggle Navigation'}</span>
    <span className="mobile-menu__btn__bar"></span>
    <span className="mobile-menu__btn__bar"></span>
    <span className="mobile-menu__btn__bar"></span>
    <span className="mobile-menu__btn__label">{label}</span>
  </button>
)

const NavigationElement = ({ label, onBlur, target }) => (
  <li className={'mobile-menu__list__item'}>
    <Link
      className={'mobile-menu__list__item__link'}
      onBlur={onBlur}
      to={formatHref(target)}
    >
      {label.replace('\\n', '\n')}
    </Link>
  </li>
)

const SubmenuElement = ({ elements, label: itemLabel, onBlur }) => (
  <>
    {elements.map(({ label, target }, index) => {
      return (
        <li key={index} className={'mobile-menu__list__item'}>
          <Link
            className={'mobile-menu__list__item__link'}
            onBlur={onBlur}
            to={formatHref(target)}
          >
            {itemLabel && `${itemLabel?.replace('\\n', '\n')}:  `}
            {label.replace('\\n', '\n')}
          </Link>
        </li>
      )
    })}
  </>
)

const UtilityMenu = ({ elements, onBlur }) => (
  <ul className={'mobile-menu__utility'}>
    {elements.map((item, index) => {
      const { showIcon, target, useExternal } = item

      const label = item.label ? item.label : target.label
      const url = formatHref(target)

      const renderedLabel = (
        <>
          {target.telephone && (
            <Icon className={'btn__icon--phone'} name={'btn-phone'} />
          )}
          {label}
          {showIcon && useExternal && !target.telephone && (
            <Icon className={'btn__icon--utility'} name={'btn-external'} />
          )}
        </>
      )

      return (
        <li className={'mobile-menu__utility__item'} key={index}>
          {useExternal ? (
            <ExternalLink
              className={
                'mobile-menu__list__item__link mobile-menu__utility__item__link'
              }
              onBlur={onBlur}
              url={url}
            >
              {renderedLabel}
            </ExternalLink>
          ) : target.slug ? (
            <Link
              className={
                'mobile-menu__list__item__link mobile-menu__utility__item__link'
              }
              onBlur={onBlur}
              to={url}
            >
              {renderedLabel}
            </Link>
          ) : (
            <a
              className={classNames(
                [
                  'mobile-menu__list__item__link mobile-menu__utility__item__link',
                ],
                { 'mobile-menu__utility__item__link--phone': target.telephone }
              )}
              href={url}
              onBlur={onBlur}
              rel="noopener noreferrer"
              target={target.telephone ? '_self' : '_blank'}
            >
              {renderedLabel}
            </a>
          )}
        </li>
      )
    })}
  </ul>
)

const MobileMenu = ({ activeLabel, defaultLabel, elements, headerRef }) => {
  const utilityMenu = elements.find((element) => element.__typename === MENU)
  const menuContainerRef = useRef(null)

  const [expanded, setExpanded] = useState(false)
  const [menuHeight, setMenuHeight] = useState()

  const { width } = useWindowResize()

  const onBlur = (e) => {
    if (!e.relatedTarget?.className.includes('mobile-menu__list__item__link'))
      setExpanded(false)
  }

  useEffect(() => {
    setMenuHeight(headerRef.current?.clientHeight - window.scrollY)
  }, [headerRef, setMenuHeight, expanded])

  useEffect(() => {
    setExpanded(false)
  }, [width])

  useEffect(() => {
    if (expanded) {
      menuContainerRef.current.scrollTop = 0
    }
  }, [expanded])

  useScrollLock(expanded)

  return (
    <nav aria-label={'Main Mobile Navigation'} className={'mobile-menu'}>
      <HamburgerButton
        expanded={expanded}
        label={expanded ? activeLabel : defaultLabel}
        setExpanded={setExpanded}
      />
      <aside
        className={classNames(['mobile-menu__container'], {
          'mobile-menu__container--expanded': expanded,
        })}
        id="mobile-menu__container"
        ref={menuContainerRef}
        style={{
          height: `calc(100vh - ${menuHeight}px)`,
        }}
      >
        <ul className={'mobile-menu__list'}>
          {elements.map((item, index) => {
            switch (item.__typename) {
              case NAVIGATION_ELEMENT:
                return (
                  <NavigationElement {...item} key={index} onBlur={onBlur} />
                )
              case SUBMENU_ELEMENT:
                return <SubmenuElement {...item} key={index} onBlur={onBlur} />
              default:
                break
            }
            return null
          })}
        </ul>
        {utilityMenu && <UtilityMenu {...utilityMenu} onBlur={onBlur} />}
      </aside>
    </nav>
  )
}

MobileMenu.propTypes = {
  activeLabel: PropTypes.string.isRequired,
  defaultLabel: PropTypes.string.isRequired,
  elements: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        label: PropTypes.string,
        elements: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            target: PropTypes.oneOfType([
              PropTypes.shape({
                slug: PropTypes.string.isRequired,
              }),
              PropTypes.shape({
                telephone: PropTypes.string.isRequired,
              }),
              PropTypes.shape({
                url: PropTypes.string.isRequired,
              }),
            ]).isRequired,
          })
        ).isRequired,
      }),
      PropTypes.shape({
        label: PropTypes.string,
        target: PropTypes.oneOfType([
          PropTypes.shape({
            slug: PropTypes.string.isRequired,
          }),
          PropTypes.shape({
            telephone: PropTypes.string.isRequired,
          }),
          PropTypes.shape({
            url: PropTypes.string.isRequired,
          }),
        ]).isRequired,
      }).isRequired,
    ])
  ).isRequired,
  headerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
}

export default MobileMenu
