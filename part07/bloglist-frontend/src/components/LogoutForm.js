import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'

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
        <p>
          <Link to="/">blogs</Link>
          {' '}
          <Link to="/users">users</Link>
          {' '}
          {user.name} logged in <button id="logoutButton" type="submit">logout</button>
        </p>
      </div>
    </form>
  )
}

export default LogoutForm