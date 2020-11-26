import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'

const LogoutForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <form onSubmit={handleLogout}>
      <div>
        <p>{user.name} logged in <button id="logoutButton" type="submit">logout</button></p>
      </div>
    </form>
  )
}

export default LogoutForm