import React from 'react'

const UsernameForm = ({ password, handlePasswordChange }) => {
  return (
    <div>
      password: <input
        id='passwordInput'
        value={password}
        onChange={handlePasswordChange}
      />
    </div>
  )
}

export default UsernameForm