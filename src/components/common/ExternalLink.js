import React from 'react'
import PropTypes from 'prop-types'

import { useStateValue } from 'src/state/provider'
import { UPDATE_EXTERNAL_LINK } from 'src/state/actionTypes'

const ExternalLink = ({ children, className, url }) => {
  const [, dispatch] = useStateValue()

  const clickHandler = (e) => {
    e.preventDefault()
    dispatch({
      type: UPDATE_EXTERNAL_LINK,
      url: e.target.href,
    })
  }

  return (
    <a
      className={className}
      href={url}
      onClick={clickHandler}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}

ExternalLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
}

export default ExternalLink
