import React, { useEffect } from 'react'
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import classNames from 'classnames'
import FocusLock from 'react-focus-lock'

import { useKeyPress } from 'src/hooks/useKeyPress'
import { formatHref } from 'src/utils/formatHref'

import Image from 'src/components/common/Image'

const renderRichText = (json) => {
  return documentToReactComponents(json, {
    renderMark: {
      [MARKS.BOLD]: (text) => (
        <strong
          id={'modal__content__paragraph__heading'}
          className={'u-semi-bold-text'}
        >
          {text}
        </strong>
      ),
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <p className={'modal__content__paragraph'}>{children}</p>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node) => (
        <Image className={'modal__content__image'} node={node} />
      ),
      [INLINES.ENTRY_HYPERLINK]: (node, children) => (
        <a
          className={'modal__content__link'}
          target="_blank"
          rel="noopener noreferrer"
          href={formatHref(node.data.target.fields)}
        >
          {children}
        </a>
      ),
    },
  })
}

const Modal = ({ children, show, cancel }) => {
  const escPress = useKeyPress('Escape')

  useEffect(() => {
    if (escPress && cancel) cancel()
  }, [escPress, cancel])

  return (
    <aside
      className={classNames(['modal'], { 'modal--show': show })}
      role="dialog"
      aria-labelledby="modal__content__paragraph__heading"
      aria-describedby="modal__content"
    >
      <FocusLock>{children}</FocusLock>
    </aside>
  )
}

Modal.renderRichText = renderRichText

export default Modal
