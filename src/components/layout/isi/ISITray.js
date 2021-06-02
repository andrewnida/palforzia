import React from 'react'
import PropTypes from 'prop-types'

const ISITray = ({children}) => {
  return (
    <aside>
      {children}
    </aside>
  )
}

ISITray.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ISITray
