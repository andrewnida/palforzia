import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import classNames from 'classnames'
import { ScrollTrigger, gsap } from 'gsap/all'

import Icon from 'src/components/common/Icon'

gsap.registerPlugin(ScrollTrigger)

const HeaderMenu = ({ children, elements, home }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null)
  const [currentSubmenu, setCurrentSubmenu] = useState(null)

  const headerMenuRef = useRef(null)

  const reset = () => {
    setCurrentSubmenu(null)
    setActiveSubmenu(null)
  }

  const onFocus = (e) => {
    if (
      Array.prototype.indexOf.call(
        e.currentTarget.parentNode.parentNode.childNodes,
        e.currentTarget.parentNode
      ) !== activeSubmenu
    )
      setActiveSubmenu(null)

    setCurrentSubmenu(
      Array.prototype.indexOf.call(
        e.currentTarget.parentNode.parentNode.childNodes,
        e.currentTarget.parentNode
      )
    )
  }

  const onMouseOver = (e) => {
    setCurrentSubmenu(
      Array.prototype.indexOf.call(
        e.currentTarget.parentNode.parentNode.childNodes,
        e.currentTarget.parentNode
      )
    )
    setActiveSubmenu(
      Array.prototype.indexOf.call(
        e.currentTarget.parentNode.parentNode.childNodes,
        e.currentTarget.parentNode
      )
    )
  }

  const onKeyPress = (e) => {
    if (e.which === 13 && !activeSubmenu) {
      setActiveSubmenu(currentSubmenu)
    } else {
      setActiveSubmenu(null)
    }
  }

  const onBlur = (e) => {
    if (!e.relatedTarget?.className.includes('header-nav')) reset()
  }

  useEffect(() => {
    if (headerMenuRef.current?.id) {
      ScrollTrigger.create({
        trigger: `#${headerMenuRef.current?.id}`,
        pin: true,
        start: 'top top',
        pinSpacing: false,
        endTrigger: 'html',
        end: 'bottom top',
        anticipatePin: 1,
      })
    }
  }, [headerMenuRef])

  return (
    <div className={'header-menu u-full-bleed'} id={'header-menu'} ref={headerMenuRef}>
      <Link className={'header-menu__link'} to={home.target.slug}>
        <img
          alt={home.label}
          className={'header-menu__link--image'}
          src={home.image.localFile.publicURL}
        />
      </Link>
      <nav aria-label="Main Navigation" className={'header-nav'}>
        <ul className={'header-nav__list'}>
          {elements.map((item, index) => {
            const encodedLabel = item.label.replace('\\n', '\n') // replace new lines with real ones
            return (
              <li
                className={classNames(['header-nav__list__item'], {
                  'header-nav__list__item--current': index === currentSubmenu,
                  'header-nav__list__item--active': index === activeSubmenu,
                })}
                key={index}
              >
                {item.elements ? (
                  <>
                    <button
                      aria-controls={`submenu-${index}`}
                      aria-expanded={index === activeSubmenu}
                      aria-haspopup={true}
                      className={'header-nav__list__item__btn'}
                      onBlur={onBlur}
                      onFocus={onFocus}
                      onKeyPress={onKeyPress}
                      onMouseOut={reset}
                      onMouseOver={onMouseOver}
                    >
                      {encodedLabel}
                      <Icon
                        className={'header-nav__list__item__btn__icon'}
                        name={'submenu-arrow'}
                      />
                      <div className={'header-nav__list__item__container'}>
                        <ul
                          className={'header-nav__list__item__submenu'}
                          id={`submenu-${index}`}
                        >
                          {item.elements.map((item, index) => {
                            return (
                              <li
                                className={
                                  'header-nav__list__item__submenu__item'
                                }
                                key={index}
                              >
                                <Link
                                  className={
                                    'header-nav__list__item__link header-nav__list__item__submenu__item__link'
                                  }
                                  onBlur={onBlur}
                                  to={item.target.slug}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    </button>
                  </>
                ) : (
                  <Link
                    className={
                      'header-nav__list__item__link header-nav__list__item__link--underline'
                    }
                    onBlur={onBlur}
                    onFocus={onFocus}
                    to={item.target.slug}
                  >
                    {encodedLabel}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
      {children}
    </div>
  )
}

HeaderMenu.propTypes = {
  children: PropTypes.node.isRequired,
  elements: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        elements: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string.isRequired,
            target: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }).isRequired,
          })
        ).isRequired,
      }),
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        target: PropTypes.shape({
          slug: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    ])
  ).isRequired,
  home: PropTypes.shape({
    image: PropTypes.shape({
      localFile: PropTypes.shape({
        publicURL: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    target: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
}

export default HeaderMenu
