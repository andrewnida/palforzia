import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import classNames from 'classnames'

import { formatHref } from 'src/utils/formatHref'

import Icon from 'src/components/common/Icon'
import ExternalLink from 'src/components/common/ExternalLink'

const MenuItem = ({ index, label, showIcon, target, useExternal }) => {
  const url = formatHref(target)

  const renderedLabel = (
    <>
      {label}
      {showIcon && useExternal && (
        <Icon
          className={'mobile-utility-menu__list__item__link-icon'}
          name={'btn-external'}
        />
      )}
    </>
  )

  const linkClassNames = classNames(['mobile-utility-menu__list__item__link'], {
    'mobile-utility-menu__list__item--secondary__link': index === 2, // Per design
  })

  return (
    <li
      className={classNames(['mobile-utility-menu__list__item'], {
        'mobile-utility-menu__list__item--secondary': index === 2, // Per design
      })}
    >
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
          target="_blank"
        >
          {renderedLabel}
        </a>
      )}
    </li>
  )
}

MenuItem.propTypes = {
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  showIcon: PropTypes.bool,
  target: PropTypes.oneOfType([
    PropTypes.shape({
      url: PropTypes.string,
    }),
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
  ]).isRequired,
  useExternal: PropTypes.bool,
}

const MobileUtilityMenu = ({ elements }) => (
  <nav aria-label="Mobile Utility Navigation" className="mobile-utility-menu">
    <ul className="mobile-utility-menu__list">
      {elements.map(({ label, showIcon, target, useExternal }, index) => (
        <MenuItem
          index={index}
          key={index}
          label={label || target.label}
          showIcon={showIcon}
          target={target}
          useExternal={useExternal}
        />
      ))}
    </ul>
  </nav>
)

MobileUtilityMenu.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      showIcon: PropTypes.bool.isRequired,
      target: PropTypes.oneOfType([
        PropTypes.shape({
          url: PropTypes.string,
          label: PropTypes.string.isRequired,
        }),
        PropTypes.shape({
          slug: PropTypes.string.isRequired,
        }),
      ]).isRequired,
      useExternal: PropTypes.bool.isRequired,
    })
  ).isRequired,
}

export default MobileUtilityMenu
