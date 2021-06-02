import React from 'react'
import PropTypes from 'prop-types'

import { NAVIGATION_ELEMENT, TOPIC } from 'src/constants/contentfulTypes'

import Button from 'src/components/common/Button'
import Icon from 'src/components/common/Icon'

const renderContent = (content) => (
  <>
    {content.map(({ __typename, text, target, useExternal, label }, index) => {
      switch (__typename) {
        case TOPIC:
          return (
            <p key={index} className={'server-message__details'}>
              {text}
            </p>
          )
        case NAVIGATION_ELEMENT:
          return (
            <Button
              useExternal={useExternal}
              key={index}
              className={'btn server-message__btn'}
              action={target}
            >
              {label}
              <Icon
                name={useExternal ? 'btn-external' : 'btn-arrow'}
                className={'btn__icon'}
              />
            </Button>
          )
        default:
          return <></>
      }
    })}
  </>
)

const ServerMessage = ({ className, header, content }) => {
  const renderedContent = renderContent(content)

  return (
    <section className={`server-message ${className}`}>
      <div className={'section-container'}>
        {header.text && (
          <h1 className={'server-message__heading'}>{header.text}</h1>
        )}
        {renderedContent}
      </div>
    </section>
  )
}

ServerMessage.defaultProps = {
  className: '',
  content: [],
}

ServerMessage.propTypes = {
  className: PropTypes.string,
  content: PropTypes.array,
  header: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
}

export default ServerMessage
