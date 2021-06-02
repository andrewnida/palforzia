import React from 'react'
// import PropTypes from 'prop-types'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import classNames from 'classnames'

import { formatHref } from 'src/utils/formatHref'

const RENDER_OPTIONS = {
  renderMark: {
    [MARKS.BOLD]: (text) => (
      <strong className={'u-semi-bold-text'}>{text}</strong>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className={'isi__paragraph'}>{children}</p>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <h5 className={'isi__heading'}>{children}</h5>
    ),
    [BLOCKS.HEADING_6]: (node, children) => (
      <h6 className={'isi__subheading'}>{children}</h6>
    ),
    [INLINES.ENTRY_HYPERLINK]: (node, children) => (
      <a
        className={'isi__link'}
        rel="noopener noreferrer"
        target="_blank"
        href={formatHref(node.data.target.fields)}
      >
        {children}
      </a>
    ),
  },
}

const ISI = ({ header, content }) => {
  const warningList = content.find(({ client_id }) =>
    client_id.includes('Warning List')
  )

  const isiBlocks = content.filter(
    ({ client_id }) => !client_id.includes('Warning List')
  )

  return (
    <section className={'section-container u-full-bleed isi'}>
      <div className={'isi__block'}>
        <h5 className={'isi__heading'}>{header}</h5>
        {warningList?.content && (
          <div className={'isi__block__list u-semi-bold-text'}>
            {documentToReactComponents(
              warningList.content.json,
              RENDER_OPTIONS
            )}
          </div>
        )}
      </div>
      {isiBlocks.map(({ content }, index) => {
        return (
          <div
            key={index}
            className={classNames(['isi__block isi__block--text'], {
              'isi__block--pinned': index === isiBlocks.length - 1,
            })}
          >
            {documentToReactComponents(content.json, RENDER_OPTIONS)}
          </div>
        )
      })}
    </section>
  )
}

// ISI.propTypes = {}

export default ISI
