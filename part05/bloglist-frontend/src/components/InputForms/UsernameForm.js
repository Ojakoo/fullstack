import React from 'react'

const UsernameForm = ({ username, handleUsernameChange }) => {
  return (
    <div>
            username: <input
        value={username}
        onChange={handleUsernameChange}
      />
    </div>
  )
}

export default UsernameForm