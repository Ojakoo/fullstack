import React from 'react'

const AuthorForm = ({ author, handleAuthorChange }) => {
  return (
    <div>
      author: <input
        id='author'
        value={ author }
        onChange={ handleAuthorChange }
      />
    </div>
  )
}

export default AuthorForm