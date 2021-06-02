import React from 'react'
import PropTypes from 'prop-types'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import { formatHref } from 'src/utils/formatHref'

import ExternalLink from 'src/components/common/ExternalLink'
import FooterMenu from './FooterMenu'

const audienceRendererOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p className="footer-audience__text">{children}</p>
    },
  },
}

const Audience = ({ json }) => {
  return (
    <div className="footer-audience">
      {documentToReactComponents(json, audienceRendererOptions)}
    </div>
  )
}

Audience.propTypes = {
  json: PropTypes.object.isRequired,
}

const Legal = ({ copyright, trademark }) => {
  return (
    <div className="footer-legal">
      {copyright.text && (
        <p className={'footer-legal__text footer-legal__text--copyright'}>
          {copyright.text}
        </p>
      )}
      {trademark.text && (
        <p className={'footer-legal__text'}>{trademark.text}</p>
      )}
    </div>
  )
}

const Home = ({ image, label, target }) => {
  return (
    <div className={'footer-home__container'}>
      <ExternalLink className={'footer-home'} url={target.url}>
        <img
          alt={label || target.label}
          className={'footer-home__image'}
          src={image.localFile.publicURL}
        />
      </ExternalLink>
    </div>
  )
}

const questionsRendererOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p className="footer-questions__text">{children}</p>
    },
    [INLINES.ENTRY_HYPERLINK]: (node, children) => {
      return (
        <ExternalLink
          className="footer-questions__link"
          url={formatHref(node.data.target.fields)}
        >
          {children}
        </ExternalLink>
      )
    },
  },
}

const Questions = ({ json }) => {
  return (
    <div className="footer-questions">
      {documentToReactComponents(json, questionsRendererOptions)}
    </div>
  )
}

const Footer = ({ children }) => {
  return <footer className="footer">{children}</footer>
}

Footer.propTypes = {
  children: PropTypes.node.isRequired,
}

Footer.Audience = Audience
Footer.Home = Home
Footer.Legal = Legal
Footer.Menu = FooterMenu
Footer.Questions = Questions

export default Footer
