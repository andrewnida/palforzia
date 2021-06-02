import { useEffect } from 'react'

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export const useScrollLock = (isLocked) => {
  useEffect(() => {
    const targetElement = document.querySelector('#mobile-menu__container')
    if (isLocked) {
      disableBodyScroll(targetElement)
    } else {
      enableBodyScroll(targetElement)
    }
  }, [isLocked])
}
