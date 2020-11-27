import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

import UsernameForm from './InputForms/UsernameForm'
import PasswordForm from './InputForms/PasswordForm'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(login( username, password ))

    setUsername('')
    setPassword('')
  }

  return (
    <form id="loginForm" onSubmit={handleLogin}>
      <UsernameForm username={username} handleUsernameChange={handleUsernameChange} />
      <PasswordForm password={password} handlePasswordChange={handlePasswordChange} />
      <div>
        <button id="loginButton" type="submit">login</button>
      </div>
    </form>
  )
}

export default LoginForm