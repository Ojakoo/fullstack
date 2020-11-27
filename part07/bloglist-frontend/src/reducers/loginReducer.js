import loginService from '../services/login'
import blogService from '../services/blogs'
import { showNotification } from './notificationReducer'

const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const login = ( username, password ) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      dispatch({
        type: 'LOGIN',
        data: user,
      })
      dispatch(showNotification(`Hello ${user.name}, you are now logged in!`, 'success', 3))
    } catch (error) {
      dispatch(showNotification(`${error.response.data.error}`, 'error', 3))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)

    dispatch({
      type: 'LOGOUT',
    })
    dispatch(showNotification('Logged out :)', 'success', 3))
  }
}

export const refreshUser = ( user ) => {
  return async dispatch => {
    blogService.setToken(user.token)
    dispatch({
      type: 'LOGIN',
      data: user,
    })
  }
}

export default loginReducer