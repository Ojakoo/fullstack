import React from 'react'
import PropTypes from 'prop-types'
import UsernameForm from './InputForms/UsernameForm'
import PasswordForm from './InputForms/PasswordForm'

const LoginForm = ({ handleLogin, username, handleUsernameChange, password, handlePasswordChange }) => {
  return (
    <form onSubmit={handleLogin}>
      <UsernameForm username={username} handleUsernameChange={handleUsernameChange} />
      <PasswordForm password={password} handlePasswordChange={handlePasswordChange} />
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm