import React from 'react'

const AuthorForm = ({ author, handleAuthorChange }) => {
  return (
    <div>
            author: <input
        value={ author }
        onChange={ handleAuthorChange }
      />
    </div>
  )
}

export default AuthorForm