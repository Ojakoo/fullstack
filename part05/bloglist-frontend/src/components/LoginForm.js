import React from 'react'
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

export default LoginForm