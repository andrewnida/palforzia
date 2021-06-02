import React from 'react'
import PropTypes from 'prop-types'

const PageHeader = ({ className, text }) => {
  return (
    <div className={`section-container ${className}`}>
      <header className={'page-header'}>
        <h1 className={'heading-1 page-header__heading'}>{text}</h1>
      </header>
    </div>
  )
}

PageHeader.defaultProps = {
  className: '',
}

PageHeader.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
}

export default PageHeader
