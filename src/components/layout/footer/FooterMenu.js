import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { formatHref } from 'src/utils/formatHref'

import ExternalLink from 'src/components/common/ExternalLink'
import Icon from 'src/components/common/Icon'

const FooterMenu = ({ elements }) => (
  <nav className={'footer-menu'}>
    <ul className={'footer-menu__list'}>
      {elements.map(({ label, showIcon, target, useExternal }, index) => {
        const renderedLabel = (
          <>
            {showIcon && target.telephone && (
              <Icon
                className={'footer-menu__list__item__link__icon'}
                name={'btn-phone'}
              />
            )}
            {label || target.label}
          </>
        )

        const linkClassNames = 'footer-menu__list__item__link'

        const url = formatHref(target)

        return (
          <li className={'footer-menu__list__item'} key={index}>
            {useExternal ? (
              <ExternalLink className={linkClassNames} url={url}>
                {renderedLabel}
              </ExternalLink>
            ) : target.slug ? (
              <Link className={linkClassNames} to={url}>
                {renderedLabel}
              </Link>
            ) : (
              <a
                className={linkClassNames}
                href={url}
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
  </nav>
)

FooterMenu.propTypes = {
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
    }).isRequired
  ).isRequired,
}

export default FooterMenu
