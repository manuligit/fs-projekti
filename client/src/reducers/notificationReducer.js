const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.data
    case 'REMOVE':
      return null
    default:
      return state
  }
}

export const createNotification = (message) => {
  return async (dispatch) => {
    dispatch ({
      type: 'NOTIFY',
      data: message
    })

    setTimeout(() => {
      dispatch({
        type: 'REMOVE'
      })
    }, 5000)
  }
}

export default notificationReducer