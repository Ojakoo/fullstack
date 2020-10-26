import React from 'react'

const TitleForm = ({ title, handleTitleChange }) => {
    return (
        <div>
            title: <input 
                value={title}
                onChange={handleTitleChange}
            />
        </div>
    )
}

export default TitleForm