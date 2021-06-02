import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import { formatHref } from 'src/utils/formatHref'

import ExternalLink from 'src/components/common/ExternalLink'

const Button = ({ action, children, className, useExternal }) => {
  // Using a callback function as a click handler
  if (typeof action === 'function') {
    return (
      <button className={className} onClick={action}>
        {children}
      </button>
    )
  }

  const url = typeof action === 'string' ? action : formatHref(action)

  // Use ExternalLink to trigger modal click handler
  if (useExternal) {
    return (
      <ExternalLink url={url} className={className}>
        {children}
      </ExternalLink>
    )
  }

  // For internal pages, use Gatsby Link component
  if (action.slug) {
    return (
      <Link className={className} to={url}>
        {children}
      </Link>
    )
  }

  // Default to anchor
  return (
    <a className={className} href={url}>
      {children}
    </a>
  )
}

Button.defaultProps = {
  useExternal: false,
}

Button.propTypes = {
  action: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.shape({
      url: PropTypes.string,
    }),
  ]).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  useExternal: PropTypes.bool,
}

export default Button
