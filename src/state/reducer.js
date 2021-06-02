import {
  UPDATE_EXTERNAL_LINK,
  UPDATE_NEED_CONSENT,
  UPDATE_SHOW_MODAL,
  UPDATE_EXPAND_ISI,
} from 'src/state/actionTypes'

export const initialState = {
  externalLink: false,
  needConsent: true,
  showOverlay: false,
  showModal: false,
  expandISI: false,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_EXTERNAL_LINK:
      return {
        ...state,
        externalLink: action.url,
        showOverlay: action.url ? true : false,
        showModal: action.url ? true : false,
      }
    case UPDATE_NEED_CONSENT:
      return {
        ...state,
        needConsent: action.needConsent,
        showOverlay: action.needConsent,
        showModal: action.needConsent,
      }
    case UPDATE_SHOW_MODAL:
      return {
        ...state,
        showModal: action.showModal,
        showOverlay: action.showModal,
      }
    case UPDATE_EXPAND_ISI:
      return {
        ...state,
        expandISI: action.expandISI,
        showOverlay: action.expandISI,
        externalLink: false,
      }
    default:
      return state
  }
}
