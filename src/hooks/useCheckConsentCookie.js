import { useEffect } from 'react'

import Cookies from 'js-cookie'

import { useStateValue } from 'src/state/provider'
import { UPDATE_NEED_CONSENT } from 'src/state/actionTypes'

const CONSENT_COOKIE_ID = 'gatsby-gdpr-google-analytics'

export const useCheckConsentCookie = (debug = false) => {
  const [, dispatch] = useStateValue()

  useEffect(() => {
    let cookie = Cookies.get(CONSENT_COOKIE_ID)
    dispatch({
      type: UPDATE_NEED_CONSENT,
      needConsent: !cookie || debug,
    })
  }, [dispatch, debug])
}
