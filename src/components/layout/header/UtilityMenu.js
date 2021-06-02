import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from 'src/components/common/Button'
import Icon from 'src/components/common/Icon'

const MenuItem = ({ index, label, showIcon, target, useExternal }) => {
  const renderedLabel = (
    <>
      {label}
      {showIcon && (
        <Icon
          name={useExternal ? 'btn-external' : 'btn-arrow'}
          className={'btn__icon'}
        />
      )}
    </>
  )

  const linkClassNames = classNames([], {
    btn: showIcon,
    'btn--small': showIcon,
    'btn--primary': index === 4, // Per design
    'utility-menu__list__item__link': !showIcon,
  })

  return (
    <li
      className={classNames(['utility-menu__list__item'], {
        'utility-menu__list__item--btn': showIcon,
      })}
    >
      <Button
        useExternal={useExternal}
        className={linkClassNames}
        action={target}
      >
        {renderedLabel}
      </Button>
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

const UtilityMenu = ({ elements }) => {
  return (
    <nav aria-label="Utility Navigation" className="utility-menu u-full-bleed">
      <ul className="utility-menu__list">
        {elements
          .filter(({ target }) => target.telephone === null || target.slug) // Filter all but telephone actions
          .map(({ label, showIcon, target, useExternal }, index) => (
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
}

UtilityMenu.propTypes = {
  elements: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      showIcon: PropTypes.bool.isRequired,
      target: PropTypes.oneOfType([
        PropTypes.shape({
          url: PropTypes.string,
          label: PropTypes.string.isRequired,
          telephone: PropTypes.string,
        }),
        PropTypes.shape({
          slug: PropTypes.string.isRequired,
        }),
      ]).isRequired,
      useExternal: PropTypes.bool.isRequired,
    })
  ).isRequired,
}

export default UtilityMenu
