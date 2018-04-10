const localeReducer = (state = 'en', action) => {
  switch (action.type) {
    case 'LOCALE_FI':
      return action.data
    case 'LOCALE_EN':
      return action.data
    default:
      return state
  }
}

export const changeLocale = (locale) => {
  return async (dispatch) => {
    dispatch({
      type: 'DELETE_USER',
      data: locale
    })
  }
}


export default localeReducer