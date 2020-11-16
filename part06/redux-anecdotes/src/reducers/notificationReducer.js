
const notificationReducer = (state = null, action) => {
  switch (action.type) {
      case 'SHOW_NOTIFICATION':
        return action.notification
      case 'HIDE_NOTIFICATION':
        return null
      default: 
        return state
  }
}

export const showNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      notification: notification,
    })
    setTimeout(() => {
      dispatch({
        type: 'HIDE_NOTIFICATION',
      })
    }, time * 1000)
  }
}

export default notificationReducer