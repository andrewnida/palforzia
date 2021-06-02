import React from 'react'
import PropTypes from 'prop-types'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import MobileUtilityMenu from './MobileUtilityMenu'
import UtilityMenu from './UtilityMenu'
import HeaderMenu from './HeaderMenu'
import MobileMenu from './MobileMenu'

const audienceRendererOptions = {
  renderMark: {
    [MARKS.BOLD]: (text) => <strong>{text}</strong>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p className="header__audience-text">{children}</p>
    },
  },
}

const Audience = ({ json }) => {
  return (
    <div className="header__audience u-full-bleed">
      {documentToReactComponents(json, audienceRendererOptions)}
    </div>
  )
}

Audience.propTypes = {
  json: PropTypes.object.isRequired,
}

const Header = React.forwardRef(({ children }, ref) => {
  return (
    <header ref={ref} className="header">
      {children}
    </header>
  )
})

Header.Audience = Audience
Header.Menu = HeaderMenu
Header.MobileMenu = MobileMenu
Header.MobileUtilityMenu = MobileUtilityMenu
Header.UtilityMenu = UtilityMenu

Header.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Header
