import React from 'react'

const UrlForm = ({ url, handleUrlChange }) => {
  return (
    <div>
            url: <input
        value={ url }
        onChange={ handleUrlChange }
      />
    </div>
  )
}

export default UrlForm