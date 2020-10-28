import React from 'react'

const UsernameForm = ({ username, handleUsernameChange }) => {
  return (
    <div>
      username: <input
        id='username'
        value={username}
        onChange={handleUsernameChange}
      />
    </div>
  )
}

export default UsernameForm