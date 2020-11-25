import React from 'react'

const TitleForm = ({ title, handleTitleChange }) => {
  return (
    <div>
      title: <input
        id='titleInput'
        value={title}
        onChange={handleTitleChange}
      />
    </div>
  )
}

export default TitleForm