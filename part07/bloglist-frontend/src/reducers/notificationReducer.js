
const notificationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return {
      notification: action.notification,
      notification_type: action.notification_type
    }
  case 'SET_NOTIFICATION_NULL':
    return null
  default:
    return state
  }
}

var timeoutID

export const showNotification = (notification, notification_type, time) => {
  return async dispatch => {
    console.log(notification)
    clearTimeout(timeoutID)
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: notification,
      notification_type: notification_type,
    })
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION_NULL',
      })
    }, time * 1000)
  }
}

export default notificationReducer