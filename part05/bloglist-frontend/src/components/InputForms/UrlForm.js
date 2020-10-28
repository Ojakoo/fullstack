import React from 'react'

const UrlForm = ({ url, handleUrlChange }) => {
  return (
    <div>
      url: <input
        id='url'
        value={ url }
        onChange={ handleUrlChange }
      />
    </div>
  )
}

export default UrlForm